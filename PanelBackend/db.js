import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://vaishakhp11:0YW7eFtnZUphtn2i@cluster0.bne4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const DB = () => {
    mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
  return;
}

const PanelSchema = new mongoose.Schema({
  row: Number,
  column: Number,
  isSelected: { type: Boolean, default: true },  
});

const MatrixLayoutSchema = new mongoose.Schema({
  dimensionId: String,  
  panels: [PanelSchema] 
});

const MatrixLayout = mongoose.model("MatrixLayout", MatrixLayoutSchema);
export default MatrixLayout;

const dimensionSchema = new mongoose.Schema({
    product: { type: String, required: false },
    unit: { type: String, required: false },
    ratio: { type: String, required: false },
    horizontal: { type: Number, required: false },
    vertical: { type: Number, required: false },
    title: { type: String, required: false },
    panelMatrix: { type: Array, required: false },
    screenName: { type: String, required: false },
    children: {type: Array, required: false}
});
  
export  const Dimension = mongoose.model("Dimension", dimensionSchema);