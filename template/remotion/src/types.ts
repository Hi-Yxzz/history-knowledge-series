export type RightsStatus = "candidate" | "pending-permission" | "licensed" | "open";
export type SourceType = "youtube" | "archive" | "generated" | "remotion";

export type FootageSpec = {
  file: string | null;
  label: string;
  sourceUrl: string;
  sourceType: SourceType;
  rightsStatus: RightsStatus;
  trimBeforeFrames: number;
  trimAfterFrames: number | null;
  objectPosition?: string;
};

export type SceneDurations = {
  hook: number;
  evidence: number;
  process: number;
  restoration: number;
  boundary: number;
  answer: number;
};

export type HistoryEpisodeProps = {
  episodeId: string;
  title: string;
  directAnswer: string;
  accent: string;
  captionsFile: string;
  voiceoverFile: string | null;
  footage: FootageSpec;
  sceneDurations: SceneDurations;
};
