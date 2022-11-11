import { useState } from "react";
import Grid from "layout/grid";
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
  return (
    <div className="app">
      {/* 背景层 */}
      <div className="layer-background"></div>
      {/* 动效层 */}
      <div className="layer-animation"></div>
      {/* 功能层 */}
      <div className="layer-features">
        <LanguageSwitch />
        {/* 网格堆积布局 */}
        <Grid setToast={setToast} />
      </div>
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
