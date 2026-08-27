import {PaperBackground} from "../components/PaperBackground";

export const BoundaryScene: React.FC<{accent: string}> = ({accent}) => (
  <PaperBackground>
    <div style={{padding: "140px 120px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <div style={{fontSize: 42, color: accent, letterSpacing: 5, fontWeight: 800}}>事实边界</div>
      <div style={{fontSize: 92, lineHeight: 1.15, fontWeight: 900, marginTop: 26}}>皇家制度，不等于所有古人的日常</div>
      <div style={{display: "flex", gap: 28, marginTop: 78}}>
        {["限定朝代", "限定地区", "限定使用人群"].map((item) => (
          <div key={item} style={{borderTop: `8px solid ${accent}`, backgroundColor: "rgba(255,255,255,0.32)", padding: "34px 42px", fontSize: 42, fontWeight: 800}}>
            {item}
          </div>
        ))}
      </div>
    </div>
  </PaperBackground>
);
