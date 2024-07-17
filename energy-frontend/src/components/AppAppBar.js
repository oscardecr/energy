import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import registerIcon from '../assets/dumbbell.png';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AppAppBar({ mode }) {
  const [open, setOpen] = React.useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleScrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const handlePricingClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToPricing: true } });
    } else {
      handleScrollToSection('pricing');
    }
  };

  React.useEffect(() => {
    if (location.state && location.state.scrollToPricing) {
      handleScrollToSection('pricing');
    }
  }, [location.state]);

  const handleUserOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserOptionsClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 'none', bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'hsla(220, 60%, 99%, 0.6)'
                : 'hsla(220, 0%, 0%, 0.7)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
          })}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <img src={registerIcon} alt="Energy's Gym Logo" style={{ height: 50, marginRight: 16 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="success" component={Link} to="/">INICIO</Button>
              <Button color="success" component={Link} to="/classes">HORARIOS</Button>
              <Button color="success" onClick={handlePricingClick}>PRECIOS</Button>
              <Button color="success" component={Link} to="/monthly-incomes">INGRESOS</Button>
              {user && (
                <>
                  <Button
                    color="success"
                    endIcon={<ExpandMoreIcon />}
                    onClick={handleUserOptionsClick}
                  >
                    OPCIONES DE USUARIOS
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserOptionsClose}
                  >
                    <MenuItem component={Link} to="/users" onClick={handleUserOptionsClose}>
                      Ver Usuarios
                    </MenuItem>
                    <MenuItem component={Link} to="/delete-user" onClick={handleUserOptionsClose}>
                      Eliminar Usuarios
                    </MenuItem>
                    <MenuItem component={Link} to="/signup" onClick={handleUserOptionsClose}>
                      Añadir Usuarios
                    </MenuItem>
                    <MenuItem component={Link} to="/update-user" onClick={handleUserOptionsClose}>
                      Editar Usuarios
                    </MenuItem>
                  </Menu>
                </>
              )}
              {user && (
                <Button color="success" component={Link} to="/expired-memberships">MEMBRESÍAS EXPIRADAS</Button>
              )}
              <Button color="success" component={Link} to="/class-registrations">USUARIOS EN CLASE</Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {!user ? (
              <>
                <Button color="success" component={Link} to="/signin" variant="text" size="small">
                  Iniciar Sesión
                </Button>
                <Button color="success" component={Link} to="/signup" variant="contained" size="small">
                  Registrarse
                </Button>
              </>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={logoutUser}
                sx={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                }}
              >
                Cerrar Sesión
              </Button>
            )}
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem component={Link} to="/">INICIO</MenuItem>
                <MenuItem component={Link} to="/classes">HORARIOS</MenuItem>
                <MenuItem onClick={handlePricingClick}>PRECIOS</MenuItem>
                <MenuItem omponent={Link} to="/monthly-incomes">INGRESOS</MenuItem>
                <MenuItem component={Link} to="/class-registrations">USUARIOS EN CLASE</MenuItem>
                {user && (
                  <>
                    <MenuItem component={Link} to="/users">Ver Usuarios</MenuItem>
                    <MenuItem component={Link} to="/delete-user">Eliminar Usuarios</MenuItem>
                    <MenuItem component={Link} to="/signup">Añadir Usuarios</MenuItem>
                    <MenuItem component={Link} to="/update-user">Editar Usuarios</MenuItem>
                  </>
                )}
                <Divider sx={{ my: 3 }} />
                {!user ? (
                  <>
                    <MenuItem component={Link} to="/signin">Iniciar Sesión</MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth component={Link} to="/signup">
                        Registrarse
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Button
                      color="secondary"
                      variant="contained"
                      fullWidth
                      onClick={logoutUser}
                      sx={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: '#333333',
                        },
                      }}
                    >
                      Cerrar Sesión
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default AppAppBar;
