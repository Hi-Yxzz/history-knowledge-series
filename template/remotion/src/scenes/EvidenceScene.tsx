import {PaperBackground} from "../components/PaperBackground";
import {FootageFrame} from "../components/FootageFrame";
import type {FootageSpec} from "../types";

export const EvidenceScene: React.FC<{footage: FootageSpec; accent: string}> = ({footage, accent}) => (
  <PaperBackground>
    <FootageFrame footage={footage} accent={accent} />
  </PaperBackground>
);
