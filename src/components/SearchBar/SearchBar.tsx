import "./SearchBar.scss";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../Button/Button";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [, setSearchedTerm] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setSearchedTerm(searchValue);
      setSearchValue("");
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    setSearchedTerm(searchValue);
    setSearchValue("");
  };

  return (
    <div className="Searchbar">
      <TextField
        id="filled-search"
        placeholder="Search"
        type="search"
        value={searchValue}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        size="small"
        className="Searchbar__textfield "
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: "grey.500" }} fontSize="small" />
          ),
        }}
      />
      <Button
        startIcon={SearchIcon}
        className="Searchbar__button"
        onClick={handleClick}
      />
    </div>
  );
}
