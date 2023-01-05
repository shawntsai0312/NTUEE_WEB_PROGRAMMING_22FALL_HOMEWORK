import * as React from 'react';
import '../css/menuList.css';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useBetterLinktree } from '../hooks/useBetterLinktree';

const MenuList = () => {
  const { menuListSelected, setMenuListSelected } = useBetterLinktree();

  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/')
    setMenuListSelected('homePage')
  }

  const navigateToNewAdditionPage = () => {
    navigate('/newAdditionPage');
    setMenuListSelected('newAdditionPage')
  }

  const navigateToNewCollectionPage = () => {
    navigate('/collectionPage');
    setMenuListSelected('collectionPage')
  }

  const navigateToFollowingPage = () => {
    navigate('/followingPage');
    setMenuListSelected('followingPage')
  }

  return (
    <div className='menuListContainer'>
      <List
        style={{
          width: '100%',
          minWidth: '5vw',
          maxWidth: '20vw',
          height: '100vh',
          bgcolor: 'background.paper',
          paddingLeft: '2.5vw',
          paddingRight: '0.5vw',
          paddingTop: '2vw'
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={navigateToHomePage} selected={menuListSelected === 'homePage'} >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Homepage" />
        </ListItemButton>

        <ListItemButton onClick={navigateToNewAdditionPage} selected={menuListSelected === 'newAdditionPage'}>
          <ListItemIcon >
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="New addition" />
        </ListItemButton>

        <ListItemButton onClick={navigateToNewCollectionPage} selected={menuListSelected === 'collectionPage'}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Collection" />
        </ListItemButton>

        <ListItemButton onClick={navigateToFollowingPage} selected={menuListSelected === 'followingPage'}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Following" />
        </ListItemButton>
      </List>
    </div>
  )
}

export default MenuList;