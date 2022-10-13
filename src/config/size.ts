const config = [
  {
    value: "lg",
    name: "大尺寸",
    size: 1200,
    cols: 12,
  },
  {
    value: "md",
    name: "中尺寸",
    size: 900,
    cols: 6,
  },
  {
    value: "sm",
    name: "小尺寸",
    size: 600,
    cols: 4,
  },
];
export const cols = Object.fromEntries(
    config.map((item) => [item.value, item.cols])
);

export const breakpoints = Object.fromEntries(
    config.map((item) => [item.value, item.size])
);

export const tips = Object.fromEntries(
    config.map((item) => [item.value, `已为您切换至「${item.name}」配置`])
);


