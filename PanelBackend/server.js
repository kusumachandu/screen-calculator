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
  4;

  const {
    product,
    unit,
    ratio,
    horizontal: inputHorizontal,
    vertical: inputVertical,
    activePanel,
  } = input;

  const horizontalValue = parseFloat(inputHorizontal);
  const verticalValue = parseFloat(inputVertical);

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
  } else if (product === "P 2.9") {
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
      console.log("horizontalF>>>>>>>>>>>>>>>", horizontalF);
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
  panelsY = Math.round(vertical / panelSize);
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
  const totalAMPSkW = activePanel
    ? `${((activePanel * power) / 1000).toFixed(2)} kW`
    : `${((totalPanels * power) / 1000).toFixed(2)} kW`;

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
  };
}

function roundToPanelSize(value, panelSize) {
  console.log("width::", value, panelSize, (value / panelSize) * panelSize);
  return parseFloat(Math.round(value / panelSize) * panelSize).toFixed(2);
}

app.post("/", async (req, res) => {
  const {
    product,
    unit,
    ratio,
    horizontal,
    vertical,
    id,
    title,
    panelMatrix,
    activePanel,
    screenName,
  } = req.body;
  console.log("PanelMatrix", panelMatrix);
  let uniqueId = id;

  if (!id) {
    // Create and save a new record immediately to ensure consistency
    const newRecord = await Dimension.create({
      product,
      unit,
      ratio,
      horizontal,
      vertical,
      title,
      panelMatrix: panelMatrix,
      screenName: screenName,
    });
    uniqueId = newRecord._id;
  }

  // Immediately calculate dimensions and respond to the client
  const dimensions = calculateDimensions({
    product,
    unit,
    ratio,
    horizontal,
    vertical,
    activePanel,
  });

  res.status(200).json({
    ...dimensions,
    id: uniqueId,
    title: title,
    product,
    unit,
    ratio,
    panelMatrix,
    screenName: screenName,
  });

  // Perform MongoDB actions asynchronously in the background
  (async () => {
    try {
      if (id) {
        const dimensionRecord = await Dimension.findOne({
          _id: new mongoose.Types.ObjectId(id),
        });
        console.log(id, dimensionRecord);
        if (dimensionRecord) {
          dimensionRecord.product = product;
          dimensionRecord.unit = unit;
          dimensionRecord.ratio = ratio;
          dimensionRecord.horizontal = horizontal;
          dimensionRecord.vertical = vertical;
          dimensionRecord.title = title;
          dimensionRecord.panelMatrix =
            panelMatrix || dimensionRecord.panelMatrix;
          dimensionRecord.screenName = screenName || dimensionRecord.screenName;
          await dimensionRecord.save();
        }
      }
    } catch (error) {
      console.error("Error updating database:", error);
    }
  })();
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await Dimension.findById(id);
  console.log(data);
  res.status(200).json({
    product: data.product,
    unit: data?.unit,
    ratio: data?.ratio,
    horizontal: data?.horizontal,
    vertical: data?.vertical,
    title: data?.title,
    panelMatrix: data.panelMatrix,
    screenName: data?.screenName,
  });
});

app.listen(port, () => {
  console.log("Server listening to localhost", port);
});
