import React, { useState } from 'react';

const InputForm = ({ array, setArray }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter values to sort ..');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(input) || input === '') {
      setError('Please enter a valid number');
    } else {
      setArray([...array, Number(input)]);
      setInput('');
      setError('');
    }
  };

  const handleFocus = () => {
    setError('');
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (input === '') {
      setPlaceholder('Enter values to sort ..');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (isNaN(e.target.value)) {
            setError('Cannot Enter Strings');
          } else {
            setError('');
          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{ borderColor: error ? 'red' : '', position: 'relative' }}
      />
      {error && (
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '0',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          zIndex: '1000'
        }}>
          {error}
        </div>
      )}
    </form>
  );
};

export default InputForm;
