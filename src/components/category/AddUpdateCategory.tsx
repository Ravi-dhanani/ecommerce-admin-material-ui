import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import ICategory from "../types/category";
import ApiServices from "../services/Apiservices";

const schema = yup
  .object({
    CategoryTitle: yup.string().required(),
  })
  .required();

interface IAddUpdateCategoryProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objCategory?: ICategory;
  isEdit?: boolean;
}

export default function AddUpdateCategory(props: IAddUpdateCategoryProps) {
  const { open, setOpen, objCategory, isEdit } = props;
  const [postImage, setPostImage] = React.useState<any>({
    myFile: "",
  });

  const objForm = useForm<ICategory>({
    resolver: yupResolver(schema),
    defaultValues: objCategory,
  });

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const onSubmit = async (data: any) => {
    const result = { ...data, CategoryImage: postImage.myFile };
    try {
      if (isEdit) {
        const res = await ApiServices.updateCategory(result, objCategory?._id);
        Swal.fire({
          position: "center",
          icon: "success",
          // title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
        setOpen(false);
      } else {
        await ApiServices.addCategory(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Recode Inserted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpen(false);
        window.location.reload();
      }
    } catch (ex: any) {
      console.log(ex);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={"md"}>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <DialogTitle style={{ backgroundColor: "#1976d2", color: "white" }}>
            {isEdit ? "Edit Category" : "Add Category"}
          </DialogTitle>

          <DialogContent>
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
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("CategoryTitle")}
                  error={objForm.formState.errors.CategoryTitle ? true : false}
                  helperText={
                    <span style={{ color: "red" }}>
                      {objForm.formState.errors.CategoryTitle?.message}
                    </span>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <label>
                  CategoryImage
                  <Button>
                    <input
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </label>
              </Grid>
              {/* )} */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit" color="primary">
              {isEdit ? "Edit " : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
