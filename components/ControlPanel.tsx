import React from 'react';

type Distribution = 'random' | 'ascending' | 'descending' | 'split-asc' | 'split-desc';

interface ControlPanelProps {
  algorithm1: string;
  algorithm2: string;
  setAlgorithm1: (value: string) => void;
  setAlgorithm2: (value: string) => void;
  numElements: number;
  setNumElements: (value: number) => void;
  distribution: Distribution;
  setDistribution: (value: Distribution) => void;
  isSorting: boolean;
  isPaused: boolean;
  isSoundOn: boolean;
  setIsSoundOn: (value: boolean) => void;
  speed: number;
  setSpeed: (value: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const algorithms = [
  'Bubble Sort',
  'Quick Sort',
  'Merge Sort',
  'Heap Sort',
  'Insertion Sort',
  'Selection Sort',
  'Shell Sort',
  'Tim Sort',
  'Radix Sort',
  'Counting Sort'
];

const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithm1,
  algorithm2,
  setAlgorithm1,
  setAlgorithm2,
  numElements,
  setNumElements,
  distribution,
  setDistribution,
  isSorting,
  isPaused,
  isSoundOn,
  setIsSoundOn,
  speed,
  setSpeed,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Sorting Algorithms Battle
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Algorithm Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Algorithm 1
            </label>
            <select
              value={algorithm1}
              onChange={(e) => setAlgorithm1(e.target.value)}
              disabled={isSorting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {algorithms.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Algorithm 2
            </label>
            <select
              value={algorithm2}
              onChange={(e) => setAlgorithm2(e.target.value)}
              disabled={isSorting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {algorithms.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Array Configuration */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Elements: {numElements}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={numElements}
              onChange={(e) => setNumElements(Number(e.target.value))}
              disabled={isSorting}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Distribution
            </label>
            <select
              value={distribution}
              onChange={(e) => setDistribution(e.target.value as Distribution)}
              disabled={isSorting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="random">Random</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="split-asc">Split Ascending</option>
              <option value="split-desc">Split Descending</option>
            </select>
          </div>
        </div>

        {/* Speed and Sound Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speed: {speed}ms
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sound"
              checked={isSoundOn}
              onChange={(e) => setIsSoundOn(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="sound" className="ml-2 block text-sm text-gray-700">
              Sound Effects
            </label>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col justify-center space-y-2">
          {!isSorting ? (
            <button
              onClick={onStart}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium"
            >
              Start Battle
            </button>
          ) : (
            <>
              {!isPaused ? (
                <button
                  onClick={onPause}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium"
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={onStart}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium"
                >
                  Resume
                </button>
              )}
            </>
          )}
          
          <button
            onClick={onReset}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel; 