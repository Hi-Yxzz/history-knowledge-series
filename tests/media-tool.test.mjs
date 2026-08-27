import test from "node:test";
import assert from "node:assert/strict";
import {buildTrimArgs, parseTimecode, validateRange} from "../scripts/media-tool.mjs";

test("parseTimecode accepts seconds, MM:SS and HH:MM:SS milliseconds", () => {
  assert.equal(parseTimecode("12.5"), 12.5);
  assert.equal(parseTimecode("01:02.500"), 62.5);
  assert.equal(parseTimecode("01:02:03,250"), 3723.25);
});

test("validateRange rejects inverted and out-of-bounds ranges", () => {
  assert.throws(() => validateRange({start: "00:10", end: "00:09", mediaDuration: 20}));
  assert.throws(() => validateRange({start: "00:10", end: "00:21", mediaDuration: 20}));
  assert.deepEqual(
    validateRange({start: "00:03.5", end: "00:08", mediaDuration: 20}),
    {startSeconds: 3.5, endSeconds: 8, durationSeconds: 4.5},
  );
});

test("buildTrimArgs always re-encodes exact clips", () => {
  assert.deepEqual(buildTrimArgs({
    input: "source.mp4",
    output: "clip.mp4",
    startSeconds: 3.5,
    durationSeconds: 4.5,
  }), [
    "-y", "-ss", "3.500", "-i", "source.mp4", "-t", "4.500",
    "-c:v", "libx264", "-c:a", "aac", "-pix_fmt", "yuv420p", "clip.mp4",
  ]);
});
