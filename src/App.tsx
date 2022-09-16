import React, { useEffect, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack, GridStackWidget } from "gridstack";
import Search from "./widgets/search";
import LanguageSwitch from "./components/language-switch";

import "./App.css";

function App() {
  interface Widget {
    name: string;
    option: GridStackWidget;
    //  | GridStackElement
  }

  useEffect(() => {
    const grid = GridStack.init({
      float: true,
      cellHeight: 48
    });
    // grid.on("dragstop", (_, element) => {
    //   console.log((element as any)?.getAttribute('gs-x'));
    // });
    console.log("useEffect");
    grid.on("change", function (event: Event, items) {
      console.log(items);
    });
  }, []);
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      name: "test",
      option: {
        x: 2,
        y: 4,
        w: 7,
      },
    },
  ]);

  return (
    <div className="app">
      {/* 背景层 */}
      <div className="layer-background"></div>
      {/* 动效层 */}
      <div className="layer-animation"></div>
      {/* 功能层 */}
      <div className="layer-features">
        <LanguageSwitch/>
        {/* 网格堆积布局 */}
        <div className="grid-stack">
          {widgets.map((widget, wIndex) => (
            <div
              key={`${widget.name}_${wIndex}`}
              gs-x={widget.option.x}
              gs-y={widget.option.y}
              gs-w={widget.option.w}
              gs-h={widget.option.h}
              gs-min-w={widget.option.minW}
              gs-min-h={widget.option.minH}
              gs-max-w={widget.option.maxW}
              gs-max-h={widget.option.maxH}
              gs-no-move="true"
              className="grid-stack-item"
            >
              <div className="grid-stack-item-content">
                <Search />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
