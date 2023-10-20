import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
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
import ICarousel from "../types/carousel";
import CarouselImage from "./Carouselmage";
export interface IFormCarousel {
  Title: string;
  ImageUrl: string;
}

const schema = yup
  .object({
    Title: yup.string().required(),
    ImageUrl: yup.string().required(),
  })
  .required();

interface IAddUpdateCarouselProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objCarousel?: ICarousel;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
}

export default function AddUpdateCarousel(props: IAddUpdateCarouselProps) {
  const { open, setOpen, objCarousel, isEdit, setIsEdit } = props;

  const [image, setImage] = React.useState<any>({
    url: objCarousel?.ImageUrl ? objCarousel.ImageUrl : "",
  });

  const objForm = useForm<IFormCarousel>({
    resolver: yupResolver(schema),
    defaultValues: {
      ImageUrl: objCarousel?.ImageUrl,
    },
  });

  const onSubmit = async (data: any) => {
    const result = { ...data, ImageUrl: image.url };
    try {
      if (isEdit) {
        const edit = await ApiServices.updateCarousel(result, objCarousel?._id);
        setOpen(false);
        setSuccess(true);
        setSuccessMessage(edit.message);
      } else {
        const res = await ApiServices.addCarousel(result);
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
        editTitle="Edit Carousel"
        isEdit={isEdit}
        open={open}
        setOpen={setOpen}
        title="Add Carousel"
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
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                {...objForm.register("Title")}
                error={objForm.formState.errors.Title ? true : false}
                defaultValue={isEdit ? objCarousel?.Title : null}
                helperText={
                  <span style={{ color: "red" }}>
                    {objForm.formState.errors.Title?.message}
                  </span>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <CarouselImage
                base64={objCarousel?.ImageUrl}
                objForm={objForm}
                isEdit={isEdit}
                setImage={setImage}
                image={image}
              />
            </Grid>
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
