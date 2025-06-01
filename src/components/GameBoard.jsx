import LetterBox from "./LetterBox";

const GameBoard = ({
  guesses,
  gameOver,
  currentGuess,
  getCellColor,
  maxAttempts,
}) => {
  return (
    <div className="game-board">
      {/* Отображаем текущие попытки  */}
      {guesses.map((guess, guessIndex) => (
        <div key={guessIndex} className="word-row">
          {Array.from({ length: 5 }).map((_, letterIndex) => (
            <LetterBox
              key={letterIndex}
              letter={guess[letterIndex]}
              index={letterIndex}
              getCellColor={getCellColor}
              isCurrent={false}
            />
          ))}
        </div>
      ))}
      {/* Отображаем текущую попытку (строку ввода) */}
      {!gameOver && guesses.length < maxAttempts && (
        <div className="word-row current">
          {Array.from({ length: 5 }).map((_, index) => (
            <LetterBox
              key={index}
              letter={currentGuess[index]}
              index={index}
              getCellColor={getCellColor}
              isCurrent={true}
            />
          ))}
        </div>
      )}

      {/* Заполняем оставшиеся пустые строки */}
      {!gameOver &&
        Array.from({ length: maxAttempts - guesses.length - 1 }).map(
          (_, rowIndex) => (
            <div key={rowIndex} className="word-row">
              {Array.from({ length: 5 }).map((_, letterIndex) => (
                <LetterBox
                  key={letterIndex}
                  letter={""}
                  index={letterIndex}
                  getCellColor={getCellColor}
                  isCurrent={false}
                />
              ))}
            </div>
          )
        )}
    </div>
  );
};

export default GameBoard;
