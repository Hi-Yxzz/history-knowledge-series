import {readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";

const allowedStatuses = new Set(["inventory"]);

export const validateTopics = (data) => {
  const errors = [];
  if (data?.version !== 1) errors.push("version must be 1");
  if (!Array.isArray(data?.topics)) return [...errors, "topics must be an array"];
  if (data.topics.length !== 10) errors.push(`topics must contain 10 entries, found ${data.topics.length}`);

  const ids = new Set();
  for (const [index, topic] of data.topics.entries()) {
    const expectedNumber = index + 1;
    const label = `topics[${index}]`;
    if (topic?.number !== expectedNumber) errors.push(`${label}.number must be ${expectedNumber}`);
    if (typeof topic?.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id)) {
      errors.push(`${label}.id must be a non-empty kebab-case string`);
    } else if (ids.has(topic.id)) {
      errors.push(`${label} has duplicate id ${topic.id}`);
    } else {
      ids.add(topic.id);
    }
    const expectedDirectory = `${String(expectedNumber).padStart(2, "0")}-${topic?.id ?? ""}`;
    if (topic?.directory !== expectedDirectory) errors.push(`${label}.directory must be ${expectedDirectory}`);
    if (typeof topic?.title !== "string" || topic.title.trim() === "") errors.push(`${label}.title must be non-empty`);
    if (!allowedStatuses.has(topic?.status)) errors.push(`${label}.status must be inventory`);
  }

  return errors;
};

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  try {
    const url = new URL("../series/topics.json", import.meta.url);
    const data = JSON.parse(await readFile(url, "utf8"));
    const errors = validateTopics(data);
    if (errors.length > 0) {
      for (const error of errors) console.error(`ERROR ${error}`);
      process.exitCode = 1;
    } else {
      console.log(`PASS topics=${data.topics.length}`);
    }
  } catch (error) {
    console.error(`ERROR ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
