import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import CommonModel from "../common/CommonModel";
import {
  setIsLoading,
  setSuccess,
  setSuccessMessage,
  store,
} from "../services/pulState/store";
import {
  useAddCategory,
  useUpdateCategory,
  useUpdateColor,
} from "../services/query/ApiHandlerQuery";
import { IColor } from "../types/colorAndSize";
import { useAddColor } from "../services/query/ApiHandlerQuery";
import ApiServices from "../services/Apiservices";

export interface IFormCategory {
  colorName: string;
  colorCode: string;
}

const schema = yup
  .object({
    colorName: yup.string().required(),
    colorCode: yup.string().required(),
  })
  .required();

interface IAddUpdateColorProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ObjColor?: IColor;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
}

export default function AddUpdateColor(props: IAddUpdateColorProps) {
  const { open, setOpen, ObjColor, isEdit } = props;
  const isLoading = store.useState((s) => s.isLoading);

  const objForm = useForm<IFormCategory>({
    resolver: yupResolver(schema),
    defaultValues: ObjColor,
  });

  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        setIsLoading(true);
        const edit = await useUpdateColor(data, ObjColor?._id);
        setIsLoading(false);

        setOpen(false);
        setSuccess(true);
        setSuccessMessage(edit.message);
      } else {
        setIsLoading(true);
        const res = await useAddColor(data);
        setIsLoading(false);
        setOpen(false);
        setSuccess(true);
        setSuccessMessage(res.message);
      }
    } catch (error: any) {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div>
      <CommonModel
        editTitle="Edit Color"
        modelSize={"md"}
        title="Add Color"
        isEdit={isEdit}
        open={open}
        setOpen={setOpen}
      >
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={1}
          >
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Color Name"
                type="text"
                fullWidth
                variant="outlined"
                {...objForm.register("colorName")}
                error={objForm.formState.errors.colorName ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.colorName?.message}
                  </span>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Color Code"
                type="text"
                fullWidth
                variant="outlined"
                {...objForm.register("colorCode")}
                error={objForm.formState.errors.colorCode ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.colorCode?.message}
                  </span>
                }
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <LoadingButton
              color="secondary"
              type="submit"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              style={{ backgroundColor: !isLoading ? "#095192" : "" }}
            >
              {isEdit ? "Edit " : "Save"}
            </LoadingButton>
          </DialogActions>
        </form>
      </CommonModel>
    </div>
  );
}
