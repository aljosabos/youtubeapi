import { SelectChangeEvent } from "@mui/material";
import Popover from "../../../components/Popover/Popover";
import Select from "../../../components/Select/Select";
import i18n from "../../../i18n";
import { MaterialIcon } from "../../../types/types";
import "./SettingsPopover.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { changeLanguage, languageSelector } from "../../../redux/slices/settingsSlice";
import { useTranslation } from "react-i18next";

interface ISettingsPopoverProps {
  icon: MaterialIcon | string;
  username: string;
  userAvatar: string;
  isLoggedIn: boolean;
}

export default function SettingsPopover({ icon, username, userAvatar, isLoggedIn }: ISettingsPopoverProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(languageSelector);

  const [selectValue, setSelectValue] = useState(currentLanguage);

  const languages = [
    { name: t("settingsPopover.lang.en"), value: "en" },
    { name: t("settingsPopover.lang.de"), value: "de" },
    { name: t("settingsPopover.lang.ru"), value: "ru" },
  ];

  const handleChange = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value);
    i18n.changeLanguage(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="SettingsPopover">
      <Popover icon={icon}>
        {isLoggedIn && (
          <div className="SettingsPopover__user-info">
            <span className="SettingsPopover__user-info-name">{username}</span>

            <img src={userAvatar} alt="User_avatar" className="SettingsPopover__user-info-avatar" />
          </div>
        )}

        <Select onChange={handleChange} value={selectValue} items={languages} label={t("settingsPopover.selectLabel.lang")} />

        <p style={{ fontSize: "12px" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, dolores?</p>
      </Popover>
    </div>
  );
}
