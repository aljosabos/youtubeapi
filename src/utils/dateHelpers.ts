export const formatISOtoHumanReadable = (ISOTime: string) =>
  ISOTime.replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "");
