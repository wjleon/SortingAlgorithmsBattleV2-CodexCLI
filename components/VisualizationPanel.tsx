import React, { useState, useEffect, useRef } from 'react';

interface VisualizationPanelProps {
  algorithm: string;
  initialArray: number[];
  isSorting: boolean;
  isPaused: boolean;
  speed: number;
  isSoundOn: boolean;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  algorithm,
  initialArray,
  isSorting,
  isPaused,
  speed,
  isSoundOn,
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const pausedRef = useRef(isPaused);
  const sortingRef = useRef(isSorting);
  const speedRef = useRef(speed);
  const soundRef = useRef(isSoundOn);
  const startTimeRef = useRef<number | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    sortingRef.current = isSorting;
  }, [isSorting]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    soundRef.current = isSoundOn;
  }, [isSoundOn]);

  useEffect(() => {
    setArray([...initialArray]);
    setComparing([]);
    setSorted([]);
    setComparisons(0);
    setSwaps(0);
    setTime(0);
    setIsComplete(false);
  }, [initialArray]);

  useEffect(() => {
    if (isSorting && !isComplete) {
      startTimeRef.current = Date.now();
      startSorting();
    }
  }, [isSorting, isComplete]);

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== 'undefined') {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const playSound = (frequency: number) => {
    if (!soundRef.current || !audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + 0.05);
  };

  const delay = () => new Promise(resolve => setTimeout(resolve, speedRef.current));

  const swap = async (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setSwaps(prev => prev + 1);
    playSound(200 + arr[i] * 10);
  };

  const compare = (i: number, j: number) => {
    setComparing([i, j]);
    setComparisons(prev => prev + 1);
    playSound(300 + Math.max(array[i], array[j]) * 10);
  };

  const updateTime = () => {
    if (startTimeRef.current) {
      setTime((Date.now() - startTimeRef.current) / 1000);
    }
  };

  const startSorting = async () => {
    const arr = [...array];
    
    switch (algorithm) {
      case 'Bubble Sort':
        await bubbleSort(arr);
        break;
      case 'Quick Sort':
        await quickSort(arr, 0, arr.length - 1);
        break;
      case 'Merge Sort':
        await mergeSort(arr, 0, arr.length - 1);
        break;
      case 'Heap Sort':
        await heapSort(arr);
        break;
      case 'Insertion Sort':
        await insertionSort(arr);
        break;
      case 'Selection Sort':
        await selectionSort(arr);
        break;
      case 'Shell Sort':
        await shellSort(arr);
        break;
      default:
        await bubbleSort(arr);
    }
    
    // Mark all as sorted
    setSorted(Array.from({ length: arr.length }, (_, i) => i));
    setComparing([]);
    setIsComplete(true);
    updateTime();
  };

  // Bubble Sort
  const bubbleSort = async (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (!sortingRef.current) return;
        while (pausedRef.current) {
          await delay();
        }
        
        compare(j, j + 1);
        updateTime();
        
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
          setArray([...arr]);
        }
        
        await delay();
      }
      setSorted(prev => [...prev, arr.length - i - 1]);
    }
    setSorted(prev => [...prev, 0]);
  };

  // Quick Sort
  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (!sortingRef.current) return low;
      while (pausedRef.current) {
        await delay();
      }
      
      compare(j, high);
      updateTime();
      
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          await swap(arr, i, j);
          setArray([...arr]);
        }
      }
      
      await delay();
    }
    
    await swap(arr, i + 1, high);
    setArray([...arr]);
    await delay();
    
    return i + 1;
  };

  // Merge Sort
  const mergeSort = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (!sortingRef.current) return;
      while (pausedRef.current) {
        await delay();
      }
      
      compare(left + i, mid + 1 + j);
      updateTime();
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      setArray([...arr]);
      playSound(300 + arr[k] * 10);
      k++;
      
      await delay();
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
      setArray([...arr]);
      await delay();
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
      setArray([...arr]);
      await delay();
    }
  };

  // Heap Sort
  const heapSort = async (arr: number[]) => {
    const n = arr.length;
    
    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      await swap(arr, 0, i);
      setArray([...arr]);
      setSorted(prev => [...prev, i]);
      await delay();
      await heapify(arr, i, 0);
    }
    setSorted(prev => [...prev, 0]);
  };

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      compare(left, largest);
      updateTime();
      await delay();
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    if (right < n) {
      compare(right, largest);
      updateTime();
      await delay();
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      await swap(arr, i, largest);
      setArray([...arr]);
      await delay();
      await heapify(arr, n, largest);
    }
  };

  // Insertion Sort
  const insertionSort = async (arr: number[]) => {
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      
      while (j >= 0 && arr[j] > key) {
        if (!sortingRef.current) return;
        while (pausedRef.current) {
          await delay();
        }
        
        compare(j, j + 1);
        updateTime();
        
        arr[j + 1] = arr[j];
        setArray([...arr]);
        playSound(300 + arr[j] * 10);
        j--;
        
        await delay();
      }
      
      arr[j + 1] = key;
      setArray([...arr]);
      setSorted(prev => [...prev, j + 1]);
      await delay();
    }
  };

  // Selection Sort
  const selectionSort = async (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < arr.length; j++) {
        if (!sortingRef.current) return;
        while (pausedRef.current) {
          await delay();
        }
        
        compare(j, minIdx);
        updateTime();
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        
        await delay();
      }
      
      if (minIdx !== i) {
        await swap(arr, i, minIdx);
        setArray([...arr]);
      }
      
      setSorted(prev => [...prev, i]);
    }
    setSorted(prev => [...prev, arr.length - 1]);
  };

  // Shell Sort
  const shellSort = async (arr: number[]) => {
    const n = arr.length;
    
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;
        
        while (j >= gap && arr[j - gap] > temp) {
          if (!sortingRef.current) return;
          while (pausedRef.current) {
            await delay();
          }
          
          compare(j, j - gap);
          updateTime();
          
          arr[j] = arr[j - gap];
          setArray([...arr]);
          playSound(300 + arr[j] * 10);
          j -= gap;
          
          await delay();
        }
        
        arr[j] = temp;
        setArray([...arr]);
        await delay();
      }
    }
    
    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      setSorted(prev => [...prev, i]);
    }
  };

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return 'bg-green-500';
    if (comparing.includes(index)) return 'bg-red-500';
    return 'bg-blue-500';
  };

  const maxValue = Math.max(...array, 1);

  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-2">{algorithm}</h2>
        
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Comparisons: {comparisons}</span>
          <span>Swaps: {swaps}</span>
          <span>Time: {time.toFixed(2)}s</span>
        </div>
        
        <div className="flex-1 flex items-end justify-center gap-1">
          {array.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-200 ${getBarColor(index)}`}
              style={{
                height: `${(value / maxValue) * 100}%`,
                width: `${100 / array.length}%`,
                minWidth: '2px',
              }}
            />
          ))}
        </div>
        
        {isComplete && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            Sorting Complete!
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationPanel; 