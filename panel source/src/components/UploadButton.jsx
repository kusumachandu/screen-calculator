/* eslint-disable react/prop-types */
import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
const UploadButton = ({ handleUploadLogo }) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      sx={{
        backgroundColor: "darkslategrey",
      }}
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
  );
};

export default UploadButton;
