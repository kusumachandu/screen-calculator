/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { selectStyle, textFieldStyle } from "../utils/panelStyle";
import { ratioData, units, versions } from "../utils/panelData";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PanelFormMobile = ({
  handleProductChange,
  handleUnitChange,
  handleRatioChange,
  handleHorizontalChange,
  handleVerticalChange,
  expandedIndex,
  showSettings,
  setSettings,
  sectionIndex,
  sections,
}) => {
  return (
    <React.Fragment key={sectionIndex}>
      <Box width={"100%"}>
        <Grid
          key={sectionIndex}
          container
          spacing={3}
          sx={{
            p: 3,
            zIndex: 1000,
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
            display: showSettings || { md: "none" },
            overflowY: { xs: "auto", md: "visible" },
            border: window.innerWidth < 900 ? "1px solid black" : "",
          }}
        >
          {/* Close Button */}
          <Grid
            size={{ md: 0, xs: 12 }}
            sx={{
              display: {
                md: "none",
                xs: "flex",
                position: "absolute",
                top: 5,
                left: 5,
                zIndex: 2,
              },
            }}
          >
            <Box>
              <IconButton
                onClick={() => setSettings(!showSettings)}
                sx={{
                  color: showSettings ? "black" : "black",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>

          {sections.map((section, sectionIndex) => {
            return (
              <Card key={sectionIndex} sx={{ marginBottom: 2, width: "100%" }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    cursor: "pointer",
                    padding: "16px",
                    backgroundColor:
                      expandedIndex === sectionIndex ? "#f5f5f5" : "white",
                    borderBottom:
                      expandedIndex === sectionIndex
                        ? "1px solid #ccc"
                        : "none",
                  }}
                >
                  <Typography variant="h6">
                    {section.screenName || "panel"} - {sectionIndex + 1}
                  </Typography>
                  <IconButton size="small">
                    <ExpandMoreIcon
                      sx={{
                        transform:
                          expandedIndex === sectionIndex
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </IconButton>
                </Box>
                <Collapse in={expandedIndex === sectionIndex} timeout="auto">
                  <Box sx={{ padding: "16px" }}>
                    <Grid size={{ md: 2.4, xs: 12 }} mb={"25px"} mt={"10px"}>
                      <Box>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="product-select-label">
                            PRODUCT TYPE
                          </InputLabel>
                          <Select
                            value={section.product || ""}
                            labelId="product-select-label"
                            id="product-select"
                            label="PRODUCT TYPE"
                            onChange={handleProductChange}
                            sx={{ fontSize: "13px" }}
                          >
                            {versions.map((data, index) => (
                              <MenuItem key={index} value={data}>
                                {data ? data : "P 3.9"}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid size={{ md: 2.4, xs: 12 }} mb={"25px"}>
                      <Box>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="units-select-label">UNITS</InputLabel>
                          <Select
                            value={section.unit || ""}
                            labelId="units-select-label"
                            id="units-select"
                            label="UNITS"
                            onChange={handleUnitChange}
                          >
                            {units.map((data, index) => (
                              <MenuItem key={index} value={data?.unit}>
                                {data.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid size={{ md: 2.4, xs: 12 }} mb={"25px"}>
                      <Box>
                        <FormControl fullWidth sx={selectStyle}>
                          <InputLabel id="ratio-select-label">RATIO</InputLabel>
                          <Select
                            value={section.ratio || ""}
                            labelId="ratio-select-label"
                            id="ratio-select"
                            label="RATIO"
                            onChange={handleRatioChange}
                          >
                            {ratioData.map((data, index) => (
                              <MenuItem key={index} value={data}>
                                {data}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid size={{ md: 2.4, xs: 12 }} mb={"25px"}>
                      <Box>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            type="number"
                            value={section.horizontal || ""}
                            label="WIDTH"
                            onChange={handleHorizontalChange}
                            sx={{ ...textFieldStyle }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid size={{ md: 2.4, xs: 12 }} mb={"25px"}>
                      <Box>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            type="number"
                            label="HEIGHT"
                            value={section.vertical || ""}
                            onChange={handleVerticalChange}
                            sx={{ ...textFieldStyle }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                  </Box>
                </Collapse>
              </Card>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default PanelFormMobile;
