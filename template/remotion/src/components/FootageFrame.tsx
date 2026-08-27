import {Video} from "@remotion/media";
import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame} from "remotion";
import type {FootageSpec} from "../types";
import {RestorationBadge} from "./RestorationBadge";
import {SourceBadge} from "./SourceBadge";

export const FootageFrame: React.FC<{footage: FootageSpec; accent: string}> = ({
  footage,
  accent,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: "84px 100px 132px"}}>
      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
          border: "2px solid rgba(50,42,31,0.24)",
          backgroundColor: "#2a2822",
          opacity: interpolate(frame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 45], [1.025, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {footage.file ? (
          <Video
            src={staticFile(footage.file)}
            trimBefore={footage.trimBeforeFrames}
            trimAfter={footage.trimAfterFrames ?? undefined}
            muted
            style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: footage.objectPosition}}
          />
        ) : (
          <AbsoluteFill style={{justifyContent: "center", alignItems: "center", color: "#e8e0d0"}}>
            <div style={{width: 96, height: 8, backgroundColor: accent, marginBottom: 30}} />
            <div style={{fontSize: 62, fontWeight: 800}}>等待接入真实画面</div>
            <div style={{fontSize: 30, opacity: 0.68, marginTop: 18}}>{footage.label}</div>
          </AbsoluteFill>
        )}
        {footage.sourceType === "generated" ? <RestorationBadge /> : null}
        <div style={{position: "absolute", left: 28, top: 28}}>
          <SourceBadge sourceType={footage.sourceType} rightsStatus={footage.rightsStatus} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
