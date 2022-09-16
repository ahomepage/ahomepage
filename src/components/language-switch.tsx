import IconButton from "@mui/material/IconButton";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";
export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  return (
    <IconButton onClick={() => i18n.changeLanguage("zh")}>
      <TranslateIcon></TranslateIcon>
    </IconButton>
  );
}
