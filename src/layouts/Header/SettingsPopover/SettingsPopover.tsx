import { SelectChangeEvent } from "@mui/material";
import Popover from "../../../components/Popover/Popover";
import Select from "../../../components/Select/Select";
import i18n from "../../../i18n";
import { MaterialIcon } from "../../../types/types";
import "./SettingsPopover.scss";
import { useState } from "react";

interface ISettingsPopoverProps {
  icon: MaterialIcon | string;
}

const languageOptions = [
  { name: "English", value: "en" },
  { name: "German", value: "de" },
  { name: "Russian", value: "ru" },
];

export default function SettingsPopover({ icon }: ISettingsPopoverProps) {
  const [language, setLanguage] = useState("");

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
    changeLanguage(e.target.value);
  };

  return (
    <div className="SettingsPopover">
      <Popover icon={icon}>
        <h4 className="SettingsPopover__heading">Settings</h4>
        <Select onChange={handleChange} value={language} items={languageOptions} label="Language" />
        <p style={{ fontSize: "12px" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, dolores?</p>
      </Popover>
    </div>
  );
}
