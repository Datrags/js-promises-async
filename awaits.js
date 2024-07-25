let request = new XMLHttpRequest()

//Part 1

//Q1
async function numbers() {
    try{
        let {data: faveNum} = await axios.get('http://numbersapi.com/7?json');
        console.log(faveNum)

//Q2
        let {data: multiFacts} = await axios.get('http://numbersapi.com/1..3');
        
        for (const key in multiFacts) {
            $('#factList2').append(`<li> ${multiFacts[key]} </li>`)
        }
    
//Q3
        let fourFacts = []
        for (let i = 0; i < 4; i++){
            fourFacts.push(await axios.get('http://numbersapi.com/7'));
        }

        for (let fact of fourFacts) {
            $('#factList').append(`<li> ${fact.data} </li>`)
        }
    }
    catch(e) {
        console.error(e);
    }
            
}

numbers();

//Part 2

//Q1 + Q2

async function deckOfCards() {
    let deck = {
        deck_id: null,
        async init() {
            let {data} = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            this.deck_id = data.deck_id;
    
        },
        async drawCard(totalCards=1) {
    
            let {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=${totalCards}`)
            return data.cards;
        }
    }

    await deck.init();
    let cards = await deck.drawCard(2)
    for (let card of cards) {
        console.log(card.value, card.suit)
    }
    
    $("#drawCard").on("click", async () =>{
        let card = await deck.drawCard();
        console.log(card)
        $("#placeCard").append(`<img src="${card[0].image}"/>`);
    })

}

deckOfCards()

