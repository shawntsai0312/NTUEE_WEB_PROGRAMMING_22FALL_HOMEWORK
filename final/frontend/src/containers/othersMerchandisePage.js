import '../css/newAdditionPage.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/merchandisePage.css'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const OthersMerchandisePage = () => {
    /*--------------------------------------------------hooks declare-----------------------------------------------------*/
    //useLocation
    const { state } = useLocation();

    //useState
    const [itemArr, setItemArr] = useState([]);
    const [itemArrFiltered, setItemArrFiltered] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filterWhich, setFilterWhich] = useState('description');

    /*------------------------------------------------hooks declare end---------------------------------------------------*/

    /*---------------------------------------------------fetch data-------------------------------------------------------*/
    useEffect(() => {
        console.log(state.items)
        if (state.items) setItemArr(state.items)
    }, [state.items])
    /*-------------------------------------------------fetch data end-----------------------------------------------------*/
    /*-----------------------------------------------------filter---------------------------------------------------------*/
    useEffect(() => {
        setFilterText('');
        setItemArrFiltered(itemArr);
        let pos = [];
        for (let i = 0; i < itemArr.length; i++) pos.push(i);
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
        if (results) setItemArrFiltered(results);
        else setItemArrFiltered([]);
    }, [filterText, filterWhich])

    const handleRadioButton = (e) => {
        setFilterWhich(e.target.value);
    }
    /*---------------------------------------------------filter end-------------------------------------------------------*/
    /*-----------------------------------------------handle input change--------------------------------------------------*/
    const handleChange = (func) => (event) => {
        func(event.target.value);
    }
    /*---------------------------------------------handle input change end------------------------------------------------*/
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '7vh' }}>
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
                </Box>
            </Stack>
        </div>
    )
}

export default OthersMerchandisePage    