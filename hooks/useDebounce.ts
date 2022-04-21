import React, { useEffect } from "react";

function useDebounce(callBack: () => void, dependency: any, time = 1000) {
  useEffect(() => {
    const debounceTime = setTimeout(() => callBack(), time);
    return () => {
      clearTimeout(debounceTime);
    };
  }, [dependency]);
}

export default useDebounce;
