import React from "react";
import { size } from "config";
type EdgeKey = "minW" | "maxW" | "minH" | "maxH";
export type WidgetsMap = Record<
  string,
  React.FC<any> & {
    [defaultEdge in EdgeKey]?: number;
  } & {
    [breakpoint in size.Breakpoint]: {
      [defaultEdge in EdgeKey]?: number;
    };
  }
>;
const ctx = require.context("./widgets", true, /\/index.tsx$/);
let widgetsMap: WidgetsMap = {};
ctx.keys().forEach((key) => {
  const widgetName = /\.\/(.*)\/index\.tsx$/.exec(key)?.[1];
  if (widgetName) {
    widgetsMap[widgetName] = ctx(key).default;
  }
});
console.log(widgetsMap)
export default widgetsMap;
