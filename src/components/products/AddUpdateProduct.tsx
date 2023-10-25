import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
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
import {
  setIsLoading,
  setSuccess,
  setSuccessMessage,
  store,
} from "../services/pulState/store";
import {
  useAddProduct,
  useCategoryList,
  useSubCategoryList,
  useUpdateProduct,
} from "../services/query/ApiHandlerQuery";
import {
  default as ICategory,
  default as ISubCategory,
} from "../types/category";
import IProducts from "../types/products";

export interface IFormProduct {
  title: string;
  slug: string;
  category: string;
  subCategory: string;
  description: string;
  color: string;
  size: string;
  price: number;
  images: string;
}

const schema = yup
  .object({
    title: yup.string().required(),
    slug: yup.string().required(),
    category: yup.string().required(),
    subCategory: yup.string().required(),
    description: yup.string().required(),
    color: yup.string().required("color is require"),
    size: yup.string().required(),
    price: yup.number().required(),
    images: yup.string().required("You need to provide a file"),
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
  const lstSubCategory = useSubCategoryList();
  const [image, setImage] = React.useState<any>([]);
  const [selectColor, setSelectColor] = React.useState<any>("");
  const [lstColor, setLstColor] = React.useState<any>("");
  const [lstsizes, setLstSizes] = React.useState<any>("");
  const [selectSizes, setSelectSizes] = React.useState<any>("");

  const objForm = useForm<IFormProduct>({
    resolver: yupResolver(schema),
  });
  // React.useEffect(() => {
  //   if (selectColor?.length) {
  //     objForm.setValue("color", selectColor);
  //   }
  // }, []);

  React.useEffect(() => {
    const loadData = async () => {
      const res = await ApiServices.getLstColor();
      const sizes = await ApiServices.getLstSize();
      setLstColor(res);
      setLstSizes(sizes);
    };
    loadData();
  }, []);
  console.log(selectColor);

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
                {...objForm.register("title")}
                error={objForm.formState.errors.title ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.title?.message}
                  </span>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Slug"
                type="text"
                fullWidth
                variant="outlined"
                {...objForm.register("slug")}
                error={objForm.formState.errors.slug ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.slug?.message}
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
                  {...objForm.register("category")}
                  multiline
                  defaultValue={ObjProduct?.category}
                  error={objForm.formState.errors.category ? true : false}
                >
                  {lstCategory.data &&
                    lstCategory.data.map((item: ICategory, index: number) => (
                      <MenuItem value={item._id} key={index}>
                        {item.categoryTitle}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {objForm.formState.errors?.category?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ mr: 1, mt: 1 }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sub Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="SubCategory"
                  {...objForm.register("subCategory")}
                  multiline
                  defaultValue={ObjProduct?.category}
                  error={selectSizes ? true : false}
                >
                  {lstSubCategory.data &&
                    lstSubCategory.data.map(
                      (item: ISubCategory, index: number) => (
                        <MenuItem value={item._id} key={index}>
                          {item.subCategoryTitle}
                        </MenuItem>
                      )
                    )}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {objForm.formState.errors?.category?.message}
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
                {...objForm.register("description")}
                error={objForm.formState.errors.description ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.description?.message}
                  </span>
                }
              />
            </Grid>

            <Grid item xs={6}>
              <div style={{ marginTop: "8px" }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={lstColor}
                  getOptionLabel={(option: any) => option.colorName}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Color" placeholder="Color" />
                  )}
                  onChange={(_, data) => {
                    setSelectColor(data);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginTop: "8px" }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={lstsizes}
                  getOptionLabel={(option: any) => option.sizeName}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Size"
                      placeholder="Size"
                      error={objForm.formState.errors.size ? true : false}
                      {...objForm.register("size")}
                    />
                  )}
                  onChange={(_, data) => {
                    setSelectSizes(data);
                  }}
                />
              </div>
              <FormHelperText style={{ color: "red" }}>
                {objForm.formState.errors.size?.message}
              </FormHelperText>
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
                {...objForm.register("price")}
                error={objForm.formState.errors.price ? true : false}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.price?.message}
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
