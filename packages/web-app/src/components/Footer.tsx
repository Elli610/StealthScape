import React from "react";
import { Box, Link, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(18, 18, 18, 0.2)",
        textAlign: "center",
        padding: "20px 0px 20px 0px",
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        sx={{
          color: "white",
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
        }}
      >
        © 2024 StealthScape. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

