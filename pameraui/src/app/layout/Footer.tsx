import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Pameraui
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </footer>
  );
};

export default Footer;
