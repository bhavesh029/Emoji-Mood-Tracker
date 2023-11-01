import ShortUniqueId from "short-unique-id";

export function generateuserId() {
  const codePrefix = new ShortUniqueId({
    length: 4,
    dictionary: "alpha_upper",
  });

  const codeSuffix = new ShortUniqueId({
    length: 6,
    dictionary: "number",
  });
  return "P" + codePrefix().replace(/(.{3})/g, "$1-") + codeSuffix();
}

export function generateCustomerId() {
  const codePrefix = new ShortUniqueId({
    length: 5,
    dictionary: "alpha_upper",
  });

  const codeSuffix = new ShortUniqueId({
    length: 6,
    dictionary: "number",
  });
  return "C" + codePrefix().replace(/(.{3})/g, "$1-") + codeSuffix();
}

export function generateShopId() {
  const codePrefix = new ShortUniqueId({
    length: 4,
    dictionary: "alpha_upper",
  });

  const codeSuffix = new ShortUniqueId({
    length: 6,
    dictionary: "number",
  });
  return "SH-" + codePrefix().replace(/(.{3})/g, "$1-") + codeSuffix();
}

export function generateJoiningCode(): string {
  return new ShortUniqueId({
    length: 6,
    dictionary: "alphanum_upper",
  })();
}
