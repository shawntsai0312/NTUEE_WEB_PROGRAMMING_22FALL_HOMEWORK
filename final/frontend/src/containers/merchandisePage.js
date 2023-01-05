import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/merchandisePage.css'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../css/newAdditionPage.css'
import AddLinkIcon from '@mui/icons-material/AddLink';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';
import { useMutation } from '@apollo/client';
import { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from "../graphql/mutations";
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';

const MerchandisePage = () => {
    /*--------------------------------------------------hooks declare-----------------------------------------------------*/
    //useLocation
    const { state } = useLocation();

    //useContext
    const { userData, userEmail, isLogIn } = useBetterLinktree();

    //useState
    const [itemArr, setItemArr] = useState([]);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [isLinkFilled, setIsLinkFilled] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [whichToEdit, setWhichToEdit] = useState(-1);
    const [itemArrFiltered, setItemArrFiltered] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [originalPosition, setOriginalPosition] = useState([]);
    const [filterWhich, setFilterWhich] = useState('description');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [whichToDelete, setWhichToDelete] = useState(-1);

    // useMutation
    const [createItem] = useMutation(CREATE_ITEM);
    const [updateItem] = useMutation(UPDATE_ITEM);
    const [deleteItem] = useMutation(DELETE_ITEM);
    /*------------------------------------------------hooks declare end---------------------------------------------------*/

    /*---------------------------------------------------fetch data-------------------------------------------------------*/
    useEffect(() => {
        if (isLogIn) {
            console.log(userData)
            if (userData) setItemArr(userData.user.merchandise[state.merIndex].items)
        }
        else console.log('please log in')
    }, [userData])
    /*-------------------------------------------------fetch data end-----------------------------------------------------*/
    /*-----------------------------------------------------filter---------------------------------------------------------*/
    useEffect(() => {
        setFilterText('');
        setItemArrFiltered(itemArr);
        let pos = [];
        for (let i = 0; i < itemArr.length; i++) {
            pos.push(i);
        }
        setOriginalPosition(pos);
    }, [itemArr])

    useEffect(() => {
        let results = [];
        let pos = [];
        if (filterText && filterWhich === "link") {
            for (let i = 0; i < itemArr.length; i++) {
                if (itemArr[i].link.indexOf(filterText) !== -1) {
                    results.push(itemArr[i]);
                    pos.push(i);
                }
            }
        } else if (filterText && filterWhich === "description") {
            for (let i = 0; i < itemArr.length; i++) {
                if (itemArr[i].description.indexOf(filterText) !== -1) {
                    results.push(itemArr[i]);
                    pos.push(i);
                }
            }
        } else {
            results = itemArr;
            for (let i = 0; i < itemArr.length; i++) {
                pos.push(i);
            }
        }
        if (results) {
            setItemArrFiltered(results);
            setOriginalPosition(pos);
        } else {
            setItemArrFiltered([]);
        }
    }, [filterText, filterWhich])

    const handleRadioButton = (e) => {
        setFilterWhich(e.target.value);
    }
    /*---------------------------------------------------filter end-------------------------------------------------------*/
    /*---------------------------------------------------handle add-------------------------------------------------------*/
    const handleAddButton = () => {
        setOpenAdd(true);
        setIsLinkFilled(true);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
        setLink('');
        setDescription('');
    }

    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    const handleAddInModal = async () => {
        if (link) {
            await createItem({
                variables: {
                    input: {
                        id: uuidv4(),
                        email: userEmail.toLowerCase(),
                        merchandiseId: state.id,
                        link,
                        description,
                    }
                }
            })

            setLink('');
            setDescription('');
            handleCloseAdd();
            setFilterText('');
        } else {
            setIsLinkFilled(false);
        }
    }
    /*-------------------------------------------------handle add end-----------------------------------------------------*/
    /*---------------------------------------------------handle edit------------------------------------------------------*/
    const handleEditLink = (index) => () => {
        console.log("press editLink")
        setLink(itemArr[index].link);
        setDescription(itemArr[index].description);
        setWhichToEdit(index);
        setOpenEdit(true);
        setIsLinkFilled(true);
    }

    const handleEditInModal = async () => {
        if (link) {
            await updateItem({
                variables: {
                    input: {
                        id: itemArr[whichToEdit].id,
                        link,
                        description,
                        email: userEmail.toLowerCase(),
                        merchandiseId: state.id,
                    }
                }
            })
            setLink('');
            setDescription('');
            handleCloseEdit();
        } else {
            setIsLinkFilled(false);
        }
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setLink('');
        setDescription('');
    }
    /*-------------------------------------------------handle edit end----------------------------------------------------*/
    /*--------------------------------------------------handle delete-----------------------------------------------------*/
    const handleDeleteItem = (index) => () => {
        console.log("press deleteLink")
        setConfirmDelete(true);
        setWhichToDelete(index);
    }

    const handleConfirmDeleteInModal = async () => {
        await deleteItem({
            variables: {
                input: {
                    email: userEmail.toLowerCase(),
                    merchandiseId: state.id,
                    id: itemArr[whichToDelete].id
                }
            }
        })
        handleCloseDelete();
    }

    const handleCloseDelete = () => {
        setConfirmDelete(false);
    }
    /*------------------------------------------------handle delete end---------------------------------------------------*/
    return (
        <div className="merchandisePageContainer">
            <Stack
                spacing={2}
                justifyContent='space-around'
                alignItems='center'
            >
                <h2 className='collectionTitle'>{"Link List of \"" + state.name + "\""}</h2>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '7vh' }}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={handleRadioButton}
                                    defaultValue={"description"}
                                >
                                    <FormControlLabel
                                        value="link"
                                        control={<Radio size="small" />}
                                        label="Link"
                                    />
                                    <FormControlLabel
                                        value="description"
                                        control={<Radio size="small" />}
                                        label="Description"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <FilterAltIcon sx={{ p: '10px' }} aria-label="search" color="action" />
                            <InputBase
                                sx={
                                    filterText ?
                                        { width: '16.95vw' }
                                        : { width: '20vw' }
                                }
                                placeholder={
                                    filterWhich === 'link' ?
                                        "Filter by link"
                                        : "Filter by description"
                                }
                                inputProps={{ 'aria-label': 'filter by link or description' }}
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
                    {/* item array map */}
                    <Box sx={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                        {
                            itemArr.length !== 0 ?
                                itemArrFiltered.length !== 0 ?
                                    <>
                                        {
                                            itemArrFiltered.map((item, index) => {
                                                return (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', my: 1.5 }} >
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <InsertLinkIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={<a href={item.link} target="_blank" rel="noreferrer noopener">{item.link}</a>} secondary={item.description} />
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="edit"
                                                            sx={{ mr: 2, my: 1 }}
                                                            onClick={handleEditLink(originalPosition[index])}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="delete"
                                                            sx={{ mr: 2, my: 1 }}
                                                            onClick={handleDeleteItem(originalPosition[index])}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </>
                                    : <h3 className='nothingFound'>No Description is found</h3>
                                : <h3 className='nothingFound'>No Data</h3>
                        }
                    </Box>
                    {/* item array map end */}
                    {/* add new item button */}
                    <Button
                        className='stackItem'
                        size='large'
                        variant='outlined'
                        component="label"
                        onClick={handleAddButton}
                        sx={{ my: 3 }}
                    >
                        Add A New Link
                    </Button>
                    {/* add new item button end */}
                    {/* add modal */}
                    <Modal
                        open={openAdd}
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
                                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                    <AddLinkIcon sx={{ mr: 2, my: 1 }} />
                                    <TextField
                                        id="input-with-sx"
                                        label="Link"
                                        variant="standard"
                                        onChange={handleChange(setLink)}
                                        style={{ width: '20vw' }}
                                        error={!isLinkFilled}
                                        helperText={
                                            isLinkFilled ?
                                                '                   ' :
                                                "A link is required."
                                        }
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <DescriptionIcon sx={{ mr: 2, my: 1 }} />
                                    <TextField
                                        id="input-with-sx"
                                        label="Description"
                                        variant="standard"
                                        onChange={handleChange(setDescription)}
                                        style={{ width: '20vw' }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        size='large'
                                        variant='outlined'
                                        component="label"
                                        onClick={handleAddInModal}
                                        sx={{ my: 1 }}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Modal>
                    {/* add modal end */}
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
                                    <InsertLinkIcon sx={{ mr: 2, my: 1 }} />
                                    <TextField
                                        id="input-with-sx"
                                        label="Link"
                                        variant="standard"
                                        onChange={handleChange(setLink)}
                                        style={{ width: '20vw' }}
                                        error={!isLinkFilled}
                                        helperText={
                                            isLinkFilled ?
                                                '                   ' :
                                                "A link is required."
                                        }
                                        value={link}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <DescriptionIcon sx={{ mr: 2, my: 1 }} />
                                    <TextField
                                        id="input-with-sx"
                                        label="Description"
                                        variant="standard"
                                        onChange={handleChange(setDescription)}
                                        style={{ width: '20vw' }}
                                        value={description}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        size='large'
                                        variant='outlined'
                                        component="label"
                                        onClick={handleEditInModal}
                                        sx={{ my: 1 }}
                                    >
                                        EDIT
                                    </Button>
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
                                    <Button
                                        size='large'
                                        variant='outlined'
                                        component="label"
                                        onClick={handleConfirmDeleteInModal}
                                        sx={{ my: 1 }}
                                    >
                                        are you sure ?
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Modal>
                    {/* delete modal end */}
                </Box>
            </Stack>
        </div>
    )
}

export default MerchandisePage;