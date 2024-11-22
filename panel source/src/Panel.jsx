import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  Button,
  styled,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    background: "black",
    "& fieldset": {
      borderColor: "transparent", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Outline color when focused
    },
    color: "black",
    borderRadius: 3,
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    color: "black", // Initial label color
    fontSize: "16px", // Reduced label font size
    transform: "translate(14px, -16px) scale(0.75)",
    fontWeight: 600,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", // Label color when focused
    fontSize: "13px", // Ensures size is consistent when focused
    // color:
  },
  "& .MuiInputBase-input": {
    color: "#c0d144", // Text color
  },
  "& .MuiInputBase-input::placeholder": {
    color: "white", // Placeholder color
  },
};

export const selectStyle = {
  "& .MuiOutlinedInput-root": {
    background: "black",
    "& fieldset": {
      borderColor: "transparent", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Outline color when focused
    },
    "& .MuiSelect-select": {
      color: "#c0d144", // Text color
    },
    borderRadius: 3,
    fontSize: "13px",
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, -16px) scale(0.75)",
    color: "black", // Initial label color
    fontSize: "16px", // Reduced label font size
    fontWeight: 600,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", // Label color when focused
    fontSize: "13px", // Ensures size is consistent when focused
  },
};

const versions = ["P 3.9", "P 3.1", "P 2.6", "P 2.7"];
const units = [
  { name: "Feet(FT)", unit: "FT" },
  { name: "Meter(M)", unit: "M" },
  { name: "Panels", unit: "Panels" },
];
const ratioData = ["16:9", "21:9", "4:3", "custom"];

const panelArray = [
  [true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true, true, true],
];

