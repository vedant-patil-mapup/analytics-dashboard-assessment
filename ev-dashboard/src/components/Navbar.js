import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BadgeIcon from "./BadgeIcon";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffff",
        boxShadow: "none",
        p: 2,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, color: "black" }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", ml: 5 }}
        >
          <Paper
            component="form"
            sx={{
              p: "0px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
              boxShadow: "none",
              backgroundColor: "#FDFDFD",
              borderRadius: "8px",
              marginRight: "20px",
              border: "1px solid grey",
            }}
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search anything..."
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 1,
            gap: "15px",
          }}
        >
          <BadgeIcon
            icon={NotificationsIcon}
            badgeContent="21"
            badgeColor="darkblue"
            iconColor="darkblue"
            badgeSize={25}
            iconSize={30}
          />
          <BadgeIcon
            icon={SettingsIcon}
            badgeContent="53"
            badgeColor="darkblue"
            iconColor="darkblue"
            badgeSize={25}
            iconSize={30}
          />
          <BadgeIcon
            icon={SettingsIcon}
            badgeContent="31"
            badgeColor="#FF5B5B"
            iconColor="#FF5B5B"
            badgeSize={25}
            iconSize={30}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ ml: 2 }} />
          <Typography variant="body1" sx={{ color: "#000", ml: 1 }}>
            Hi, Umair
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "black" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
