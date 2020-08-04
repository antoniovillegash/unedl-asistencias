import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '../../../assets/icons/menu.svg';
import userIcon from '../../../assets/icons/account-circle.svg';
import Index from './index';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height:'100%',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menu: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth+drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor:'var(--theme-color-2)',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerList:{
    height:'100%'
  },
  bottom: {
    zIndex:'2',
    bottom: '0',
    position: 'fixed',
    width:drawerWidth,
    backgroundColor:'var(--theme-color-2)',
  },
  mainContent:{
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    width:'100%',
  },
  drawerHeader:{
    height:'5em'
  },
  ButtonLogin:{
    marginLeft:'auto',
    backgroundColor:'var(--theme-color-2)',
  }
}));

function UserMainContainer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLogged, setLogged] = React.useState(localStorage.getItem('token') ? true : false);
  //const [numberOfNotifications, setNumberOfNotifications] = React.useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    setLogged(false);
    
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let ButtonLogin;
  if (localStorage.getItem('token') === null) {
    return (<Redirect to="/login" />);
    // ButtonLogin = <Button
    // variant="contained"
    // className={classes.ButtonLogin} 
    //  href="/login" 
    //  color="primary">Iniciar sesión</Button>
  } else {
    ButtonLogin = <Button
    variant="contained"
    className={classes.ButtonLogin} 
    onClick={handleLogout} 
    color="primary">cerrar sesión</Button>
  }

  // const getNotifications = () => {
  //   Axios.get(process.env.REACT_APP_MAIN_IP + ':'+process.env.BACKEND_PORT+'/api/notifications/count/'
  //     , {
  //       headers: {
  //         Authorization: 'bearer ' + localStorage.getItem('token')
  //       }
  //     })
  //     .then(response => {
  //       //console.log(response.data)
  //       setNumberOfNotifications(response.data)
  //     })
  //     .catch(error => {

  //     })
  // }
  // getNotifications()

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <div className={classes.drawerList}>

     
      
      

      <div >
      {isLogged ?
      <List className={classes.bottom}>
      <a href="/">

        <ListItem button key="usuario" >
          <ListItemIcon><img src={userIcon} alt="icono usuario" /></ListItemIcon>
          <ListItemText primary={localStorage.getItem('userEmail')}/>
        </ListItem>
      </a>
      </List>
      :
      null}
    </div>

    </div>

    </div >
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            
              <img src={MenuIcon} alt="icono menú" />
           
          </IconButton>
          <Typography variant="h6" noWrap>
            Lista de asistencias
          </Typography>
          {ButtonLogin}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
     
      <main className={classes.mainContent}>
      <div className={classes.drawerHeader} />
        <Index />
        <div className={classes.menu}>
          
        </div>
      </main>
    </div>
    
  );
}

UserMainContainer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

//export default UserMainContainer;
export default React.memo(UserMainContainer)
