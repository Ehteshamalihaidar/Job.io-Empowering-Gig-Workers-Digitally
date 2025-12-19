const StatsCard = ({ title, count, color }) => {
  return (
    <div className={`stats-card ${color}`}>
      <h2>{count}</h2>
      <p>{title}</p>
    </div>
  );
};

export default StatsCard;
