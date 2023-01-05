import '../css/signUpPage.css'
import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, ListItemIcon } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import Alert from '@mui/material/Alert';
import { GET_USER_SEARCH_QUERY } from '../graphql/queries';

const SignUpPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isNameFilled, setIsNameFilled] = useState(true);
    const [isEmailFilled, setIsEmailFilled] = useState(true);
    const [isPasswordFilled, setIsPasswordFilled] = useState(true);
    const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(true);
    const [isPasswordSame, setIsPasswordSame] = useState(true);
    const [isUserExist, setIsUserExist] = useState(false);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const { data: queryUsersData, refetch } = useQuery(GET_USER_SEARCH_QUERY, {
        variables: {
            emailSearchedText: email
        }
    })

    const [createUser] = useMutation(CREATE_USER)

    const navigate = useNavigate();

    const handleNameInput = (e) => {
        setName(e.target.value);
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSignUp = async () => {
        if (name !== '' && email !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                refetch({ emailSearchedText: email })
                if (queryUsersData.usersSearch.length === 0) {
                    console.log('You have successfully signed up');
                    await createUser({
                        variables: {
                            input: {
                                id: uuidv4(),
                                name,
                                email: email.toLowerCase(),
                                password
                            }
                        }
                    })
                    navigate('/Login', {})
                    setIsUserExist(false);
                    setName('')
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('')
                    setIsNameFilled(true);
                    setIsEmailFilled(true);
                    setIsPasswordFilled(true);
                    setIsConfirmPasswordFilled(true);
                    setIsPasswordSame(true);
                } else {
                    console.log("user exist")
                    setIsUserExist(true);
                }
            } else {
                console.log('password does not match confirmed password');
                setPassword('');
                setConfirmPassword('');
                setIsPasswordSame(false);
                passwordRef.current.focus();
            }
        } else {
            if (name === '') setIsNameFilled(false);
            else setIsNameFilled(true);
            if (email === '') setIsEmailFilled(false);
            else setIsEmailFilled(true);
            if (password === '') setIsPasswordFilled(false);
            else setIsPasswordFilled(true);
            if (confirmPassword === '') setIsConfirmPasswordFilled(false);
            else setIsConfirmPasswordFilled(true);
        }
    }

    useEffect(() => {
        if (name === '') setIsNameFilled(false);
        else setIsNameFilled(true);
    }, [name])

    useEffect(() => {
        if (email === '') setIsEmailFilled(false);
        else setIsEmailFilled(true);
    }, [email])

    useEffect(() => {
        if (password === '') setIsPasswordFilled(false);
        else {
            setIsPasswordFilled(true);
            setIsPasswordSame(true);
        }
    }, [password])

    useEffect(() => {
        if (confirmPassword === '') setIsConfirmPasswordFilled(false);
        else {
            setIsConfirmPasswordFilled(true)
            setIsPasswordSame(true);
        }
    }, [confirmPassword])

    useEffect(() => {
        setIsNameFilled(true);
        setIsEmailFilled(true);
        setIsPasswordFilled(true);
        setIsConfirmPasswordFilled(true);
        setIsUserExist(false);
    }, [])

    const handleNameEnter = (e) => {
        if (e.keyCode === 13) emailRef.current.focus();
    }

    const handleEmailEnter = (e) => {
        if (e.keyCode === 13) passwordRef.current.focus();
    }

    const handlePasswordEnter = (e) => {
        if (e.keyCode === 13) confirmPasswordRef.current.focus();
    }

    const handleconfirmPasswordEnter = (e) => {
        if (e.keyCode === 13) handleSignUp();
    }

    return (
        <div className='signUpPageContainer'>
            <Box
                component="form"
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
                    <h2> Sign Up</h2>
                    {/* name input */}
                    <TextField
                        error={!isNameFilled}
                        id="outlined-basic"
                        label="User name"
                        variant="outlined"
                        maxRows={1}
                        style={{ width: '70vw' }}
                        value={name}
                        onChange={handleNameInput}
                        onKeyDown={handleNameEnter}
                        inputRef={nameRef}
                        autoFocus
                    />
                    {/* name input end */}
                    {/* email input */}
                    <TextField
                        error={!isEmailFilled}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        maxRows={1}
                        style={{ width: '70vw' }}
                        value={email}
                        onChange={handleEmailInput}
                        onKeyDown={handleEmailEnter}
                        inputRef={emailRef}
                    />
                    {/* email input end */}
                    {/* password input */}
                    <TextField
                        error={!isPasswordFilled}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                        style={{ width: '70vw' }}
                        value={password}
                        onChange={handlePasswordInput}
                        onKeyDown={handlePasswordEnter}
                        inputRef={passwordRef}
                    />
                    {/* password input end */}
                    {/* confirm password input */}
                    <TextField
                        error={!isConfirmPasswordFilled}
                        id="outlined-password-input"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        style={{ width: '70vw' }}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordInput}
                        onKeyDown={handleconfirmPasswordEnter}
                        inputRef={confirmPasswordRef}
                    />
                    {/* confirm password input end */}
                    <Button
                        size='large'
                        variant="outlined"
                        component="label"
                        onClick={handleSignUp}
                        style={{ width: '70vw' }}
                        disableRipple
                    >
                        Sign up
                    </Button>
                    {/* alert */}
                    <Stack
                        spacing={2}
                        justifyContent='center'
                        alignItems='center'
                    >
                        {
                            !isNameFilled ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    Please Input Name
                                </Alert>
                                : <></>
                        }
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
                            !isConfirmPasswordFilled ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    Please Confirm Password
                                </Alert>
                                : <></>
                        }
                        {
                            !isPasswordSame ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    Password does not match Confirmed Password
                                </Alert>
                                : <></>
                        }
                        {
                            isUserExist ?
                                <Alert severity="error" style={{ width: '34vw' }}>
                                    User Email exist
                                </Alert>
                                : <></>
                        }
                    </Stack>
                    {/* alert end */}
                </Stack>
            </Box>
        </div>
    );
}

export default SignUpPage 