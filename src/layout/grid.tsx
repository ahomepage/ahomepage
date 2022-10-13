import React from "react";
import { useState } from "react";

import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Memory } from "utils";

import Search from "widgets/search";

import { size } from "config";

interface Props {
  setToast?: any;
}
type WidgetOption = "minW" | "maxW" | "minH" | "maxH";

const layoutMemory = new Memory("layout");
const ReactGridLayout = WidthProvider(Responsive);

function Grid({ setToast }: Props) {
  const widgets: Record<string, any> = {
    search: Search,
  };
  const initLayout = [
    {
      i: "search_0",
      x: 1,
      y: 0,
      w: 4,
      h: 1,
    },
    {
      i: "search_1",
      x: 1,
      y: 0,
      w: 4,
      h: 1,
    },
  ];

  const layout: GridLayout.Layout[] = layoutMemory.get() || initLayout;

  function init() {
    layout.forEach((layoutItem) => {
      let widgetOptions: WidgetOption[] = ["minW", "maxW", "minH", "maxH"];
      widgetOptions.forEach((attr) => {
        const widgetName = layoutItem.i.split("_")[0];
        if (widgets[widgetName][attr]) {
          layoutItem[attr] = widgets[widgetName][attr];
        }
      });
    });
  }
  init();
  const [layoutRef, setLayoutRef] = useState(layout);

  let handleLayoutChange = (layout: GridLayout.Layout[]) => {
    console.log(layout);
    setLayoutRef(layout);
    layoutMemory.set(layout);
  };
  let handleBreakPointChange = (breakpoint: any) => {
    setToast({
      open: true,
      message: size.tips[breakpoint],
      autoHideDuration: 3000,
    });
  };
  return (
    <ReactGridLayout
      className="layout"
      layouts={{ lg: layoutRef }}
      rowHeight={48}
      compactType={null}
      breakpoints={size.breakpoints}
      cols={size.cols}
      onBreakpointChange={handleBreakPointChange}
      onLayoutChange={handleLayoutChange}
    >
      {layoutRef.map((layoutItem) => (
        <div key={layoutItem.i}>
          {React.createElement(widgets[layoutItem.i.split("_")[0]], {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          })}
        </div>
      ))}
    </ReactGridLayout>
  );
}
export default Grid;
