import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

// Helper function to safely parse JSON
function safelyParseJson<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) {
    return fallback;
  }
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return fallback;
  }
}

/**
 * Custom hook to manage state persistence in localStorage.
 *
 * @template T The type of the value to be stored.
 * @param {string} key The key under which to store the value in localStorage.
 * @param {T | (() => T)} initialValue The initial value to use if nothing is found in localStorage,
 * or a function that returns the initial value.
 * @returns {[T, Dispatch<SetStateAction<T>>]} A stateful value, and a function to update it.
 * Behaves like useState, but persists the value to localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  // Helper function to read value from localStorage
  const readValue = useCallback((): T => {
    // Prevent build errors during server-side rendering
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Use initialValue if item doesn't exist or parsing fails
      const fallbackValue = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      return item ? safelyParseJson<T>(item, fallbackValue) : fallbackValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }
  }, [key, initialValue]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      // Prevent build errors during server-side rendering
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`
        );
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(newValue);
        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(newValue));
        // We dispatch a custom event so other hooks listening can sync state
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue] // Include storedValue dependency for the updater function case
  );

  // Listen for storage changes (cross-tab synchronization)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check if the key matches and the event originated from another document
      if (event.key === key) {
        // Use readValue which includes parsing and fallback logic
        const newValue = readValue();
        // Update state only if the value has actually changed
        // (Comparing stringified versions might be needed for complex objects if references differ)
        if (JSON.stringify(newValue) !== JSON.stringify(storedValue)) {
          setStoredValue(newValue);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // Only re-run the effect if the key or readValue function changes
  }, [key, readValue, storedValue]);

  // Sync state on initial mount just in case localStorage was changed
  // between the initial useState read and the effect running.
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // Re-run only if key changes


  return [storedValue, setValue];
}
