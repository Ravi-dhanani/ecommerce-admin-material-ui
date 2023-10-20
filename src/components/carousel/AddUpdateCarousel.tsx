import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, Grid } from "@mui/material";
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
import ICarousel from "../types/carousel";
import CarouselImage from "./CarouselImage";
import {
  setBase64,
  setSuccess,
  setSuccessMessage,
  store,
} from "../services/pulState/store";
import Image from "next/image";
interface IFormInputs {
  Title: string;
  ImageUrl: string;
}

const schema = yup
  .object({
    Title: yup.string().required(),
    ImageUrl: yup.string().required("Required"),
  })
  .required();

interface IAddUpdateCarouselProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objCarousel?: ICarousel;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
  setObjCarousel: React.Dispatch<any>;
}

export default function AddUpdateCarousel(props: IAddUpdateCarouselProps) {
  const { open, setOpen, objCarousel, isEdit, setIsEdit, setObjCarousel } =
    props;

  const image = store.useState((s) => s.base64);
  console.log(image);
  const objForm = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const result = { ...data, ImageUrl: image };
    console.log(result);
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
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setIsEdit(false);
          setBase64("");
          setObjCarousel("");
        }}
        maxWidth={"md"}
      >
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <DialogTitle style={{ backgroundColor: "#095192", color: "white" }}>
            {isEdit ? "Edit Carousel" : "Add Carousel"}
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
                />
                {image ||
                  (objCarousel?.ImageUrl && (
                    <Box
                      sx={{
                        paddingTop: "10px",
                      }}
                    >
                      <Card
                        sx={{
                          maxWidth: 310,
                          maxHeight: 160,
                          // backgroundColor: "red",
                          padding: "5px",
                        }}
                      >
                        {objCarousel.ImageUrl ? (
                          <img
                            src={objCarousel?.ImageUrl}
                            alt="Picture of Carousel"
                            style={{
                              objectFit: "fill",
                              height: "150px",
                              width: "300px",
                              border: "1px solid gray",
                            }}
                          />
                        ) : (
                          <img
                            src={JSON.parse(image)}
                            style={{
                              objectFit: "fill",
                              height: "150px",
                              width: "300px",
                              border: "1px solid gray",
                            }}
                          />
                        )}
                      </Card>
                    </Box>
                  ))}
              </Grid>
              <span style={{ color: "red", marginLeft: "20px" }}>
                {objForm.formState.errors.ImageUrl && !image
                  ? "Image is require"
                  : null}
              </span>
            </Grid>
          </DialogContent>
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
      </Dialog>
    </div>
  );
}
