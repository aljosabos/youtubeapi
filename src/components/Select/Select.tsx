import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import MaterialSelect from "@mui/material/Select";
import "./Select.scss";

interface ISelectProps {
  items: Array<{ name: string; value: string }>;
  selectedItem?: { name: string; value: string };
  label?: string;
  onChange?: () => void;
  variant?: "filled" | "outlined" | "standard";
}

export default function Select({ items, selectedItem, label, onChange, variant = "standard" }: ISelectProps) {
  const [value, setValue] = React.useState(selectedItem ? selectedItem.value : "");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div className="Select">
      <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }} className="Select__group">
        <InputLabel id="demo-simple-select-standard-label" className="Select__label">
          {label}
        </InputLabel>
        <MaterialSelect
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Age"
          className="Select__input"
        >
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
