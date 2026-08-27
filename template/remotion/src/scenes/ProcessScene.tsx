import {Easing, interpolate, useCurrentFrame} from "remotion";
import {PaperBackground} from "../components/PaperBackground";

const steps = ["冬季采冰", "冰窖储藏", "夏季启用"];

export const ProcessScene: React.FC<{accent: string}> = ({accent}) => {
  const frame = useCurrentFrame();
  return (
    <PaperBackground>
      <div style={{padding: "130px 110px", height: "100%"}}>
        <div style={{fontSize: 44, letterSpacing: 5, color: accent, fontWeight: 800}}>核心过程</div>
        <div style={{fontSize: 84, fontWeight: 900, marginTop: 22}}>冰不是夏天造出来的</div>
        <div style={{display: "flex", alignItems: "center", gap: 26, marginTop: 130}}>
          {steps.map((step, index) => (
            <div key={step} style={{display: "flex", alignItems: "center", gap: 26, flex: index === steps.length - 1 ? 0 : 1}}>
              <div
                style={{
                  minWidth: 350,
                  padding: "48px 34px",
                  border: "3px solid #342f28",
                  backgroundColor: index === 1 ? "#2a2822" : "rgba(255,255,255,0.28)",
                  color: index === 1 ? "#f5eee1" : "#24211c",
                  fontSize: 50,
                  fontWeight: 800,
                  textAlign: "center",
                  opacity: interpolate(frame, [index * 12, index * 12 + 18], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  }),
                }}
              >
                {step}
              </div>
              {index < steps.length - 1 ? <div style={{height: 4, flex: 1, backgroundColor: accent}} /> : null}
            </div>
          ))}
        </div>
      </div>
    </PaperBackground>
  );
};
