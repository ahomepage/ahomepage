import { useState } from "react";
import Grid from "layer/grid";
import Animation from "layer/animation";
import Background from "layer/background";
import LanguageSwitch from "components/language-switch";
import { Snackbar, Alert, AlertColor } from "@mui/material";

import "App.css";

function App() {
  const [toast, setToast] = useState<{
    open: boolean;
    message?: string;
    severity?: AlertColor;
  }>({
    open: false,
  });
  let handleToastClose = () => {
    setToast({
      ...toast,
      open: false,
    });
  };

  const [background, setBackground] = useState("");

  return (
    <div className="app">
      {/* 背景层 */}
      <Background value={background}></Background>
      {/* 动效层 */}
      <div className="layer-animation">{/* <Animation></Animation> */}</div>
      {/* 功能层 */}
      {/* <LanguageSwitch /> */}
      {/* 网格堆积布局 */}
      <Grid setBackground={setBackground} setToast={setToast} />
      {/* 提示信息 */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleToastClose}
        {...toast}
      >
        <Alert severity={toast.severity || "info"} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
