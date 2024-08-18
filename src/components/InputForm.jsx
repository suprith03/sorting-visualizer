import React, { useState } from 'react';

const InputForm = ({ array, setArray }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(input) && input !== '') {
      setArray([...array, Number(input)]);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter input"
      />
    </form>
  );
};

export default InputForm;
