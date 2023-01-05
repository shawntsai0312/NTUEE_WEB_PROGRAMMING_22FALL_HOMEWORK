import '../css/navigationBar.css'
import mainIcon from '../assets/mainIcon.png'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import { useBetterLinktree } from '../hooks/useBetterLinktree';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import UserMenu from './userMenu.js';
import SearchResult from './searchResult';
import { GET_USER_SEARCH_QUERY } from '../graphql/queries';

const NavBar = () => {

    const { isLogIn, userName, userEmail, setMenuListSelected } = useBetterLinktree();

    const [emailSearchedText, setEmailSearchedText] = useState('')
    const [anchorUserMenu, setAnchorUserMenu] = useState(null);
    const [anchorSearch, setAnchorSearch] = useState(null);
    const [searchedResult, setSearchedResult] = useState([]);

    const popOverOpenUserMenu = Boolean(anchorUserMenu)
    const popOverOpenSearch = Boolean(anchorSearch)

    const navigate = useNavigate();

    const { data: queryUsersData, refetch } = useQuery(GET_USER_SEARCH_QUERY, {
        variables: {
            emailSearchedText
        },
    })

    useEffect(() => {
        if (queryUsersData) {
            if (queryUsersData.usersSearch) {
                let newSearchedResult = queryUsersData.usersSearch.filter(user => user.email !== userEmail)
                setSearchedResult(newSearchedResult)
            }
        }
    }, [queryUsersData])

    const handleBackToHomePage = () => {
        if (window.location.pathname === '/') {
            window.location.reload();
        } else {
            navigate('/', {})
            setMenuListSelected('homePage')
        }
    }

    const handleSearch = (e) => {
        console.log(queryUsersData)
        console.log(e.target.value)
        setEmailSearchedText(e.target.value);
        refetch({ emailSearchedText: e.target.value })
        if (searchedResult) setAnchorSearch(e.currentTarget);
        else setAnchorSearch(null);
    }

    const handleUserButton = (e) => {
        setAnchorUserMenu(e.currentTarget);
    }

    const handleLogIn = () => {
        setMenuListSelected('')
        navigate('/Login', {})
    }

    const handlePopOverSearchClose = (e) => {
        setAnchorSearch(null);
        e.stopPropagation();
    }

    const handlePopOverUserMenuClose = (e) => {
        setAnchorUserMenu(null);
        e.stopPropagation();
    }

    return (
        <div className='navBarContainer'>
            <div >
                <Button
                    size='large'
                    variant='text'
                    component="label"
                    sx={{ padding: '0px' }}
                    disableRipple
                    onClick={handleBackToHomePage}
                >
                    <img src={mainIcon} id='mainIcon' />
                </Button>
            </div>
            <Paper
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '45vw',
                    height: '5vh'
                }}
            >
                <SearchIcon style={{ padding: '1vh' }} />
                <Popover
                    open={popOverOpenSearch}
                    anchorEl={anchorSearch}
                    onClose={handlePopOverSearchClose}
                    anchorOrigin={{
                        vertical: 50,
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    disableAutoFocus={true}
                    disableEnforceFocus={true}
                >
                    <SearchResult
                        results={searchedResult}
                        setAnchorSearch={setAnchorSearch}
                        setEmailSearchedText={setEmailSearchedText}
                    />
                </Popover>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search By Email"
                    inputProps={{ 'aria-label': 'search users' }}
                    onChange={handleSearch}
                    value={emailSearchedText}
                />
            </Paper>
            <div className='userInfo'>
                {
                    isLogIn ?
                        <Button
                            className='userButton'
                            size='large'
                            variant='outlined'
                            component="label"
                            disableRipple
                            onClick={handleUserButton}
                        >
                            <Stack direction="row" spacing={1}>
                                {/* <AccountCircleIcon /> */}
                                {userName}
                            </Stack>
                            <Popover
                                open={popOverOpenUserMenu}
                                anchorEl={anchorUserMenu}
                                onClose={handlePopOverUserMenuClose}
                                anchorOrigin={{
                                    vertical: 80,
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <UserMenu />
                            </Popover>
                        </Button>
                        : <Button
                            className='userButton'
                            size='large'
                            variant='outlined'
                            component="label"
                            disableRipple
                            onClick={handleLogIn}
                        >
                            <p>log in / sign up</p>
                        </Button>
                }

            </div>
        </div>

    )
}

export default NavBar