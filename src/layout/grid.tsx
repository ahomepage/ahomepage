import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Button, IconButton } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

import WidgetWrap from "components/widget-wrap";

import widgetsMap from "widgetsMap";

import { size, config } from "config";

import { WidgetsModel, WidgetsReturn } from "lib";
let widgetsInstance = new WidgetsModel(undefined, undefined, widgetsMap);
interface Props {
  setToast?: any;
}

export interface WidgetProps {
  storage: string;
  setStorage: (storage: string) => void;
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface WidgetItem {
  name: string;
  key: string;
  storage?: string;
}

const ReactGridLayout = WidthProvider(Responsive);

function Grid({ setToast }: Props) {
  const { t } = useTranslation();
  /* is editing ? */
  const [editing, setEditing] = useState(false);

  /* layouts */
  const [layoutsRef, setLayoutsRef] = useState<GridLayout.Layouts>(
    widgetsInstance.get().layouts
  );
  /* widgets */
  const [widgetsRef, setWidgetsRef] = useState<WidgetItem[]>(
    widgetsInstance.get().widgets
  );
  const setWidgetsState = ({ widgets, layouts }: WidgetsReturn) => {
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
    console.log("handleLayoutChange", JSON.stringify(_));
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
      <Button onClick={() => addWidget("search", "")}>search</Button>
      <Button onClick={() => addWidget("note", "")}>note</Button>
      <Button onClick={() => setEditing(!editing)}>
        <EditOutlined></EditOutlined>
      </Button>
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
        // isBounded={true}
        isDraggable={editing}
        isResizable={editing}
        onBreakpointChange={handleBreakPointChange}
        onLayoutChange={handleLayoutChange}
      >
        {widgetsRef.map((widget) => (
          <div key={widget.key}>
            <WidgetWrap
              editing={editing}
              widget={widget}
              removeWidget={removeWidget}
            >
              {React.createElement(widgetsMap[widget.name], {
                storage: widget.storage,
                setStorage: (storage: string) => {
                  widgetsInstance.setStorage(widget.key, storage);
                },
                id: widget.key,
                x: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                  ?.x,
                y: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                  ?.y,
                w: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                  ?.w,
                h: layoutsRef[breakpointName]?.find(({ i }) => i === widget.key)
                  ?.h,
              })}

              {editing && (
                <IconButton
                  color="error"
                  style={{
                    position: "absolute",
                    right: "-0.5em",
                    top: "-0.5em",
                    zIndex: 2,
                  }}
                  onClick={() => {
                    removeWidget(widget.key);
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              )}
              {editing && <div className="editing-mask"></div>}
            </WidgetWrap>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
export default Grid;
