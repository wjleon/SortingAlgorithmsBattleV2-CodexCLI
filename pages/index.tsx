import React, { useState, useEffect } from 'react';
import ControlPanel from '../components/ControlPanel';
import VisualizationPanel from '../components/VisualizationPanel';

type Distribution = 'random' | 'ascending' | 'descending' | 'split-asc' | 'split-desc';

export default function Home() {
  const [algorithm1, setAlgorithm1] = useState('Bubble Sort');
  const [algorithm2, setAlgorithm2] = useState('Quick Sort');
  const [numElements, setNumElements] = useState(30);
  const [distribution, setDistribution] = useState<Distribution>('random');
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(30);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    generateArray();
  }, [numElements, distribution]);

  const generateArray = () => {
    let arr: number[] = [];
    switch (distribution) {
      case 'random':
        arr = Array.from({ length: numElements }, () =>
          Math.floor(Math.random() * numElements) + 1
        );
        break;
      case 'ascending':
        arr = Array.from({ length: numElements }, (_, i) => i + 1);
        break;
      case 'descending':
        arr = Array.from({ length: numElements }, (_, i) => numElements - i);
        break;
      case 'split-asc': {
        const half = Math.floor(numElements / 2);
        arr = [
          ...Array.from({ length: half }, (_, i) => i + 1),
          ...Array.from({ length: numElements - half }, (_, i) => half + i + 1),
        ];
        break;
      }
      case 'split-desc': {
        const half = Math.floor(numElements / 2);
        arr = [
          ...Array.from({ length: half }, (_, i) => half - i),
          ...Array.from(
            { length: numElements - half },
            (_, i) => numElements - i
          ),
        ];
        break;
      }
    }
    setInitialArray(arr);
  };

  const handleStart = () => {
    setIsSorting(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsSorting(false);
    setIsPaused(false);
    generateArray();
    setResetSignal((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-gray-100">
        <ControlPanel
          algorithm1={algorithm1}
          algorithm2={algorithm2}
          setAlgorithm1={setAlgorithm1}
          setAlgorithm2={setAlgorithm2}
          numElements={numElements}
          setNumElements={setNumElements}
          distribution={distribution}
          setDistribution={setDistribution}
          isSorting={isSorting}
          isPaused={isPaused}
          isSoundOn={isSoundOn}
          setIsSoundOn={setIsSoundOn}
          speed={speed}
          setSpeed={setSpeed}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <VisualizationPanel
          key={`panel1-${resetSignal}`}
          algorithm={algorithm1}
          initialArray={initialArray}
          isSorting={isSorting}
          isPaused={isPaused}
          speed={speed}
          isSoundOn={isSoundOn}
        />
        <VisualizationPanel
          key={`panel2-${resetSignal}`}
          algorithm={algorithm2}
          initialArray={initialArray}
          isSorting={isSorting}
          isPaused={isPaused}
          speed={speed}
          isSoundOn={isSoundOn}
        />
      </div>
    </div>
  );
}