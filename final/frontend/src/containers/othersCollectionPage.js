import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import * as React from 'react';
import '../css/othersCollectionPage.css'
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_QUERY } from "../graphql/queries";
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { UPDATE_FOLLOWING, DELETE_FOLLOWING } from '../graphql/mutations';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { v4 as uuidv4 } from 'uuid';
import { CREATE_MERCHANDISE, CREATE_ITEM } from '../graphql/mutations';
import CloseIcon from '@mui/icons-material/Close';


const OthersCollectionPage = () => {
    /*--------------------------------------------------hooks declare-----------------------------------------------------*/
    //useLocation
    const { state } = useLocation();

    //useContext
    const { userData, isLogIn, userEmail } = useBetterLinktree();

    //useState
    const [merchandiseArr, setMerchandiseArr] = useState([]);
    const [merchandiseArrFiltered, setMerchandiseArrFiltered] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [originalPosition, setOriginalPosition] = useState([]);
    const [friendName, setFriendName] = useState('');
    const [isFollowing, setIsFollowing] = useState(true);
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [whichToAdd, setWhichToAdd] = useState(-1);

    //useMutation
    const [createMerchandise] = useMutation(CREATE_MERCHANDISE);
    const [createItem] = useMutation(CREATE_ITEM);
    const [updateFollowing] = useMutation(UPDATE_FOLLOWING);
    const [deleteFollowing] = useMutation(DELETE_FOLLOWING);

    //useNavigate
    const navigate = useNavigate();

    const { data: queryOtherData } = useQuery(
        GET_USER_QUERY,
        {
            variables: {
                email: state.email
            }
        }
    )
    /*------------------------------------------------hooks declare end---------------------------------------------------*/
    /*---------------------------------------------------fetch data-------------------------------------------------------*/
    useEffect(() => {
        // console.log(queryOtherData)
        if (queryOtherData) {
            setMerchandiseArr(queryOtherData.user.merchandise);
            setFriendName(queryOtherData.user.name)
        }
        if (isLogIn) {
            if (userData) {
                let followingIndex = userData.user.following.findIndex(e => e.email === state.email);
                console.log(followingIndex);
                if (followingIndex >= 0) setIsFollowing(true);
                else setIsFollowing(false);
            }
        }
        else console.log('please log in')
    }, [queryOtherData, userData])
    /*-------------------------------------------------fetch data end-----------------------------------------------------*/
    /*-----------------------------------------------------filter---------------------------------------------------------*/
    useEffect(() => {
        let results = [];
        let pos = [];
        if (filterText) {
            for (let i = 0; i < merchandiseArr.length; i++) {
                if (merchandiseArr[i].name.indexOf(filterText) !== -1) {
                    results.push(merchandiseArr[i]);
                    pos.push(i);
                }
            }
        } else {
            results = merchandiseArr;
            for (let i = 0; i < merchandiseArr.length; i++) {
                pos.push(i);
            }
        }
        if (results) {
            setMerchandiseArrFiltered(results);
            setOriginalPosition(pos);
        } else {
            setMerchandiseArrFiltered([]);
        }

    }, [filterText, merchandiseArr])
    /*---------------------------------------------------filter end-------------------------------------------------------*/
    /*-----------------------------------------------handle input change--------------------------------------------------*/
    const handleChange = (func) => (event) => {
        func(event.target.value);
    }
    /*---------------------------------------------handle input change end------------------------------------------------*/
    /*----------------------------------------------------navigate--------------------------------------------------------*/
    const navigateToMerchandisePage = (index) => () => {
        console.log("go to others merchandise items")
        navigate('/othersMerchandisePage', {
            state: {
                merIndex: index,
                id: merchandiseArr[index].id,
                items: merchandiseArr[index].items,
                name: merchandiseArr[index].name
            }
        })
    }
    /*--------------------------------------------------navigate end------------------------------------------------------*/
    /*------------------------------------------------handle following----------------------------------------------------*/
    const handleFollowClick = async () => {
        console.log("follow click")
        if (isFollowing) {
            await deleteFollowing({
                variables: {
                    input: {
                        email: state.email.toLowerCase(),
                        myEmail: userEmail.toLowerCase()
                    }
                }
            })
        } else {
            await updateFollowing({
                variables: {
                    input: {
                        email: state.email.toLowerCase(),
                        myEmail: userEmail.toLowerCase()
                    }
                }
            })
        }
    }
    /*-----------------------------------------------handle following end-------------------------------------------------*/
    /*----------------------------------------------------handle add------------------------------------------------------*/
    const handleAddOthersMerchandise = (index) => (e) => {
        e.stopPropagation();
        setConfirmAdd(true);
        setWhichToAdd(index);
    }

    const handleConfirmAddInModal = async () => {
        const merchandiseId = uuidv4()
        await createMerchandise({
            variables: {
                input: {
                    id: merchandiseId,
                    email: userEmail.toLowerCase(),
                    name: merchandiseArr[whichToAdd].name,
                    isFavorite: false
                }
            }
        })
        for (let i = 0; i < merchandiseArr[whichToAdd].items.length; i++) {
            await createItem({
                variables: {
                    input: {
                        id: uuidv4(),
                        merchandiseId,
                        email: userEmail.toLowerCase(),
                        link: merchandiseArr[whichToAdd].items[i].link,
                        description: merchandiseArr[whichToAdd].items[i].description
                    }
                }
            })
        }
        handleCloseAdd();
        navigate('/collectionPage')
    }

    const handleCloseAdd = () => {
        setConfirmAdd(false);
    }
    /*--------------------------------------------------handle add end----------------------------------------------------*/
    return (
        <div className='othersCollectionContainer'>
            <Stack
                spacing={2}
                justifyContent='space-around'
                alignItems='center'
            >
                <Box
                    className='stackItem'
                    sx={{
                        bgcolor: 'background.paper',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: '4vh'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2 className='othersCollectionTitle'>{friendName + "'s Merchandise List"}</h2>
                    {
                        isLogIn ?
                            <Button
                                variant="outlined"
                                startIcon={
                                    isFollowing ?
                                        <LibraryAddCheckIcon />
                                        : <AddToPhotosIcon />
                                }
                                onClick={handleFollowClick}
                                style={{ width: '10vw', marginLeft: '2vw' }}
                            >
                                {
                                    isFollowing ?
                                        "following"
                                        : "follow"
                                }
                            </Button> : <></>
                    }

                </Box>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', my: 0.5, height: '7vh' }}>
                        <FilterAltIcon sx={{ p: '10px' }} aria-label="search" color="action" />
                        <InputBase
                            sx={
                                filterText ?
                                    { width: '16.95vw' }
                                    : { width: '20vw' }
                            }
                            placeholder="Filter by merchandise name"
                            inputProps={{ 'aria-label': 'filter by merchandise name' }}
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
                    {/* merchandise array map */}
                    <Box sx={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                        {
                            merchandiseArrFiltered.length !== 0 ?
                                <>
                                    {
                                        merchandiseArrFiltered.map((merchandise, index) => {
                                            return (
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                    onClick={navigateToMerchandisePage(originalPosition[index])}
                                                >
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <CardGiftcardIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={merchandise.name} />
                                                    </ListItemButton>
                                                    {
                                                        isLogIn ?
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="add"
                                                                sx={{ mr: 5, my: 1 }}
                                                                onClick={handleAddOthersMerchandise(originalPosition[index])}
                                                            >
                                                                <AddCircleIcon />
                                                            </IconButton>
                                                            : <></>

                                                    }
                                                </Box>
                                            )
                                        })
                                    }
                                </>
                                : <>
                                    {
                                        isLogIn ?
                                            <h3 className='nothingFound'>No merchandise is found</h3>
                                            : <></>
                                    }
                                </>
                        }
                    </Box>
                    {/* merchandise array map end */}
                </Box>
                {/* delete modal */}
                <Modal
                    open={confirmAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={
                        {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '25vw',
                            bgcolor: 'background.paper',
                            borderRadius: '20px',
                            boxShadow: 24,
                            p: 4,
                        }
                    }>
                        <Stack
                            spacing={2}
                            justifyContent='space-around'
                            alignItems='center'
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    size='large'
                                    variant='outlined'
                                    component="label"
                                    onClick={handleConfirmAddInModal}
                                    sx={{ my: 1 }}
                                >
                                    are you sure ?
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Modal>
                {/* delete modal end */}
            </Stack>
        </div>

    )
}

export default OthersCollectionPage