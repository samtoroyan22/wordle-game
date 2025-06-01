import backspace from "../assets/backspace.svg";
import check from "../assets/check.svg";

const Keyboard = ({ onKeyPress }) => {
  const BACK = {
    label: <img src={backspace} alt="Backspace" className="h-6 w-6 ml-1" />,
    value: "Backspace",
  };

  const ENTER = {
    label: <img src={check} alt="Enter" className="h-6 w-6 ml-1" />,
    value: "Enter",
  };

  const rows = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
    [BACK, "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ENTER],
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const value = typeof key === "object" ? key.value : key;
            const label = typeof key === "object" ? key.label : key;
            return (
              <button
                key={`${value}-${rowIndex}-${keyIndex}`}
                className="key"
                onClick={() => onKeyPress(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
