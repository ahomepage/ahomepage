export * from "utils/memory";

export const genId4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);