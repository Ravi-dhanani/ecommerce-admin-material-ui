import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardActions } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import styled from "styled-components";
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
  useSubCategoryList,
  useUpdateProduct,
} from "../services/query/ApiHandlerQuery";
import {
  default as ICategory,
  default as ISubCategory,
} from "../types/category";
import IProducts from "../types/products";
import ApiServices from "../services/Apiservices";
import { IColor } from "../types/colorAndSize";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export interface IFormProduct {
  title: string;
  slug: string;
  category: string;
  subCategory: string;
  description: string;
  // color: any;
  // size: string;
  price: number;
  // images: any;
}

const schema = yup
  .object({
    title: yup.string().required(),
    slug: yup.string().required(),
    category: yup.string().required(),
    subCategory: yup.string().required(),
    description: yup.string().required(),
    // color: yup.array().required(),
    // size: yup.string().required(),
    price: yup.number().required("price is required"),
    // images: yup.array().required("You need to provide a image"),
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
  var singleFileObj: any = [];
  var singleFileArray: any = [];
  const [singleFile, setSingleFile] = React.useState<any>([]);

  const isLoading = store.useState((s) => s.isLoading);
  const lstCategory = useCategoryList();
  const lstSubCategory = useSubCategoryList();
  const [selectColor, setSelectColor] = React.useState<any>("");
  const [lstColor, setLstColor] = React.useState<any>("");
  const [lstsizes, setLstSizes] = React.useState<any>("");
  const [selectSizes, setSelectSizes] = React.useState<any>("");
  const [images, setImages] = React.useState<any>([]);
  const [state, setState] = React.useState<any>({
    file: null,
    base64URL: "",
  });

  const objForm = useForm<IFormProduct>({
    resolver: yupResolver(schema),
  });

  // const uploadSingleFiles = async (e: any) => {
  //   singleFileObj.push(e.target.files);
  //   singleFileArray.push(URL.createObjectURL(singleFileObj[0][0]));
  //   await setSingleFile([...singleFile, singleFileArray]);
  //   objForm.setValue("images", singleFile);
  // };
  const removeImage = (index: any) => {
    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: any = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        images.push({ baseURL });
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e: any) => {
    let { file } = state;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setState({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setState({
      file: e.target.files[0],
    });
  };
  React.useEffect(() => {
    const loadData = async () => {
      const res = await ApiServices.getLstColor();
      const sizes = await ApiServices.getLstSize();
      setLstColor(res);

      setLstSizes(sizes);
    };
    loadData();
  }, []);

  const onSubmit = async (data: any) => {
    const result = {
      ...data,
      images: images,
      color: selectColor,
      size: selectSizes,
    };
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
  console.log(images);
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
                defaultValue={ObjProduct?.title}
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
                defaultValue={ObjProduct?.slug}
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
                  label="Category"
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
                  defaultValue={ObjProduct?.subCategory}
                  error={objForm.formState.errors.subCategory ? true : false}
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
                  {objForm.formState.errors?.subCategory?.message}
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
                defaultValue={ObjProduct?.description}
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
                    <TextField
                      {...params}
                      label="Color"
                      placeholder="Color"
                      error={selectColor?.length == 0 ? true : false}
                    />
                  )}
                  onChange={(_, data) => {
                    setSelectColor(data);
                  }}
                />
                {!selectColor.length && (
                  <FormHelperText style={{ color: "red" }}>
                    {"color is required field"}
                  </FormHelperText>
                )}
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
                      error={selectSizes.length == 0 ? true : false}
                      // {...objForm.register("size")}
                    />
                  )}
                  onChange={(_, data) => {
                    setSelectSizes(data);
                  }}
                />
              </div>
              {!selectSizes.length && (
                <FormHelperText style={{ color: "red" }}>
                  {"size is required field"}
                </FormHelperText>
              )}
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
                defaultValue={ObjProduct?.price}
                helperText={
                  objForm.formState.errors.price && (
                    <span style={{ color: "red" }}>
                      {"number is required dield"}
                    </span>
                  )
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                select Multiple Image
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileInputChange}
                />
              </Button>
              {!images.length && (
                <FormHelperText style={{ color: "red" }}>
                  {"images is required field "}
                </FormHelperText>
              )}
            </Grid>
            <Grid
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
            >
              {images &&
                images?.map((img: any, index: number) => (
                  <Grid item xs={3} md={3} key={index}>
                    <Card style={{ maxWidth: "160px", padding: "5px" }}>
                      <CardActions
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "end",
                        }}
                      >
                        <CancelRoundedIcon
                          onClick={() => removeImage(index)}
                          color="error"
                        />
                      </CardActions>
                      <img src={img.baseURL} height={100} width={"100%"} />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <LoadingButton
              color="secondary"
              type="submit"
              loading={false}
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
