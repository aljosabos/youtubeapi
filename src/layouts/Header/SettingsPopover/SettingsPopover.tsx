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
}

const languages = [
  { name: "English", value: "en" },
  { name: "German", value: "de" },
  { name: "Russian", value: "ru" },
];

export default function SettingsPopover({ icon }: ISettingsPopoverProps) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(languageSelector);
  const [value, setValue] = useState(currentLanguage);

  const selectedLanguage = languages.find((language) => language.value === currentLanguage);

  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value);
    i18n.changeLanguage(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="SettingsPopover">
      <Popover icon={icon}>
        <h4 className="SettingsPopover__heading">Settings</h4>
        <Select onChange={handleChange} value={value} items={languages} selectedItem={selectedLanguage} label="Language" />
        <p style={{ fontSize: "12px" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, dolores?</p>
      </Popover>
    </div>
  );
}
