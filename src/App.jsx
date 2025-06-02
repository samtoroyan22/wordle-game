import "./App.scss";
import { useState, useEffect } from "react";
import Message from "./components/Message";
import Keyboard from "./components/Keyboard";
import GameBoard from "./components/GameBoard";
import StatsModal from "./components/StatsModal";
import RulesModal from "./components/RulesModal";
import HeaderMenu from "./components/HeaderMenu";
import { WORDS } from "./data/words";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const MAX_ATTEMPTS = 6;

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem("gameStats");
    try {
      return savedStats
        ? JSON.parse(savedStats)
        : {
            wins: 0,
            losses: 0,
            totalAttempts: 0,
            gamesPlayed: 0,
            averageAttempts: 0,
          };
    } catch (error) {
      console.error("Ошибка загрузки статистики из localStorage:", error);
      return {
        wins: 0,
        losses: 0,
        totalAttempts: 0,
        gamesPlayed: 0,
        averageAttempts: 0,
      };
    }
  });

  const gameState = {
    guesses,
    secretWord,
    currentGuess,
    gameOver,
  };

  useEffect(() => {
    const hasSeenRules = localStorage.getItem("hasSeenRules");
    if (!hasSeenRules) {
      setIsRulesOpen(true);
      localStorage.setItem("hasSeenRules", "true");
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (secretWord) {
      localStorage.setItem("wordleGame", JSON.stringify(gameState));
    }
  }, [guesses, secretWord, currentGuess, gameOver]);

  useEffect(() => {
    const savedGame = localStorage.getItem("wordleGame");
    if (savedGame) {
      try {
        const parsedSavedGame = JSON.parse(savedGame);
        setGuesses(parsedSavedGame.guesses || []);
        setSecretWord(parsedSavedGame.secretWord || "");
        setCurrentGuess(parsedSavedGame.currentGuess || "");
        const savedGameOver = parsedSavedGame.gameOver || false;
        setGameOver(savedGameOver);

        // Проверяем, была ли игра завершена, и сбрасываем, если модалка не закрыта
        if (savedGameOver && !localStorage.getItem("statsModalClosed")) {
          startNewGame();
        } else if (savedGameOver) {
          setIsStatsOpen(true);
        }
      } catch (error) {
        console.error("Ошибка загрузки сохранённой игры:", error);
        startNewGame();
      }
    } else {
      startNewGame();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleInput(event.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput]);

  useEffect(() => {
    if (gameOver) {
      setIsStatsOpen(true);
      localStorage.setItem("statsModalOpened", "true");
    }
  }, [gameOver]);

  const updateStats = (isWin, attempts) => {
    setStats((prev) => {
      const newStats = {
        wins: isWin ? prev.wins + 1 : prev.wins,
        losses: !isWin ? prev.losses + 1 : prev.losses,
        totalAttempts: prev.totalAttempts + attempts,
        gamesPlayed: prev.gamesPlayed + 1,
      };
      newStats.averageAttempts =
        newStats.gamesPlayed > 0
          ? newStats.totalAttempts / newStats.gamesPlayed
          : 0;
      localStorage.setItem("gameStats", JSON.stringify(newStats));
      return newStats;
    });
  };

  function checkGuess() {
    const newGuess = [...guesses, currentGuess];
    setGuesses(newGuess);
    setCurrentGuess("");
    const isWin = currentGuess === secretWord;
    if (isWin) {
      setGameOver(true);
      setMessage("Поздравляем, вы угадали слово!");
      updateStats(true, newGuess.length);
    } else if (newGuess.length >= MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage(`Вы проиграли! Загаданное слово было ${secretWord}`);
      updateStats(false, newGuess.length);
    }
  }

  const getCellColor = (letter, index) => {
    if (!letter) return "";
    if (secretWord[index] === letter) {
      return "correct";
    }
    if (secretWord.includes(letter)) {
      return "present";
    }
    return "absent";
  };

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setSecretWord(WORDS[randomIndex]);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setMessage("");
    setIsStatsOpen(false);
    localStorage.removeItem("wordleGame");
    localStorage.removeItem("statsModalOpened");
  };

  function handleInput(key) {
    if (gameOver) return;
    if (/^[а-яА-ЯёЁ]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length === 5) {
        checkGuess();
      } else {
        setMessage("Слово должно быть 5 букв!");
        setTimeout(() => setMessage(""), 2000);
      }
    }
  }

  return (
    <div className="app">
      <HeaderMenu
        toggleTheme={toggleTheme}
        theme={theme}
        onStatsClick={() => setIsStatsOpen(true)}
        onRulesClick={() => setIsRulesOpen(true)}
      />
      <GameBoard
        guesses={guesses}
        gameOver={gameOver}
        currentGuess={currentGuess}
        getCellColor={getCellColor}
        maxAttempts={MAX_ATTEMPTS}
      />
      {!gameOver && <Keyboard onKeyPress={handleInput} />}
      <Message message={message} />
      {gameOver && (
        <button className="new-game-btn" onClick={startNewGame}>
          Новая игра
        </button>
      )}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => {
          setIsStatsOpen(false);
          localStorage.setItem("statsModalClosed", "true");
          localStorage.removeItem("statsModalOpened");
        }}
        stats={stats}
      />
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
}

export default App;
