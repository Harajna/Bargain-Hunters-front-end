import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// import { Form, FormikProvider, useFormik } from "formik";
// import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { signinAction } from "../../redux/actions/auth";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "react-bootstrap";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};


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

const LoginForm = ({ }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    account: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    userData[e.target.name] = e.target.value;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("I AM GOING TO SIGN IN")
    await dispatch(signinAction(userData))
      .then(() => navigate("/home"))
      .catch((e) => console.error(e));
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleLogin}
    >
      <Box
        component={motion.div}
        animate={{
          transition: {
            staggerChildren: 0.55,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={animate}
        >
          <TextField
            fullWidth
            autoComplete="username"
            type="string"
            label="Email or Username "
            name="account"
            helperText="Enter your username or email"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            helperText="Enter your password"
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Icon icon="eva:eye-fill" />
                    ) : (
                      <Icon icon="eva:eye-off-fill" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={animate}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox />
              }
              label="Remember me"
            />


         <Link to="/" component={RouterLink} >
            < HomeIcon  sx={{  fontSize: 40}} /><KeyboardReturnIcon  sx={{  fontSize: 25}} />
            </Link> 
            {/* <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
              >
                Forgot password?
              </Link> */}
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {isSubmitting ? "loading..." : "Login"}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                New to Bargain Hunters? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </form>


  );
};

export default LoginForm;
