import { useEffect } from "react";

const useWakeLock = () => {
  useEffect(() => {
    let wakeLock;

    const onVisChange = async () => {
      //);
      if (wakeLock !== null && document.visibilityState === "visible") {
        wakeLock = await navigator.wakeLock.request("screen");
      }
    };

    (async () => {
      if ("wakeLock" in window.navigator) {
        //alert("has wake lock");
        wakeLock = await window.navigator.wakeLock.request("screen");
        document.addEventListener("visibilitychange", onVisChange);
      }
    })();

    return () => {
      wakeLock?.release();
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, []);

  return null;
};

export default useWakeLock;
