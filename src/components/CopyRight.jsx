import { Box, Typography } from "@mui/material";

const Copyright = () => {
  return (
    <Box display={"flex"} alignItems={"center"} pb={1} px={2}>
      <Typography>
        © 2024{" "}
        <a
          href="https://greenmedia.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          greenmedia.co
        </a>
        . All rights reserved.
      </Typography>
    </Box>
  );
};

export default Copyright;
