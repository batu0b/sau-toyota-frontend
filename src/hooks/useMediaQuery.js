import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const getMatches = (query) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener("change", handleChange);
    console.log(matches);
    return () => {
        matchMedia.removeEventListener("change", handleChange);
    };
  }, [query , matches]);

  return matches;
}

export default useMediaQuery;
