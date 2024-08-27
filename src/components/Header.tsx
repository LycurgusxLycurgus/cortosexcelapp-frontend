import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArcadeButton } from './ArcadeComponents';
import { motion } from 'framer-motion';

interface HeaderProps {
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  onAction: () => void;
}

const Header: React.FC<HeaderProps> = ({ focusMode, setFocusMode, onAction }) => {
  return (
    <AppBar position="static" component={motion.div} initial={{ y: -50 }} animate={{ y: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CortosExcelApp
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={focusMode}
              onChange={(e) => setFocusMode(e.target.checked)}
              color="secondary"
            />
          }
          label="Focus Mode"
        />
        <ArcadeButton color="inherit" onClick={onAction} component={Link} to="/login">
          Login
        </ArcadeButton>
        <ArcadeButton color="inherit" onClick={onAction} component={Link} to="/register">
          Register
        </ArcadeButton>
        <ArcadeButton color="inherit" onClick={onAction} component={Link} to="/topics">
          Topics
        </ArcadeButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;