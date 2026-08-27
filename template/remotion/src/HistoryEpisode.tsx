import {Audio} from "@remotion/media";
import {TransitionSeries, linearTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {useEffect, useState} from "react";
import {AbsoluteFill, staticFile} from "remotion";
import {useDelayRender} from "remotion";
import {CaptionTrack} from "./components/CaptionTrack";
import {TRANSITION_FRAMES} from "./episode-data";
import {AnswerScene} from "./scenes/AnswerScene";
import {BoundaryScene} from "./scenes/BoundaryScene";
import {EvidenceScene} from "./scenes/EvidenceScene";
import {HookScene} from "./scenes/HookScene";
import {ProcessScene} from "./scenes/ProcessScene";
import {RestorationScene} from "./scenes/RestorationScene";
import type {HistoryEpisodeProps} from "./types";

const transition = linearTiming({durationInFrames: TRANSITION_FRAMES});
const FONT_FAMILY = '"Noto Sans SC Variable", "PingFang SC", sans-serif';
const TEMPLATE_FONT_SAMPLE = [
  "六段式历史解说钩子真实证据过程解释复原画面事实边界直接答案",
  "等待接入真实画面真实素材接入位候选素材待作者授权已获授权开放许可",
  "档案素材复原动画示意核心过程冰不是夏天造出来的皇家制度不等于所有古人的日常",
  "详细来源将在正式单期的来源尾页列出AI历史场景或器物复原图",
].join("");

export const HistoryEpisode: React.FC<HistoryEpisodeProps> = (props) => {
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [fontHandle] = useState(() => delayRender("Loading bundled Chinese font"));

  useEffect(() => {
    const text = `${TEMPLATE_FONT_SAMPLE}${props.title}${props.directAnswer}${props.footage.label}`;
    Promise.all([
      document.fonts.load(`400 56px ${FONT_FAMILY}`, text),
      document.fonts.load(`800 56px ${FONT_FAMILY}`, text),
      document.fonts.load(`900 84px ${FONT_FAMILY}`, text),
    ]).then(() => continueRender(fontHandle)).catch(cancelRender);
  }, [cancelRender, continueRender, fontHandle, props.directAnswer, props.footage.label, props.title]);

  return <AbsoluteFill style={{fontFamily: FONT_FAMILY}}>
    <TransitionSeries name="六段式历史解说">
      <TransitionSeries.Sequence name="01 钩子" durationInFrames={props.sceneDurations.hook}>
        <HookScene title={props.title} accent={props.accent} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={transition} />
      <TransitionSeries.Sequence name="02 真实证据" durationInFrames={props.sceneDurations.evidence}>
        <EvidenceScene footage={props.footage} accent={props.accent} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={transition} />
      <TransitionSeries.Sequence name="03 过程解释" durationInFrames={props.sceneDurations.process}>
        <ProcessScene accent={props.accent} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={transition} />
      <TransitionSeries.Sequence name="04 复原画面" durationInFrames={props.sceneDurations.restoration}>
        <RestorationScene accent={props.accent} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={transition} />
      <TransitionSeries.Sequence name="05 事实边界" durationInFrames={props.sceneDurations.boundary}>
        <BoundaryScene accent={props.accent} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={transition} />
      <TransitionSeries.Sequence name="06 直接答案" durationInFrames={props.sceneDurations.answer}>
        <AnswerScene answer={props.directAnswer} accent={props.accent} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {props.voiceoverFile ? <Audio src={staticFile(props.voiceoverFile)} /> : null}
    <CaptionTrack captionsFile={props.captionsFile} accent="#e1b35d" />
  </AbsoluteFill>;
};
