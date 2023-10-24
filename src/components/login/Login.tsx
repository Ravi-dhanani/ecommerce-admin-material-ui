import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import ApiServices from "../services/Apiservices";
import AuthServices from "../services/AuthServices";
import { setUserData } from "../services/pulState/store";
import { useEffect } from "react";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type loginData = yup.InferType<typeof schema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: loginData) => {
    try {
      const res = await ApiServices.login(data);
      setUserData(res.data);
      AuthServices.setToken(res.token);
      AuthServices.setUser(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard");
    } catch (errors: any) {
      console.log(errors);
    }
  };
  useEffect(() => {
    const isLogin = AuthServices.getUser();
    if (isLogin) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                    {...register("email")}
                    autoFocus
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
