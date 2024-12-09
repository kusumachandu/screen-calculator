export const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    background: "black",
    "& fieldset": {
      borderColor: "transparent", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Outline color when focused
    },
    color: "black",
    borderRadius: 3,
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    color: "black", // Initial label color
    fontSize: "16px", // Reduced label font size
    transform: "translate(14px, -16px) scale(0.75)",
    fontWeight: 600,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", // Label color when focused
    fontSize: "13px", // Ensures size is consistent when focused
    // color:
  },
  "& .MuiInputBase-input": {
    color: "#c0d144", // Text color
  },
  "& .MuiInputBase-input::placeholder": {
    color: "white", // Placeholder color
  },
};

export const selectStyle = {
  "& .MuiOutlinedInput-root": {
    background: "black",
    "& fieldset": {
      borderColor: "transparent", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Outline color when focused
    },
    "& .MuiSelect-select": {
      color: "#c0d144", // Text color
    },
    borderRadius: 3,
    fontSize: "13px",
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, -16px) scale(0.75)",
    color: "black", // Initial label color
    fontSize: "16px", // Reduced label font size
    fontWeight: 600,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", // Label color when focused
    fontSize: "13px", // Ensures size is consistent when focused
  },
};