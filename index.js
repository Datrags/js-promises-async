let request = new XMLHttpRequest()

//Part 1

//Q1
let favoriteNumber = axios.get('http://numbersapi.com/7?json')

//Q2
let multiFacts = axios.get('http://numbersapi.com/1..3').then((x) =>{
    for (const key in x.data) {
        $('#factList2').append(`<li> ${x.data[key]} </li>`)
    }
    // for (let i = 0; i < x.data.length; i++) 
    //     $('#factList2').append(`<li> ${x.data[i]} </li>`)

})
.catch(e => {
    console.log(e);
});

//Q3
let fourFacts = []
for (let i = 0; i < 4; i++){
    fourFacts.push(axios.get('http://numbersapi.com/7'))
}

Promise.all(fourFacts)
    .then( arr => {
        for (fact of arr) {
            $('#factList').append(`<li> ${fact.data} </li>`)
        }
        
    })
    .catch(e => {
        console.log(e);
    });

//Part 2

//Q1 + Q2

let deck = axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then( d => {
        const totalCards = 2;
        let cards = axios.get(`https://deckofcardsapi.com/api/deck/${d.data.deck_id}/draw/?count=${totalCards}`)
        .then(c => {
            let pickedCards = c.data.cards;
            for (let i = 0; i < totalCards; i++) {
                console.log(pickedCards[i].value, pickedCards[i].suit);
            }
        
        })
        .catch(e => {
            console.error(e);
        })
//Q3
        $("#drawCard").on("click", () =>{
            axios.get(`https://deckofcardsapi.com/api/deck/${d.data.deck_id}/draw/?count=1`)
            .then( c => {
                $("#placeCard").append(`<img src="${c.data.cards[0].image}"/>`)
            })
            .catch(e => {
                console.error(e);
            })
        })

    })
    .catch(e => {
        console.error(e);
    })



// let numFacts = new Promise(function(resolve, reject) {
//     let facts = []
//     for (let i = 0; i < 4; i++){
//         facts.push(axios.get('http://numbersapi.com/'))
//     }
// })