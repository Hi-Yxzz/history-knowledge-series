import {Easing, interpolate, useCurrentFrame} from "remotion";
import {PaperBackground} from "../components/PaperBackground";

export const HookScene: React.FC<{title: string; accent: string}> = ({title, accent}) => {
  const frame = useCurrentFrame();
  return (
    <PaperBackground>
      <div style={{padding: "150px 120px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center"}}>
        <div style={{width: 120, height: 12, backgroundColor: accent, marginBottom: 48}} />
        <div
          style={{
            maxWidth: 1500,
            fontSize: 102,
            lineHeight: 1.18,
            fontWeight: 900,
            opacity: interpolate(frame, [0, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [0, 18], ["0px 28px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          {title}
        </div>
      </div>
    </PaperBackground>
  );
};
