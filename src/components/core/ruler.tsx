export const Ruler = ({ rulerWidth = 794 }) => {
  const markWidth = 1; // Width of each mark
  const markHeight = 2; // Height of each mark
  const largerMarkHeight = 3; // Height of each mark
  const spacing = 2; // Spacing between each mark

  const marksPerInch = 21.6; // Number of marks per inch
  const inchesPerPixel = 1 / 96; // Assuming 96 dpi

  const numMarks = Math.floor(rulerWidth * inchesPerPixel * marksPerInch); // Number of marks on the ruler
  const maxMarks = Math.floor(rulerWidth / (spacing + markWidth));

  return (
    <div
      style={{ width: rulerWidth }}
      className={`mt-28 border-b border-b-gray-400 relative flex items-end space-x-2`}
    >
      {Array.from({ length: Math.min(numMarks, maxMarks) / spacing }).map(
        (_, index) => (
          <div
            key={index}
            className={`h-${
              index % 5 === 4 ? largerMarkHeight : markHeight
            } w-${markWidth} border-l border-l-gray-400`}
          />
        )
      )}
    </div>
  );
};
