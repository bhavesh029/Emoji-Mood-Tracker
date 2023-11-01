export {};

// DATE EXTENSIONS
// ================

declare global {
  interface Date {
    toLocaleIsoString(): string;
  }
}

Date.prototype.toLocaleIsoString = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const date = this;
  if (date instanceof Date) {
    return date.toLocaleString('sv-SE');
  } else {
    throw new Error('Invalid usage of extension');
  }
};

// EOF
