import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Menu as MenuIcon, Dashboard as DashboardIcon } from '@material-ui/icons';
import './ListeOuvrier.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerContainer: {
    overflowY: 'auto',
  },
  card: {
    marginBottom: 10,
  },
}));

const ListeOuvrier = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <MenuIcon />
          <Typography variant="h6" noWrap>
            Mon Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            {/* Ajoutez d'autres éléments de menu ici */}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div>
          {[1, 2, 3, 4, 5].map((item) => (
            <Card key={item} className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card {item}
                </Typography>
                <Typography color="textSecondary">
                  Description de la carte {item}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListeOuvrier;
