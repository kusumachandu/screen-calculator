export const updateSectionsWithResponse = (responseData, setSections, screenHeight, setIsCreate) => {

  setSections((prevSections) => {
    const prevSectionsMap = new Map(prevSections.map((section) => [section.product, section]));

    const updatedSections = responseData.sections.map((serverSection) => {
      const prevSection = prevSectionsMap.get(serverSection.product);

      const parsedHorizontal =
        typeof serverSection.horizontal === "string"
          ? (serverSection.horizontal.split(" ")[0])
          : serverSection.horizontal;

      const parsedVertical =
        typeof serverSection.vertical === "string"
          ?(serverSection.vertical.split(" ")[0])
          : serverSection.vertical;

      // // Calculate panel size
      const updatedPanelSize = Math.min(
        screenHeight / serverSection.panelX,
        screenHeight / serverSection.panelY
      );

      // // Merge server section with previous section if it exists
      return {
        ...prevSection, 
        ...serverSection,
        horizontal: parseInt(parsedHorizontal),
        vertical: parseInt(parsedVertical),
        panelSize: updatedPanelSize,
      };
    });

    setIsCreate(true)

    return updatedSections;
  });
};
