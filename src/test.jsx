import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast } from "react-toastify";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "#fff", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff", // Outline color when focused
    },
    color: "white",
    borderRadius: 3,
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    color: "#fff", // Initial label color
    fontSize: "13px", // Reduced label font size
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff", // Label color when focused
    fontSize: "13px", // Ensures size is consistent when focused
  },
  "& .MuiInputBase-input": {
    color: "white", // Text color
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#fff", // Placeholder color
  },
};

export const selectStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "#fff", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff", // Outline color when focused
    },
    "& .MuiSelect-select": {
      color: "white", // Text color
    },
    borderRadius: 3,
    fontSize: "13px",
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    color: "#fff", // Initial label color
    fontSize: "13px", // Reduced label font size
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff", // Label color when focused
    fontSize: "13px", // Ensures size is consistent when focused
  },
};

const versions = ["V1", "V2", "V3"];
const units = [
  { name: "IMPERIAL(FT)", unit: "FT" },
  { name: "MATRIC(M)", unit: "M" },
  { name: "PANELS", unit: "Panels" },
];
const ratioData = ["16:9", "21:9", "4:3", "custom"];

function Panel() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("CLICK HERE TO ADD PROJECT TITLE");
  const [isEditTitle, setSsEditTitle] = useState(false);
  const [type, setType] = useState("");
  const [panelData, setPanelData] = useState({});
  const [id, setId] = useState("");
  const [panelsX, setPanelsX] = useState(10);
  const [panelsY, setPanelsY] = useState(5);
  const [unit, setUnit] = useState(units[0]);
  const [ratio, setRatio] = useState("custom");
  const [horizontal, setHorizontal] = useState(16); // Number of grids in the horizontal direction
  const [vertical, setVertical] = useState(9); // Number of grids in the vertical direction
  const [panels, setPanels] = useState([]); // Store panel states (on/off)
  const [panelSize, setPanelSize] = useState(5); // Store panel states (on/off)
  const [showSettings, setSettings] = useState(false);

  const containerWidth = 400; // Fixed width for the container
  const containerHeight = 400; // Fixed height for the container

  const screenWidth = window.innerWidth / 2;
  const screenHeight = window.innerHeight / 2;

  const screenCheck = window.innerWidth;

  console.log(unit);

  console.log("Screen Width:", screenWidth);
  console.log("Screen Height:", screenHeight);

  //   const baseURL = 'https://panelcalculator.onrender.com'
  const baseURL =
    "https://3607-2401-4900-1c5b-842-5942-b3cf-e8c-86bc.ngrok-free.app";

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(baseURL, {
          product: 500,
          unit: unit.unit,
          ratio: ratio,
          horizontal: horizontal,
          vertical: vertical,
          id: Id,
          title: title,
        });
        console.log(response.data);
        setPanelsX(response.data.panelsX);
        setPanelsY(response.data.panelsY);
        setRatio(response.data.ratio);

        let unitFind = units.filter((data) => data.name === response.data.unit);
        setUnit({ ...unitFind });
        if (Id) {
          setId(Id);
          navigate(`/${Id}`);
        } else {
          setId(response.data.id);
          navigate(`/${response.data.id}`);
        }
        setTitle(response.data.title);
        setPanelData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    const panelSizeValue = Math.min(
      screenHeight / panelsX,
      screenHeight / panelsY
    );
    if (screenCheck > 900) {
      setSettings(true);
    }
    setPanelSize(panelSizeValue);

    generateGrid();
  }, [panelsX, panelsY]);

  async function getData() {
    try {
      const response = await axios.post(baseURL, {
        product: 500,
        unit: unit.unit,
        ratio: ratio,
        horizontal: horizontal,
        vertical: vertical,
        id: Id,
        title: title,
      });
      console.log(response.data);
      setPanelsX(response.data.panelsX);
      setPanelsY(response.data.panelsY);
      setRatio(response.data.ratio);

      let unitFind = units.filter((data) => data.name === response.data.unit);
      setUnit({ ...unitFind });
      if (Id) {
        setId(Id);
        navigate(`/${Id}`);
      } else {
        setId(response.data.id);
        navigate(`/${response.data.id}`);
      }
      setTitle(response.data.title);
      setPanelData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to initialize grid with "on" state for each panel
  const generateGrid = () => {
    const newPanels = Array.from({ length: panelsY }, () =>
      Array.from({ length: panelsX }, () => true)
    );
    setPanels(newPanels);
  };

  // Toggle individual panel on/off
  const togglePanel = (row, col) => {
    const updatedPanels = panels.map((panelRow, i) =>
      panelRow.map((panel, j) => (i === row && j === col ? !panel : panel))
    );
    setPanels(updatedPanels);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatioChange = (e) => {
    setRatio(e.target.value);
    getData(); // Allow refetching when ratio changes
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    getData(); // Allow refetching when unit changes
  };

  const handleHorizontalChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setHorizontal(value);
    }
    getData();
  };

  const handleVerticalChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setVertical(value);
    }
    getData();
  };

  return (
    <Grid
      container
      //   sx={{ minHeight: "100vh", minWidth: "100vw", background: "#fff" }}
    >
      <Grid size={12}>
        <Box
          width={"100%"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isEditTitle ? (
            <Typography
              onClick={() => setSsEditTitle(true)}
              textAlign={"center"}
              mt={4}
              fontWeight={600}
              fontSize={"larger"}
              sx={{ cursor: "pointer" }}
            >
              {title}
            </Typography>
          ) : (
            <Box display={"flex"} mt={4} width={"50%"} gap={3}>
              <TextField
                value={title}
                sx={{ width: "100%", textAlign: "center" }}
                variant="standard"
                onChange={handleTitleChange}
              />{" "}
              <IconButton onClick={() => setSsEditTitle(false)}>
                <SaveIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <IconButton
          onClick={() => setSettings(!showSettings)}
          sx={{
            position: "fixed",
            top: 3,
            left: 3,
            zIndex: 2,
            display: { xs: "block", md: "none" },
            bgcolor: showSettings ? "#303f9f" : "white",
            color: showSettings ? "white" : "#303f9f",
          }}
        >
          <SettingsIcon />
        </IconButton>

        <Grid
          container
          spacing={3}
          sx={{
            p: 3,
            zIndex: 1,
            position: { xs: "fixed", md: "static" },
            top: 0,
            left: 0,
            pt: { xs: 10, md: 3 },
            width: { xs: "80%", md: "100%" },
            maxWidth: { xs: 300, md: "100%" },
            height: { xs: "100vh", md: "auto" },
            bgcolor: "#303f9f",
            transform: showSettings ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            alignContent: "flex-start",
            display: showSettings || { md: "flex" },
            overflowY: { xs: "auto", md: "visible" },
          }}
        >
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
                  onChange={(e) => setType(e.target.value)}
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
                  label="HORIZONTAL"
                  onChange={(e) => {
                    if (e.target.value < 1) {
                      toast.error("Value cant be less than one");
                      return;
                    }
                    handleHorizontalChange();
                  }}
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
                  label="VERTICAL"
                  value={vertical}
                  onChange={(e) => {
                    if (e.target.value < 1) {
                      toast.error("Value cant be less than one");
                      return;
                    }
                    handleVerticalChange();
                  }}
                  //   name="client"
                  //   value={''}
                  //   onChange={handleInputChange}
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

          height={"75vh"}
          maxHeight={"75vh"}
          overflow={"hidden"}
          //   bgcolor={"white"}
          borderRadius={10}
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
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              //   bottom={15}
            >
              <Typography>{panelsY} PANELS</Typography>
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
                  width={"1px"}
                />
                <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
              </Box>
            </Box>
            <Box
              position={"absolute"}
              width={`${panelsX * panelSize + 30}px`}
              top={-75}
              right={-15}
            >
              <Typography textAlign={"center"}>{panelsX} PANELS</Typography>
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
                    backgroundColor: isPanelVisible ? "#111" : "transparent",

                    cursor: "pointer",
                  }}
                  onClick={() => togglePanel(rowIndex, colIndex)}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "1px solid grey",
                      objectFit: "fill",
                      opacity: isPanelVisible ? 1 : 0,
                      transition: "all 0.5s ease",
                    }}
                    src="/panel.png"
                    alt="Panel"
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Grid>
      <Grid size={{ md: 3, xs: 12 }} container>
        <Grid
          maxHeight={"70vh"}
          overflow={"auto"}
          mr={1}
          size={12}
          boxShadow={
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;"
          }
          pt={1}
          borderRadius={3}
        >
          <Box border={"1px solid grey"} pt={1} borderRadius={3} m={1}>
            <Box
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
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              px={2}
            >
              <Typography fontWeight={600}>Panels High</Typography>
              <Typography fontWeight={600}>{panelData?.panelsY}</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={2}
              mb={1}
            >
              <Typography fontWeight={600}>Panels Wide</Typography>
              <Typography fontWeight={600}>{panelData?.panelsX}</Typography>
            </Box>
          </Box>

          <Box border={"1px solid grey"} pt={1} borderRadius={3} m={1}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              pb={1}
              px={2}
              borderBottom={"1px solid #303f9f"}
            >
              <Typography fontWeight={600} color="#303f9f">
                Total Pixels
              </Typography>
              <Typography fontWeight={600} color="#303f9f">
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
              <Typography fontWeight={600}>Pixel Height</Typography>
              <Typography fontWeight={600}>{panelData?.pixelHeight}</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={2}
              mb={1}
            >
              <Typography fontWeight={600}>Pixel Width</Typography>
              <Typography fontWeight={600}>{panelData?.pixelWidth}</Typography>
            </Box>
          </Box>

          <Box border={"1px solid grey"} pt={1} borderRadius={3} m={1}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              pb={1}
              px={2}
              borderBottom={"1px solid #303f9f"}
            >
              <Typography fontWeight={600} color="#303f9f">
                Total Weight
              </Typography>
              <Typography fontWeight={600} color="#303f9f">
                {panelData?.totalWeight}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              px={2}
            >
              <Typography fontWeight={600}>Diagonal</Typography>
              <Typography fontWeight={600}>{panelData?.diagonal}</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={2}
              mb={1}
            >
              <Typography fontWeight={600}>Processor Ports</Typography>
              <Typography fontWeight={600}>
                {panelData?.processorPorts}
              </Typography>
            </Box>
          </Box>
          <Box border={"1px solid grey"} pt={1} borderRadius={3} m={1}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              pb={1}
              px={2}
              borderBottom={"1px solid #303f9f"}
            >
              <Typography fontWeight={600} color="#303f9f">
                110V Draw
              </Typography>
              <Typography fontWeight={600} color="#303f9f">
                {panelData?.totalAMPS}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              px={2}
            >
              <Typography fontWeight={600}>20 AMP Circuits</Typography>
              <Typography fontWeight={600}>{vertical * horizontal}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

//   export default Panel;
