/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const getInfo = async () => {
        // TODO Part III-2: get a restaurant's info
        try {
            console.log(id)
            const { data: { contents: info } } = await instance.get('/getInfo', { params: { id } })
            console.log(info);
            setInfo(info);
        } catch (err) {
            if (err.response) {
                return (`Error`)
            }
        }

    }
    const getComments = async () => {
        // TODO Part III-3: get a restaurant's comments 
        try {
            console.log(id)
            const { data: { contents: comments } } = await instance.get('/getCommentsByRestaurantId', { params: { restaurantId: id } })
            console.log(comments);
            setComments(comments)
        } catch (err) {
            if (err.response) {
                return (`Error`)
            }
        }
    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
            getComments()
        }
    }, [])

    useEffect(() => {
        // TODO Part III-3-c: update the comment display immediately after submission

    }, [comments])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */
    let rating = 0;
    let sum = 0;
    for (let i = 0; i < comments.length; i++) {
        sum += comments[i].rating;
    }
    rating = sum / comments.length;
    if (!rating) rating = 0



    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage