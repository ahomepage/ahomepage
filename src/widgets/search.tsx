import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import GoogleIcon from "@mui/icons-material/Google";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from 'react-i18next';

function Search() {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="google">
        <GoogleIcon />
      </IconButton>
      {/* <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={10}
      >
        <MenuItem value={10}>百度</MenuItem>
        <MenuItem value={20}>必应</MenuItem>
        <MenuItem value={30}>谷歌</MenuItem>
      </Select> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t("searchInputPlaceholder")}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
export default Search;
