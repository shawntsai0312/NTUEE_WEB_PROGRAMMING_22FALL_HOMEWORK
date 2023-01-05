import { useState, useEffect } from 'react';
import * as React from 'react';
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';
import { useNavigate } from 'react-router-dom';
import '../css/followingPage.css'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormControlLabel from '@mui/material/FormControlLabel';
import ContactsIcon from '@mui/icons-material/Contacts';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const FollowingPage = () => {

    /*--------------------------------------------------hooks declare-----------------------------------------------------*/
    //useContext
    const { userData, isLogIn } = useBetterLinktree();

    //useState
    const [followingArr, setFollowingArr] = useState([]);
    const [followingArrFiltered, setFollowingArrFiltered] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [originalPosition, setOriginalPosition] = useState([]);
    const [filterWhich, setFilterWhich] = useState('name');

    //useNavigate
    const navigate = useNavigate();

    /*------------------------------------------------hooks declare end---------------------------------------------------*/
    /*---------------------------------------------------fetch data-------------------------------------------------------*/
    useEffect(() => {
        if (isLogIn) {
            if (userData) setFollowingArr(userData.user.following);
        }
        else console.log('please log in')
    }, [userData])
    /*-------------------------------------------------fetch data end-----------------------------------------------------*/
    /*-----------------------------------------------------filter---------------------------------------------------------*/
    useEffect(() => {
        let results = [];
        let pos = [];
        if (filterText && filterWhich === 'name') {
            for (let i = 0; i < followingArr.length; i++) {
                if (followingArr[i].name.indexOf(filterText) !== -1) {
                    results.push(followingArr[i]);
                    pos.push(i);
                }
            }
        } else if (filterText && filterWhich === 'email') {
            for (let i = 0; i < followingArr.length; i++) {
                if (followingArr[i].email.indexOf(filterText) !== -1) {
                    results.push(followingArr[i]);
                    pos.push(i);
                }
            }
        } else {
            results = followingArr;
            for (let i = 0; i < followingArr.length; i++) {
                pos.push(i);
            }
        }
        if (results) {
            setFollowingArrFiltered(results);
            setOriginalPosition(pos);
        } else {
            setFollowingArrFiltered([]);
        }

    }, [filterText, filterWhich, followingArr])

    const handleRadioButton = (e) => {
        setFilterWhich(e.target.value);
    }
    /*---------------------------------------------------filter end-------------------------------------------------------*/
    /*-----------------------------------------------handle input change--------------------------------------------------*/
    const handleChange = (func) => (event) => {
        func(event.target.value);
    }
    /*---------------------------------------------handle input change end------------------------------------------------*/
    /*----------------------------------------------------navigate--------------------------------------------------------*/
    const navigateToOthersCollection = (index) => () => {
        console.log("go to others collection")
        console.log(followingArr[index])
        navigate('/othersCollectionPage', {
            state: {
                email: followingArr[index].email,
            }
        })
    }
    /*--------------------------------------------------navigate end------------------------------------------------------*/

    return (
        <div className='followingPageContainer'>
            {
                isLogIn ?
                    <Stack
                        spacing={2}
                        justifyContent='space-around'
                        alignItems='center'
                    >
                        <h2 className='followingPageTitle'>Your Following List</h2>
                        <Box
                            className='stackItem'
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1.5, width: '70vw' },
                                bgcolor: 'background.paper',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {/* filter */}
                            <Stack direction='row' spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center' }} >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={handleRadioButton}
                                        defaultValue={"name"}
                                    >
                                        <FormControlLabel
                                            value="name"
                                            control={<Radio size="small" />}
                                            label="Name"
                                        />
                                        <FormControlLabel
                                            value="email"
                                            control={<Radio size="small" />}
                                            label="Email"
                                        />
                                    </RadioGroup>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', my: 0.5, height: '7vh' }}>
                                    <FilterAltIcon sx={{ p: '10px' }} aria-label="search" color="action" />
                                    <InputBase
                                        sx={
                                            filterText ?
                                                { width: '16.95vw' }
                                                : { width: '20vw' }
                                        }
                                        placeholder={
                                            filterWhich === 'name' ?
                                                "Filter by name"
                                                : "Filter by email"
                                        }
                                        inputProps={{ 'aria-label': 'filter by user name' }}
                                        onChange={handleChange(setFilterText)}
                                        value={filterText}
                                    />
                                    <>
                                        {
                                            filterText ?
                                                <IconButton edge="end" aria-label="clear" size='small' sx={{ mr: 2, my: 1, width: '2vw' }} onClick={() => setFilterText('')} >
                                                    <CloseIcon />
                                                </IconButton>
                                                : <></>
                                        }
                                    </>
                                </Box>
                            </Stack>
                            {/* filter end */}
                            {/* merchandise array map */}
                            <Box sx={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {
                                    followingArrFiltered.length !== 0 ?
                                        <>
                                            {
                                                followingArrFiltered.map((followingUser, index) => {
                                                    return (
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={navigateToOthersCollection(originalPosition[index])}>
                                                            <ListItemButton>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ContactsIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={followingUser.name} secondary={followingUser.email} />
                                                            </ListItemButton>
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </>
                                        : <>
                                            {
                                                isLogIn ?
                                                    <h3 className='nothingFound'>You Have Not Followed Anyone</h3>
                                                    : <></>
                                            }
                                        </>
                                }
                            </Box>
                            {/* merchandise array map end */}
                        </Box>
                    </Stack>
                    : <>
                        {
                            /* alert */
                            <Alert severity="error" >
                                You Have Not Logged In ! Please Log In !
                            </Alert>
                            /* alert end */
                        }
                    </>
            }
        </div>

    )
};

export default FollowingPage;