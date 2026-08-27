import {createTikTokStyleCaptions, type Caption, type TikTokPage} from "@remotion/captions";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";

const SWITCH_CAPTIONS_EVERY_MS = 1200;

const CaptionPage: React.FC<{page: TikTokPage; accent: string}> = ({page, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;
  return (
    <AbsoluteFill style={{justifyContent: "flex-end", alignItems: "center", padding: "0 100px 72px"}}>
      <div
        style={{
          maxWidth: 1540,
          padding: "18px 30px 22px",
          backgroundColor: "rgba(19,18,15,0.88)",
          color: "#fff",
          fontSize: 56,
          fontWeight: 800,
          lineHeight: 1.35,
          textAlign: "center",
          whiteSpace: "pre-wrap",
        }}
      >
        {page.tokens.map((token) => {
          const active = token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
          return <span key={`${token.fromMs}-${token.toMs}`} style={{color: active ? accent : "#fff"}}>{token.text}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};

export const CaptionTrack: React.FC<{captionsFile: string; accent: string}> = ({
  captionsFile,
  accent,
}) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender("Loading caption JSON"));

  const loadCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(captionsFile));
      if (!response.ok) throw new Error(`caption request failed: ${response.status}`);
      const value = await response.json();
      if (!Array.isArray(value)) throw new Error("captions JSON must be an array");
      await document.fonts.load(
        '800 56px "Noto Sans SC Variable"',
        value.map((caption: Caption) => caption.text).join(""),
      );
      setCaptions(value as Caption[]);
      continueRender(handle);
    } catch (error) {
      cancelRender(error);
    }
  }, [cancelRender, captionsFile, continueRender, handle]);

  useEffect(() => {
    loadCaptions();
  }, [loadCaptions]);

  const pages = useMemo(() => captions
    ? createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages
    : [], [captions]);
  const {fps} = useVideoConfig();

  if (!captions) return null;
  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.floor((page.startMs / 1000) * fps);
        const naturalEndMs = nextPage?.startMs ?? Math.max(...page.tokens.map((token) => token.toMs));
        const endFrame = Math.ceil((naturalEndMs / 1000) * fps);
        const durationInFrames = endFrame - startFrame;
        if (durationInFrames <= 0) return null;
        return (
          <Sequence
            key={`${page.startMs}-${index}`}
            from={startFrame}
            durationInFrames={durationInFrames}
            premountFor={fps}
          >
            <CaptionPage page={page} accent={accent} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
