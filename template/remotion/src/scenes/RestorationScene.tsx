import {PaperBackground} from "../components/PaperBackground";
import {FootageFrame} from "../components/FootageFrame";
import type {FootageSpec} from "../types";

export const RestorationScene: React.FC<{accent: string}> = ({accent}) => {
  const reconstruction: FootageSpec = {
    file: null,
    label: "AI历史场景或器物复原图",
    sourceUrl: "",
    sourceType: "generated",
    rightsStatus: "candidate",
    trimBeforeFrames: 0,
    trimAfterFrames: null,
  };
  return (
    <PaperBackground dark>
      <FootageFrame footage={reconstruction} accent={accent} />
    </PaperBackground>
  );
};
