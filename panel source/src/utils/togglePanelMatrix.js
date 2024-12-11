// export const togglePanelMatrixValue = (sectionIndex, rowIndex, columnIndex, setSections) => {
//   setSections((prevSections) => {
//     const updatedSections = prevSections.map((section, secIndex) => {
//       console.log(section, "section in the toggle fnton")
//       if (secIndex === sectionIndex) {
//         const updatedPanelMatrix = section.panelMatrix.map((row, rowIdx) =>
//           row.map((cell, colIdx) => {
//             if (rowIdx === rowIndex && colIdx === columnIndex) {
//               return !cell; // Toggle the value
//             }
//             return cell;
//           })
//         );

import { toast } from "react-toastify";

//         return {
//           ...section,
//           panelMatrix: updatedPanelMatrix,
//         };
//       }
//       return section; // No changes for other sections
//     });

//     console.log(updatedSections, "panel toggle section")
//   });
// };


// export const togglePanelMatrixValue = (sectionIndex, rowIndex, columnIndex, setSections) => {
//   setSections((prevSections) => {
//     // Check if the section index is valid
//     if (sectionIndex < 0 || sectionIndex >= prevSections.length) {
//       console.error(`Invalid sectionIndex: ${sectionIndex}`);
//       return prevSections; // Return the previous state without changes
//     }

//     // Map over sections to create a new state
//     const updatedSections = prevSections.map((section, secIndex) => {
//       if (secIndex === sectionIndex) {
//         // Check if panelMatrix exists and rowIndex/columnIndex are valid
//         if (!section.panelMatrix || rowIndex < 0 || columnIndex < 0 || rowIndex >= section.panelMatrix.length || columnIndex >= section.panelMatrix[rowIndex].length) {
//           console.error(`Invalid indices for panelMatrix: rowIndex=${rowIndex}, columnIndex=${columnIndex}`);
//           return section; // Return the section unchanged
//         }

//         // Create a new panelMatrix with the updated value
//         const updatedPanelMatrix = section.panelMatrix.map((row, rowIdx) =>
//           row.map((cell, colIdx) => {
//             if (rowIdx === rowIndex && colIdx === columnIndex) {
//               return !cell; // Toggle the value
//             }
//             return cell;
//           })
//         );

//         return {
//           ...section,
//           panelMatrix: updatedPanelMatrix, // Update panelMatrix
//         };
//       }

//       return section; // No changes for other sections
//     });

//     console.log(updatedSections, "Updated sections after toggling panelMatrix");
//     return updatedSections; // Return the updated sections array to update state
//   });
// };


export const togglePanelMatrixValue = (sectionIndex, rowIndex, columnIndex, setSections, createPanel, id, title, parentId) => {
  setSections((prevSections) => {
    // Shallow copy of the sections array
    const updatedSections = [...prevSections];
    const section = { ...updatedSections[sectionIndex] }; // Shallow copy of the target section

    console.log(section, "section which we select")

    // Deep copy of the panelMatrix to avoid shared references
    const updatedPanelMatrix = section.panelMatrix.map((row) => [...row]);

    // Toggle the value of the specific cell
    updatedPanelMatrix[rowIndex][columnIndex] = !updatedPanelMatrix[rowIndex][columnIndex];
    console.log(updatedPanelMatrix, "updated panel matrix")

    // Calculate the number of `true` panels
    const trueCount = updatedPanelMatrix.flat().filter((cell) => cell === true).length;

    // Validation: Ensure at least one panel remains active
    if (trueCount < 1) {
      toast.warning(
        "You must have at least one panel active. You cannot remove all panels."
      );
      return prevSections; // Do not update state if validation fails
    }

    // Update the section with the new panelMatrix and active panel count
    section.panelMatrix = updatedPanelMatrix;
    section.activePanel = trueCount;

    // Update the specific section in the sections array
    updatedSections[sectionIndex] = section;

    // Optionally call a function to save or process the updated state
    console.log(updatedSections, "updated sections after the panel matrix ")
    createPanel(id, title, updatedSections, parentId);

    return updatedSections; // Return the updated state
  });
};

// export const togglePanelMatrixValue = (sectionIndex, rowIndex, columnIndex, setSections) => {

//   console.log(rowIndex, columnIndex, "row and col indec ");
//   setSections((prevSections) => {
//     // Shallow copy of sections array
//     const updatedSections = [...prevSections];

//     // Shallow copy of the specific section
//     const section = { ...updatedSections[sectionIndex] };

//     console.log(updatedSections, "section that is inside the toggle")

//     // Deep copy the `panelMatrix` row-by-row
//     const updatedPanelMatrix = section.panelMatrix.map((row, idx) =>
//       idx === rowIndex ? [...row] : row
//     );

//     console.log(updatedPanelMatrix, "panel matrix rthat is updated")

//     // Toggle the specific panel
//     updatedPanelMatrix[rowIndex][columnIndex] = !updatedPanelMatrix[rowIndex][columnIndex];

//     // Ensure the panelMatrix is a valid 2D array and validate toggles
//     const trueCount = updatedPanelMatrix.flat().filter(Boolean).length;

//     if (trueCount < 1) {
//       toast.warning("You must have at least one panel active.");
//       return prevSections; // No update if validation fails
//     }

//     // Update the panelMatrix and activePanel count
//     section.panelMatrix = updatedPanelMatrix;
//     section.activePanel = trueCount;

//     // Update the section in the sections array
//     updatedSections[sectionIndex] = section;

//     console.log(updatedSections, 'updated sections in toggle ')

//     return updatedSections; // Update state
//   });
// };
