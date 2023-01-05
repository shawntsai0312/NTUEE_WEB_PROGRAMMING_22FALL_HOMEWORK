import '../css/userMenu.css'
import Button from '@mui/material/Button';
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const { setIsLogIn, setUserName, setUserEmail, userName, userEmail, setMenuListSelected } = useBetterLinktree();
    
    const navigate = useNavigate();

    const handleLogOut = () => {
        console.log('log out')
        setIsLogIn(false);
        setUserEmail('');
        setUserName('');
        navigate('/');
        setMenuListSelected('homePage')
    }

    return (
        <div className='userMenuContainer'>
            {/* <AccountCircleIcon /> */}
            <h4 style={{ marginTop: '1vh', marginBottom: '1vh' }}>Welcome! {userName}</h4>
            <p>{userEmail}</p>
            <Button
                sx={{
                    height: '4vh',
                    width: '14vw',
                    marginTop: '0.5vh',
                    marginBottom: '0.5vh',
                }}
                size='small'
                variant='outlined'
                component="label"
                disableRipple
                onClick={handleLogOut}
            >
                <p>log out</p>
            </Button>
        </div>
    )
}

export default UserMenu