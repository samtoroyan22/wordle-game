const StatsModal = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Статистика</h2>
        <p>Побед: {stats.wins}</p>
        <p>Всего игр: {stats.gamesPlayed}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default StatsModal;
