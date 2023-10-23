import CommonModel from "@/components/common/CommonModel";
import {
  setIsLoading,
  setSuccess,
  setSuccessMessage,
  store,
} from "@/components/services/pulState/store";
import {
  useAddSubCategory,
  useCategoryList,
  useUpdateSubCategory,
} from "@/components/services/query/ApiHandlerQuery";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import { LoadingButton } from "@mui/lab";
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
import {
  default as ICategory,
  default as ISubCategory,
} from "../../types/category";

export interface IFormSubCategory {
  SubCategoryTitle: string;
  SubCategoryImage: string;
  CategoryId: ICategory;
}

const schema = yup
  .object({
    SubCategoryTitle: yup.string().required(),
    SubCategoryImage: yup.string().required(),
    CategoryId: yup.string().required(),
  })
  .required();

interface IAddUpdateCarouselProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ObjSubCategory?: ISubCategory;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
}

export default function AddUpdateSubCategory(props: IAddUpdateCarouselProps) {
  const { open, setOpen, ObjSubCategory, isEdit, setIsEdit } = props;

  const lstCategory = useCategoryList();
  const isLoading = store.useState((s) => s.isLoading);
  const [image, setImage] = React.useState<any>({
    url: ObjSubCategory?.SubCategoryImage
      ? ObjSubCategory.SubCategoryImage
      : "",
  });

  const objForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      SubCategoryImage: ObjSubCategory?.SubCategoryImage,
      SubCategoryTitle: ObjSubCategory?.SubCategoryTitle,
    },
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
      url: base64 ? base64 : ObjSubCategory?.SubCategoryImage,
    });
    objForm.setValue("SubCategoryImage", file.name);
  };

  const onSubmit = async (data: ISubCategory) => {
    const result = {
      ...data,
      SubCategoryImage: image.url,
    };
    try {
      if (isEdit) {
        setIsLoading(true);
        const edit = await useUpdateSubCategory(result, ObjSubCategory?._id);
        setIsLoading(false);
        setOpen(false);
        setSuccess(true);
        setSuccessMessage(edit.message);
      } else {
        setIsLoading(true);
        const res = await useAddSubCategory(result);
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
        editTitle="Edit SubCategory"
        title="Add SubCategory"
        modelSize={"md"}
        isEdit={isEdit}
        open={open}
        setOpen={setOpen}
      >
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              padding={4}
              columnGap={{
                md: 2,
              }}
            >
              <Grid xs={6} md={12}>
                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="SubCategory Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    {...objForm.register("SubCategoryTitle")}
                    error={
                      objForm.formState.errors.SubCategoryTitle ? true : false
                    }
                    helperText={
                      <span style={{ color: "red" }}>
                        {objForm.formState.errors.SubCategoryTitle?.message}
                      </span>
                    }
                  />
                </div>
              </Grid>
              <Grid xs={6} md={12}>
                <div>
                  <FormControl sx={{ mt: 1 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      {...objForm.register("CategoryId")}
                      defaultValue={ObjSubCategory?.CategoryId}
                      error={objForm.formState.errors.CategoryId ? true : false}
                    >
                      {lstCategory &&
                        lstCategory?.data?.map(
                          (item: ICategory, index: number) => (
                            <MenuItem value={item._id} key={index}>
                              {item.CategoryTitle}
                            </MenuItem>
                          )
                        )}
                    </Select>
                    <FormHelperText style={{ color: "red" }}>
                      {objForm.formState.errors?.CategoryId?.message}
                    </FormHelperText>
                  </FormControl>
                </div>
              </Grid>
              <Grid xs={6} md={12} sx={{ marginTop: "20px" }}>
                <div>
                  <label htmlFor="change-cover">
                    <TextField
                      id="change-cover"
                      type="file"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    <Button
                      startIcon={<UploadTwoToneIcon />}
                      variant="contained"
                      component="span"
                    >
                      Select SubCategory Image
                    </Button>
                  </label>

                  {image.url && (
                    <Box
                      sx={{
                        paddingTop: "10px",
                      }}
                    >
                      <Card
                        sx={{
                          maxWidth: 310,
                          maxHeight: 160,
                          padding: "5px",
                        }}
                      >
                        <img
                          src={image.url}
                          style={{
                            objectFit: "fill",
                            height: "150px",
                            width: "300px",
                            border: "1px solid gray",
                          }}
                        />
                      </Card>
                    </Box>
                  )}
                </div>
                <div style={{ marginTop: "7px" }}>
                  {objForm.formState.errors.SubCategoryImage && !image.url && (
                    <span style={{ color: "red" }}>
                      {objForm.formState.errors.SubCategoryImage.message}
                    </span>
                  )}
                </div>
              </Grid>
            </Grid>
          </Box>
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
