/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useRef, useState } from "react";
// import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Copyright from "./components/CopyRight";
import UploadButton from "./components/UploadButton";
import PanelDimensionsForm from "./components/PanelDimensionForm";
import { panelArray, units } from "./utils/panelData";
import axios from "axios";
import { updateSectionsWithResponse } from "./utils/panelUpdateSection";
import { useUpdatePanelMatrix } from "./components/UpdatedPanelMatrix";
import PanelPlate from "./components/PanelPlates";
import { togglePanelMatrixValue } from "./utils/togglePanelMatrix";
import TotalPanels from "./components/TotalPanels";
import PanelFormMobile from "./components/PanelFormMobile";

export default function Panel({ parentId, panelid }) {
  const screenHeight = window.innerHeight / 2;
  const screenCheck = window.innerWidth;
  const componentRef = useRef();
  const navigate = useNavigate();
  const [logo, setLogo] = useState("/logoPanel.png");
  const [id, setId] = useState("");
  const [isName, setName] = useState(false);
  const [title, setTitle] = useState("CLICK HERE TO ADD PROJECT TITLE");
  const [showSettings, setSettings] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [sections, setSections] = useState([
    {
      product: "P 3.9",
      unit: units[0].unit,
      ratio: "16:9",
      horizontal: 8,
      vertical: 4,
      panelMatrix: panelArray,
      panelX: 5,
      panelY: 3,
      panelSize: 0,
      screenName: "",
      activePanel: 15,
    },
  ]);

  const baseURL = "https://api.screencalculator.in";
  // const baseURL = "http://localhost:4000";

  let { Id } = useParams();

  if (panelid) {
    Id = panelid;
  }

  useEffect(() => {
    if (screenCheck > 900) {
      setSettings(true);
    }
  }, []);

  const handleUploadLogo = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setLogo(objectUrl);
  };

  const handleAddSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      {
        product: "P 3.9",
        unit: units[0].unit,
        ratio: "16:9",
        horizontal: 8,
        vertical: 4,
        panelMatrix: panelArray,
        panelX: 5,
        panelY: 3,
        panelSize: 0,
        screenName: "Click here to add a screen name",
        activePanel: 15,
      },
    ]);

    console.log(sections, "after the new section created");
  };

  const handleSectionChange = (index, field, value) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section, secIndex) => {
        if (secIndex !== index) return section;
        const parsedValue = parseInt(value, 10);
        let updatedSection = { ...section };
        if (field === "horizontal") {
          updatedSection.horizontal = parsedValue;

          if (section.ratio === "4:3") {
            updatedSection.vertical = Math.round(parsedValue * (3 / 4));
          } else if (section.ratio === "16:9") {
            updatedSection.vertical = Math.round(parsedValue * (9 / 16));
          } else if (section.ratio === "21:9") {
            updatedSection.vertical = Math.round(parsedValue * (9 / 21));
          }
        } else if (field === "vertical") {
          updatedSection.vertical = parsedValue;

          if (section.ratio === "4:3") {
            updatedSection.horizontal = Math.round(parsedValue * (4 / 3));
          } else if (section.ratio === "16:9") {
            updatedSection.horizontal = Math.round(parsedValue * (16 / 9));
          } else if (section.ratio === "21:9") {
            updatedSection.horizontal = Math.round(parsedValue * (21 / 9));
          }
        } else {
          updatedSection[field] = value;
        }

        return updatedSection;
      });

      createPanel(id, title, updatedSections, parentId);

      return updatedSections;
    });
  };

  const createPanel = async (Id1, title, sections, parentId) => {
    let sendId;

    if (Id1 == "") {
      sendId = Id;
    } else {
      sendId = Id1;
    }

    const filteredSections = sections.map((section) => {
      return {
        ratio: section.ratio,
        unit: section.unit,
        horizontal: section.horizontal,
        vertical: section.vertical,
        product: section.product,
        panelX: section.panelX,
        panelY: section.panelY,
        screenName: section.screenName,
        panelMatrix: section.panelMatrix,
        activePanel: section.activePanel,
      };
    });

    try {
      setIsCreate(true);
      const response = await axios.post(baseURL, {
        id: sendId,
        title,
        sections: filteredSections,
        parentId,
      });
      setTitle(response?.data?.title);
      await updateSectionsWithResponse(
        response?.data,
        setSections,
        screenHeight
      );

      if (Id) {
        setId(Id);
        navigate(`/${Id}`);
      } else if (response.data.id) {
        setId(response.data.id);
        navigate(`/${response.data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function to create the grid and update the sections panelMatrix data.
  useUpdatePanelMatrix(
    sections,
    setSections,
    createPanel,
    id,
    title,
    parentId,
    setIsCreate,
    isCreate
  );

  useEffect(() => {
    async function fetchData() {
      setIsCreate(false);
      const sendID = Id || id;

      try {
        let response;

        // Attempt to fetch data
        if (sendID) {
          try {
            response = await axios.get(`${baseURL}/${sendID}`);
          } catch (fetchError) {
            // If fetching fails (e.g., 404), handle creation
            if (fetchError.response?.status === 404) {
              console.log("Data not found, creating new entry...");
            } else {
              throw fetchError;
            }
          }
        }

        // If no data exists or an error occurred during fetch
        if (!response || !response.data) {
          response = await axios.post(baseURL, {
            id: sendID,
            title,
            sections,
            parentId,
          });
        }

        // Update states with the fetched/created data
        const { data } = response;

        setTitle(data.title);

        console.log(data, "from the fetch function");

        await updateSectionsWithResponse(data, setSections, screenHeight);

        // Update IDs and navigation
        if (!Id && data.id) {
          setId(data.id);
          navigate(`/${data.id}`);
        } else if (Id) {
          setId(Id);
          navigate(`/${Id}`);
        }
      } catch (error) {
        console.error("Error while fetching or creating data:", error);
      }
    }

    fetchData();
  }, [Id, id]);

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
    if (!title.trim()) {
      toast.error(`Title can't be empty`);
      return;
    }

    console.log(title, sections, "section while changing the title name");
    createPanel(id, title, sections, parentId);
  };
  return (
    <div>
      <div ref={componentRef}>
        <Grid
          container
          //   sx={{ minHeight: "100vh", minWidth: "100vw", background: "#fff" }}
        >
          <Header
            componentRef={componentRef}
            setSettings={setSettings}
            showSettings={showSettings}
            title={title}
            setTitle={setTitle}
            handleTitleChange={handleTitleChange}
          />
          {sections.map((section, index) => {
            return (
              <React.Fragment key={index}>
                <Box
                  width={"100%"}
                  display={{ base: "none", md: "block", lg: "block" }}
                >
                  <PanelDimensionsForm
                    handleProductChange={(e) =>
                      handleSectionChange(index, "product", e.target.value)
                    }
                    handleUnitChange={(e) =>
                      handleSectionChange(index, "unit", e.target.value)
                    }
                    handleRatioChange={(e) =>
                      handleSectionChange(index, "ratio", e.target.value)
                    }
                    handleHorizontalChange={(e) =>
                      handleSectionChange(index, "horizontal", e.target.value)
                    }
                    handleVerticalChange={(e) =>
                      handleSectionChange(index, "vertical", e.target.value)
                    }
                    setSettings={setSettings}
                    showSettings={showSettings}
                    sectionIndex={index}
                    section={section}
                  />
                </Box>
                <Box display={{ base: "block", md: "none" }}>
                  <PanelFormMobile
                    handleProductChange={(e) =>
                      handleSectionChange(index, "product", e.target.value)
                    }
                    handleUnitChange={(e) =>
                      handleSectionChange(index, "unit", e.target.value)
                    }
                    handleRatioChange={(e) =>
                      handleSectionChange(index, "ratio", e.target.value)
                    }
                    handleHorizontalChange={(e) =>
                      handleSectionChange(index, "horizontal", e.target.value)
                    }
                    handleVerticalChange={(e) =>
                      handleSectionChange(index, "vertical", e.target.value)
                    }
                    setSettings={setSettings}
                    showSettings={showSettings}
                    sectionIndex={index}
                    section={section}
                    sections={sections}
                  />
                </Box>

                <PanelPlate
                  panelX={section.panelX}
                  panelY={section.panelY}
                  panelSize={section.panelSize}
                  panelData={section}
                  isName={isName}
                  setName={setName}
                  screenName={section.screenName}
                  setScreenName={(value) =>
                    handleSectionChange(index, "screenName", value)
                  }
                  sectionIndex={index}
                  panels={section.panelMatrix}
                  togglePanel={togglePanelMatrixValue}
                  createPanel={createPanel}
                  setSections={setSections}
                  id={id}
                  parentId={parentId}
                  title={title}
                />

                <TotalPanels panelData={section} />
              </React.Fragment>
            );
          })}
        </Grid>
        <Copyright />
      </div>
      <Box
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
        justifyContent={"center"}
        gap={"32px"}
      >
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          marginBottom={"16px"}
        >
          <UploadButton handleUploadLogo={handleUploadLogo} />
        </Box>
        <Box mt={"0px"} display={"flex"} justifyContent={"center"}>
          {!parentId && (
            <button
              onClick={handleAddSection}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "none",
                color: "white",
                height: "40px",
                backgroundColor: "orange",
              }}
            >
              Create New
            </button>
          )}
        </Box>
      </Box>
    </div>
  );
}