function Panel({parentId,panelid,setp}) {
  const initialHorizontal = localStorage.getItem("Horizontal");
  const componentRef = useRef();

  let { Id } = useParams();

  if (panelid) {
    Id = panelid;
  }

  const navigate = useNavigate();
  const initialLoad = useRef(true);
  const [title, setTitle] = useState("CLICK HERE TO ADD PROJECT TITLE");
  const [screenName, setScreenName] = useState("CLICK HERE TO ADD SCREEN NAME");
  const [isEditTitle, setSsEditTitle] = useState(false);
  const [isName, setName] = useState(false);
  const [type, setType] = useState(versions[0]);
  const [panelData, setPanelData] = useState({});
  const [id, setId] = useState("");
  const [panelsX, setPanelsX] = useState(10);
  const [panelsY, setPanelsY] = useState(5);
  const [unit, setUnit] = useState(units[0]);
  const [ratio, setRatio] = useState("custom");
  const [horizontal, setHorizontal] = useState(16); // Number of grids in the horizontal direction
  const [vertical, setVertical] = useState(9); // Number of grids in the vertical direction
  const [panels, setPanels] = useState(panelArray); // Store panel states (on/off)
  const [panelSize, setPanelSize] = useState(5); // Store panel states (on/off)
  const [showSettings, setSettings] = useState(false);
  const [activePanels, setActivePanels] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [logo, setLogo] = useState("/logoPanel.png");
  const [showCopyright, setShowCopyright] = useState(false);

  const [panelIds, setPanelIds] = useState([]);


  const screenWidth = window.innerWidth / 2;
  const screenHeight = window.innerHeight / 2;

  const screenCheck = window.innerWidth;

  // const baseURL = "https://api.screencalculator.in";
  const baseURL ="http://localhost:4000"


  async function getData(
    ratio1,
    unit1,
    vertical1,
    horizontal1,
    Id1,
    title1,
    type1,
    panels1,
    activePanel1,
    screenName1,
    load = false
  ) {
    let sendID;

    if (Id1 === "") {
      sendID = Id;
    } else {
      sendID = Id1;
    }

    try {
      const response = await axios.post(baseURL, {
        product: 500,
        unit: unit1.unit,
        ratio: ratio1,
        horizontal: horizontal1,
        vertical: vertical1,
        id: sendID,
        title: title1,
        product: type1,
        panelMatrix: panels1,
        activePanel: activePanel1,
        screenName: screenName1,
        parentId: parentId
      
      });

      //   Avoid updating ratio and unit unless they differ from the current state
      if (response.data.ratio !== ratio) setRatio(response.data.ratio);
      const updatedUnit = units.filter(
        (data) => data.unit === response.data.unit
      );
      if (updatedUnit && updatedUnit.unit !== unit.unit)
        setUnit(updatedUnit[0]);

      setPanelsX(response.data.panelsX);
      setPanelsY(response.data.panelsY);

      if (response.data.product && response.data.product !== type) {
        setType(response.data.product);
      }
      //   setPanels(response.data.panelMatrix);
      setTitle(response.data.title);
      setScreenName(response.data.screenName);
      setPanelData(response.data);
      if (response.data.ratio !== ratio) {
        setVertical(Math.round(Number(response.data.vertical.split(" ")[0])));
      }

      if (Id) {
        setId(Id);
        navigate(`/${Id}`);
      } else if (response.data.id) {
        
        if(parentId){

          if (!panelIds.includes(response.data.id)) {
            setp([...panelIds, response.data.id]);
          }
        }
        setId(response.data.id);
        navigate(`/${response.data.id}`);
      }
      //   initialLoad.current = false;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const panelSizeValue = Math.min(
      screenHeight / panelsX,
      screenHeight / panelsY
    );
    if (screenCheck > 900) {
      setSettings(true);
    }
    setPanelSize(panelSizeValue);

    if (isLoaded === true) {
      generateGrid();
    }
    setIsLoaded(true);
  }, [panelsX, panelsY]);

  useEffect(() => {
    async function fetchData() {
      let sendID;

      if (Id) {
        sendID = Id;
      } else {
        sendID = id;
      }

      if (Id) {
        console.log("id>>>>>", id);
        try {
          const response = await axios.get(`${baseURL}/${Id}`);

          setIsLoaded(!isLoaded);

          if (!response.data) return;

          setPanels(response.data.panelMatrix);

          if(!parentId){ 
            setPanelIds(response.data.children);
          }

          setRatio(response.data.ratio);
          const updatedUnit = units.filter(
            (data) => data.unit === response.data.unit
          );

          if (updatedUnit && updatedUnit.unit !== unit.unit)
            setUnit(updatedUnit[0]);
          setHorizontal(response.data.horizontal);
          setVertical(response.data.vertical);
          const trueCount = response.data.panelMatrix
            .flat()
            .filter((panel) => panel === true).length;

          console.log(trueCount);

          setActivePanels(trueCount);

          if (response.data.product && response.data.product !== type)
            setType(response.data.product);

          getData(
            response.data.ratio,
            updatedUnit[0],
            response.data.vertical,
            response.data.horizontal,
            Id,
            response.data.title,
            response.data.product,
            response.data.panelMatrix,
            trueCount,
            response.data.screenName,
            true
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {

          console.log("postinnnggggg", id);
          const response = await axios.post(baseURL, {
            product: 500,
            unit: unit.unit,
            ratio: ratio,
            horizontal: initialHorizontal ? initialHorizontal : 16,
            vertical: vertical,
            id: sendID,
            title: title,
            product: type ? type : "p 3.9",
            panelMatrix: panels,
            screenName: screenName,
            parentId: parentId

          });
          console.log(response.data);
          setPanelsX(response.data.panelsX);
          setPanelsY(response.data.panelsY);

          //   Avoid updating ratio and unit unless they differ from the current state
          if (response.data.ratio !== ratio) setRatio(response.data.ratio);
          const updatedUnit = units.filter(
            (data) => data.unit === response.data.unit
          );
          if (updatedUnit && updatedUnit.unit !== unit.unit)
            setUnit(updatedUnit[0]);
          if (response.data.horizontal !== horizontal)
            if (response.data.vertical !== vertical)
              if (response.data.product && response.data.product !== type)
                setType(response.data.product);

          setTitle(response.data.title);
          setScreenName(response.data.screenName);
          setPanelData(response.data);
          if (initialLoad.current && Id) {
            setId(Id);
            navigate(`/${Id}`);
          }else if (response.data.id) {
             if(parentId){
              if (!panelIds.includes(response.data.id)) {
                setp([...panelIds, response.data.id]);
              }
            }
            setId(response.data.id);
            navigate(`/${response.data.id}`);
          }
          initialLoad.current = false;
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []); // Dependencies to trigger re-fetch

  const handleTitleChange = (e) => {
    if (!title.trim()) {
      toast.error(`Title can't be empty`);
      return;
    }
    getData(
      ratio,
      unit,
      vertical,
      horizontal,
      id,
      title,
      type,
      panels,
      activePanels,
      screenName
    );
    setSsEditTitle(false);
  };

  const handleNameChange = (e) => {
    if (!screenName.trim()) {
      toast.error('Name Can"t be empty');
      return;
    }

    getData(
      ratio,
      unit,
      vertical,
      horizontal,
      id,
      title,
      type,
      panels,
      activePanels,
      screenName // Use `value` here
    );
    setName(false);
  };

  const handleRatioChange = (e) => {
    setRatio(e.target.value);
    getData(
      e.target.value,
      unit,
      vertical,
      horizontal,
      id,
      title,
      type,
      panels,
      activePanels,
      screenName
    );
  };
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    getData(
      ratio,
      e.target.value,
      vertical,
      horizontal,
      id,
      title,
      type,
      panels,
      activePanels,
      screenName
    );
  };

  const handleHorizontalChange = (e) => {
    const value = e.target.value;
    let verticalVal;
    if (ratio === "4:3") {
      verticalVal = Math.round(value * (3 / 4));
      setVertical(verticalVal);
    } else if (ratio === "16:9") {
      verticalVal = Math.round(value * (9 / 16));
      setVertical(verticalVal);
    } else if (ratio === "21:9") {
      verticalVal = Math.round(value * (9 / 21));
      setVertical(verticalVal);
    }
    setHorizontal(value);

    getData(
      ratio,
      unit,
      ratio === "custom" ? vertical : verticalVal,
      value,
      id,
      title,
      type,
      panels,
      activePanels,
      screenName
    );
  };

  const handleVerticalChange = (e) => {
    const value = e.target.value;

    let horizontalVal;
    if (ratio === "4:3") {
      horizontalVal = MAth.round(value * (4 / 3));
      setHorizontal(horizontalVal);
    } else if (ratio === "16:9") {
      horizontalVal = Math.round(value * (16 / 9));
      setHorizontal(horizontalVal);
    } else if (ratio === "21:9") {
      horizontalVal = Math.round(value * (21 / 9));
      setHorizontal(horizontalVal);
    }
    setVertical(value);

    getData(
      ratio,
      unit,
      value,
      ratio === "custom" ? horizontal : horizontalVal,
      id,
      title,
      type,
      panels,
      activePanels,
      screenName
    );
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    // if (value < 1) {
    //   toast.error("Value cant be less than one");
    // }
    setType(value);

    getData(
      ratio,
      unit,
      vertical,
      horizontal,
      id,
      title,
      e.target.value,
      panels,
      activePanels,
      screenName
    );
  };

  // Function to initialize grid with "on" state for each panel
  const generateGrid = () => {
    const newPanels = Array.from({ length: panelsY }, () =>
      Array.from({ length: panelsX }, () => true)
    );
    setPanels(newPanels);
  };

  // Toggle individual panel on/off
  const togglePanel = (panel, row, col) => {
    const updatedPanels = panel.map((panelRow, i) =>
      panelRow.map((panel, j) => (i === row && j === col ? !panel : panel))
    );
    const trueCount = updatedPanels
      .flat()
      .filter((panel) => panel === true).length;

    if (trueCount < 1) {
      toast.warning(
        "You must have at least one panel active. You cannot remove all panels."
      );
      return;
    }

    setActivePanels(trueCount);
    setPanels(updatedPanels);
    getData(
      ratio,
      unit,
      vertical,
      horizontal,
      id,
      title,
      type,
      updatedPanels,
      trueCount,
      screenName
    );
  };


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
    const scaleFactor = Math.min(pdfWidth / contentWidth, pdfHeight / contentHeight);
    const scaledWidth = contentWidth * scaleFactor;
    const scaledHeight = contentHeight * scaleFactor;
  
    // Convert the canvas to an image
    const imageData = canvas.toDataURL("image/jpeg", 0.8); // JPEG format with compression
  
    // Add the image to the PDF with scaled dimensions
    const offsetX = (pdfWidth - scaledWidth) / 2; // Center horizontally
    const offsetY = (pdfHeight - scaledHeight) / 2; // Center vertically
    pdf.addImage(imageData, "JPEG", offsetX, offsetY, scaledWidth, scaledHeight);
  
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

  const handleUploadLogo = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setLogo(objectUrl);
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
    <div>
      <div ref={componentRef}>
        <Grid
          container

          //   sx={{ minHeight: "100vh", minWidth: "100vw", background: "#fff" }}
        >
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
                  <Box
                    display={"flex"}
                    mt={{ md: 2, xs: 0 }}
                    width={"50%"}
                    gap={3}
                  >
                    <TextField
                      value={title}
                      sx={{
                        ...textFieldStyle,
                        width: "100%",
                        textAlign: "center",
                        color: "white",
                      }}
                      variant="standard"
                      onBlur={handleTitleChange}
                      onChange={(e) => setTitle(e.target.value)}
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

            <Grid
              container
              spacing={3}
              sx={{
                p: 3,
                zIndex: 10,
                position: { xs: "fixed", md: "static" },
                top: 0,
                left: 0,
                pt: { xs: 10, md: 3 },
                width: { xs: "80%", md: "100%" },
                maxWidth: { xs: 300, md: "100%" },
                height: { xs: "100vh", md: "auto" },
                bgcolor: "white",
                transform: showSettings ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s ease",
                alignContent: "flex-start",
                display: showSettings || { md: "flex" },
                overflowY: { xs: "auto", md: "visible" },
                border: window.innerWidth < 900 ? "1px solid black" : "",
              }}
            >
              <Grid
                size={{ md: 0, xs: 12 }}
                sx={{
                  display: {
                    md: "none",
                    xs: "flex",
                    position: "absolute",
                    top: 5,
                    left: 5,
                    zindex: 2,
                  },
                }}
              >
                <Box>
                  <IconButton
                    onClick={() => setSettings(!showSettings)}
                    sx={{
                      // display: { xs: "block", md: "none" },
                      //   bgcolor: showSettings ? "black" : "black",
                      color: showSettings ? "black" : "black",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid size={{ md: 2.4, xs: 12 }}>
                <Box>
                  <FormControl fullWidth sx={selectStyle}>
                    <InputLabel id="demo-simple-select-label">
                      PRODUCT TYPE
                    </InputLabel>
                    <Select
                      //   variant="standard"
                      value={type}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="PRODUCT TYPE"
                      onChange={handleProductChange}
                      sx={{ fontSize: "13px" }}
                    >
                      {versions.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid size={{ md: 2.4, xs: 12 }}>
                <Box>
                  <FormControl fullWidth sx={selectStyle}>
                    <InputLabel id="demo-simple-select-label">UNITS</InputLabel>
                    <Select
                      //   variant="standard"
                      value={unit}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="UNITS"
                      onChange={handleUnitChange}
                      //   sx={selectStyle}
                    >
                      {units.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid size={{ md: 2.4, xs: 12 }}>
                <Box>
                  <FormControl fullWidth sx={selectStyle}>
                    <InputLabel id="demo-simple-select-label">RATIO</InputLabel>
                    <Select
                      //   variant="standard"
                      value={ratio}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="RATIO"
                      onChange={handleRatioChange}
                      //   sx={selectStyle}
                    >
                      {ratioData.length > 0 &&
                        ratioData?.map((data, index) => (
                          <MenuItem key={index} value={data}>
                            {data}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid size={{ md: 2.4, xs: 12 }}>
                <Box>
                  <FormControl fullWidth>
                    <TextField
                      //   variant="standard"
                      fullWidth
                      type="number"
                      value={horizontal}
                      label="WIDTH"
                      onChange={handleHorizontalChange}
                      //   name="client"
                      //   value={''}
                      //   onChange={handleInputChange}
                      sx={{ ...textFieldStyle }}
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid size={{ md: 2.4, xs: 12 }}>
                <Box>
                  <FormControl fullWidth>
                    <TextField
                      //   variant="standard"
                      fullWidth
                      type="number"
                      label="HEIGHT"
                      value={vertical}
                      onChange={handleVerticalChange}
                      sx={{ ...textFieldStyle }}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ md: 9, xs: 12 }}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              //   width={"98%"}
              flexDirection={"column"}
              height={{ md: "85vh", xs: "60vh" }}
              maxHeight={{ md: "85vh", xs: "60vh" }}
              overflow={"hidden"}
              //   bgcolor={"white"}
              //   borderRadius={10}
              alignItems={"center"}

              //   gap={2}
            >
              <Box
                sx={{
                  width: `${panelsX * panelSize}px`,
                  height: `${panelsY * panelSize}px`,
                  display: "grid",
                  position: "relative",
                  gridTemplateColumns: `repeat(${panelsX}, ${panelSize}px)`,
                  gridTemplateRows: `repeat(${panelsY}, ${panelSize}px)`,
                }}
              >
                <Box
                  position={"absolute"}
                  height={`${panelsY * panelSize}px`}
                  left={-125}
                  display={{ md: "flex", xs: "none" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                  //   bottom={15}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Typography fontSize={"13px"} fontWeight={600}>
                      {panelsY} PANELS
                    </Typography>
                    <Typography fontSize={"13px"} fontWeight={600}>
                      ({panelData.vertical} /{" "}
                    </Typography>
                    <Typography fontSize={"13px"} fontWeight={600}>
                      {panelData.unit === "FT"
                        ? panelData.verticalM
                        : panelData.unit === "M"
                        ? panelData.verticalF
                        : ""}
                      )
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <ArrowBackIosIcon sx={{ transform: "rotate(90deg)" }} />
                    <Box
                      sx={{
                        background: "black",
                        height: `${panelsY * panelSize}px`,
                      }}
                      width={"2px"}
                    />
                    <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
                  </Box>
                </Box>
                <Box
                  position={"absolute"}
                  width={`${panelsX * panelSize + 30}px`}
                  top={-75}
                  display={{ md: "block", xs: "none" }}
                  right={-15}
                >
                  <Typography
                    fontSize={"13px"}
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    {panelsX} PANELS (
                    {`${panelData.horizontal} / ${
                      panelData.unit === "FT"
                        ? panelData.horizontalM
                        : panelData.unit === "M"
                        ? panelData.horizontalF
                        : ""
                    }`}
                    )
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <ArrowBackIosIcon />
                    <Box
                      sx={{ background: "black", width: "100%" }}
                      height={"1px"}
                    />
                    <ArrowForwardIosIcon />
                  </Box>
                </Box>
                <Tooltip title="Click to Add Name">
                  <Box
                    justifyContent={"center"}
                    alignItems={"center"}
                    position={"absolute"}
                    width={`${panelsX * panelSize + 30}px`}
                    bottom={-75}
                    display={{ md: "none", xs: "none" }}
                    right={-15}
                    zIndex={1}
                    mt={4}
                  >
                    {!isName ? (
                      <Typography
                        onClick={() => {
                          setName(true);
                          if (screenName === "CLICK HERE TO ADD SCREEN NAME") {
                            setScreenName("");
                          }
                        }}
                        textAlign={"center"}
                        mt={4}
                        fontWeight={600}
                        fontSize={"larger"}
                        sx={{ cursor: "pointer" }}
                      >
                        {screenName}
                      </Typography>
                    ) : (
                      <Box display={"flex"} mt={4} width={"50%"} gap={3}>
                        <TextField
                          value={screenName}
                          sx={{ width: "100%", textAlign: "center" }}
                          variant="standard"
                          onChange={(e) => setScreenName(e.target.value) }
                          onBlur={handleNameChange}
                        />{" "}
                        <IconButton onClick={handleNameChange}>
                          <SaveIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Tooltip>
                <Box
                  sx={{
                    height: `${3.6 * panelSize}px`,
                    position: "absolute",
                    display: { xs: "none", md: "flex" },
                    bottom: 0,
                    right: `calc(-${panelSize + 15}px)`,
                  }}
                >
                  <img
                    src="/manY.png"
                    style={{
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {panels.map((row, rowIndex) =>
                  row.map((isPanelVisible, colIndex) => (
                    <Box
                      key={`${rowIndex}-${colIndex}`}
                      sx={{
                        width: `${panelSize}px`,
                        height: `${panelSize}px`,
                        backgroundColor: isPanelVisible
                          ? "transparent"
                          : "transparent",

                        cursor: "pointer",
                      }}
                      onClick={() => togglePanel(panels, rowIndex, colIndex)}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          //   border: "1px solid grey",
                          objectFit: "fill",
                          opacity: isPanelVisible ? 1 : 0,
                          transition: "all 0.5s ease",
                        }}
                        src="/wall.jpg"
                        alt="Panel"
                      />
                    </Box>
                  ))
                )}
              </Box>
              <Tooltip title="Click to Add Name">
                <Box
                  justifyContent={"center"}
                  alignItems={"center"}
                  // position={"absolute"}
                  width={`100%`}
                  display={{ md: "flex", xs: "flex" }}
                  mt={2}
                >
                  {!isName ? (
                    <Typography
                      onClick={() => {
                        setName(true);
                        if (screenName === "CLICK HERE TO ADD SCREEN NAME") {
                          setScreenName("");
                        }
                      }}
                      textAlign={"center"}
                      mt={4}
                      fontWeight={600}
                      fontSize={"larger"}
                      sx={{ cursor: "pointer" }}
                    >
                      {screenName}
                    </Typography>
                  ) : (
                    <Box display={"flex"} mt={4} width={"50%"} gap={3}>
                      <TextField
                        value={screenName}
                        sx={{ width: "100%", textAlign: "center" }}
                        variant="standard"
                        onChange={(e) => setScreenName(e.target.value)}
                        onBlur={handleNameChange}
                      />{" "}
                      <IconButton onClick={handleNameChange}>
                        <SaveIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Tooltip>
            </Box>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }} container>
            <Grid
              maxHeight={{ md: "fit-content", xs: "fit-content" }}
              overflow={"auto"}
              mt={2}
              //   bgcolor={'#dadded'}
              mr={{ xs: 0, md: 1 }}
              m={{ xs: 1, md: 0 }}
              size={12}
              bgcolor={"#363636"}
              boxShadow={
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;"
              }
              pt={1}
              borderRadius={3}
            >
              <Box pt={1} pb={1} borderRadius={3} m={1}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  pb={1}
                  px={2}
                  borderBottom={"1px solid #c0d144"}
                >
                  <Typography fontWeight={600} color="#c0d144">
                    Total Panels
                  </Typography>
                  <Typography fontWeight={600} color="#c0d144">
                    {panelData?.totalPanels}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  px={2}
                  mb={1}
                >
                  <Typography fontWeight={600} color="white">
                    Panels Width
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.panelsX}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  px={2}
                >
                  <Typography fontWeight={600} color="white">
                    Panels Height
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.panelsY}
                  </Typography>
                </Box>
              </Box>
              <Box pt={1} pb={1} borderRadius={3} m={1}>
                {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              pb={1}
              px={2}
              borderBottom={"1px solid #303f9f"}
            >
              <Typography fontWeight={600} color="#303f9f">
                Total Panels
              </Typography>
              <Typography fontWeight={600} color="#303f9f">
                {panelData?.totalPanels}
              </Typography>
            </Box> */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  px={2}
                  mb={1}
                >
                  <Typography fontWeight={600} color="white">
                    Panels Width
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.horizontal}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  px={2}
                >
                  <Typography fontWeight={600} color="white">
                    Panels Height
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.vertical}
                  </Typography>
                </Box>
              </Box>

              <Box pt={1} pb={1} borderRadius={3} m={1}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  pb={1}
                  px={2}
                  borderBottom={"1px solid #c0d144"}
                >
                  <Typography fontWeight={600} color="#c0d144">
                    Total Pixels
                  </Typography>
                  <Typography fontWeight={600} color="#c0d144">
                    {panelData?.totalPixels}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  px={2}
                >
                  <Typography fontWeight={600} color="white">
                    Pixel Height
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.pixelHeight}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  px={2}
                  mb={1}
                >
                  <Typography fontWeight={600} color="white">
                    Pixel Width
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.pixelWidth}
                  </Typography>
                </Box>
              </Box>

              <Box pt={1} pb={1} borderRadius={3} m={1}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  pb={1}
                  px={2}
                  borderBottom={"1px solid #c0d144"}
                >
                  <Typography fontWeight={600} color="#c0d144">
                    Total Weight
                  </Typography>
                  <Typography fontWeight={600} color="#c0d144">
                    {panelData?.totalWeight}
                  </Typography>
                </Box>
                {/* <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  px={2}
                >
                  <Typography fontWeight={600} color="white">
                    Diagonal
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.diagonal}
                  </Typography>
                </Box> */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  px={2}
                  mb={1}
                >
                  <Typography fontWeight={600} color="white">
                    Processor Ports
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.processorPorts}
                  </Typography>
                </Box>
              </Box>
              <Box pt={1} pb={1} borderRadius={3} m={1}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  //   mb={1}
                  pb={1}
                  px={2}
                  //   borderBottom={"1px solid #303f9f"}
                >
                  <Typography fontWeight={600} color="#c0d144">
                    220V Draw
                  </Typography>
                  <Typography fontWeight={600} color="#c0d144">
                    {panelData?.totalAMPS}
                  </Typography>
                  <Typography fontWeight={600} color="#c0d144">
                    {panelData?.totalAMPSkW}
                  </Typography>
                </Box>
                {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              px={2}
            >
              <Typography fontWeight={600}>16 AMP Circuits</Typography>
              <Typography fontWeight={600}>{panelData?.totalAMPS}</Typography>
            </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box display={"flex"} alignItems={"center"} pb={1} px={2}>
          <Typography>
            © 2024 <a href="https://greenmedia.co" target="_blank" rel="noopener noreferrer">greenmedia.co</a>. All rights reserved.
          </Typography>
        </Box>
      </div>

      <Box mt={2} display="flex" justifyContent="center">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleUploadLogo}
          />
        </Button>
        
        {!parentId && panelIds.map((panelId,i) => (
          <Panel key={i}  panelid={panelId} parentId={id} />
        ))}

        
        </Box>
        {  !parentId &&      <button onClick={() => setPanelIds([...panelIds, ``])}>
                Create New
              </button>}
    </div>
  );
}

export default Panel;
