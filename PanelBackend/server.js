import express from "express";
import MatrixLayout, { DB, Dimension } from "./db.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

const port = 4000;

app.use(express.json());

DB();

function calculateDimensions(input) {
  let horizontal,
    vertical,
    panelSize,
    horizontalM,
    verticalM,
    horizontalF,
    verticalF,
    feetPanelSize;
  let panelsX, panelsY, totalPanels;

  
  
  const {
    product,
    unit,
    ratio,
    horizontal: inputHorizontal,
    vertical: inputVertical,
    activePanel,
  } = input;
  
  const horizontalValue = parseFloat(inputHorizontal) || 0;
const verticalValue = parseFloat(inputVertical) || 0;

if (!horizontalValue || !verticalValue) {
  console.error("Horizontal or vertical values are invalid:", {
    horizontalValue,
    verticalValue,
  });
}


  let pixelHeight;
  let pixelWidth;
  let weight;
  let portPixel;
  let power;
  let widthF;
  let heightF;
  let meter;
  if (product === "P 3.9") {
    widthF = 1.64;
    heightF = 1.64;
    meter = 0.5;
    pixelHeight = 128;
    pixelWidth = 128;
    weight = 7;
    portPixel = 650000;
    power = 120;
  } else if (product === "P 3.1") {
    widthF = 2;
    heightF = 2;
    meter = 0.609;
    pixelHeight = 192;
    pixelWidth = 192;
    weight = 10;
    portPixel = 650000;
    power = 120;
  } else if (product === "P 2.6") {
    widthF = 1.64;
    heightF = 1.64;
    meter = 0.5;
    pixelHeight = 192;
    pixelWidth = 192;
    weight = 7;
    portPixel = 650000;
    power = 120;
  } else if (product === "P 2.7") {
    widthF = 2;
    heightF = 2;
    meter = 0.609;
    pixelHeight = 192;
    pixelWidth = 192;
    weight = 10;
    portPixel = 650000;
    power = 120;
  }

  if (unit === "FT") {
    panelSize = widthF;
  } else if (unit === "M") {
    panelSize = meter;
    feetPanelSize = widthF;
  } else if (unit === "Panels") {
    panelSize = widthF;
  }

  if (
    unit === "Panels" &&
    ratio === "custom" &&
    horizontalValue &&
    verticalValue
  ) {
    horizontal = horizontalValue * panelSize;
    vertical = verticalValue * panelSize;
  } else if (horizontalValue && ratio) {
    horizontal = roundToPanelSize(horizontalValue, panelSize);
    horizontalM = (horizontal * meter) / panelSize;

    if (unit === "FT") {
      horizontalF = (horizontal * panelSize) / meter;
    } else if (unit === "M") {
      horizontalF = (horizontal * feetPanelSize) / meter;
    }

    switch (ratio) {
      case "16:9":
        vertical = (horizontal / 16) * 9;
        break;
      case "21:9":
        vertical = (horizontal / 21) * 9;
        break;
      case "4:3":
        vertical = (horizontal / 4) * 3;
        break;
      case "custom":
        vertical = roundToPanelSize(verticalValue, panelSize);
        break;
      default:
        vertical = null;
    }

    vertical = roundToPanelSize(vertical, panelSize);
    verticalM = (vertical * meter) / panelSize;
    if (unit === "FT") {
      verticalF = (vertical * panelSize) / meter;
    } else if (unit === "M") {
      verticalF = (vertical * feetPanelSize) / meter;
    }
  } else if (!horizontalValue || !verticalValue) {
    if (unit === "FT" && product === 500) {
      horizontal = 16;
      vertical = (horizontal / 4) * 3;
    } else if (unit === "M") {
      horizontal = 5;
      vertical = 2.5;
    }
  }

  panelsX = Math.round(horizontal / panelSize);
  input.panelX = Math.round(horizontal / panelSize)
  panelsY = Math.round(vertical / panelSize);
  input.panelY = Math.round(vertical / panelSize);
  totalPanels = Math.round(panelsX * panelsY);

  const totalPixels = activePanel
    ? pixelHeight * pixelWidth * activePanel
    : pixelHeight * pixelWidth * totalPanels;

  const totalWeight = activePanel
    ? `${parseFloat(weight * activePanel).toFixed(2)} KG`
    : `${parseFloat(weight * totalPanels).toFixed(2)} KG`;

  const diagonal = parseFloat(
    Math.sqrt(Math.pow(horizontal, 2) + Math.pow(vertical, 2))
  ).toFixed(2);

  const processorPorts =
    Math.round(totalPixels / portPixel) < 1
      ? 1
      : Math.round(totalPixels / portPixel);

  const totalAMPS = activePanel
    ? `${activePanel * power} W`
    : `${totalPanels * power} W`;

  let totalAMPSkW;


if (product === "P 2.7") {
  // For P 2.7, apply a different calculation for voltage if required.
  // You need to replace this with the actual voltage calculation for P 2.7
  totalAMPSkW = activePanel
    ? `${(activePanel * power )/ 1000} KV` // Example calculation (this can be adjusted as needed)
    : `${(totalPanels * power )/ 1000} KV`; // Adjust calculation for total panels if necessary
} else {
  // For all other products, the voltage is just the power (since 1A current is assumed).
  totalAMPSkW = activePanel
    ? `${(activePanel * power)/ 1000} KV`
    : `${(totalPanels * power)/ 1000} KV`;
}


  horizontal = unit === "M" ? `${horizontal} M` : `${horizontal} FT`;

  vertical = unit === "M" ? `${vertical} M` : `${vertical} FT`;

  horizontalM = `${Math.round(horizontalM)} M`;
  verticalM = `${Math.round(verticalM)} M`;
  
  horizontalF = `${parseFloat(horizontalF).toFixed(2)} FT`;
  verticalF = `${parseFloat(verticalF).toFixed(2)} FT`;

  return {
    horizontal: horizontal,
    vertical: vertical,
    panelsX: panelsX,
    panelsY: panelsY,
    panelX: input.panelX,
    panelY: input.panelY,
    totalPanels: activePanel || totalPanels,
    totalPixels: totalPixels,
    pixelHeight: pixelHeight * panelsY,
    pixelWidth: pixelWidth * panelsX,
    totalWeight: totalWeight,
    diagonal: diagonal,
    processorPorts: processorPorts,
    totalAMPS: totalAMPS,
    totalAMPSkW,
    horizontalM: horizontalM,
    verticalM: verticalM,
    horizontalF: horizontalF,
    verticalF: verticalF,
    panelSize: 5,
  };
}

