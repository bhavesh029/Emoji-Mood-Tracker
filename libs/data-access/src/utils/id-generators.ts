import ShortUniqueId from "short-unique-id";

export function generateUserId() {
  const codePrefix = new ShortUniqueId({
    length: 4,
    dictionary: "alpha_upper",
  });

  const codeSuffix = new ShortUniqueId({
    length: 6,
    dictionary: "number",
  });
  return "U" + codePrefix().replace(/(.{3})/g, "$1-") + codeSuffix();
}

export function generateMoodId() {
  const codePrefix = new ShortUniqueId({
    length: 5,
    dictionary: "alpha_upper",
  });

  const codeSuffix = new ShortUniqueId({
    length: 6,
    dictionary: "number",
  });
  return "M" + codePrefix().replace(/(.{3})/g, "$1-") + codeSuffix();
}
