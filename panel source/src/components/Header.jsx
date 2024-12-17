/* eslint-disable react/prop-types */
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useRef, useState } from "react";
import { textFieldStyle } from "../utils/panelStyle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Header = ({
  setSettings,
  showSettings,
  title,
  setTitle,
  handleTitleChange,
  logo,
}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const textFieldRef = useRef(null);

  const navigate = useNavigate();

  // Global click listener to update title when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        textFieldRef.current &&
        !textFieldRef.current.contains(event.target)
      ) {
        handleTitleChange(title);
        setIsEditTitle(false);
      }
    };

    if (isEditTitle) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleTitleChange, isEditTitle, textFieldRef]);

  const handleRefresh = () => {
    navigate(`/`);
    window.location.reload();
    toast.success("Page refreshed successfully");
  };

  const handlePrint = async () => {
    const pdf = new jsPDF("p", "pt", "a4"); // Portrait orientation, A4 size
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const sections = document.querySelectorAll(".section-to-print"); // Target sections by class

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      // Ensure each section is rendered fully
      const canvas = await html2canvas(section, {
        scale: 2, // High-quality rendering
        useCORS: true,
      });

      const imgWidth = (pdfWidth * 8) / 9; // Fit to PDF width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png", 1.0);

      // Add the image to a new page
      if (i > 0) pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        30,
        0,
        imgWidth,
        imgHeight > pdfHeight ? pdfHeight : imgHeight
      );
    }

    // Save the PDF
    pdf.save("Panel.pdf");
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy link: " + err);
      });
  };

  const handleWhatsapp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  const handleEmail = () => {
    const mailtoLink = `mailto:?subject=Check%20this%20out&body=${encodeURIComponent(
      window.location.href
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <Grid size={12}>
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#363636",
          flexDirection: { md: "row", xs: "column" },
          mb: { md: 0, xs: 3 },
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          style={{
            width: "140px",
            objectFit: "fit-content",
            padding: "5px",
          }}
        />

        {/* Title */}
        <Tooltip title="Click to Add Title">
          {!isEditTitle ? (
            <Typography
              onClick={() => {
                setIsEditTitle(true);
                if (title === "CLICK HERE TO ADD PROJECT TITLE") {
                  setTitle("");
                }
              }}
              textAlign={"center"}
              mt={4}
              color={"white"}
              fontWeight={600}
              fontSize={"larger"}
              sx={{ cursor: "pointer" }}
            >
              {title}
            </Typography>
          ) : (
            <Box display={"flex"} mt={{ md: 2, xs: 0 }} width={"50%"} gap={3}>
              <TextField
                value={title || ""}
                inputRef={textFieldRef} // Ref for detecting clicks outside
                sx={{
                  ...textFieldStyle,
                  width: "100%",
                  textAlign: "center",
                  color: "white",
                }}
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleChange}
              />
            </Box>
          )}
        </Tooltip>

        {/* Action Buttons */}
        <Box
          display={"flex"}
          gap={2}
          justifyContent={"end"}
          alignItems={"center"}
          mr={1}
          mb={{ xs: 2, md: 0 }}
          mt={{ md: 0, xs: 2 }}
        >
          <Tooltip title="Whatsapp link">
            <IconButton
              sx={{ background: "black", color: "#c0d144" }}
              onClick={handleWhatsapp}
            >
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email Link">
            <IconButton
              sx={{ background: "black", color: "#c0d144" }}
              onClick={handleEmail}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton
              sx={{ background: "black", color: "#c0d144" }}
              onClick={handleRefresh}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy Link">
            <IconButton
              sx={{ background: "black", color: "#c0d144" }}
              onClick={handleCopyLink}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download as PDF">
            <IconButton
              sx={{ background: "black", color: "#c0d144" }}
              onClick={handlePrint}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Mobile Menu Icon */}
      <IconButton
        onClick={() => setSettings(!showSettings)}
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          color: "#c0d144",
          top: 5,
          left: 5,
        }}
      >
        <MenuIcon />
      </IconButton>
    </Grid>
  );
};

export default Header;
