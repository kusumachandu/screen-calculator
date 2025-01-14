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
