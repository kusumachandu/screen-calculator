/* eslint-disable react/prop-types */
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { textFieldStyle } from "../utils/panelStyle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Header = ({
  componentRef,
  setSettings,
  showSettings,
  title,
  setTitle,
  handleTitleChange,
}) => {
  const [logo, setLogo] = useState("/logoPanel.png");
  const [isEditTitle, setSsEditTitle] = useState(false);

  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(`/`);
    window.location.reload();
    toast.success("Page refreshed successfully");
  };

  const handlePrint = async () => {
    const element = componentRef.current;

    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Increase the scale for better quality (adjust as needed)
      useCORS: true, // Helps with loading external images
    });

    // Get the full content width and height
    const contentWidth = element.scrollWidth;
    const contentHeight = element.scrollHeight;

    // Create a new jsPDF instance with landscape orientation and A4 size
    const pdf = new jsPDF("l", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaling to fit content into the page dimensions
    const scaleFactor = Math.min(
      pdfWidth / contentWidth,
      pdfHeight / contentHeight
    );
    const scaledWidth = contentWidth * scaleFactor;
    const scaledHeight = contentHeight * scaleFactor;

    // Convert the canvas to an image
    const imageData = canvas.toDataURL("image/jpeg", 0.8); // JPEG format with compression

    // Add the image to the PDF with scaled dimensions
    const offsetX = (pdfWidth - scaledWidth) / 2; // Center horizontally
    const offsetY = (pdfHeight - scaledHeight) / 2; // Center vertically
    pdf.addImage(
      imageData,
      "JPEG",
      offsetX,
      offsetY,
      scaledWidth,
      scaledHeight
    );

    // Save the PDF
    pdf.save(`${title}.pdf`);
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
        <img
          src={logo}
          style={{
            width: "140px",
            //   height: "120px",
            objectFit: "fit-content",
            padding: "5px",
          }}
        />
        <Tooltip title="Click to Add Title">
          {!isEditTitle ? (
            <Typography
              onClick={() => {
                setSsEditTitle(true);
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
                sx={{
                  ...textFieldStyle,
                  width: "100%",
                  textAlign: "center",
                  color: "white",
                }}
                variant="standard"
                onBlur={handleTitleChange}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSsEditTitle(false);
                    handleTitleChange(title);
                  }
                }}
              />
            </Box>
          )}
        </Tooltip>

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

      <IconButton
        onClick={() => setSettings(!showSettings)}
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          // bgcolor: showSettings ? "black" : "black",
          color: showSettings ? "#c0d144" : "#c0d144",
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
