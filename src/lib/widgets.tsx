import type GridLayout from "react-grid-layout";
import Search from "widgets/search";
import { size } from "config";
import { Memory, genId4 } from "utils";

const widgetsMap: Record<string, any> = {
  search: Search,
};

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

export class Widgets {
  public widgets: WidgetItem[];
  public layouts: GridLayout.Layouts;
  constructor(widgets: WidgetItem[] = [], layouts: GridLayout.Layouts = {}) {
    this.widgets = widgetsMemory.get() || widgets;
    this.layouts = layoutsMemory.get() || layouts;
  }
  set({ widgets, layouts }: WidgetsReturn) {
    this.setWidgets(widgets);
    this.setLayouts(layouts);
    return this.get();
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
        widgetsMap[name][breakpoint]?.minW || widgetsMap[name].minW || 1;
      const maxW =
        widgetsMap[name][breakpoint]?.maxW || widgetsMap[name].maxW || Infinity;
      const minH =
        widgetsMap[name][breakpoint]?.minH || widgetsMap[name].minH || 1;
      const maxH =
        widgetsMap[name][breakpoint]?.maxH || widgetsMap[name].maxH || Infinity;
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
