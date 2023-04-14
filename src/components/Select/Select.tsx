import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import MaterialSelect from "@mui/material/Select";
import "./Select.scss";

interface ISelectProps {
  value?: string;
  items: Array<{ name: string; value: string }>;
  selectedItem?: { name: string; value: string };
  label?: string;
  onChange?: (e: SelectChangeEvent) => void;
  variant?: "filled" | "outlined" | "standard";
}

export default function Select({ value, items, selectedItem, label, onChange, variant = "standard" }: ISelectProps) {
  return (
    <div className="Select">
      <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }} className="Select__group">
        <InputLabel id="select-label" className="Select__label">
          {label}
        </InputLabel>

        <MaterialSelect labelId="select-label" id="select-label" value={value} onChange={onChange} label="Age" className="Select__input">
          {items?.map(({ name, value }) => (
            <MenuItem value={value} key={value} className="Select__menu-item">
              {name}
            </MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    </div>
  );
}
