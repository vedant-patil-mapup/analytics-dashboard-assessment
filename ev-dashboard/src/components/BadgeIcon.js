import React from 'react';
import { Box, Typography } from '@mui/material';


const BadgeIcon = ({ icon: Icon, badgeContent, badgeColor, iconColor, badgeSize = 20, iconSize = 30 }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5fc",
        height: "50px",
        width: "50px",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f5f5fc",
          height: `${badgeSize}px`,
          width: `${badgeSize}px`,
          borderRadius: "50%",
          position: "absolute",
          right: "-5px",
          top: "-5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: badgeColor || "darkblue",
            height: `${badgeSize - 5}px`,
            width: `${badgeSize - 5}px`,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="overline" fontSize={8}>{badgeContent}</Typography>
        </Box>
      </Box>
      <Icon sx={{ color: iconColor || "darkblue", fontSize: `${iconSize}px` }} />
    </Box>
  );
};

export default BadgeIcon;
