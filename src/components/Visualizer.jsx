import React from 'react';

const Visualizer = ({ array }) => {
  const maxBarWidth = array.length > 10 ? 30 : 50;

  return (
    <div className="visualizer-container">
      <div className="visualizer">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{ height: `${value * 10}px`, width: `${maxBarWidth}px` }}
          >
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
