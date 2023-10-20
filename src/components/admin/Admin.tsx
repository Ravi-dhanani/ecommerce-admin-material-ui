import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ApiServices from "../services/Apiservices";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type loginData = yup.InferType<typeof schema>;
export default function Admin() {
  const [id, setId] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await ApiServices.getLstAdmin();
    } catch (errors: any) {
      console.log(errors);
    }
  };
  useEffect(() => {
    const adminData: any = localStorage.getItem("userData");
    const admin = JSON.parse(adminData);
    setId(admin);
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Admin
            </Typography>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 1 }}
              sx={{ flexDirection: "column" }}
            >
              <Grid item xs={12}>
                <div>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    defaultValue={id?.email ? id.email : ""}
                    {...register("email")}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password")}
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                  />
                </div>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </form>
    </div>
  );
}
