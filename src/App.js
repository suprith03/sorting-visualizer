import React, { useState } from 'react';
import InputForm from './components/InputForm';
import SortButtons from './components/SortButtons';
import Visualizer from './components/Visualizer';
import ResetButton from './components/ResetButton';
import './App.css';

const App = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(''); 

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const updateArray = async (newArray, delay = 1000) => {
    setArray([...newArray]);
    await sleep(delay);
  };

  const mergeSort = async (array, delay = 1000) => {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = await mergeSort(array.slice(0, middle), delay);
    const right = await mergeSort(array.slice(middle), delay);

    return await merge(left, right, delay);
  };

  const merge = async (left, right, delay) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
      await updateArray([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)], delay);
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const quickSort = async (array, delay = 1000) => {
    if (array.length <= 1) return array;

    const pivot = array[array.length - 1];
    const left = [];
    const right = [];

    for (const el of array.slice(0, array.length - 1)) {
      el < pivot ? left.push(el) : right.push(el);
    }

    const sortedLeft = await quickSort(left, delay);
    const sortedRight = await quickSort(right, delay);

    const sortedArray = [...sortedLeft, pivot, ...sortedRight];
    await updateArray(sortedArray, delay);
    return sortedArray;
  };

  const insertionSort = async (array, delay = 1000) => {
    let newArray = [...array];
    for (let i = 1; i < newArray.length; i++) {
      let key = newArray[i];
      let j = i - 1;
      while (j >= 0 && newArray[j] > key) {
        newArray[j + 1] = newArray[j];
        j--;
        await updateArray(newArray, delay);
      }
      newArray[j + 1] = key;
      await updateArray(newArray, delay);
    }
    return newArray;
  };

  const sortArray = async (algorithm) => {
    if (sorting || array.length === 0) return;

    setSorting(true);
    setCurrentAlgorithm(algorithm); 
    let sortedArray;

    switch (algorithm) {
      case 'merge':
        sortedArray = await mergeSort([...array]);
        break;
      case 'quick':
        sortedArray = await quickSort([...array]);
        break;
      case 'insertion':
        sortedArray = await insertionSort([...array]);
        break;
      default:
        return;
    }

    setArray(sortedArray);
    setSorting(false);
  };

  const resetArray = () => {
    setArray([]);
    setCurrentAlgorithm(''); 
  };

  return (
    <div className="app">
      <h1>Sorting Visualizer</h1>
      <InputForm array={array} setArray={setArray} />
      {currentAlgorithm && <h2>Applying {currentAlgorithm.charAt(0).toUpperCase() + currentAlgorithm.slice(1)} Sort ..</h2>}
      <Visualizer array={array} />
      <div className="buttons-container">
        <SortButtons sortArray={sortArray} />
        <ResetButton resetArray={resetArray} />
      </div>
    </div>
  );
};

export default App;
