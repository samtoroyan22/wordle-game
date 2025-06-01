const LetterBox = ({ letter, index, getCellColor, isCurrent }) => {
  return (
    <div
      className={`letter-box ${
        isCurrent || !letter ? "" : getCellColor(letter, index)
      }`}
    >
      {letter || ""}
    </div>
  );
};

export default LetterBox;
