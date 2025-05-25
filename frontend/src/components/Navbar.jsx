import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Explore as ExploreIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/login');
  };

  const pages = [
    { name: 'Explore', path: '/explore', icon: <ExploreIcon /> },
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Goals', path: '/goals', icon: <TimelineIcon /> },
    { name: 'Connect', path: '/social', icon: <PeopleIcon /> },
    { name: 'Discover', path: '/recommendations', icon: <LightbulbIcon /> },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <RouterLink to="/" className={styles.logo}>
          NOVALYN
        </RouterLink>

        {/* Mobile Menu */}
        <div className={styles.mobileMenu}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            className={styles.mobileNav}
          >
            {user && pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to={page.path}
                className={`${styles.mobileNavLink} ${location.pathname === page.path ? styles.active : ''}`}
              >
                {page.icon}
                <span>{page.name}</span>
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          {user && pages.map((page) => (
            <RouterLink
              key={page.name}
              to={page.path}
              className={`${styles.navLink} ${location.pathname === page.path ? styles.active : ''}`}
            >
              {page.icon}
              <span>{page.name}</span>
            </RouterLink>
          ))}
        </div>

        {/* User Menu */}
        <div className={styles.userMenu}>
          {user ? (
            <>
              <Avatar
                onClick={handleOpenUserMenu}
                src={user.profilePicture}
                alt={user.name}
                className={styles.avatar}
              >
                {user.name?.charAt(0)}
              </Avatar>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className={styles.dropdown}
              >
                <MenuItem
                  component={RouterLink}
                  to="/profile"
                  onClick={handleCloseUserMenu}
                  className={styles.dropdownItem}
                >
                  <PersonIcon className={styles.icon} />
                  <span>Profile</span>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className={styles.dropdownItem}
                >
                  <LogoutIcon className={styles.icon} />
                  <span>Logout</span>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              startIcon={<LoginIcon />}
              className={styles.loginButton}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar; 