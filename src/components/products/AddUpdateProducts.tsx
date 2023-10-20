import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import ApiServices from "../services/Apiservices";
import ICategory from "../types/category";
import IProducts from "../types/products";

type FormData = {
  Title: string;
  Category: string;
  Description: string;
  Ram: string;
  Variant: string;
  Arrivals: string;
  Color: string;
  Price: number;
  MainImage: string;
};

const schema = yup
  .object({
    Title: yup.string().required(),
    Category: yup.string().required(),
    Description: yup.string().required(),
    Ram: yup.string().required(),
    Variant: yup.string().required(),
    Arrivals: yup.string().required(),
    Color: yup.string().required(),
    Price: yup.number().required(),
    MainImage: yup.mixed().required("You need to provide a file"),
  })
  .required();

interface IAddUpdateProductsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objProduct?: IProducts;
  isEdit?: boolean;
}

export default function AddUpdateProducts(props: IAddUpdateProductsProps) {
  const { open, setOpen, objProduct, isEdit } = props;
  const [pictures, setPictures] = React.useState<any>({
    myFile: isEdit ? objProduct?.MainImage : "",
  });

  const [lstCategory, setLstCategory] = React.useState<ICategory[]>();
  const [lstVariant, setLstVariant] = React.useState<any[]>();

  const objForm = useForm<FormData>({
    defaultValues: objProduct,
  });
  // const convertToBase64 = (file: any) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };
  // const handleFileUpload = async (e: any) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);
  //   setPictures({ ...pictures, myFile: base64 });
  // };

  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        const res = await ApiServices.updateProduct(data, objProduct?._id);
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
        await ApiServices.addProduct(data);
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

  React.useEffect(() => {
    const loadData = async () => {
      const res = await ApiServices.getLstCategory();
      setLstCategory(res);
    };
    const loadVariantStorageData = async () => {
      const res = await ApiServices.getLstVariant();
      setLstVariant(res);
    };
    loadData();
    loadVariantStorageData();
  }, []);
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={"md"}>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <DialogTitle style={{ backgroundColor: "#1976d2", color: "white" }}>
            {isEdit ? "Edit Product" : "Add Product"}
          </DialogTitle>

          <DialogContent>
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
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    {...objForm.register("Category")}
                    defaultValue={objProduct?.Category}
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
                <FormControl sx={{ mr: 1, mt: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Ram</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Ram"
                    {...objForm.register("Ram")}
                    defaultValue={objProduct?.Ram ? objProduct?.Ram : ""}
                    error={objForm.formState.errors.Ram ? true : false}
                  >
                    {lstVariant &&
                      lstVariant
                        ?.filter((Rom: any) => Rom.VariantName == "RAM")
                        .map((item: any, index: number) => (
                          <MenuItem
                            value={item.VariantStorage}
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>{item.VariantStorage}</div>
                          </MenuItem>
                        ))}
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {objForm.formState.errors.Ram?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ mr: 1, mt: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Variant</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    {...objForm.register("Variant")}
                    defaultValue={
                      objProduct?.Category ? objProduct?.Variant : ""
                    }
                    error={objForm.formState.errors.Variant ? true : false}
                  >
                    {lstVariant &&
                      lstVariant
                        ?.filter((Rom: any) => Rom.VariantName == "ROM")
                        .map((item: any, index: number) => (
                          <MenuItem
                            value={item.VariantStorage}
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>{item.VariantStorage}</div>
                          </MenuItem>
                        ))}
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {objForm.formState.errors.Variant?.message}
                  </FormHelperText>
                </FormControl>
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
                  label="Arrivals"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...objForm.register("Arrivals")}
                  error={objForm.formState.errors.Arrivals ? true : false}
                  helperText={
                    <span style={{ color: "red" }}>
                      {objForm.formState.errors.Arrivals?.message}
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
              <Grid item xs={6}>
                {/* <label>
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
                </label> */}
                {/* <CarouselImage base64={objProduct.ImageUrl} /> */}
              </Grid>
              <Grid xs={12}>
                <Grid item xs={12}>
                  <img src={pictures.myFile} height={100} />
                </Grid>
              </Grid>
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
