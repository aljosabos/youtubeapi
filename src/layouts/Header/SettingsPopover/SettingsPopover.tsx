import { SelectChangeEvent } from "@mui/material";
import Popover from "../../../components/Popover/Popover";
import Select from "../../../components/Select/Select";
import i18n from "../../../i18n";
import { MaterialIcon } from "../../../types/types";
import "./SettingsPopover.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { changeLanguage, languageSelector } from "../../../redux/slices/settingsSlice";

interface ISettingsPopoverProps {
  icon: MaterialIcon | string;
  username: string;
  userAvatar: string;
  isLoggedIn: boolean;
}

const languages = [
  { name: "English", value: "en" },
  { name: "German", value: "de" },
  { name: "Russian", value: "ru" },
];

export default function SettingsPopover({ icon, username, userAvatar, isLoggedIn }: ISettingsPopoverProps) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(languageSelector);

  const [selectValue, setSelectValue] = useState(currentLanguage);

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

        <Select onChange={handleChange} value={selectValue} items={languages} label="Language" />

        <p style={{ fontSize: "12px" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, dolores?</p>
      </Popover>
    </div>
  );
}
