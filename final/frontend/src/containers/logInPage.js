import '../css/logInPage.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';
import { useMutation } from '@apollo/client';
import { LOG_IN_REQUEST } from '../graphql/mutations';

const LogInPage = () => {
    const { setIsLogIn, setUserEmail, setUserName,setMenuListSelected } = useBetterLinktree();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailFilled, setIsEmailFilled] = useState(true);
    const [isPasswordFilled, setIsPasswordFilled] = useState(true);
    const [isEmailFound, setIsEmailFound] = useState(true);
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const [logInRequest, { data: logInResponse }] = useMutation(LOG_IN_REQUEST)

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if (logInResponse) {
            // console.log(logInResponse)
            switch (logInResponse.logIn.message) {
                case 'correct': {
                    console.log("log in");
                    setIsEmailFound(true)
                    setEmail('');
                    setPassword('');
                    setIsEmailFilled(true);
                    setIsPasswordFilled(true);
                    setIsPasswordWrong(false);
                    setIsLogIn(true);
                    setUserEmail(email.toLocaleLowerCase());
                    setUserName(logInResponse.logIn.name);
                    setMenuListSelected('homePage')
                    navigate('/')
                    break;
                }
                case 'Incorrect password': {
                    console.log('password wrong')
                    setIsEmailFound(true)
                    setPassword('');
                    setIsPasswordFilled(true);
                    setIsPasswordWrong(true);
                    break;
                }
                case 'No user found': {
                    console.log("email not found");
                    setIsEmailFound(false);
                    setEmail('');
                    setPassword('');
                    setIsEmailFilled(true);
                    setIsPasswordFilled(true);
                    break;
                }
            }
        }
    }, [logInResponse])

    const handleLogIn = async () => {
        if (email !== '' && password !== '') {
            await logInRequest({
                variables: {
                    input: {
                        email:email.toLowerCase(),
                        password
                    }
                }
            })
        } else {
            if (email === '') setIsEmailFilled(false);
            else setIsEmailFilled(true);
            if (password === '') setIsPasswordFilled(false);
            else setIsPasswordFilled(true);
        }
    }

    useEffect(() => {
        if (email === '') setIsEmailFilled(false);
        else setIsEmailFilled(true);
    }, [email])

    useEffect(() => {
        if (password === '') setIsPasswordFilled(false);
        else setIsPasswordFilled(true);
    }, [password])

    useEffect(() => {
        setIsEmailFilled(true);
        setIsPasswordFilled(true);
    }, [])

    const handleSignUp = () => {
        console.log('sign up');
        navigate('/signUp', {})
    }

    const handleEmailEnter = (e) => {
        if (e.keyCode === 13) passwordRef.current.focus();
    }

    const handlePasswordEnter = (e) => {
        if (e.keyCode === 13) handleLogIn()
    }

    return (
        <div className='logInPageContainer'>
            <Box
                sx={{ '& .MuiTextField-root': { m: 1, width: '70vw' } }}
                noValidate
                autoComplete="off"
            >
                <Stack
                    spacing={2}
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <h2>Log In</h2>
                    {/* email input */}
                    <TextField
                        error={!isEmailFilled}
                        id="outlined-multiline-flexible"
                        label="Email"
                        multiline
                        maxRows={1}
                        style={{ width: '70vw' }}
                        onChange={handleEmailInput}
                        value={email}
                        onKeyDown={handleEmailEnter}
                        inputRef={emailRef}
                        autoFocus
                    />
                    {/* email input end */}
                    {/* password input */}
                    <TextField
                        error={!isPasswordFilled}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        style={{ width: '70vw' }}
                        autoComplete="current-password"
                        onChange={handlePasswordInput}
                        value={password}
                        onKeyDown={handlePasswordEnter}
                        inputRef={passwordRef}
                    />
                    {/* password input end */}
                    <Stack
                        spacing={2}
                        direction='row'
                        justifyContent='space-around'
                        alignItems='center'
                        sx={{ width: '70vw' }}
                    >
                        <Button
                            size='large'
                            variant='outlined'
                            component="label"
                            onClick={handleLogIn}
                            style={{ width: '34.5vw' }}
                            disableRipple
                        >
                            log in
                        </Button>
                        <Button
                            size='large'
                            variant='outlined'
                            component="label"
                            onClick={handleSignUp}
                            style={{ width: '34.5vw' }}
                            disableRipple
                        >
                            sign up
                        </Button>
                    </Stack>
                    {/* alert */}
                    <Stack
                        spacing={2}
                        justifyContent='center'
                        alignItems='center'
                    >
                        {
                            !isEmailFilled ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    Please Input Email
                                </Alert>
                                : <></>
                        }
                        {
                            !isPasswordFilled ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    Please Input Password
                                </Alert>
                                : <></>
                        }
                        {
                            !isEmailFound ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    Email Not Found
                                </Alert>
                                : <></>
                        }
                        {
                            isPasswordWrong ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    Password Wrong
                                </Alert>
                                : <></>
                        }
                    </Stack>
                    {/* alert end */}
                </Stack>
            </Box>
        </div >
    )
}

export default LogInPage 