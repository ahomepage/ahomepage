import { Paper } from "@mui/material";
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
    <Paper
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: 'transparent',
      }}
    >
      {widget.title && <div className="widget-title">{widget.title}</div>}
      <div style={{ flex: 1 }}>{children}</div>
      {editing && (
        <IconButton
          color="error"
          style={{
            position: "absolute",
            right: "-0.5em",
            top: "-0.5em",
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
    </Paper>
  );
}
export default WidgetWrap;
