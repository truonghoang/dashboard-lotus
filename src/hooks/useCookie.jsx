import { useState } from "react";
import jsCookie from "js-cookie";
import { useSelector } from "react-redux";
export const useCookie = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = jsCookie.get(keyName);
      const userReducer = useSelector((state) => state.UserReducer);
      console.log(userReducer);
      if (value) {
        return JSON.parse(value);
      } else {
        jsCookie.set(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      jsCookie.set(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
