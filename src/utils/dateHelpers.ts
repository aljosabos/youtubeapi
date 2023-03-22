export const formatISOtoHumanReadable = (ISOTime: string) => {
  // adds zero infront of seconds if less then 10 (for eample 09 instead of 9)
  const formatedSeconds = ISOTime.split("M")
    .pop()
    ?.replace("PT", "")
    .replace("S", "")
    .padStart(2, "0");

  const timeWithoutSeconds = ISOTime.replace("PT", "")
    .replace("H", ":")
    .split("M")
    .slice(0, -1)[0];

  // if there are no minutes in ISO format, show 0 minutes
  const formatedMinutes = timeWithoutSeconds ? timeWithoutSeconds : "0";

  return formatedMinutes + ":" + formatedSeconds;
};

export const formatToThousands = (num: number) =>
  Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))
    : Math.sign(num) * Math.abs(num);
