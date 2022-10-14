export type Breakpoint = "lg" | "md" | "sm";

type Config = {
  value: Breakpoint;
  dp: number; // device pixcel
  cols: number;
  tip?: string;
}[];

const config: Config = [
  {
    value: "lg",
    tip: "电脑端",
    dp: 1200,
    cols: 12,
  },
  {
    value: "md",
    tip: "平板电脑",
    dp: 600,
    cols: 6,
  },
  {
    value: "sm",
    tip: "手机端",
    dp: 0,
    cols: 4,
  },
];
export const cols = Object.fromEntries(
  config.map((item) => [item.value, item.cols])
);

export const breakpoints = Object.fromEntries(
  config.map((item) => [item.value, item.dp])
);
