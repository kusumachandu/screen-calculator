/* eslint-disable react/prop-types */
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";

export default function PanelPlate({
  panelX,
  panelY,
  panelSize,
  panelData,
  isName,
  setName,
  screenName,
  setScreenName,
  sectionIndex,
  handleNameChange,
  panels,
  togglePanel,
  createPanel,
  setSections,
  id,
  parentId,
  title,
}) {
  const generateBlackNoiseTexture = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 100;
    canvas.height = 100;

    // Fill background with black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise (white specks)
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        if (Math.random() > 0.9) {
          // Adjust density of noise
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`; // White specks
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    return canvas.toDataURL();
  };

  const noiseTexture = generateBlackNoiseTexture();
  return (
    <Grid size={{ sm: 12, md: 9, xs: 12 }} key={sectionIndex}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        //   width={"98%"}
        flexDirection={"column"}
        height={{ md: "85vh", xs: "60vh" }}
        maxHeight={{ md: "85vh", xs: "60vh" }}
        overflow={"hidden"}
        // bgcolor={"white"}
        // borderRadius={10}
        alignItems={"center"}

        //   gap={2}
      >
        <Box
          key={sectionIndex}
          sx={{
            width: `${panelX * panelSize}px`,
            height: `${panelY * panelSize}px`,
            display: "grid",
            position: "relative",
            gridTemplateColumns: `repeat(${panelX}, ${panelSize}px)`,
            gridTemplateRows: `repeat(${panelY}, ${panelSize}px)`,
          }}
        >
          <Box
            position={"absolute"}
            height={`${panelY * panelSize}px`}
            left={-125}
            display={{ md: "flex", xs: "none", sm: "flex" }}
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
                {panelY} PANELS
              </Typography>
              <Typography fontSize={"13px"} fontWeight={600}>
                ({panelData?.vertical} /{" "}
              </Typography>
              <Typography fontSize={"13px"} fontWeight={600}>
                {panelData?.unit === "FT"
                  ? panelData?.verticalM
                  : panelData?.unit === "M"
                  ? panelData?.verticalF
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
                  height: `${panelY * panelSize}px`,
                }}
                width={"2px"}
              />
              <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
            </Box>
          </Box>
          <Box
            position={"absolute"}
            width={`${panelX * panelSize + 30}px`}
            top={-75}
            display={{ md: "block", xs: "none", sm: "block" }}
            right={-15}
          >
            <Typography fontSize={"13px"} fontWeight={600} textAlign={"center"}>
              {panelX} PANELS (
              {`${panelData?.horizontal} / ${
                panelData?.unit === "FT"
                  ? panelData?.horizontalM
                  : panelData?.unit === "M"
                  ? panelData?.horizontalF
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
              <Box sx={{ background: "black", width: "100%" }} height={"1px"} />
              <ArrowForwardIosIcon />
            </Box>
          </Box>
          <Tooltip title="Click to Add Name">
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              position={"absolute"}
              width={`${panelX * panelSize + 30}px`}
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
                    onChange={handleNameChange}
                    onBlur={handleNameChange}
                  />{" "}
                  {/* <IconButton onClick={handleNameChange}>
                          <SaveIcon />
                        </IconButton> */}
                </Box>
              )}
            </Box>
          </Tooltip>
          <Box
            sx={{
              height: `${3.6 * panelSize}px`,
              position: "absolute",
              display: { xs: "none", md: "flex", sm: "flex" },
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

          {panels?.map((row, rowIndex) => {
            return (
              <React.Fragment key={rowIndex}>
                {row?.map((isPanelVisible, colIndex) => {
                  return (
                    <Box
                      // border={"1px solid grey"}
                      overflow={"hidden"}
                      key={`${rowIndex}-${colIndex}`}
                      sx={{
                        width: panelSize ? `${panelSize}px` : "50px",
                        height: panelSize ? `${panelSize}px` : "50px",
                        backgroundColor: isPanelVisible
                          ? "transparent"
                          : "transparent",
                        cursor: "pointer",
                        backgroundImage: isPanelVisible
                          ? `url(${noiseTexture})`
                          : "",
                        backgroundSize: "3px 3px", // Adjust size for the noise effect
                        backgroundPosition: "0 0, 1.5px 1.5px", // Offset for better noise texture// Prevents image repetition
                      }}
                      position={"relative"}
                      onClick={() =>
                        togglePanel(
                          sectionIndex,
                          rowIndex,
                          colIndex,
                          setSections,
                          createPanel,
                          id,
                          title,
                          parentId
                        )
                      }
                    >
                      {/* <img
                        style={{
                          width: panelSize ? `${panelSize}px` : "50px",
                          height: panelSize ? `${panelSize}px` : "50px",
                          // border: "1px solid grey",
                          objectFit: "cover",
                          opacity: isPanelVisible ? 1 : 0,
                          transition: "all 0.5s ease",
                        }}
                        src="/panel_image1.jpeg"
                        alt="Panel"
                      /> */}
                      {/* <img
                        style={{
                          width: "100%",
                          height: "100%",
                          // border: "1px solid grey",
                          objectFit: "cover",
                          opacity: isPanelVisible ? 1 : 0,
                          transition: "all 0.5s ease",
                        }}
                        src="/panel_image1.jpeg"
                        alt="Panel"
                      /> */}
                    </Box>
                  );
                })}
              </React.Fragment>
            );
          })}
        </Box>
        <Tooltip title="Click to Add Name">
          <Box
            justifyContent="center"
            alignItems="center"
            width="100%"
            display={{ md: "flex", xs: "flex" }}
            mt={2}
          >
            {!isName ? (
              <Typography
                onClick={() => {
                  setName(true); // Trigger name editing mode
                  if (screenName === "CLICK HERE TO ADD SCREEN NAME") {
                    setScreenName(""); // Clear default placeholder text
                  }
                }}
                textAlign="center"
                mt={4}
                fontWeight={600}
                fontSize="larger"
                sx={{ cursor: "pointer" }}
              >
                {screenName || "CLICK HERE TO ADD SCREEN NAME"}{" "}
                {/* Display name or placeholder */}
              </Typography>
            ) : (
              <Box display="flex" mt={4} width="50%" gap={3}>
                <TextField
                  value={screenName ? screenName : ""}
                  sx={{ width: "100%", textAlign: "center" }}
                  variant="standard"
                  onChange={(e) => setScreenName(e.target.value)} // Update `screenName`
                  onBlur={handleNameChange} // Save changes when input loses focus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setName(false);
                      handleNameChange;
                    }
                  }}
                />
              </Box>
            )}
          </Box>
        </Tooltip>
      </Box>
    </Grid>
  );
}
