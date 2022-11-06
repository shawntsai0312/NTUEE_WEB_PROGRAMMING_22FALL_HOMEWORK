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
            let msgArr = data.map((item) => {
                let msg = `Found card with name: (${item.name},${item.subject},${item.score})`
                return msg;
            })
            if (msgArr.length === 0)
                msgArr = [`QueryType ${queryString} not found!`]
            // console.log(arr);
            let dataArr = data.map((item)=>{
                return ({ name: item.name, subject: item.subject, score: item.score })
            })
            res.send({ messages: msgArr, message: err, querydata:dataArr })
        })

    } else if (req.query.type == 'subject') {
        ScoreCard.find({ subject: queryString }, (err, data) => {
            // console.log(data.length)
            let msgArr = data.map((item) => {
                let msg = `Found card with name: (${item.name},${item.subject},${item.score})`
                return msg;
            })
            if (msgArr.length === 0)
                msgArr = [`QueryType ${queryString} not found!`]
            // console.log(arr);
            let dataArr = data.map((item)=>{
                return ({ name: item.name, subject: item.subject, score: item.score })
            })
            console.log(dataArr);
            res.send({ messages: msgArr, message: err, querydata:dataArr })
        })
    }

});

router.get("/allcards", (req, res) => {
    // show all
    console.log("show all");
    ScoreCard.find({}, (err, data) => {
        // console.log(data);
        let arr = data.map((item) => {
            return ({ name: item.name, subject: item.subject, score: item.score })
            // console.log(item)
        })
        // console.log(arr)
        res.send({ alldata: arr });
    })
})
export default router;