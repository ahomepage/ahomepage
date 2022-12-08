import { useState, createElement } from "react";
import { useTranslation } from "react-i18next";

import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Menu } from "@mui/material";

import WidgetWrap from "components/widget-wrap";
import ContextMenuInner from "components/context-menu-inner";

import widgetsMap from "widgetsMap";

import { size, config } from "config";

import { WidgetsModel, WidgetsReturn } from "lib";
import type { MouseEventHandler } from "react";

let widgetsInstance = new WidgetsModel(
  [
    {
      name: "search",
      key: "init",
    },
  ],
  {
    lg: [
      {
        w: 6,
        h: 2,
        x: 3,
        y: 3,
        i: "init",
      },
    ],
  },
  widgetsMap
);
interface Props {
  setToast?: any;
  setBackground: any;
}

export interface WidgetProps {
  storage: any;
  setStorage: (storage: any) => void;
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

function Grid({ setToast, setBackground }: Props) {
  const { t } = useTranslation();
  /* is editing ? */
  const [editing, setEditing] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setEditing(false);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

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

  const [contextMenu, setContextMenu] = useState<any>(null);

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };
  const handleMenuItemClick = (menuName: string, submenuName?: string) => {
    switch (menuName) {
      case "layout":
        setEditing(!editing);
        break;
      case "theme":
        switch (submenuName) {
          case "klein-blue":
            setBackground("var(--color-klein-blue)");
            break;
          case "hooks-green":
            setBackground("var(--color-hooks-green)");
            break;
          case "geek-black":
            setBackground("var(--color-geek-black)");
            break;
          default:
            setBackground(submenuName);
            break;
        }
        break;
      case "widgets":
        switch (submenuName) {
          case "search":
            addWidget("search", "");
            break;
          case "clock":
            addWidget("clock", "");
            break;
        }
        break;
    }
    handleContextMenuClose();
  };

  return (
    <div className="layer-features" onContextMenu={handleContextMenu}>
      <ReactGridLayout
        className="layout"
        style={{ minHeight: "100vh" }}
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
        {widgetsRef.map((widget) => {
          let widgetStorage: Object = {};
          if (widget.storage) {
            try {
              widgetStorage = JSON.parse(widget.storage);
            } catch (_) {
              widgetStorage = {};
            }
          }

          return (
            <div key={widget.key}>
              <WidgetWrap
                editing={editing}
                widget={widget}
                removeWidget={removeWidget}
              >
                {createElement(widgetsMap[widget.name], {
                  storage: widgetStorage,
                  setStorage: (storage: Object) => {
                    widgetsInstance.setStorage(widget.key, storage);
                  },
                  id: widget.key,
                  x: layoutsRef[breakpointName]?.find(
                    ({ i }) => i === widget.key
                  )?.x,
                  y: layoutsRef[breakpointName]?.find(
                    ({ i }) => i === widget.key
                  )?.y,
                  w: layoutsRef[breakpointName]?.find(
                    ({ i }) => i === widget.key
                  )?.w,
                  h: layoutsRef[breakpointName]?.find(
                    ({ i }) => i === widget.key
                  )?.h,
                })}
              </WidgetWrap>
            </div>
          );
        })}
      </ReactGridLayout>

      <Menu
        onClose={handleContextMenuClose}
        onContextMenu={(e) => e.preventDefault()}
        open={contextMenu !== null}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <ContextMenuInner
          handleMenuItemClick={handleMenuItemClick}
        ></ContextMenuInner>
      </Menu>
    </div>
  );
}
export default Grid;
