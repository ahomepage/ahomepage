import { useEffect } from "react";
import { Memory } from "utils";

export const backgroundMemory = new Memory("background");
interface Props {
  value: string;
}
function Background({ value }: Props) {
  useEffect(() => {
    if (value) {
      backgroundMemory.set(value);
    }
  }, [value]);

  return (
    <div
      className="layer-background"
      style={{
        background:
          value || backgroundMemory.get() || "var(--color-hooks-green)",
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
}
export default Background;
