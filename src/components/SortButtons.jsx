import React from 'react';

const SortButtons = ({ sortArray }) => {
  return (
    <div>
      <button onClick={() => sortArray('merge')}>Merge Sort</button>
      <button onClick={() => sortArray('quick')}>Quick Sort</button>
      <button onClick={() => sortArray('insertion')}>Insertion Sort</button>
    </div>
  );
};

export default SortButtons;
