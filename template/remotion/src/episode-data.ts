import type {HistoryEpisodeProps} from "./types";

export const FPS = 30;
export const TRANSITION_FRAMES = 12;

export const defaultEpisode: HistoryEpisodeProps = {
  episodeId: "01-ancient-ice-foundation",
  title: "古代没有冰箱，皇宫夏天的冰从哪里来？",
  directAnswer: "冬季采集天然冰，储存在隔热冰窖中，留到夏季使用。",
  accent: "#9b6a2f",
  captionsFile: "demo-captions.json",
  voiceoverFile: null,
  footage: {
    file: null,
    label: "真实素材接入位",
    sourceUrl: "",
    sourceType: "youtube",
    rightsStatus: "candidate",
    trimBeforeFrames: 0,
    trimAfterFrames: null,
    objectPosition: "50% 50%",
  },
  sceneDurations: {
    hook: 90,
    evidence: 90,
    process: 90,
    restoration: 90,
    boundary: 90,
    answer: 90,
  },
};

export const getPlannedDuration = (durations: HistoryEpisodeProps["sceneDurations"]) =>
  Object.values(durations).reduce((sum, duration) => sum + duration, 0) -
  TRANSITION_FRAMES * 5;
