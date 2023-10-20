import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import styled from "styled-components";
import { setBase64, store } from "../services/pulState/store";
interface ICarouselImageProps {
  objForm: UseFormReturn<any, any, undefined>;
  base64: any;
  isEdit: boolean | undefined;
}

const CarouselImage = (props: ICarouselImageProps) => {
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result ? reader.result : props.base64);
        // props.objForm.setValue("ImageUrl", reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  // if (props.isEdit) {
  //   setBase64(props.base64 ? props.base64 : "");
  //   // props.objForm.setValue("ImageUrl", props.base64);
  // }
  return (
    <div>
      <label htmlFor="change-cover">
        <TextField
          id="change-cover"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <Button
          startIcon={<UploadTwoToneIcon />}
          variant="contained"
          component="span"
        >
          Select Image
        </Button>
      </label>
    </div>
  );
};

export default CarouselImage;
