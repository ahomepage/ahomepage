// import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
interface WidgetWrapProps {
  editing: boolean;
  children?: React.ReactNode;
  widget: any;
  removeWidget: any;
}

function WidgetWrap({
  children,
  editing,
  removeWidget,
  widget,
}: WidgetWrapProps) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        border: editing ? '1px dashed #000' : 'unset'
      }}
      onContextMenu={(e) => e.stopPropagation()}
    >
      {widget.title && <div className="widget-title">{widget.title}</div>}
      <div style={{ flex: 1 }}>{children}</div>
      {editing && (
        <IconButton
          size="large"
          color="error"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            zIndex: 2,
          }}
          onClick={() => {
            removeWidget(widget.key);
          }}
        >
          <DeleteOutline />
        </IconButton>
      )}
      {editing && <div className="editing-mask"></div>}
    </div>
  );
}
export default WidgetWrap;
