import React from "react";
import {
  Drawer,
  List,
  ListItem,
  IconButton,
  Toolbar,
  Box,
} from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { Home, Notifications, Settings, Person } from "@mui/icons-material";
const Sidebar = () => {
  const drawerWidth = 80;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "white",
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
          paddingTop: "50px",

          overflowX: "hidden",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <List>
          <ListItem
            button
            sx={{
              justifyContent: "center",
              mb: 2,
              borderLeft: "10px solid black",
              borderRadius: "5px",
              backgroundColor: "#E5E5E5",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "10px",
                "&:hover": { backgroundColor: "#ddd" },
              }}
            >
              <Home sx={{ color: "#000" }} />
            </IconButton>
          </ListItem>

          <ListItem button sx={{ justifyContent: "center", mb: 2 }}>
            <IconButton
              sx={{
                borderRadius: "50%",
                padding: "10px",
                "&:hover": { backgroundColor: "#ddd" },
              }}
            >
              <Notifications sx={{ color: "#000" }} />
            </IconButton>
          </ListItem>

          <ListItem button sx={{ justifyContent: "center", mb: 2 }}>
            <IconButton
              sx={{
                borderRadius: "50%",
                padding: "10px",
                "&:hover": { backgroundColor: "#ddd" },
              }}
            >
              <Person sx={{ color: "#000" }} />
            </IconButton>
          </ListItem>
          <Box
            sx={{
              position: "relative",
              top: "150px",
            }}
          >
            <ListItem button sx={{ justifyContent: "center", mb: 2 }}>
              <IconButton
                sx={{
                  borderRadius: "50%",
                  padding: "10px",
                  "&:hover": { backgroundColor: "#ddd" },
                }}
              >
                <HelpOutlineIcon sx={{ color: "#000" }} />
              </IconButton>
            </ListItem>

            <ListItem button sx={{ justifyContent: "center", mb: 2 }}>
              <IconButton
                sx={{
                  borderRadius: "50%",
                  padding: "10px",
                  "&:hover": { backgroundColor: "#ddd" },
                }}
              >
                <Settings sx={{ color: "#000" }} />
              </IconButton>
            </ListItem>
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
