import React from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    text: "Account Settings",
    icon: <SettingsIcon />,
    to: "/profile/settings",
  },
  {
    text: "Order List",
    icon: <ShoppingBagIcon />,
    to: "/profile/orders",
  },
  {
    text: "Transaction List",
    icon: <AccountBalanceWalletIcon />,
    to: "/profile/transactions",
  },
];

const ProfileSidebar = ({ onLinkClick }) => {
  return (
    <Box
      sx={{
        width: { xs: 250, lg: "100%" },
        textAlign: "center",
        background: "linear-gradient(180deg, #ff91a4, #f871a0)",
        color: "white",
        height: "100%",
        p: 3,
        borderRadius: 2,
      }}
    >
      <Avatar
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Profile"
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 2,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />
      <Typography variant="h6" fontWeight={600}>
        Imtiyaz Alam
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
        imtiyaz@example.com
      </Typography>

      <Divider sx={{ mb: 2, backgroundColor: "rgba(255,255,255,0.5)" }} />

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.to}
            onClick={onLinkClick}
            sx={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255,255,255,0.3)" : "transparent",
              borderRadius: 2,
              mb: 1,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
              },
            })}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ProfileSidebar;
