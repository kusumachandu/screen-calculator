import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
      height: "40px",
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
      height: "40px",
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
const units = ["IMPERIAL(FT)", "MATRIC(M)", "PANELS"];
const ratio = ["16:9", "21:9", "4:3", "CUSTOM"];

function Page() {
  const [title, setTitle] = useState("CLICK HERE TO ADD PROJECT TITLE");
  const [isEditTitle, setSsEditTitle] = useState(false);
  const [horizontal, setHorizontal] = useState(""); // Number of grids in the horizontal direction
  const [bigger, setBigger] = useState(""); // Number of grids in the horizontal direction
  const [vertical, setVertical] = useState(""); // Number of grids in the vertical direction
  const [panels, setPanels] = useState([]); // Store panel states (on/off)
  const [panelSize, setPanelSize] = useState(5); // Store panel states (on/off)

  const containerWidth = 400; // Fixed width for the container
  const containerHeight = 400; // Fixed height for the container

  useEffect(() => {
    const panelSizeValue = Math.min(
      containerWidth / horizontal,
      containerHeight / vertical
    );
    setPanelSize(panelSizeValue);

    generateGrid();
  }, [horizontal, vertical]);

  // Function to initialize grid with "on" state for each panel
  const generateGrid = () => {
    const newPanels = Array.from({ length: vertical }, () =>
      Array.from({ length: horizontal }, () => true)
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

  return (
    <Box>
      <Grid
        container
        sx={{ minHeight: "100vh", minWidth: "100vw", background: "#e8ebed" }}
      >
        <Grid size={{ md: 2 }}>
          <Box
            sx={{
              p: 2,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              mt: 18,
              bgcolor: "#303f9f",
              
              
              boxShadow: "1px 1px 1px 1px rgba(0,0,0,.1)",
              mr: 2,
            }}
          >
            <Box my={3}>
              <FormControl fullWidth sx={selectStyle}>
                <InputLabel id="demo-simple-select-label">
                  PRODUCT TYPE
                </InputLabel>
                <Select
                  //   variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="PRODUCT TYPE"
                    sx={{fontSize:'13px'}}
                >
                  {versions.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box my={3}>
              <FormControl fullWidth sx={selectStyle}>
                <InputLabel id="demo-simple-select-label">UNITS</InputLabel>
                <Select
                  //   variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="UNITS"
                  //   sx={selectStyle}
                >
                  {units.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box my={3}>
              <FormControl fullWidth sx={selectStyle}>
                <InputLabel id="demo-simple-select-label">RATIO</InputLabel>
                <Select
                  //   variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="RATIO"
                  //   sx={selectStyle}
                >
                  {ratio.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box my={3}>
              <FormControl fullWidth>
                <TextField
                  //   variant="standard"
                  fullWidth
                  type="number"
                  value={horizontal}
                  label="HORIZONTAL"
                  onChange={(e) => setHorizontal(Number(e.target.value))}
                  //   name="client"
                  //   value={''}
                  //   onChange={handleInputChange}
                  sx={{ ...textFieldStyle }}
                />
              </FormControl>
            </Box>
            <Box my={3}>
              <FormControl fullWidth>
                <TextField
                  //   variant="standard"
                  fullWidth
                  type="number"
                  label="VERTICAL"
                  value={vertical}
                  onChange={(e) => setVertical(Number(e.target.value))}
                  //   name="client"
                  //   value={''}
                  //   onChange={handleInputChange}
                  sx={{ ...textFieldStyle }}
                />
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid
          size={{ md: 10 }}
          sx={{ minHeight: "100vh", position: "relative" }}
        >
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
                  onChange={(e) => setTitle(e.target.value)}
                />{" "}
                <IconButton onClick={() => setSsEditTitle(false)}>
                  <SaveIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            width={"98%"}
            bgcolor={"white"}
            borderRadius={10}
            alignItems={"center"}
            gap={2}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              bgcolor={"white"}
              alignItems={"end"}
              gap={2}
            >
              <Box
                sx={{
                  width: `${horizontal * panelSize}px`,
                  height: `${vertical * panelSize}px`,
                  display: "grid",
                  position: "relative",
                  gridTemplateColumns: `repeat(${horizontal}, ${panelSize}px)`,
                  gridTemplateRows: `repeat(${vertical}, ${panelSize}px)`,
                }}
              >
                <Box
                  position={"absolute"}
                  height={`${vertical * panelSize}px`}
                  left={-50}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <ArrowBackIosIcon sx={{ transform: "rotate(90deg)" }} />
                    <Box
                      sx={{
                        background: "black",
                        height: `${vertical * panelSize}px`,
                      }}
                      width={"2px"}
                    />
                    <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
                  </Box>
                </Box>
                <Box
                  position={"absolute"}
                  width={`${horizontal * panelSize}px`}
                  top={-50}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <ArrowBackIosIcon />
                    <Box
                      sx={{ background: "black", width: "100%" }}
                      height={"2px"}
                    />
                    <ArrowForwardIosIcon />
                  </Box>
                </Box>

                {panels.map((row, rowIndex) =>
                  row.map((isPanelVisible, colIndex) => (
                    <Box
                      key={`${rowIndex}-${colIndex}`}
                      sx={{
                        width: `${panelSize}px`,
                        height: `${panelSize}px`,
                        backgroundColor: isPanelVisible
                          ? "#111"
                          : "transparent",

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
              <img
                src="/manY.png"
                style={{ height: `${3.6 * panelSize}px`, objectFit: "contain" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          spacing={5}
          sx={{
            //   background: "lightgrey",
            p: 2,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Grid size={{ md: 3 }} p={2}>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>TOTAL PANELS</Typography>
              <Typography fontWeight={600}>50</Typography>
            </Box>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>PANELS HIGH</Typography>
              <Typography fontWeight={600}>5</Typography>
            </Box>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>PANELS WIDE</Typography>
              <Typography fontWeight={600}>10</Typography>
            </Box>
          </Grid>
          <Grid size={{ md: 3 }} p={2}>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>TOTAL PIXELS</Typography>
              <Typography fontWeight={600}>50,909</Typography>
            </Box>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>PIXEL HEIGHT</Typography>
              <Typography fontWeight={600}>640</Typography>
            </Box>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>PIXEL WIDTH</Typography>
              <Typography fontWeight={600}>1280</Typography>
            </Box>
          </Grid>
          <Grid size={{ md: 3 }} p={2}>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>TOTAL WEIGHT</Typography>
              <Typography fontWeight={600}>50,909 LBS</Typography>
            </Box>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>DIAGONAL</Typography>
              <Typography fontWeight={600}>18.34FT</Typography>
            </Box>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>PROCESSOR PORTS</Typography>
              <Typography fontWeight={600}>2</Typography>
            </Box>
          </Grid>
          <Grid size={{ md: 3 }} p={2}>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>110V DRAW</Typography>
              <Typography fontWeight={600}>67.5 AMPS</Typography>
            </Box>
            <Box
              display={"flex"}
              my={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>20 AMP CIRCUITS</Typography>
              <Typography fontWeight={600}>4</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
