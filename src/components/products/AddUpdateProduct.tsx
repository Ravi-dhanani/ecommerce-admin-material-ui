import { yupResolver } from "@hookform/resolvers/yup";
import {
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
import SaveIcon from "@mui/icons-material/Save";
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
  useAddProduct,
  useCategoryList,
  useUpdateProduct,
} from "../services/query/ApiHandlerQuery";
import ICategory from "../types/category";
import IProducts from "../types/products";
import { LoadingButton } from "@mui/lab";

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
  const isLoading = store.useState((s) => s.isLoading);
  const lstCategory = useCategoryList();
  const [image, setImage] = React.useState<any>({
    url: ObjProduct?.MainImage ? ObjProduct.MainImage : "",
  });

  const objForm = useForm<IFormProduct>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const result = { ...data, MainImage: image.url };
    try {
      if (isEdit) {
        setIsLoading(true);
        const edit = await useUpdateProduct(result, ObjProduct?._id);
        setIsLoading(false);
        setOpen(false);
        setSuccess(true);
        setSuccessMessage(edit.message);
      } else {
        setIsLoading(true);
        const res = await useAddProduct(result);
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
        editTitle="Edit Product"
        title="Add Product"
        modelSize={"md"}
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
                    lstCategory.data.map((item: ICategory, index: number) => (
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
            <LoadingButton
              color="secondary"
              type="submit"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              {isEdit ? "Edit " : "Save"}
            </LoadingButton>
          </DialogActions>
        </form>
      </CommonModel>
    </div>
  );
}
