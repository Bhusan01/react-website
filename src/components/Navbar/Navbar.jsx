import React from 'react';
import {AppBar,IconButton, Badge, MenuItem, Menu, Typography, Toolbar} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import logo from '../../assets/shop.png';
import useStyles from './styles';
import {Link , useLocation} from 'react-router-dom'

const Navbar = ({total}) => {
    const classes = useStyles()
    const location = useLocation()
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Online Shop
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname == '/' && ( 
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" arial-label="show cart items" color="inherit">
                            <Badge badgeContent={total} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
                   
                </Toolbar>
            </AppBar>   
        </>
    )
}

export default Navbar
