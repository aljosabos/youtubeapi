import Popover from "../../../components/Popover/Popover";
import Select from "../../../components/Select/Select";
import { MaterialIcon } from "../../../types/types";
import "./SettingsPopover.scss";

interface ISettingsPopoverProps {
  icon: MaterialIcon | string;
}

const selectItems = [
  { name: "English", value: "english" },
  { name: "German", value: "german" },
  { name: "Russian", value: "russian" },
];

export default function SettingsPopover({ icon }: ISettingsPopoverProps) {
  return (
    <Popover icon={icon}>
      <Select items={selectItems} />
    </Popover>
  );
}
