import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
// import { Popover } from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import GoogleIcon from "@mui/icons-material/Google";
import SearchIcon from "@mui/icons-material/Search";
import ContentCut from "@mui/icons-material/ContentCut";

import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

import { GridStackWidget } from "gridstack";

interface Props {
  setWidgetOption?: (option: GridStackWidget) => void;
}

function Search({ setWidgetOption }: Props) {
  const { t } = useTranslation();
  const searchButton = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openEngine = Boolean(anchorEl);
  const openSwitchSearchEngine = () => {
    setAnchorEl(searchButton.current);
  };
  const closeSwitchSearchEngine = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setWidgetOption && setWidgetOption({
      minW: 3,
      maxW: 12,
      minH: 1,
      maxH: 2,
    });
  }, []);

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <IconButton
        ref={searchButton}
        sx={{ p: "10px" }}
        size="large"
        aria-label="google"
        onClick={openSwitchSearchEngine}
      >
        <GoogleIcon fontSize="inherit" />
      </IconButton>

      <Menu
        onClose={closeSwitchSearchEngine}
        onClick={closeSwitchSearchEngine}
        anchorEl={anchorEl}
        open={openEngine}
      >
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>{/* <ContentCopy fontSize="small" /> */}</ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>{/* <ContentPaste fontSize="small" /> */}</ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem>
        {/* <Divider /> */}
        <MenuItem>
          <ListItemIcon>{/* <Cloud fontSize="small" /> */}</ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </Menu>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t("searchInputPlaceholder")}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        size="large"
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Paper>
  );
}
export default Search;
