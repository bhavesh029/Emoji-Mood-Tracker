export function prepMsg(prefix: string, msg?: string): string {
  if (msg != undefined) {
    return `${prefix} | ${msg}`;
  } else {
    return prefix;
  }
}
