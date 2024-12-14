import { useEffect, useRef } from "react";

export const useUpdatePanelMatrix = (
  sections,
  setSections,
  createPanel,
  id,
  title,
  parentId,
  setIsCreate,
  isCreate
) => {
  const prevSectionsRef = useRef([]);

  useEffect(() => {
    const prevSections = prevSectionsRef.current;
    const updatedSections = sections.map((section, index) => {
      const prevSection = prevSections[index];
      if (
        section.panelX !== prevSection?.panelX ||
        section.panelY !== prevSection?.panelY
      ) {
        if (section.panelX && section.panelY) {
          const newPanelMatrix = Array.from(
            { length: parseInt(section.panelY) },
            () => Array.from({ length: parseInt(section.panelX) }, () => true)
          );

          return {
            ...section,
            panelMatrix: newPanelMatrix,
          };
        }
      }
      return section; // No changes
    });

    if (JSON.stringify(updatedSections) !== JSON.stringify(sections)) {
      setSections(updatedSections);

      if (isCreate) createPanel(id, title, updatedSections, parentId);
    }

    prevSectionsRef.current = sections;
    setIsCreate(false);
  }, [sections, id, title, parentId, createPanel]);
};

// export const useUpdatePanelMatrix = (
//   sections,
//   setSections,
//   createPanel,
//   id,
//   title,
//   parentId,
//   setIsCreate,
//   isCreate
// ) => {
//   const prevSectionsRef = useRef([]);

//   const excludePanel = (sectionIndex, panelRow, panelCol) => {
//     setSections((prevSections) => {
//       return prevSections.map((section, index) => {
//         if (index === sectionIndex) {
//           // Update panel matrix to exclude the selected panel
//           const updatedPanelMatrix = section.panelMatrix.map((row, rowIndex) =>
//             row.map((col, colIndex) =>
//               rowIndex === panelRow && colIndex === panelCol ? false : col
//             )
//           );

//           // Filter out empty rows/columns
//           const filteredRows = updatedPanelMatrix.filter((row) =>
//             row.some((col) => col)
//           );
//           const filteredColumns =
//             filteredRows[0]?.map((_, colIndex) =>
//               filteredRows.some((row) => row[colIndex])
//             ) || [];

//           return {
//             ...section,
//             panelMatrix: filteredRows.map((row) =>
//               row.filter((_, colIndex) => filteredColumns[colIndex])
//             ),
//             panelX: filteredColumns.length,
//             panelY: filteredRows.length,
//           };
//         }

//         return section;
//       });
//     });
//   };

//   useEffect(() => {
//     const prevSections = prevSectionsRef.current;
//     const updatedSections = sections.map((section, index) => {
//       const prevSection = prevSections[index];
//       if (
//         section.panelX !== prevSection?.panelX ||
//         section.panelY !== prevSection?.panelY
//       ) {
//         if (section.panelX && section.panelY) {
//           const newPanelMatrix = Array.from(
//             { length: parseInt(section.panelY) },
//             () => Array.from({ length: parseInt(section.panelX) }, () => true)
//           );

//           return {
//             ...section,
//             panelMatrix: newPanelMatrix,
//           };
//         }
//       }
//       return section; // No changes
//     });

//     if (JSON.stringify(updatedSections) !== JSON.stringify(sections)) {
//       setSections(updatedSections);

//       // if (isCreate) createPanel(id, title, updatedSections, parentId);
//     }

//     prevSectionsRef.current = sections;
//     setIsCreate(false);
//   }, [sections, id, title, parentId, createPanel]);

//   return { excludePanel };
// };
