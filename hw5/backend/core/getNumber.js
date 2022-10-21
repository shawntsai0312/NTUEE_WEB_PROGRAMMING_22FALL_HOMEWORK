var number = 0;
function genNumber() {
    //number = random 1~100
    number = Math.floor(Math.random() * 100) + 1;
    console.log(number);
}

function getNumber() {
    //return number;
    return number;
}
export { getNumber, genNumber };