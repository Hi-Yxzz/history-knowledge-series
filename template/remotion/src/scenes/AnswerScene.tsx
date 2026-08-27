import {PaperBackground} from "../components/PaperBackground";

export const AnswerScene: React.FC<{answer: string; accent: string}> = ({answer, accent}) => (
  <PaperBackground dark>
    <div style={{padding: "150px 120px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <div style={{fontSize: 42, color: "#d7b77b", letterSpacing: 5, fontWeight: 800}}>答案</div>
      <div style={{width: 110, height: 10, backgroundColor: accent, margin: "36px 0 40px"}} />
      <div style={{fontSize: 82, lineHeight: 1.25, fontWeight: 900, maxWidth: 1580}}>{answer}</div>
      <div style={{fontSize: 28, opacity: 0.62, marginTop: 66}}>详细来源将在正式单期的来源尾页列出</div>
    </div>
  </PaperBackground>
);
