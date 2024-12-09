// export const updateSectionsWithResponse = (responseData, setSections, screenHeight) => {

//   console.log(responseData, "response data in the update functin whne fetch happens")
  
//   setSections((prevSections) => {
//     return prevSections.map((section, index) => {
//       const serverData = responseData?.sections[index]; // Match section by index or any unique identifier

//       if (!serverData) return section; // If no matching data, retain the original section
      
//       // Parse horizontal and vertical values to integers
//       const parsedHorizontal = 
//       typeof serverData.horizontal === "string" 
//     ? parseFloat(serverData.horizontal.split(" ")[0]) 
//     : serverData.horizontal;

//     const parsedVertical = 
//     typeof serverData.vertical === "string" 
//     ? parseFloat(serverData.vertical.split(" ")[0]) 
//     : serverData.vertical;


//       if (!serverData) return section; // If no matching data, retain the original section
//       const updatedPanelSize = Math.min(
//         screenHeight / serverData.panelX,
//         screenHeight / serverData.panelY
//       );

//       return {
//         ...section,
//         ...serverData, // Dynamically add all fields from the server data
//         horizontal: parseInt(parsedHorizontal), // Ensure horizontal is stored as a number
//         vertical: parseInt(parsedVertical),
//         panelSize: updatedPanelSize,
//       };
//     });
//   });
// };

// export const updateSectionsWithResponse = (responseData, setSections, screenHeight) => {
//   console.log(responseData, "response data in the update function when fetch happens");

//   setSections((prevSections) => {
//     // Create a map of the response sections for efficient matching
//     const responseSectionsMap = new Map(
//       responseData.sections.map((section, index) => [section.product, { ...section, originalIndex: index }])
//     );

//     return prevSections.map((section) => {
//       // Match the section using a unique key (e.g., `product` in this example)
//       const serverData = responseSectionsMap.get(section.product);

//       if (!serverData) {
//         // If no matching section is found, retain the original section
//         return section;
//       }

//       // Parse horizontal and vertical values to integers
//       const parsedHorizontal =
//         typeof serverData.horizontal === "string"
//           ? parseFloat(serverData.horizontal.split(" ")[0])
//           : serverData.horizontal;

//       const parsedVertical =
//         typeof serverData.vertical === "string"
//           ? parseFloat(serverData.vertical.split(" ")[0])
//           : serverData.vertical;

//       // Calculate panel size
//       const updatedPanelSize = Math.min(
//         screenHeight / serverData.panelX,
//         screenHeight / serverData.panelY
//       );

//       // Return the updated section
//       return {
//         ...section,
//         ...serverData, // Merge server data into the current section
//         horizontal: parseInt(parsedHorizontal), // Ensure horizontal is stored as a number
//         vertical: parseInt(parsedVertical),
//         panelSize: updatedPanelSize,
//       };
//     });
//   });
// };

export const updateSectionsWithResponse = (responseData, setSections, screenHeight) => {
  console.log(responseData, "response data in the update function when fetch happens");

  setSections((prevSections) => {
    // Create a map of existing sections for quick lookup by `product`
    const prevSectionsMap = new Map(prevSections.map((section) => [section.product, section]));

    // Merge server data with existing sections
    const updatedSections = responseData.sections.map((serverSection) => {
      const prevSection = prevSectionsMap.get(serverSection.product);

      // Parse horizontal and vertical values to integers
      const parsedHorizontal =
        typeof serverSection.horizontal === "string"
          ? parseFloat(serverSection.horizontal.split(" ")[0])
          : serverSection.horizontal;

      const parsedVertical =
        typeof serverSection.vertical === "string"
          ? parseFloat(serverSection.vertical.split(" ")[0])
          : serverSection.vertical;

      // Calculate panel size
      const updatedPanelSize = Math.min(
        screenHeight / serverSection.panelX,
        screenHeight / serverSection.panelY
      );

      // Merge server section with previous section if it exists
      return {
        ...prevSection, // Include existing section data if available
        ...serverSection, // Overwrite with server section data
        horizontal: parseInt(parsedHorizontal), // Ensure horizontal is stored as a number
        vertical: parseInt(parsedVertical),
        panelSize: updatedPanelSize,
      };
    });

    // Return the fully updated sections array

    console.log(updatedSections, "updatedsections in the panel")
    return updatedSections;
  });
};
