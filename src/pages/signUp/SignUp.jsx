import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link } from "react-router-dom";
import SignupForm from "../../components/SignUpForm/SignUpForm";
import { signupAction } from "../../redux/actions/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Bargain Hunters
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  ///from mui
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

  const handleSignup = async (e) => {
    e.preventDefault();
    await dispatch(signupAction(userData))
      .then(() => navigate("/signin"))
      .catch((e) => console.error(e));
  };
  const handleInputChange = (e) => {
    userData[e.target.name] = e.target.value;
  };


  return (
    //  style={{
    //       backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9')`
    //     }}
    <div className="has-bg-img bg-purple bg-blend-screen">
      {/* <img className="bg-img" src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9" alt="..."/> */}

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              className="bg-img"
              src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9"
              alt="..."
              style={{ width: "15em", height: "auto", borderRadius: "10%" }}
            />

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
            //   onSubmit={handleSubmit}
            onSubmit={handleSignup} 
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    onChange={handleInputChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleInputChange}

                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      {/* <img className="bg-img" src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9" alt="..."/> */}
      {/* <SignupForm /> */}
    </div>
  );
}
