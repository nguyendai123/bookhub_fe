import { useEffect, useState } from "react";

export default function useIsMobile(maxWidth = 900) {
  const [useIsMobile, setUseIsMobile] = useState(window.innerWidth < maxWidth);

  useEffect(() => {
    const handleResize = () => {
      setUseIsMobile(window.innerWidth < maxWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return useIsMobile;
}
