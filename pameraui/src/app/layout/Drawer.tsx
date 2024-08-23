import React from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemText } from '@mui/material';

const Drawer: React.FC = () => {
  return (
    <MuiDrawer variant="permanent" open>
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
