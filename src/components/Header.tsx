import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import { ArcadeButton } from './ArcadeComponents';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

interface HeaderProps {
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  onAction: () => void;
}

const Header: React.FC<HeaderProps> = ({ focusMode, setFocusMode, onAction }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" component={motion.div} initial={{ y: -50 }} animate={{ y: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CortosExcelApp
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { onAction(); handleClose(); }}>
                <ArcadeButton color="inherit" to="/login">Login</ArcadeButton>
              </MenuItem>
              <MenuItem onClick={() => { onAction(); handleClose(); }}>
                <ArcadeButton color="inherit" to="/register">Register</ArcadeButton>
              </MenuItem>
              <MenuItem onClick={() => { onAction(); handleClose(); }}>
                <ArcadeButton color="inherit" to="/topics">Topics</ArcadeButton>
              </MenuItem>
              <MenuItem>
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
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
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
            <ArcadeButton color="inherit" onClick={onAction} to="/login">
              Login
            </ArcadeButton>
            <ArcadeButton color="inherit" onClick={onAction} to="/register">
              Register
            </ArcadeButton>
            <ArcadeButton color="inherit" onClick={onAction} to="/topics">
              Topics
            </ArcadeButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;