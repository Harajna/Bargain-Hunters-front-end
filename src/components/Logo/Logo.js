import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = ({w, h }) => {
  return (
    <Box>
      <Link to="/">
        <Box sx={{
          width: w || 150,
          height: h || 150,
        }} component="img" src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9" alt="logo" />
      </Link>
    </Box>
  );
};

export default Logo;
