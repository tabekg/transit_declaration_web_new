export const PLATFORM =
  navigator.userAgent.indexOf("Mac OS X") != -1 ? "MACOSX" : "WINDOWS";

export const strToInt = (s: string) => {
  return PLATFORM === "MACOSX"
    ? +s.replaceAll(" ", "").replaceAll(",", "")
    : +s.replaceAll(" ", "").replaceAll(",", ".");
};
