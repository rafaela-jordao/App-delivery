import { useState, useEffect, useRef, useCallback } from 'react';
import requestApi from '../services/ApiService';

const ONE_SEC = 1000;

const useApi = (path, initialState, frequency = null) => {
  const [state, setState] = useState(initialState);
  const timeoutRef = useRef(null);

  const updateState = useCallback(async () => {
    clearTimeout(timeoutRef.current);

    const newState = await requestApi(path);
    setState(newState);

    if (frequency) {
      timeoutRef.current = setTimeout(updateState, frequency * ONE_SEC);
    }
  }, [path, frequency]);

  useEffect(() => {
    updateState();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return [state, updateState];
};

export default useApi;
