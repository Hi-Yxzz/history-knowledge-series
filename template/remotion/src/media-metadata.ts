import {ALL_FORMATS, Input, UrlSource} from "mediabunny";

export const getMediaDuration = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {getRetryDelay: () => null}),
  });
  return input.computeDuration();
};