function roundToPanelSize(value, panelSize) {
  return parseFloat(Math.round(value / panelSize) * panelSize).toFixed(2);
}

app.post("/", async (req, res) => {
  const { title, sections, id, parentId } = req.body;

  console.log(req.body, "body from the clinet")

  let uniqueId = id;

  if (!id) {
    // Create and save a new record
    const newRecord = await Dimension.create({
      title,
      sections,
      children: [],
    });
    uniqueId = newRecord._id;
  }

  // Calculate dimensions for each section
  const updatedSections = sections?.map((section) => {
    if (!section.horizontal || !section.vertical) {
      return { ...section, error: "Invalid dimensions" };
    } 
    const dimensions = calculateDimensions({
      product: section.product,
      unit: section.unit,
      ratio: section.ratio,
      horizontal: section.horizontal,
      vertical: section.vertical,
      activePanel: section.activePanel,
    });
    return {
      ...section,
      ...dimensions,
    };
  });

  res.status(200).json({
    id: uniqueId,
    title,
    sections: updatedSections,
  });

  // MongoDB operations performed asynchronously
  (async () => {
    try {
      if (id) {
        const dimensionRecord = await Dimension.findOne({
          _id: new mongoose.Types.ObjectId(id),
        });
        console.log(dimensionRecord, "parent record in the databse")
        if (dimensionRecord) {
          // Merge sections from database and request body
          const updatedSections = sections.map((section, index) => {
            if (dimensionRecord.sections[index]) {
              // Update existing section
              return {
                ...dimensionRecord.sections[index], // Existing section data
                product: section.product,
                unit: section.unit,
                ratio: section.ratio,
                horizontal: section.horizontal,
                vertical: section.vertical,
                panelMatrix: section.panelMatrix,
                screenName: section.screenName,
              };
            } else {
              // Add new section if it doesn't exist in the database
              return {
                ...section,
              };
            }
          });

          dimensionRecord.title = title;
          dimensionRecord.sections = updatedSections;
      
          
          try {
            await dimensionRecord.save();
          } catch (error) {
            console.error("Error saving record:", error);
          }
        }
      } else {
        try {
          const newRecord = await Dimension.create({
            _id: new mongoose.Types.ObjectId(id), // Ensure the new document uses the provided ID
            title,
            sections,
            children: [], // Initialize with an empty children array
          });
        } catch (error) {
          console.error("Error creating new record:", error);
        }
      }

      if (parentId) {
        const parentRecord = await Dimension.findOne({
          _id: new mongoose.Types.ObjectId(parentId),
        });


        if (parentRecord) {
          parentRecord.children = parentRecord.children || [];
          if (!parentRecord.children.includes(uniqueId.toString())) {
            parentRecord.children.push(uniqueId.toString());
          }
          await parentRecord.save();
        }
      }
    } catch (error) {
      console.error("Error updating database:", error);
    }
  })();
});

// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log("Fetching data for ID:", id);

//   try {
//     const data = await Dimension.findById(id);
//     if (!data) {
//       return res.status(404).json({ message: "Record not found" });
//     }

//     const updatedSections = data?.sections?.map((section) => {

//       console.log(section, "before the calculation")
//       if (!section.horizontal || !section.vertical) {
//         console.error("Missing horizontal or vertical in section:", section);
//         return { ...section, error: "Invalid dimensions" };
//       } 
//       const dimensions = calculateDimensions({
//         product: section.product,
//         unit: section.unit,
//         ratio: section.ratio,
//         horizontal: section.horizontal,
//         vertical: section.vertical,
//         activePanel: section.activePanel,
//       });
//       return {
//         ...section,
//         ...dimensions,
//       };
//     });

//     console.log(updatedSections, "updated section in get function")


//     res.status(200).json({
//       title: data.title,
//       sections: updatedSections,
//       children: data.children || [],
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



app.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Fetching data for ID:", id);

  try {
    const data = await Dimension.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }

    const updatedSections = data?.sections?.map((section) => {
      // Log the section for debugging
      console.log(section, "before the calculation");

      // Check if horizontal and vertical fields exist
      if (!section.horizontal || !section.vertical) {
        console.error("Missing horizontal or vertical in section:", section);
        return { ...section, error: "Invalid dimensions" };
      }

      // Calculate dimensions
      const dimensions = calculateDimensions({
        product: section.product,
        unit: section.unit,
        ratio: section.ratio,
        horizontal: section.horizontal,
        vertical: section.vertical,
        activePanel: section.activePanel,
      });

      // Transform the section to match the desired structure
      return {
        product: section.product,
        unit: section.unit,
        ratio: section.ratio,
        horizontal: dimensions.horizontal,
        vertical: dimensions.vertical,
        panelMatrix: section.panelMatrix,
        screenName: section.screenName || "",
        panelX: dimensions.panelsX || 0,
        panelY: dimensions.panelsY || 0,
        activePanel: dimensions.activePanel || false,
        panelSize: dimensions.panelSize || 0,
        panelsX: dimensions.panelsX || 0,
        panelsY: dimensions.panelsY || 0,
        totalPanels: dimensions.totalPanels || 0,
        totalPixels: dimensions.totalPixels || 0,
        pixelHeight: dimensions.pixelHeight || 0,
        pixelWidth: dimensions.pixelWidth || 0,
        totalWeight: dimensions.totalWeight || "0 KG",
        diagonal: dimensions.diagonal || "0",
        processorPorts: dimensions.processorPorts || 0,
        totalAMPS: dimensions.totalAMPS || "0 W",
        totalAMPSkW: dimensions.totalAMPSkW || "0 KV",
        horizontalM: dimensions.horizontalM || "0 M",
        verticalM: dimensions.verticalM || "0 M",
        horizontalF: dimensions.horizontalF,
        verticalF: dimensions.verticalF,
      };
    });

    // Prepare the final response structure

    console.log(updatedSections, "updatedsections before the response")
    const response = {
      id: data._id,
      title: data.title,
      sections: updatedSections,
      children: data.children || [],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





app.listen(port, () => {
  console.log("Server listening to localhost", port);
});
