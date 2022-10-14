import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Button, IconButton } from "@mui/material";
import {
  DeleteOutline,
} from "@mui/icons-material";

import Search from "widgets/search";

import { size, config } from "config";

import { Widgets, WidgetsReturn } from "lib";
let widgetsInstance = new Widgets();
interface Props {
  setToast?: any;
}
// type WidgetOption = "minW" | "maxW" | "minH" | "maxH";
interface WidgetItem {
  name: string;
  key: string;
  storage?: string;
}

const ReactGridLayout = WidthProvider(Responsive);

function Grid({ setToast }: Props) {
  const { t } = useTranslation();

  const widgetsMap: Record<string, any> = {
    search: Search,
  };

  /* layouts */
  const [layoutsRef, setLayoutsRef] = useState<GridLayout.Layouts>(
    widgetsInstance.get().layouts
  );
  /* widgets */
  const [widgetsRef, setWidgetsRef] = useState<WidgetItem[]>(
    widgetsInstance.get().widgets
  );
  const setWidgetsState = ({ widgets, layouts }: WidgetsReturn) => {
    console.log(JSON.stringify(widgets))
    setWidgetsRef(widgets);
    setLayoutsRef(layouts);
  };

  const addWidget = (name: string, storage: string) => {
    setWidgetsState(widgetsInstance.add(name, storage));
  };
  const removeWidget = (key: string) => {
    setWidgetsState(widgetsInstance.remove(key));
  };

  const handleLayoutChange = (
    _: GridLayout.Layout[],
    _layouts: GridLayout.Layouts
  ) => {
    console.log('handleLayoutChange', JSON.stringify(_))
    setLayoutsRef(widgetsInstance.setLayouts(_layouts).layouts);
  };

  /* computed current breakpoint */
  const currentBreakpoint = (Responsive as any).utils.getBreakpointFromWidth(
    size.breakpoints,
    config.initWidth
  );
  const [breakpointName, setBreakpointName] =
    useState<size.Breakpoint>(currentBreakpoint);

  let handleBreakPointChange = (breakpoint: size.Breakpoint) => {
    setBreakpointName(breakpoint);
    setToast({
      open: true,
      message: t(`toggleSizeTips.${breakpoint}`),
      autoHideDuration: 3000,
    });
  };
  return (
    <div>
      <Button onClick={() => addWidget("search", "")}>Click me</Button>
      {Object.keys(layoutsRef).map((key) => layoutsRef[key].length)}
      {widgetsRef.length}
      <ReactGridLayout
        className="layout"
        layouts={layoutsRef}
        rowHeight={config.rowHeight}
        compactType={null}
        preventCollision={true}
        breakpoints={size.breakpoints}
        cols={size.cols}
        onBreakpointChange={handleBreakPointChange}
        onLayoutChange={handleLayoutChange}
      >
        {widgetsRef.map((widget) => (
          <div key={widget.key}>
            {React.createElement(widgetsMap[widget.name], {
              x: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                ?.x,
              y: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                ?.y,
              w: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                ?.w,
              h: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                ?.h,
            })}
            <IconButton
              color="error"
              style={{
                position: "absolute",
                right: "-0.5em",
                top: "-0.5em",
                zIndex: 1,
              }}
              onClick={() => {
                removeWidget(widget.key);
              }}
            >
              <DeleteOutline />
            </IconButton>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
export default Grid;
