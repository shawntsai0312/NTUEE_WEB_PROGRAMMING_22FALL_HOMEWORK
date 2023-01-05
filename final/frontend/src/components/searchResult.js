import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import { useBetterLinktree } from '../hooks/useBetterLinktree.js';

const SearchResult = ({ results, setAnchorSearch, setEmailSearchedText }) => {
    /*--------------------------------------------------hooks declare-----------------------------------------------------*/
    //useContext
    const { setMenuListSelected } = useBetterLinktree();

    //useNavigate
    const navigate = useNavigate();
    /*------------------------------------------------hooks declare end---------------------------------------------------*/
    /*----------------------------------------------------navigate--------------------------------------------------------*/
    const navigateToOthersCollection = (index) => () => {
        console.log("go to others collection")
        setAnchorSearch(null);
        setEmailSearchedText('');
        setMenuListSelected('');
        navigate('/othersCollectionPage', {
            state: {
                email: results[index].email,
            }
        })
    }
    /*--------------------------------------------------navigate end------------------------------------------------------*/

    return (
        <List component="nav" aria-label="mailbox folders" sx={{ width: '45vw', maxHeight: '30vh', padding: 0, overflowY: 'auto' }}>
            {
                results.length !== 0 ?
                    <>
                        {
                            results.map((result, index) => {
                                return (
                                    <>
                                        {
                                            index !== results.length - 1 ?
                                                <ListItemButton divider onClick={navigateToOthersCollection(index)}>
                                                    <ListItemText primary={result.name} secondary={result.email} />
                                                </ListItemButton>
                                                : <ListItemButton onClick={navigateToOthersCollection(index)}>
                                                    <ListItemText primary={result.name} secondary={result.email} />
                                                </ListItemButton>
                                        }
                                    </>
                                )
                            })
                        }
                    </>
                    : <ListItem>
                        <ListItemText primary={"no results found"} />
                    </ListItem>
            }
        </List>
    )
}

export default SearchResult