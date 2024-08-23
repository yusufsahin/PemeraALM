import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Paper } from '@mui/material';

const Footer: React.FC = () => {
    return (
      <Paper sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
      }}>    
        <Typography variant="body2" color="text.secondary" align="center" sx={{margin:2}}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Paper>
    );
  }

  export default Footer;