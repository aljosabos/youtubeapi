import "./SearchBar.scss";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  console.log(searchValue);
  return (
    <div className="Searchbar">
      <TextField
        id="filled-search"
        label={!searchValue ? "Search" : ""}
        type="search"
        value={searchValue}
        onChange={handleOnChange}
        size="small"
        className="Searchbar__textfield"
      />
    </div>
  );
}
