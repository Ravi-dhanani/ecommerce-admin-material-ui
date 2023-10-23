import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ICommonModelProps {
  open: boolean;
  title: string;
  editTitle: string;
  children: any;
  isEdit: boolean | undefined;
  setOpen: (data: boolean) => void;
}
export default function CommonModel(props: ICommonModelProps) {
  const { open, children, editTitle, title, isEdit, setOpen } = props;
  const theme: any = useTheme();
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle
          style={{
            backgroundColor: "#095192",
            color: "white",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom style={{ marginBottom: 0 }}>
                {isEdit ? editTitle : title}
              </Typography>
            </div>
            <div>
              <IconButton
                aria-label="delete"
                size="large"
                style={{
                  padding: "5px",
                  border: "1px solid gray",
                  backgroundColor: "white",
                }}
                onClick={() => setOpen(false)}
              >
                <CloseOutlinedIcon style={{ color: "black" }} />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContentText></DialogContentText>

        <DialogContent>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
