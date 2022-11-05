import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

router.delete("/cards", (req, res) => {
    // clear
    ScoreCard.deleteMany({})
        .then(() => {
            console.log("Database cleared")
            res.send({ message: 'Database cleared' })
        })
        .catch((err) => {
            console.log(err);
        })

});

router.post("/card", (req, res) => {
    // add/update data
    const inputData = req.body;
    ScoreCard.findOne({ name: inputData.name, subject: inputData.subject })
        .then((thatCard) => {
            if (thatCard) {
                // update data
                ScoreCard.findOneAndUpdate({ name: inputData.name, subject: inputData.subject }, { score: inputData.score })
                    .then((updateCard) => {
                        res.send({
                            message: `Updating(${inputData.name},${inputData.subject},${inputData.score})`
                            , card: { name: inputData.name, subject: inputData.subject }
                        })
                    })
                    .catch((err) => {
                        console.log("update error");
                        console.log(err);
                    })
            } else {
                // add new data
                const card = new ScoreCard(inputData);
                card.save()
                    .then(() => {
                        res.send({
                            message: `Adding(${inputData.name},${inputData.subject},${inputData.score})`
                            , card: { name: inputData.name, subject: inputData.subject }
                        })
                    })
                    .catch((err) => {
                        console.log("add error");
                        console.log(err);
                    })
            }
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get("/cards", (req, res) => {
    // query
    const queryString = req.query.queryString;
    if (req.query.type == 'name') {
        ScoreCard.find({ name: queryString }, (err, data) => {
            // console.log(data.length)
            let arr = data.map((item) => {
                let msg = `Found card with name: (${item.name},${item.subject},${item.score})`
                return msg;
            })
            if(arr.length===0)
                arr=[`QueryType ${queryString} not found!`]
            // console.log(arr);
            res.send({ messages: arr, message: err })
        })

    } else if (req.query.type == 'subject') {
        ScoreCard.find({ subject: queryString }, (err, data) => {
            // console.log(data.length)
            let arr = data.map((item) => {
                let msg = `Found card with name: (${item.name},${item.subject},${item.score})`
                return msg;
            })
            if(arr.length===0)
                arr=[`QueryType ${queryString} not found!`]
            // console.log(arr);
            res.send({ messages: arr, message: err })
        })
    }

});
export default router;