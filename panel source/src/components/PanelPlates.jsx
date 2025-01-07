/* eslint-disable react/prop-types */
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect, useRef } from "react";

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
  panels,
  togglePanel,
  createPanel,
  setSections,
  id,
  parentId,
  title,
}) {
  const generateBlackNoiseTexture = () => {
    // Create a small offscreen canvas to draw the pattern
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 20;
    patternCanvas.height = 20;
    const pctx = patternCanvas.getContext("2d");

    // Draw the pattern
    pctx.fillStyle = "#131313";
    pctx.fillRect(1.5, 0, 20, 20);

    pctx.fillStyle = "#151515";
    pctx.beginPath();
    pctx.moveTo(0, 5);
    pctx.lineTo(5, 0);
    pctx.lineTo(10, 5);
    pctx.lineTo(5, 10);
    pctx.closePath();
    pctx.fill();

    pctx.fillStyle = "#222";
    pctx.beginPath();
    pctx.moveTo(10, 5);
    pctx.lineTo(15, 0);
    pctx.lineTo(20, 5);
    pctx.lineTo(15, 10);
    pctx.closePath();
    pctx.fill();

    pctx.fillStyle = "#1b1b1b";
    pctx.fillRect(10, 20, 40, 5);

    pctx.fillStyle = "#1d1d1d";
    pctx.fillRect(0, 0, 30, 5);

    // Use the pattern as the background
    const pattern = pctx.createPattern(patternCanvas, "repeat");
    pctx.fillStyle = pattern;
    pctx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
    return patternCanvas.toDataURL();
  };

  const noiseTexture = generateBlackNoiseTexture();

  const textFieldRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      textFieldRef.current && // Check if ref exists
      !textFieldRef.current.contains(event.target) // Check if click is outside the ref
    ) {
      setName(false); // Exit editing mode
    }
  };

  // Add and clean up the global event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <Grid size={{ sm: 12, md: 9, xs: 12 }} key={sectionIndex}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        minHeight={{ md: "68vh", xs: "60vh" }}
        maxHeight={{ md: "85vh", xs: "60vh" }}
        overflow={"hidden"}
        alignItems={"center"}
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
            height={`${panelY * panelSize + 30}px`}
            left={-125}
            display={{ md: "flex", xs: "none", sm: "flex" }}
            justifyContent={"center"}
            alignItems={"center"}
            zIndex={999}
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
                    onChange={setScreenName}
                    // onBlur={() => setName(false)}
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
                    ></Box>
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
              </Typography>
            ) : (
              <Box display="flex" mt={4} width="50%" gap={3}>
                <TextField
                  value={screenName ? screenName : ""}
                  sx={{ width: "100%", textAlign: "center" }}
                  variant="standard"
                  onChange={(e) => setScreenName(e.target.value)}
                  onBlur={() => setName(false)}
                  // ref={textFieldRef}
                />
              </Box>
            )}
          </Box>
        </Tooltip>
      </Box>
    </Grid>
  );
}
