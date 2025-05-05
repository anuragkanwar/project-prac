import { Button } from "../ui/button"
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Constants for localStorage keys to avoid typos
const STORAGE_KEYS = {
  ACCUMULATED_SECONDS: 'timerAccumulatedSeconds_v1',
  IS_RUNNING: 'timerIsRunning_v1',
  REFERENCE_TIME: 'timerReferenceTime_v1', // Timestamp when the current run started
};

/**
 * Formats seconds into HH:MM:SS string format.
 * @param totalSeconds - The total number of seconds.
 * @returns A string formatted as HH:MM:SS.
 */
const formatTime = (totalSeconds: number): string => {
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

/**
 * A timer component that persists its state across sessions using localStorage.
 */
export const Timer: React.FC = () => {
  // State explanations:
  // accumulatedSeconds: Time saved from previous running periods.
  // isRunning: Whether the timer is currently ticking.
  // referenceTime: The Date.now() timestamp when the *current* running period started.
  // displaySeconds: The total time (accumulated + current segment) shown to the user, updated every second.
  const [accumulatedSeconds, setAccumulatedSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [referenceTime, setReferenceTime] = useState<number | null>(null);
  const [displaySeconds, setDisplaySeconds] = useState<number>(0);

  // Ref to store the interval ID
  const intervalRef = useRef<number | null>(null);

  // --- Persistence Logic ---

  // Function to save the current state to localStorage
  const saveState = useCallback(() => {
    try {
      if (isRunning && referenceTime !== null) {
        // If running, calculate current segment and save total *potential* time
        const currentSegmentElapsed = (Date.now() - referenceTime) / 1000;
        localStorage.setItem(STORAGE_KEYS.ACCUMULATED_SECONDS, JSON.stringify(accumulatedSeconds + currentSegmentElapsed));
        localStorage.setItem(STORAGE_KEYS.IS_RUNNING, JSON.stringify(true));
        localStorage.setItem(STORAGE_KEYS.REFERENCE_TIME, JSON.stringify(referenceTime));
      } else {
        // If paused or reset, save the last known accumulated time
        localStorage.setItem(STORAGE_KEYS.ACCUMULATED_SECONDS, JSON.stringify(accumulatedSeconds));
        localStorage.setItem(STORAGE_KEYS.IS_RUNNING, JSON.stringify(false));
        localStorage.removeItem(STORAGE_KEYS.REFERENCE_TIME); // Clear reference time if not running
      }
      console.log("Timer state saved.");
    } catch (error) {
      console.error("Failed to save timer state to localStorage:", error);
    }
  }, [isRunning, referenceTime, accumulatedSeconds]);

  // --- Effects ---

  // Effect to load state from localStorage on initial mount
  useEffect(() => {
    console.log("Timer component mounted. Loading state...");
    try {
      const storedAccumulatedStr = localStorage.getItem(STORAGE_KEYS.ACCUMULATED_SECONDS);
      const storedIsRunningStr = localStorage.getItem(STORAGE_KEYS.IS_RUNNING);
      const storedReferenceTimeStr = localStorage.getItem(STORAGE_KEYS.REFERENCE_TIME);

      const initialAccumulated = storedAccumulatedStr ? parseFloat(JSON.parse(storedAccumulatedStr)) : 0;
      const initialIsRunning = storedIsRunningStr ? JSON.parse(storedIsRunningStr) : false;
      const initialReferenceTime = storedReferenceTimeStr ? parseInt(JSON.parse(storedReferenceTimeStr), 10) : null;

      setAccumulatedSeconds(initialAccumulated);

      if (initialIsRunning && initialReferenceTime !== null) {
        // Timer was running when last saved
        const timePassedSinceSave = (Date.now() - initialReferenceTime) / 1000;
        const currentTotalSeconds = initialAccumulated + timePassedSinceSave;

        setIsRunning(true);
        setReferenceTime(initialReferenceTime); // Keep the original reference time
        setDisplaySeconds(currentTotalSeconds);
        console.log(`Timer was running. Resuming. Accumulated: ${initialAccumulated.toFixed(2)}s, Passed since save: ${timePassedSinceSave.toFixed(2)}s`);
      } else {
        // Timer was paused or never started
        setIsRunning(false);
        setReferenceTime(null);
        setDisplaySeconds(initialAccumulated);
        console.log(`Timer was not running. Initial accumulated: ${initialAccumulated.toFixed(2)}s`);
      }
    } catch (error) {
      console.error("Failed to load timer state from localStorage:", error);
      // Set default state in case of error
      setAccumulatedSeconds(0);
      setIsRunning(false);
      setReferenceTime(null);
      setDisplaySeconds(0);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to manage the timer interval based on isRunning state
  useEffect(() => {
    if (isRunning && referenceTime !== null) {
      // Start the interval if running and reference time is set
      intervalRef.current = setInterval(() => {
        const currentSegmentElapsed = (Date.now() - referenceTime) / 1000;
        setDisplaySeconds(accumulatedSeconds + currentSegmentElapsed);
      }, 1000); // Update display every second
      console.log("Timer interval started.");
    } else {
      // Clear interval if not running or reference time is missing
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Timer interval cleared.");
      }
    }

    // Cleanup function to clear interval when component unmounts or isRunning changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log("Timer interval cleared on cleanup.");
      }
    };
  }, [isRunning, referenceTime, accumulatedSeconds]);

  // Effect to save state when the window is about to be unloaded (tab/browser close)
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("Window unloading, saving timer state...");
      saveState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also save state one last time on unmount, just in case beforeunload didn't fire reliably
      console.log("Component unmounting, saving timer state...");
      saveState();
    };
  }, [saveState]); // Depend on the memoized saveState function

  // --- Control Handlers ---

  const handleStartPause = () => {
    if (isRunning) {
      // --- Pausing ---
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear immediately
      intervalRef.current = null;
      if (referenceTime !== null) {
        const currentSegmentElapsed = (Date.now() - referenceTime) / 1000;
        const newAccumulated = accumulatedSeconds + currentSegmentElapsed;
        setAccumulatedSeconds(newAccumulated);
        setDisplaySeconds(newAccumulated); // Ensure display matches final accumulated time
        setReferenceTime(null); // Clear reference time
        setIsRunning(false);
        // Save paused state immediately
        try {
          localStorage.setItem(STORAGE_KEYS.ACCUMULATED_SECONDS, JSON.stringify(newAccumulated));
          localStorage.setItem(STORAGE_KEYS.IS_RUNNING, JSON.stringify(false));
          localStorage.removeItem(STORAGE_KEYS.REFERENCE_TIME);
          console.log("Timer paused and state saved.");
        } catch (error) { console.error("Failed to save paused state:", error); }
      } else {
        // Should not happen if isRunning is true, but handle defensively
        setIsRunning(false);
      }
    } else {
      // --- Starting / Resuming ---
      const now = Date.now();
      setReferenceTime(now); // Set new reference time for this run segment
      setIsRunning(true);
      // Save running state immediately
      try {
        localStorage.setItem(STORAGE_KEYS.ACCUMULATED_SECONDS, JSON.stringify(accumulatedSeconds)); // Save current accumulated
        localStorage.setItem(STORAGE_KEYS.IS_RUNNING, JSON.stringify(true));
        localStorage.setItem(STORAGE_KEYS.REFERENCE_TIME, JSON.stringify(now));
        console.log("Timer started/resumed and state saved.");
      } catch (error) { console.error("Failed to save running state:", error); }
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear interval
    intervalRef.current = null;
    setAccumulatedSeconds(0);
    setDisplaySeconds(0);
    setIsRunning(false);
    setReferenceTime(null);
    // Clear and save reset state immediately
    try {
      localStorage.setItem(STORAGE_KEYS.ACCUMULATED_SECONDS, JSON.stringify(0));
      localStorage.setItem(STORAGE_KEYS.IS_RUNNING, JSON.stringify(false));
      localStorage.removeItem(STORAGE_KEYS.REFERENCE_TIME);
      console.log("Timer reset and state saved.");
    } catch (error) { console.error("Failed to save reset state:", error); }
  };

  // --- Render ---
  return (
    <div className="p-4 border rounded-lg shadow-md bg-card text-card-foreground max-w-xs mx-auto text-center">
      <h3 className="text-lg font-semibold mb-2">Persistent Timer</h3>
      <div className="text-4xl font-mono font-bold mb-4 tracking-wider">
        {formatTime(displaySeconds)}
      </div>
      <div className="flex justify-center space-x-3">
        <Button
          onClick={handleStartPause}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-150 ease-in-out
                      ${isRunning
              ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900'
              : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          onClick={handleReset}
          className="px-4 py-2 rounded-md font-medium bg-red-500 hover:bg-red-600 text-white transition-colors duration-150 ease-in-out"
          disabled={displaySeconds === 0 && !isRunning} // Disable reset if already zero and not running
        >
          Reset
        </Button>
      </div>
    </div>
  );
};



// export const Timer = () => {
//   return <div className="flex flex-col items-center justify-center">
//     <div className="text-[15vw] font-bold ">00 : 00 : 00</div>
//     <div className="flex flex-row gap-4">
//       <Button variant={"destructive"}>Start</Button>
//       <Button variant={"destructive"}>Stop</Button>
//       <Button variant={"destructive"}>Reset</Button>
//     </div>
//   </div>
// }