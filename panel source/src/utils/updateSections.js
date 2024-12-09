// export function updateSectionState(
//   response,
//   currentSections,
//   setSections,
//   setPanelX,
//   setPanelY
// ) {
//   const updatedSections = response.sections.map((responseSection, index) => {
//     const currentSection = currentSections[index] || {};

//     const {
//       ratio: responseRatio,
//       unit: responseUnit,
//       panelsX: responsePanelsX,
//       panelsY: responsePanelsY,
//       product: responseProduct,
//       panelMatrix,
//       screenName,
//     } = responseSection;

//     const updatedSection = { ...currentSection };

//     // Update fields only if they differ
//     if (responseRatio !== currentSection.ratio) {
//       updatedSection.ratio = responseRatio;
//     }

//     if (responseUnit !== currentSection.unit) {
//       updatedSection.unit = responseUnit;
//     }

//     if (responsePanelsX !== updatedSection.panelsX) {
//       updatedSection.panelsX = responsePanelsX;
//     }

//     if (responsePanelsY !== updatedSection.panelsY) {
//       updatedSection.panelsY = responsePanelsY;
//     }

//     if (responseProduct !== currentSection.product) {
//       updatedSection.product = responseProduct;
//     }

//     updatedSection.panelMatrix = panelMatrix || updatedSection.panelMatrix;
//     updatedSection.screenName = screenName || updatedSection.screenName;

//     // Update global panelX and panelY
//     if (index === 0) {
//       // Sync global values with the first section
//       setPanelX(responsePanelsX);
//       setPanelY(responsePanelsY);
//     }
//     if(responsePanelsX !== updatedSection.panelX) {
//       updatedSection.panelX = responsePanelsX
//     }
//     if(responsePanelsY !== updatedSection.panelY) {
//       updatedSection.panelY = responsePanelsY
//     }

//     return updatedSection;
//   });

//   // Update sections state
//   setSections(updatedSections);
// }


export function updateSectionState(
  response,
  currentSections,
  setSections,
  setPanelData,
) {

  const updatedSections = response.sections.map((responseSection, index) => {
    const currentSection = currentSections[index];

    const {
      ratio: responseRatio,
      unit: responseUnit,
      panelsX: responsePanelsX,
      panelsY: responsePanelsY,
      product: responseProduct,
      panelMatrix: responsePanelMatrix,
      screenName,

    } = responseSection;

    const updatedSection = { ...currentSection };

    // Update fields only if they differ
    updatedSection.ratio = responseRatio ?? currentSection.ratio;
    updatedSection.unit = responseUnit ?? currentSection.unit;
    updatedSection.product = responseProduct ?? currentSection.product;
    updatedSection.panelMatrix = responsePanelMatrix || updatedSection?.panelMatrix;
    updatedSection.screenName = screenName || updatedSection.screenName;
    updatedSection.panelX = responsePanelsX || currentSection.panelX;
    updatedSection.panelY = responsePanelsY || currentSection.panelY;
  

    return updatedSection;
  });


  return updatedSections;
}
