import { useState } from "react";
import { useTranslation } from "react-i18next";
import { backgroundMemory } from "layer/background";

import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import {
  ViewQuilt,
  Palette,
  Widgets,
  ExpandLess,
  ExpandMore,
  Search,
  AccessTime,
  // CollectionsBookmark,
} from "@mui/icons-material";

interface Props {
  handleMenuItemClick: (menuName: string, submenuName?: string) => void;
}

const ContexMenuInner = ({ handleMenuItemClick }: Props) => {
  const { t } = useTranslation();
  const [collapseMenuName, setCollapseMenuName] = useState("");

  const colors = ["klein-blue", "hooks-green", "geek-black"];

  return (
    <List sx={{ width: 240 }} dense={true}>
      <ListItemButton onClick={() => handleMenuItemClick("layout")}>
        <ListItemIcon>
          <ViewQuilt fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("contextmenu.layout")}</ListItemText>
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setCollapseMenuName(collapseMenuName === "theme" ? "" : "theme");
        }}
      >
        <ListItemIcon>
          <Palette fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("contextmenu.theme")}</ListItemText>
        {collapseMenuName === "theme" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={collapseMenuName === "theme"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {colors.map((color) => (
            <ListItemButton
              key={`color_${color}`}
              selected={backgroundMemory.get() === `var(--color-${color})`}
              onClick={() => handleMenuItemClick("theme", color)}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <div
                  style={{
                    background: `var(--color-${color})`,
                    width: "16px",
                    height: "16px",
                  }}
                ></div>
              </ListItemIcon>
              <ListItemText>{t(`contextmenu.${color}`)}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <ListItemButton
        onClick={() => {
          setCollapseMenuName(collapseMenuName === "widgets" ? "" : "widgets");
        }}
      >
        <ListItemIcon>
          <Widgets fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("contextmenu.widgets")}</ListItemText>
        {collapseMenuName === "widgets" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={collapseMenuName === "widgets"}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding dense>
          <ListItemButton
            onClick={() => handleMenuItemClick("widgets", "search")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText>{t("contextmenu.searchBar")}</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => handleMenuItemClick("widgets", "clock")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText>{t("contextmenu.clock")}</ListItemText>
          </ListItemButton>
          {/* <ListItemButton
            onClick={() => handleMenuItemClick("widgets", "bookmark")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <CollectionsBookmark />
            </ListItemIcon>
            <ListItemText>{t('contextmenu.bookmark')}</ListItemText>
          </ListItemButton> */}
        </List>
      </Collapse>
    </List>
  );
};

export default ContexMenuInner;
