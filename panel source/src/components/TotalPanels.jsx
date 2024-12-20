/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const TotalPanels = ({ panelData, sectionIndex }) => {
  return (
    <Grid size={{ md: 3, xs: 12 }} container pr={"16px"}>
      <Grid
        maxHeight={{ md: "fit-content", xs: "fit-content" }}
        overflow={"auto"}
        mt={2}
        //   bgcolor={'#dadded'}
        mr={{ xs: 0, md: 1 }}
        m={{ xs: 1, md: 0 }}
        size={12}
        bgcolor={"#363636"}
        boxShadow={
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;"
        }
        pt={1}
        borderRadius={3}
        key={sectionIndex}
      >
        <Box pt={1} pb={1} borderRadius={3} m={1}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
            pb={1}
            px={2}
            borderBottom={"1px solid #c0d144"}
          >
            <Typography fontWeight={600} color="#c0d144">
              Total Panels
            </Typography>
            <Typography fontWeight={600} color="#c0d144">
              {panelData?.totalPanels}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
            mb={1}
          >
            <Typography fontWeight={600} color="white">
              Panels Width
            </Typography>
            <Typography fontWeight={600} color="white">
              {panelData?.panelsX}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
            px={2}
          >
            <Typography fontWeight={600} color="white">
              Panels Height
            </Typography>
            <Typography fontWeight={600} color="white">
              {panelData?.panelsY}
            </Typography>
          </Box>
        </Box>
        <Box pt={1} pb={1} borderRadius={3} m={1}>
          {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              pb={1}
              px={2}
              borderBottom={"1px solid #303f9f"}
            >
              <Typography fontWeight={600} color="#303f9f">
                Total Panels
              </Typography>
              <Typography fontWeight={600} color="#303f9f">
                {panelData?.totalPanels}
              </Typography>
            </Box> */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
            mb={1}
          >
            <Typography fontWeight={600} color="white">
              Panels Width
            </Typography>
            <Typography fontWeight={600} color="white">
              {panelData?.horizontal}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
            px={2}
          >
            <Typography fontWeight={600} color="white">
              Panels Height
            </Typography>
            <Typography fontWeight={600} color="white">
              {panelData?.vertical}
            </Typography>
          </Box>
        </Box>

        <Box pt={1} pb={1} borderRadius={3} m={1}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
            pb={1}
            px={2}
            borderBottom={"1px solid #c0d144"}
          >
            <Typography fontWeight={600} color="#c0d144">
              Total Pixels
            </Typography>
            <Typography fontWeight={600} color="#c0d144">
              {panelData?.totalPixels}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
            px={2}
          >
            <Typography fontWeight={600} color="white">
              Pixel Height
            </Typography>
            <Typography fontWeight={600} color="white">
              {panelData?.pixelHeight}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
            mb={1}
          >
            <Typography fontWeight={600} color="white">
              Pixel Width
            </Typography>
            <Typography fontWeight={600} color="white">
              {panelData?.pixelWidth}
            </Typography>
          </Box>
        </Box>

        <Box pt={1} pb={1} borderRadius={3} m={1}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
            pb={1}
            px={2}
            borderBottom={"1px solid #c0d144"}
          >
            <Typography fontWeight={600} color="#c0d144">
              Total Weight
            </Typography>
            <Typography fontWeight={600} color="#c0d144">
              {panelData?.totalWeight}
            </Typography>
          </Box>
          {/* <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  px={2}
                >
                  <Typography fontWeight={600} color="white">
                    Diagonal
                  </Typography>
                  <Typography fontWeight={600} color="white">
                    {panelData?.diagonal}
                  </Typography>
                </Box> */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
            mb={1}
          >
            <Typography fontWeight={600} color="white">
              Processor Ports
            </Typography>
            <Typography fontWeight={600} color="white">
              {panelData?.processorPorts}
            </Typography>
          </Box>
        </Box>
        <Box pt={1} pb={1} borderRadius={3} m={1}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            //   mb={1}
            pb={1}
            px={2}
            //   borderBottom={"1px solid #303f9f"}
          >
            <Typography fontWeight={600} color="#c0d144">
              220V Draw
            </Typography>
            <Typography fontWeight={600} color="#c0d144">
              {panelData?.totalAMPS}
            </Typography>
            <Typography fontWeight={600} color="#c0d144">
              {panelData?.totalAMPSkW}
            </Typography>
          </Box>
          {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
              px={2}
            >
              <Typography fontWeight={600}>16 AMP Circuits</Typography>
              <Typography fontWeight={600}>{panelData?.totalAMPS}</Typography>
            </Box> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TotalPanels;
