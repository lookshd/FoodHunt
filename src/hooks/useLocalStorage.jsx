import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  // get localStorage value
  const localStorageValue = localStorage.getItem(key);

  // initial value of localStorage with proper validation
  const [getLocalStorage, setLocalStorageValue] = useState(() => {
    if (
      !localStorageValue ||
      localStorageValue === "undefined" ||
      localStorageValue === "null"
    ) {
      return null;
    }
    try {
      return JSON.parse(localStorageValue);
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
      return null;
    }
  });

  useEffect(() => {
    if (
      localStorageValue &&
      localStorageValue !== "undefined" &&
      localStorageValue !== "null"
    ) {
      try {
        setLocalStorageValue(JSON.parse(localStorageValue));
      } catch (error) {
        console.error("Error parsing localStorage value:", error);
        setLocalStorageValue(null);
      }
    } else {
      setLocalStorageValue(null);
    }
  }, [localStorageValue]);

  // set value in localStorage
  const setLocalStorage = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // clear value in localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem(key);
    setLocalStorageValue(null);
  };
  return [getLocalStorage, setLocalStorage, clearLocalStorage];
};

export default useLocalStorage;
