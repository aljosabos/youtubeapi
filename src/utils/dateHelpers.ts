import moment from "moment";

export const formatISOtoHumanReadable = (ISOTime: string) => {
  const duration = moment.duration(ISOTime);

  return moment.utc(duration.asMilliseconds()).format(duration.hours() > 0 ? "HH:mm:ss" : "mm:ss");
};

export const formatNumToThousands = (num: number) =>
  Math.abs(num) > 999 ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) : Math.sign(num) * Math.abs(num);
