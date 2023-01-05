import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import '../css/collectionPage.css'
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_MERCHANDISE, DELETE_MERCHANDISE } from '../graphql/mutations';
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CloseIcon from '@mui/icons-material/Close';

const CollectionPage = () => {
    /*--------------------------------------------------hooks declare-----------------------------------------------------*/
    //useContext
    const { userData, isLogIn, userEmail, setMenuListSelected } = useBetterLinktree();

    //useState
    const [merchandiseArr, setMerchandiseArr] = useState([]);
    const [name, setName] = useState('');
    const [isNameFilled, setIsNameFilled] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [whichToEdit, setWhichToEdit] = useState(-1);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [whichToDelete, setWhichToDelete] = useState(-1);
    const [merchandiseArrFiltered, setMerchandiseArrFiltered] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [originalPosition, setOriginalPosition] = useState([]);
    const [filterFavorite, setFilterFavorite] = useState(false);

    //useNavigate
    const navigate = useNavigate();

    //useMutation
    const [updateMerchandise] = useMutation(UPDATE_MERCHANDISE);
    const [deleteMerchandise] = useMutation(DELETE_MERCHANDISE)
    /*------------------------------------------------hooks declare end---------------------------------------------------*/
    /*---------------------------------------------------fetch data-------------------------------------------------------*/
    useEffect(() => {
        if (isLogIn) {
            if (userData) {
                if(userData.user){
                    console.log(userData.user.merchandise)
                    setMerchandiseArr(userData.user.merchandise);
                }
            }
        }
        else console.log('please log in')
    }, [userData])

    /*-------------------------------------------------fetch data end-----------------------------------------------------*/
    /*------------------------------------------------favorite & filter---------------------------------------------------*/
    useEffect(() => {
        let results = [];
        let pos = [];
        if (filterFavorite) {
            if (filterText) {
                for (let i = 0; i < merchandiseArr.length; i++) {
                    if (merchandiseArr[i].name.indexOf(filterText) !== -1 && merchandiseArr[i].isFavorite) {
                        results.push(merchandiseArr[i]);
                        pos.push(i);
                    }
                }
            } else {
                for (let i = 0; i < merchandiseArr.length; i++) {
                    if (merchandiseArr[i].isFavorite) {
                        results.push(merchandiseArr[i]);
                        pos.push(i);
                    }
                }
            }
        } else {
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
        }
        console.log(merchandiseArrFiltered)
        if (results) {
            setMerchandiseArrFiltered(results);
            setOriginalPosition(pos);
        } else {
            setMerchandiseArrFiltered([]);
        }

    }, [filterFavorite, filterText, merchandiseArr])

    const handleFavoriteClick = (event) => {
        setFilterFavorite(event.target.checked);
        console.log(filterFavorite)
    };
    /*----------------------------------------------favorite & filter end-------------------------------------------------*/
    /*-------------------------------------------------handle favorite----------------------------------------------------*/
    const handleFavorite = (index) => async (e) => {
        e.stopPropagation();
        console.log(merchandiseArr[index].isFavorite)
        await updateMerchandise({
            variables: {
                input: {
                    id: merchandiseArr[index].id,
                    name: merchandiseArr[index].name,
                    email: userEmail.toLowerCase(),
                    isFavorite: !merchandiseArr[index].isFavorite
                }
            }
        })

    }
    /*-----------------------------------------------handle favorite end--------------------------------------------------*/
    /*---------------------------------------------------handle edit------------------------------------------------------*/
    const handleEditMerchandise = (index) => (e) => {
        e.stopPropagation();
        console.log("press editName")
        setName(merchandiseArr[index].name)
        setWhichToEdit(index);
        setOpenEdit(true);
        setIsNameFilled(true);
    }

    const handleEditInModal = async () => {
        if (name) {
            await updateMerchandise({
                variables: {
                    input: {
                        id: merchandiseArr[whichToEdit].id,
                        name,
                        email: userEmail.toLowerCase(),
                        isFavorite: merchandiseArr[whichToEdit].isFavorite
                    }
                }
            })
            setName('');
            handleCloseEdit();
        } else {
            setIsNameFilled(false);
        }
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setName('');
    }
    /*-------------------------------------------------handle edit end----------------------------------------------------*/
    /*--------------------------------------------------handle delete-----------------------------------------------------*/
    const handleDeleteMerchandise = (index) => (e) => {
        e.stopPropagation();
        setConfirmDelete(true);
        setWhichToDelete(index);
    }

    const handleConfirmDeleteInModal = async () => {
        await deleteMerchandise({
            variables: {
                input: {
                    email: userEmail.toLowerCase(),
                    id: merchandiseArr[whichToDelete].id
                }
            }
        })
        handleCloseDelete();
    }

    const handleCloseDelete = () => {
        setConfirmDelete(false);
    }
    /*------------------------------------------------handle delete end---------------------------------------------------*/
    /*-----------------------------------------------handle input change--------------------------------------------------*/
    const handleChange = (func) => (event) => {
        func(event.target.value);
    }
    /*---------------------------------------------handle input change end------------------------------------------------*/
    /*----------------------------------------------------navigate--------------------------------------------------------*/
    const navigateToMerchandisePage = (index) => () => {
        console.log("go to items")
        navigate('/merchandisePage', {
            state: {
                merIndex: index,
                id: merchandiseArr[index].id,
                items: merchandiseArr[index].items,
                name: merchandiseArr[index].name
            }
        })
    }

    const navigateToNewAdditionPage = () => {
        navigate('/newAdditionPage');
        setMenuListSelected('newAdditionPage')
    }
    /*--------------------------------------------------navigate end------------------------------------------------------*/
    return (
        <div className='collectionContainer'>
            {
                isLogIn ?
                    <Stack
                        spacing={2}
                        justifyContent='space-around'
                        alignItems='center'
                    >
                        <h2 className='collectionTitle'>Your Merchandise List</h2>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', my: 0.5 ,height:'7vh'}}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch
                                            checked={filterFavorite}
                                            onChange={handleFavoriteClick}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />}
                                        label="Favorite"
                                    />
                                </FormGroup>
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
                                            <IconButton edge="end" aria-label="clear" size='small' sx={{ mr: 2, my: 1, width:'2vw' }} onClick={() => setFilterText('')} >
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
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={navigateToMerchandisePage(originalPosition[index])}>
                                                            <ListItemButton>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <CardGiftcardIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={merchandise.name} />
                                                                <IconButton edge="end" aria-label="edit" sx={{ mr: 2, my: 1 }} onClick={handleFavorite(originalPosition[index])} >
                                                                    {
                                                                        merchandiseArrFiltered[index].isFavorite ?
                                                                            <FavoriteIcon />
                                                                            : <FavoriteBorderIcon />
                                                                    }

                                                                </IconButton>
                                                                <IconButton edge="end" aria-label="edit" sx={{ mr: 2, my: 1 }} onClick={handleEditMerchandise(originalPosition[index])} >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton edge="end" aria-label="delete" sx={{ mr: 2, my: 1 }} onClick={handleDeleteMerchandise(originalPosition[index])} >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </ListItemButton>
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
                        {/* edit modal */}
                        <Modal
                            open={openEdit}
                            onClose={handleCloseEdit}
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
                                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                        <CardGiftcardIcon sx={{ mr: 2, my: 1 }} />
                                        <TextField
                                            id="input-with-sx"
                                            label="Merchandise Name"
                                            variant="standard"
                                            onChange={handleChange(setName)}
                                            style={{ width: '20vw' }}
                                            error={!isNameFilled}
                                            helperText={
                                                isNameFilled ?
                                                    '                   ' :
                                                    "A link is required."
                                            }
                                            value={name}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Button size='large' variant='outlined' component="label" onClick={handleEditInModal} sx={{ my: 1 }}>EDIT</Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Modal>
                        {/* edit modal end */}
                        {/* delete modal */}
                        <Modal
                            open={confirmDelete}
                            onClose={handleCloseDelete}
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
                                        <Button size='large' variant='outlined' component="label" onClick={handleConfirmDeleteInModal} sx={{ my: 1 }}>
                                            are you sure ?
                                        </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Modal>
                        {/* delete modal end */}
                        {/* add new merchandise button */}
                        <Button
                            className='stackItem'
                            size='large'
                            variant='outlined'
                            component="label"
                            onClick={navigateToNewAdditionPage}
                        >
                            add new merchandise
                        </Button>
                        {/* add new merchandise button end */}

                    </Stack>
                    :
                    <>
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
export default CollectionPage;