import type {CalculateMetadataFunction} from "remotion";
import {Composition, Folder, staticFile} from "remotion";
import {defaultEpisode, FPS, getPlannedDuration, TRANSITION_FRAMES} from "./episode-data";
import {HistoryEpisode} from "./HistoryEpisode";
import {getMediaDuration} from "./media-metadata";
import type {HistoryEpisodeProps, SceneDurations} from "./types";

const scaleDurations = (durations: SceneDurations, targetTimelineFrames: number): SceneDurations => {
  const entries = Object.entries(durations) as Array<[keyof SceneDurations, number]>;
  const sourceTotal = entries.reduce((sum, [, value]) => sum + value, 0);
  const sequenceTarget = targetTimelineFrames + TRANSITION_FRAMES * 5;
  const scaled = Object.fromEntries(entries.map(([key, value]) => [
    key,
    Math.max(24, Math.round((value / sourceTotal) * sequenceTarget)),
  ])) as SceneDurations;
  const difference = sequenceTarget - Object.values(scaled).reduce((sum, value) => sum + value, 0);
  scaled.answer += difference;
  return scaled;
};

const calculateMetadata: CalculateMetadataFunction<HistoryEpisodeProps> = async ({props}) => {
  if (!props.voiceoverFile) {
    return {
      durationInFrames: getPlannedDuration(props.sceneDurations),
      defaultOutName: `${props.episodeId}.mp4`,
    };
  }
  const audioDuration = await getMediaDuration(staticFile(props.voiceoverFile));
  const minimumTimelineFrames = 24 * 6 - TRANSITION_FRAMES * 5;
  const durationInFrames = Math.max(minimumTimelineFrames, Math.ceil(audioDuration * FPS));
  return {
    durationInFrames,
    defaultOutName: `${props.episodeId}.mp4`,
    props: {...props, sceneDurations: scaleDurations(props.sceneDurations, durationInFrames)},
  };
};

export const RemotionRoot: React.FC = () => (
  <Folder name="历史冷知识模板">
    <Composition
      id="HistoryEpisodeFoundation"
      component={HistoryEpisode}
      durationInFrames={getPlannedDuration(defaultEpisode.sceneDurations)}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={defaultEpisode}
      calculateMetadata={calculateMetadata}
    />
  </Folder>
);
