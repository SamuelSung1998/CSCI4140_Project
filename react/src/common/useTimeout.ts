import { useEffect, useState } from 'react';

interface UseTimeoutProps {
  timeout: number;
  handleTimeout: () => void;
}

const useTimeout = ({ timeout, handleTimeout }: UseTimeoutProps) => {
  const [time, setTime] = useState(timeout);
  useEffect(() => {
    const id = setTimeout(() => {
      if (time > 1) {
        setTime(time - 1);
      } else {
        handleTimeout();
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [time, setTime, handleTimeout]);
  return time;
};

export default useTimeout;
