import type GridLayout from "react-grid-layout";
import { size } from "config";
import { Memory, genId4 } from "utils";
import { WidgetsMap } from "widgetsMap";

const layoutsMemory = new Memory("layouts");
const widgetsMemory = new Memory("widgets");

interface WidgetItem {
  name: string;
  key: string;
  storage?: string;
}

export interface WidgetsReturn {
  widgets: WidgetItem[];
  layouts: GridLayout.Layouts;
}

export class WidgetsModel {
  public widgets: WidgetItem[];
  public layouts: GridLayout.Layouts;
  public widgetsMap: WidgetsMap;
  constructor(
    widgets: WidgetItem[] = [],
    layouts: GridLayout.Layouts = {},
    widgetsMap?: WidgetsMap
  ) {
    this.widgets = widgetsMemory.get() || widgets;
    this.layouts = layoutsMemory.get() || layouts;
    this.widgetsMap = widgetsMap || {};
  }
  set({ widgets, layouts }: WidgetsReturn) {
    this.setWidgets(widgets);
    this.setLayouts(layouts);
    return this.get();
  }

  setStorage(key: string, storage: string) {
    let _widgets = this.get().widgets;
    let matchedWidget = _widgets.find(widget => widget.key === key);
    if (matchedWidget) {
      matchedWidget.storage = storage;
      this.setWidgets(_widgets);
    }
  }
  setWidgets(widgets: WidgetItem[]) {
    const copyWidgets = [...widgets];
    this.widgets = widgets;
    widgetsMemory.set(copyWidgets);
    return this.get();
  }
  setLayouts(layouts: GridLayout.Layouts) {
    const copyLayouts = { ...layouts };
    this.layouts = layouts;
    layoutsMemory.set(copyLayouts);
    return this.get();
  }
  get() {
    return {
      widgets: [...this.widgets],
      layouts: { ...this.layouts },
    };
  }
  add(name: string, storage: string) {
    let { widgets, layouts } = this.get();

    const key = `${name}_${genId4()}`;
    let genInitLayout = (breakpoint: size.Breakpoint) => {
      const minW =
        this.widgetsMap[name][breakpoint]?.minW ||
        this.widgetsMap[name].minW ||
        1;
      const maxW =
        this.widgetsMap[name][breakpoint]?.maxW ||
        this.widgetsMap[name].maxW ||
        12;
      const minH =
        this.widgetsMap[name][breakpoint]?.minH ||
        this.widgetsMap[name].minH ||
        1;
      const maxH =
        this.widgetsMap[name][breakpoint]?.maxH ||
        this.widgetsMap[name].maxH ||
        12;
      return {
        x: 0,
        y: 0,
        minW,
        maxW,
        minH,
        maxH,
        w: minW,
        h: minH,
        i: key,
      };
    };
    Object.keys(size.breakpoints).forEach((breakpoint) => {
      layouts[breakpoint] = [
        ...(layouts[breakpoint] || []),
        genInitLayout(breakpoint as size.Breakpoint),
      ];
    });
    widgets = [
      ...widgets,
      {
        name,
        storage,
        key,
      },
    ];
    return this.set({
      widgets,
      layouts,
    });
  }
  remove(key: string) {
    let { widgets, layouts } = this.get();

    const i = widgets.findIndex((widget) => widget.key === key);
    if (i !== -1) {
      widgets.splice(i, 1);
    }
    Object.keys(layouts).forEach((breakpoint) => {
      const i = layouts[breakpoint].findIndex((widget) => widget.i === key);
      if (i !== -1) {
        layouts[breakpoint].splice(i, 1);
      }
    });
    return this.set({
      widgets,
      layouts,
    });
  }
}
