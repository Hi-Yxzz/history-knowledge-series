import type {ReactNode} from "react";
import {AbsoluteFill} from "remotion";

export const PaperBackground: React.FC<{children: ReactNode; dark?: boolean}> = ({
  children,
  dark = false,
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? "#181713" : "#e8e0d0",
      color: dark ? "#f4eddf" : "#24211c",
      fontFamily: '"Noto Sans SC Variable", "PingFang SC", sans-serif',
      overflow: "hidden",
    }}
  >
    <AbsoluteFill
      style={{
        opacity: dark ? 0.12 : 0.2,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0 5px, rgba(80,60,35,0.12) 5px 6px)",
      }}
    />
    {children}
  </AbsoluteFill>
);
