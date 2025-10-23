import React, { useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileSidebar from "./ProfileSidebar";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) setMobileOpen(false); // close drawer on link click
  };

  const drawer = <ProfileSidebar onLinkClick={handleLinkClick} />;

  return (
    <Box
      sx={{
        backgroundColor: "#fff5f7",
        minHeight: "100vh",
        py: 4,
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* Hamburger Icon for mobile */}
      {isMobile && (
        <IconButton onClick={handleDrawerToggle} sx={{ mb: 2 }} color="primary">
          <MenuIcon />
        </IconButton>
      )}

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Sidebar */}
        {!isMobile && <Grid size={{ lg: 3, xl: 3 }}>{drawer}</Grid>}

        {/* Drawer for mobile */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        )}

        {/* Main content */}
        <Grid size={{ lg: 9, xl: 9 }}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
