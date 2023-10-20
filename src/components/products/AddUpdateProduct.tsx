import { yupResolver } from "@hookform/resolvers/yup";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import {
  Box,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import CommonModel from "../common/CommonModel";
import ApiServices from "../services/Apiservices";
import { setSuccess, setSuccessMessage } from "../services/pulState/store";
import ICategory from "../types/category";
import IProducts from "../types/products";

export interface IFormProduct {
  Title: string;
  Category: string;
  Description: string;
  Color: string;
  Price: number;
  MainImage: string;
}

const schema = yup
  .object({
    Title: yup.string().required(),
    Category: yup.string().required(),
    Description: yup.string().required(),
    Color: yup.string().required(),
    Price: yup.number().required(),
    MainImage: yup.string().required("You need to provide a file"),
  })
  .required();

interface IAddUpdateCarouselProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ObjProduct?: IProducts;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
}

export default function AddUpdateProduct(props: IAddUpdateCarouselProps) {
  const { open, setOpen, ObjProduct, isEdit, setIsEdit } = props;
  const [lstVariant, setLstVariant] = React.useState<any[]>();
  const [lstCategory, setLstCategory] = React.useState<ICategory[]>();
  const [image, setImage] = React.useState<any>({
    url: ObjProduct?.MainImage ? ObjProduct.MainImage : "",
  });

  const objForm = useForm<IFormProduct>({
    resolver: yupResolver(schema),
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
    setImage({
      ...image,
      url: base64 ? base64 : ObjProduct?.MainImage,
    });
    objForm.setValue("MainImage", file.name);
  };

  const onSubmit = async (data: any) => {
    const result = { ...data, MainImage: image.url };
    try {
      if (isEdit) {
        const edit = await ApiServices.updateProduct(result, ObjProduct?._id);
        setOpen(false);
        setSuccess(true);
        setSuccessMessage(edit.message);
      } else {
        const res = await ApiServices.addProduct(result);
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
        editTitle="Edit Product"
        title="Add Product"
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
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                {...objForm.register("Title")}
                error={objForm.formState.errors.Title ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.Title?.message}
                  </span>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ mr: 1, mt: 1 }} fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  {...objForm.register("Category")}
                  defaultValue={ObjProduct?.Category}
                  error={objForm.formState.errors.Category ? true : false}
                >
                  {lstCategory &&
                    lstCategory.map((item: any, index: number) => (
                      <MenuItem value={item.CategoryTitle} key={index}>
                        {item.CategoryTitle}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {objForm.formState.errors?.Category?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                minRows={5}
                {...objForm.register("Description")}
                error={objForm.formState.errors.Description ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.Description?.message}
                  </span>
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                {...objForm.register("Price")}
                error={objForm.formState.errors.Price ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.Price?.message}
                  </span>
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Color"
                type="text"
                fullWidth
                variant="outlined"
                {...objForm.register("Color")}
                error={objForm.formState.errors.Color ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.Color?.message}
                  </span>
                }
              />
            </Grid>
            {/* <Grid item xs={6}>
              <label>
                Image
                <input
                  accept="image/*"
                  multiple
                  type="file"
                  {...objForm.register("MainImage")}
                  onChange={handleFileUpload}
                />
                {objForm.formState.errors.MainImage && (
                  <p style={{ color: "red" }}>
                    {objForm.formState.errors.MainImage?.message}
                  </p>
                )}
              </label>
            </Grid>
            <Grid xs={12}>
              <Grid item xs={12}>
                <img src={pictures.myFile} height={100} />
              </Grid>
            </Grid> */}
          </Grid>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ backgroundColor: "#095192" }}
            >
              {isEdit ? "Edit " : "Save"}
            </Button>
          </DialogActions>
        </form>
      </CommonModel>
    </div>
  );
}
