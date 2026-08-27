import {existsSync, mkdirSync} from "node:fs";
import {spawnSync} from "node:child_process";
import {dirname, isAbsolute, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const remotionBinary = join(
  repositoryRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "remotion.cmd" : "remotion",
);

export const parseTimecode = (value) => {
  const normalized = String(value).trim().replace(",", ".");
  if (!normalized) throw new Error("timecode must not be empty");
  const parts = normalized.split(":").map(Number);
  if (parts.some((part) => !Number.isFinite(part) || part < 0)) {
    throw new Error(`invalid timecode: ${value}`);
  }
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  throw new Error(`invalid timecode: ${value}`);
};

export const validateRange = ({start, end, mediaDuration}) => {
  const startSeconds = parseTimecode(start);
  const endSeconds = parseTimecode(end);
  if (endSeconds <= startSeconds) {
    throw new Error(`end time must be after start time: ${start} -> ${end}`);
  }
  if (Number.isFinite(mediaDuration) && endSeconds > mediaDuration + 0.05) {
    throw new Error(
      `trim end ${endSeconds.toFixed(3)}s exceeds media duration ${mediaDuration.toFixed(3)}s`,
    );
  }
  return {startSeconds, endSeconds, durationSeconds: endSeconds - startSeconds};
};

export const buildTrimArgs = ({input, output, startSeconds, durationSeconds}) => [
  "-y",
  "-ss",
  startSeconds.toFixed(3),
  "-i",
  input,
  "-t",
  durationSeconds.toFixed(3),
  "-c:v",
  "libx264",
  "-c:a",
  "aac",
  "-pix_fmt",
  "yuv420p",
  output,
];

const runRemotionTool = (tool, args) => {
  if (!existsSync(remotionBinary)) {
    throw new Error("Remotion is not installed. Run npm install first.");
  }
  const result = spawnSync(remotionBinary, [tool, ...args], {
    cwd: repositoryRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || `${tool} failed`).trim());
  }
  return result.stdout;
};

export const probeMedia = (inputPath) => {
  const input = isAbsolute(inputPath) ? inputPath : resolve(process.cwd(), inputPath);
  if (!existsSync(input)) throw new Error(`media file does not exist: ${input}`);
  const stdout = runRemotionTool("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration:stream=index,codec_type,codec_name,width,height,r_frame_rate",
    "-of",
    "json",
    input,
  ]);
  return JSON.parse(stdout);
};

export const trimMedia = ({inputPath, outputPath, start, end}) => {
  const input = isAbsolute(inputPath) ? inputPath : resolve(process.cwd(), inputPath);
  const output = isAbsolute(outputPath) ? outputPath : resolve(process.cwd(), outputPath);
  const metadata = probeMedia(input);
  const mediaDuration = Number(metadata?.format?.duration);
  const range = validateRange({start, end, mediaDuration});
  mkdirSync(dirname(output), {recursive: true});
  runRemotionTool("ffmpeg", buildTrimArgs({
    input,
    output,
    startSeconds: range.startSeconds,
    durationSeconds: range.durationSeconds,
  }));
  return {input, output, ...range, metadata};
};

const usage = () => {
  console.error("Usage:");
  console.error("  npm run media:probe -- <input.mp4>");
  console.error("  npm run media:trim -- <input.mp4> <output.mp4> <start> <end>");
};

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  try {
    const [command, ...args] = process.argv.slice(2);
    if (command === "probe" && args.length === 1) {
      console.log(JSON.stringify(probeMedia(args[0]), null, 2));
    } else if (command === "trim" && args.length === 4) {
      console.log(JSON.stringify(trimMedia({
        inputPath: args[0],
        outputPath: args[1],
        start: args[2],
        end: args[3],
      }), null, 2));
    } else {
      usage();
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(`ERROR ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
