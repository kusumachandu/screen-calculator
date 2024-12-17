export const updateSectionsWithResponse = (responseData, setSections, screenHeight) => {

  setSections((prevSections) => {
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
        ...prevSection, 
        ...serverSection,
        horizontal: parseInt(parsedHorizontal),
        vertical: parseInt(parsedVertical),
        panelSize: updatedPanelSize,
      };
    });

    return updatedSections;
  });
};
