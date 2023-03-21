export const formatISOtoHumanReadable = (ISOTime: string) =>
  ISOTime.replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "");

export const formatToThousands = (num: number) =>
  Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))
    : Math.sign(num) * Math.abs(num);
