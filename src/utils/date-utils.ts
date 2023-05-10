import moment from "moment";
import i18n from "i18next";
import "moment/locale/ru";
import "moment/locale/de";

export const formatISOtoHumanReadable = (ISOTime: string) => {
  const duration = moment.duration(ISOTime);

  return moment
    .utc(duration.asMilliseconds())
    .format(duration.hours() > 0 ? "HH:mm:ss" : "mm:ss");
};

export const formatToThousandsWithOneDecimal = (num: number) =>
  Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))
    : Math.sign(num) * Math.abs(num);

export const translateDateToCurrentLanguage = (date: string) => {
  const currentLanguage = i18n.language;
  moment.locale(currentLanguage);

  return moment(date).fromNow();
};
