import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SearchIcon from "@mui/icons-material/Search";

import { useTranslation } from "react-i18next";
import { KeyboardEventHandler, useRef, useState } from "react";
import baidu from "assets/baidu.svg";
import github from "assets/github.svg";
import google from "assets/google.svg";
import zhihu from "assets/zhihu.svg";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
}

function Search({ x, y, w, h }: Props) {
  const { t } = useTranslation();
  const searchButton = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openEngine = Boolean(anchorEl);

  /* 关键字 */
  const [keyword, setKeyword] = useState("");

  /* 搜索引擎列表 */
  const [engines, setEngines] = useState([
    {
      icon: google,
      name: "google",
      url: "https://www.google.com/search?q=",
    },
    {
      icon: baidu,
      name: "baidu",
      url: "https://www.baidu.com/s?wd=",
    },
    {
      icon: github,
      name: "github",
      url: "https://github.com/search?q=",
    },
    {
      icon: zhihu,
      name: "zhihu",
      url: "https://www.zhihu.com/search?type=content&q=",
    },
    {
      icon: 'https://so.woa.com/static/favicon.png',
      name: "isearch",
      url: "https://so.woa.com/#/search?query=",
    },
  ]);
  const [currentEngine, setCurrentEngine] = useState(engines[0]);

  /* 打开/收起搜索引擎选择框 */
  const openSwitchSearchEngine = () => {
    setAnchorEl(searchButton.current);
  };
  const closeSwitchSearchEngine = () => {
    setAnchorEl(null);
  };

  /* 切换搜索引擎 */
  const handleSwitchSearchEngine = (engine: typeof engines[0]) => {
    setCurrentEngine(engine);
  };

  /* 搜索 */
  const handleSearch = () => {
    window.open(`${currentEngine.url}${keyword}`);
  };

  /* Input 框中的键盘事件 */
  const handleKeyDownWithInput: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    switch (event.code) {
      case "Tab":
        let currentEngineIndex = engines.findIndex(
          (engine) => engine.name === currentEngine.name
        );
        const targetIndex =
          currentEngineIndex > engines.length - 2 ? 0 : currentEngineIndex + 1;
        setCurrentEngine(engines[targetIndex]);
        event.preventDefault();
        break;
      case "Enter":
        handleSearch();
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        // background: "transparent",
      }}
      elevation={0}
    >
      <IconButton
        ref={searchButton}
        sx={{ p: `${h * 10}px` }}
        aria-label="google"
        onClick={openSwitchSearchEngine}
      >
        <img
          src={currentEngine.icon}
          width={h * 24}
          height={h * 24}
          alt=""
        />
      </IconButton>

      <Menu
        onClose={closeSwitchSearchEngine}
        onClick={closeSwitchSearchEngine}
        anchorEl={anchorEl}
        open={openEngine}
      >
        {engines.map((engine) => (
          <MenuItem
            key={engine.name}
            onClick={() => handleSwitchSearchEngine(engine)}
          >
            <ListItemIcon>
              <img src={engine.icon} width="20" height="20" alt="" />
            </ListItemIcon>
            <ListItemText>{t(`search.${engine.name}`)}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: `${h * 14}px` }}
        placeholder={t("search.placeholder")}
        value={keyword}
        inputProps={{ "aria-label": "search content" }}
        onKeyDown={handleKeyDownWithInput}
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
      />
      <IconButton
        type="button"
        sx={{
          p: `${h * 10}px`,
          fontSize: `${h * 24}px`,
        }}
        aria-label="search"
      >
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Paper>
  );
}
Search.minW = 4;
Search.maxW = 12;
Search.minH = 1;
Search.maxH = 2;
Search.lg = {
  minW: 6,
};
Search.md = {
  minW: 3,
};
Search.sm = {
  minW: 2,
};
export default Search;
