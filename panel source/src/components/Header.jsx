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
  componentRef,
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
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    try {
      // Check if the main container is available
      const container = componentRef?.current;
      if (!container) {
        throw new Error("Component reference is not found.");
      }

      console.log("Container found:", container); // Debugging

      // Select the header and the first section
      const headerElement = container.querySelector(".header");
      const firstSection = container.querySelector(".section");

      if (!headerElement) {
        throw new Error("Header element not found.");
      }
      if (!firstSection) {
        throw new Error("First section element not found.");
      }

      const headerCanvas = await html2canvas(headerElement, {
        scale: 1,
        useCORS: true,
      });
      const headerImgData = headerCanvas.toDataURL("image/jpeg", 0.75);

      // Capture the first section
      const sectionCanvas = await html2canvas(firstSection, {
        scale: 1,
        useCORS: true,
      });
      const sectionImgData = sectionCanvas.toDataURL("image/jpeg", 0.75);

      // Add the header to the first 20% of the page
      pdf.addImage(headerImgData, "jpeg", 0, 0, width, height * 0.1);

      // Add the first section to the remaining 80% of the page
      pdf.addImage(
        sectionImgData,
        "jpeg",
        0,
        height * 0.2,
        width,
        height * 0.8
      );

      // Process the remaining sections
      const sections = container.querySelectorAll(".section");
      if (sections.length <= 1) {
        console.warn("No additional sections found."); // Debugging
      }

      for (let i = 1; i < sections.length; i++) {
        const sectionCanvas = await html2canvas(sections[i], { scale: 2 });
        const sectionImgData = sectionCanvas.toDataURL("image/jpeg");
        pdf.addPage();
        pdf.addImage(sectionImgData, "jpeg", 0, 0, width, height);
      }

      pdf.save(title);
    } catch (error) {
      console.error("Error generating PDF:", error.message);
    }
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
    <Grid size={12} className="header">
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
