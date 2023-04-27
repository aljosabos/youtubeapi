import "./SearchBar.scss";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../Button/Button";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { searchVideosThunk } from "../../redux/thunks/searchVideosThunk";

export default function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  const [searchTerm, setSearchedTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm) {
      navigate({
        pathname: "results",
        search: createSearchParams({
          search_query: searchTerm,
        }).toString(),
      });
      // dispatch(searchVideosThunk(searchTerm));
    }
  }, [searchTerm]);

  const handleSubmit = () => {
    setSearchedTerm(value);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="Searchbar">
      <TextField
        id="filled-search"
        placeholder="Search"
        type="search"
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        size="small"
        className="Searchbar__textfield "
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: "grey.500" }} fontSize="small" />,
        }}
      />
      <Button startIcon={SearchIcon} className="Searchbar__button" onClick={handleSubmit} />
    </div>
  );
}
