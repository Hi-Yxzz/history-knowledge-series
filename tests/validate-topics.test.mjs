import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";
import {validateTopics} from "../scripts/validate-topics.mjs";

const expectedIds = [
  "ancient-ice",
  "ancient-alarm",
  "ancient-teeth",
  "roman-toilet",
  "roman-heating",
  "ancient-lighting",
  "ancient-food-storage",
  "roman-baths",
  "ancient-locks",
  "ancient-mail",
];

test("the production inventory contains ten valid, ordered topics", async () => {
  const raw = await readFile(new URL("../series/topics.json", import.meta.url), "utf8");
  const data = JSON.parse(raw);

  assert.deepEqual(validateTopics(data), []);
  assert.deepEqual(data.topics.map(({id}) => id), expectedIds);
});

test("validation reports duplicate IDs and invalid directory names", () => {
  const data = {
    version: 1,
    topics: [
      {number: 1, id: "ancient-ice", directory: "01-wrong", title: "题目", status: "inventory"},
      {number: 2, id: "ancient-ice", directory: "02-ancient-ice", title: "", status: "draft"},
    ],
  };

  const errors = validateTopics(data);
  assert.ok(errors.some((error) => error.includes("directory")));
  assert.ok(errors.some((error) => error.includes("duplicate id")));
  assert.ok(errors.some((error) => error.includes("title")));
  assert.ok(errors.some((error) => error.includes("status")));
});
