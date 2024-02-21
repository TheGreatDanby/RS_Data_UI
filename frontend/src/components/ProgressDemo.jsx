import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  const [progress, setProgress] = useState(100); // Start from 100%

  useEffect(() => {
    // Calculate the decrement value for the progress (100% over 30 seconds)
    const decrement = 100 / 30; // Assuming you want it to last 30 seconds

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // If progress is greater than 0, decrement it, else clear the interval
        const newProgress = prevProgress - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          return 0; // Ensure progress does not go below 0
        }
        return newProgress;
      });
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}
