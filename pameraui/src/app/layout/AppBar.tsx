import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Pameraui
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
