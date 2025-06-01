// const RulesModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2>Правила игры</h2>
//         <p>Угадайте слово из 5 букв за 6 попыток.</p>
//         <p>
//           После каждой попытки буквы подсвечиваются:
//           <br />
//           <span className="letter-box correct">Зелёный</span> буква на своём
//           месте.
//           <br />
//           <span className="letter-box present">Жёлтый</span> буква есть в слове,
//           но не на своём месте.
//           <br />
//           <span className="letter-box absent">Серый</span> буквы нет в слове.
//         </p>
//         <button onClick={onClose}>Закрыть</button>
//       </div>
//     </div>
//   );
// };

// export default RulesModal;
import React from "react";

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Правила игры</h2>
        <p>Угадайте слово из 5 букв за 6 попыток.</p>
        <div className="rules-list">
          <p>После каждой попытки буквы подсвечиваются:</p>
          <div className="rule-item">
            <span className="example-box correct">А</span>
            <span>— буква на своём месте.</span>
          </div>
          <div className="rule-item">
            <span className="example-box present">Б</span>
            <span>— буква есть в слове, но не на своём месте.</span>
          </div>
          <div className="rule-item">
            <span className="example-box absent">В</span>
            <span>— буквы нет в слове.</span>
          </div>
        </div>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RulesModal;
