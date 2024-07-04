import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import { useCart } from '../../context/cartContext/CartContext';
import "./index.css";
import { fetchCartItemsFromLocalStorage } from '../../utils';


const Header = () => {
    const pages = [{ name: "Home", link: "/" }];
    const { state, addToCart } = useCart();
    const { cartItems } = state;
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const redirectCart = () => {
        navigate('/cart', { replace: true });
    };
   
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        className="logo"
                    >
                        Fake Shop
                    </Typography>

                    <div className="menuIconContainer">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            className="menuIcon"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography className="secMenuText"><Link className="secMenu" to={page.link}>{page.name}</Link></Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                    <LocalMallIcon className="localMallIconMobile" />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        className="headerTitle"
                    >
                        Fake Shop
                    </Typography>
                    <div className="navButtons">
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                className="navButton"
                            >
                                <Link to={page.link}>{page.name}</Link>
                            </Button>
                        ))}
                    </div>

                    <div className="userMenu">
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} className="avatarButton">
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Your Cart">
                            <IconButton
                                onClick={redirectCart}
                                aria-label="cart items"
                                color="inherit"
                            >
                                <Badge badgeContent={fetchCartItemsFromLocalStorage()?.length} color="error">
                                    <LocalMallIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            className="userMenuDropdown"
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
