// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter = req.query.mealFilter
    const typeFilter = req.query.typeFilter
    const sortBy = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    // TODO Part I-3-a: find the information to all restaurants

    Info.find().exec((err, data) => {
        if (err) {
            res.status(403).send({ message: 'error', contents: [] })
        } else {
            // console.log(data)
            // console.log(priceFilter, mealFilter, typeFilter)
            let filterData = []
            for (let i = 0; i < data.length; i++) {
                let testFlag = true
                if (priceFilter) {
                    let newPriceFilter = priceFilter.map((price) => {
                        if (price === '$') return 1;
                        else if (price === '$$') return 2;
                        else if (price === '$$$') return 3;
                    })
                    // console.log(newPriceFilter);
                    let priceFlag = false
                    for (let j = 0; j < newPriceFilter.length; j++) {
                        if (data[i].price === newPriceFilter[j]) {
                            priceFlag = true;
                            break;
                        }
                    }
                    testFlag &= priceFlag;
                }
                if (mealFilter) {
                    let mealFlag = false;
                    for (let j = 0; j < mealFilter.length; j++) {
                        // console.log(mealFilter[j])
                        for (let k = 0; k < data[i].tag.length; k++) {
                            if (data[i].tag[k] === mealFilter[j]) {
                                mealFlag = true;
                                break;
                            }
                        }
                    }
                    testFlag &= mealFlag;
                }
                if (typeFilter) {
                    let typeFlag = false;
                    for (let j = 0; j < typeFilter.length; j++) {
                        // console.log(typeFilter[j])
                        for (let k = 0; k < data[i].tag.length; k++) {
                            if (data[i].tag[k] === typeFilter[j]) {
                                typeFlag = true;
                                break;
                            }
                        }
                    }
                    testFlag &= typeFlag;
                }
                if (testFlag) filterData.push(data[i])
            }
            // console.log(filterData.length)

            // let newData = [];
            if (sortBy === 'price') {
                filterData.sort((a, b) => { return a.price - b.price })
            } else if (sortBy === 'distance') {
                filterData.sort((a, b) => { return a.distance - b.distance })
            }
            // console.log(newData.length)
            res.status(200).send({ message: 'success', contents: filterData })
        }
    })

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter

    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    // console.log(req)
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    console.log(id)
    Info.findOne({ id }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: 'error', contents: [] })
        } else {
            res.status(200).send({ message: 'success', contents: data })
        }
    })
}