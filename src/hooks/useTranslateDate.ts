import i18n from "i18next";
import moment from "moment";
import "moment/locale/ru";
import "moment/locale/de";
import { useEffect } from "react";

export const useTranslateDate = (date: string) => {
  const currentLanguage = i18n.language;
  useEffect(() => {
    if (currentLanguage) {
      moment.locale(currentLanguage);
    }
  }, [currentLanguage]);

  return {
    translatedDate: moment(date).fromNow(),
  };
};
