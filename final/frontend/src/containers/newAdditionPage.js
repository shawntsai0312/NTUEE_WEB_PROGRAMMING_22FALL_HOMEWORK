import { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../css/newAdditionPage.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';
import { useMutation } from '@apollo/client';
import { CREATE_MERCHANDISE, CREATE_ITEM } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const NewAdditionPage = () => {
    /*--------------------------------------------------hooks declare-----------------------------------------------------*/
    //useContext
    const { userEmail, isLogIn, setMenuListSelected } = useBetterLinktree();

    //useState
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [addingItems, setAddingItems] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [isLinkFilled, setIsLinkFilled] = useState(true);
    const [isNameFilled, setIsNameFilled] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [whichToEdit, setWhichToEdit] = useState(-1);

    //useMutation
    const [createMerchandise] = useMutation(CREATE_MERCHANDISE);
    const [createItem] = useMutation(CREATE_ITEM);

    //useNavigate
    const navigate = useNavigate();
    /*------------------------------------------------hooks declare end---------------------------------------------------*/

    const handleAddButton = () => {
        setOpenAdd(true);
        setIsLinkFilled(true);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
        setLink('');
        setDescription('');
    }

    useEffect(() => {
        if (name !== '') setIsNameFilled(true);
        else setIsNameFilled(false);
    }, [name])

    useEffect(() => {
        setIsNameFilled(true);
    }, [])
    /*-----------------------------------------------handle input change--------------------------------------------------*/
    const handleChange = (func) => (event) => {
        func(event.target.value);
    }
    /*----------------------------------------------handle input change end-----------------------------------------------*/
    /*-----------------------------------------------link edit and delete-------------------------------------------------*/
    const handleAddInModal = () => {
        if (link) {
            let newAddingItems = addingItems;
            newAddingItems.push({ link: link, description: description });
            setAddingItems(newAddingItems);
            setLink('');
            setDescription('');
            handleCloseAdd();
        } else {
            setIsLinkFilled(false);
        }
    }

    const handleEditLink = (index) => () => {
        console.log("press editLink")
        setLink(addingItems[index].link);
        setDescription(addingItems[index].description);
        setWhichToEdit(index);
        setOpenEdit(true);
        setIsLinkFilled(true);
    }

    const handleEditInModal = () => {
        if (link) {
            let newAddingItems = addingItems;
            newAddingItems[whichToEdit].link = link;
            newAddingItems[whichToEdit].description = description;
            setAddingItems(newAddingItems);
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

    const handleDeleteLink = (index) => () => {
        console.log("press deleteLink")
        let newAddingItems = [];
        for (let i = 0; i < index; i++) {
            newAddingItems[i] = addingItems[i];
        }
        for (let i = index + 1; i < addingItems.length; i++) {
            newAddingItems[i - 1] = addingItems[i];
        }
        console.log(newAddingItems);
        setAddingItems(newAddingItems);
    }
    /*---------------------------------------------link edit and delete end-----------------------------------------------*/
    /*-----------------------------------------------handle send request--------------------------------------------------*/
    const handleConfirm = async () => {
        if (name && userEmail !== '') {
            // console.log(addingItems);
            const merchandiseId = uuidv4()
            await createMerchandise({
                variables: {
                    input: {
                        id: merchandiseId,
                        email: userEmail.toLowerCase(),
                        name,
                        isFavorite: false
                    }
                }
            })
            for (let i = 0; i < addingItems.length; i++) {
                // console.log('here', i)
                await createItem({
                    variables: {
                        input: {
                            id: uuidv4(),
                            merchandiseId,
                            email: userEmail.toLowerCase(),
                            link: addingItems[i].link,
                            description: addingItems[i].description
                        }
                    }
                })
            }
            setName('');
            setLink('');
            setDescription('');
            setAddingItems([]);
            setIsNameFilled(true);
            setMenuListSelected('Collection');
            navigate('/collectionPage');
        } else {
            if (userEmail === '') {
                console.log("you have not logged in")
            }
            if (!name) {
                setIsNameFilled(false);
            }
        }
    }
    /*---------------------------------------------handle send request end------------------------------------------------*/
    return (
        <div className='newAdditionContainer'>
            {
                isLogIn ?
                    <Stack
                        spacing={2}
                        justifyContent='space-around'
                        alignItems='center'
                    >
                        <h2 className='newAdditionTitle'>Adding A New Merchandise</h2>
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
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CardGiftcardIcon size="large" sx={{ color: 'action.active', mr: 1, my: 3 }} />
                                <TextField
                                    id="input-with-sx"
                                    label="Merchdise name"
                                    variant="standard"
                                    onChange={handleChange(setName)}
                                    autoFocus
                                />
                                <Button
                                    variant="outlined"
                                    startIcon={<AddCircleOutlineSharpIcon />}
                                    style={{ width: '25vw' }}
                                    onClick={handleAddButton}
                                >
                                    Add A New Link
                                </Button>
                            </Box>
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
                            {/* item array map */}
                            <Box sx={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {
                                    addingItems.length ?
                                        addingItems.map((item, index) => {
                                            return (
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                    <ListItem
                                                        secondaryAction={
                                                            <>
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="edit"
                                                                    sx={{ mr: 2, my: 1 }}
                                                                    onClick={handleEditLink(index)}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                    sx={{ mr: 2, my: 1 }}
                                                                    onClick={handleDeleteLink(index)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </>
                                                        }>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <InsertLinkIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item.link}
                                                            secondary={item.description}
                                                        />
                                                    </ListItem>
                                                </Box>
                                            )
                                        })
                                        : <Box
                                            sx={{
                                                height: '50vh',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <h3>It Looks Empty Here ! Add Something !</h3>
                                        </Box>
                                }
                            </Box>
                            {/* item array map end */}
                        </Box>
                        {/* confirm button */}
                        <Button
                            className='stackItem'
                            size='large'
                            variant='outlined'
                            component="label"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </Button>
                        {/* confirm button end */}
                        {
                            !isNameFilled ?
                                <Alert severity="error" >
                                    Merchandise Name Can Not Be Empty
                                </Alert>
                                : <></>
                        }
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
export default NewAdditionPage;