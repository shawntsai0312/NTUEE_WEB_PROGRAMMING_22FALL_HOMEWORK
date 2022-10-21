import express from 'express'
import { getNumber, genNumber } from '../core/getNumber.js'
const router = express.Router()

router.post('/start', (_, res) => {
    genNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
    // 拿 Number(req.query.number) 和 getNum()做比較

    // 去 (memory) DB 拿答案的數字
    // ⽤ req.query.number 拿到前端輸入的數字
    // check if NOT a num or not in range [1,100]
    // 如果有問題 =>
    // res.status(406).send({ msg: 'Not a legal number.' })
    // 如果沒有問題，回傳 status

    let userGuess = req.query.number;
    let userGuessInNumber = parseInt(userGuess);
    let answer = getNumber();
    console.log(`receive guessed number ${userGuess}`);
    if (!isNaN(userGuess) && userGuessInNumber >= 1 && userGuessInNumber <= 100) {
        //return status
        if (userGuessInNumber === answer) {
            res.send({ msg: 'Equal' })
        } else if (userGuessInNumber > answer) {
            res.send({ msg: `Smaller` })
        } else {
            res.send({ msg: `Bigger` })
        }
    } else {
        res.send({ msg: `Error: ${userGuess} is not a valid number (1 - 100)` });
    }

})
router.post('/restart', (_, res) => {
    genNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})
export default router