"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressBar({ loading }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 500);
      return () => {
        clearInterval(timer);
        setProgress(0); // Reset progress when loading is done
      };
    }
  }, [loading]);

  return <Progress value={progress} className="w-[60%]" />;
}
