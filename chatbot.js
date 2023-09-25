const qrcode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
	args: ['--no-sandbox'],
    }
})


//-------------GAME VARIABLES------------\\
let deck = [];
let players = 2;
let hand1 = [];
let hand2 = [];
let spaces = " ";
for(let i = 0; i <= "4000";){
  spaces = spaces + " "
  i++
}

//-------------Whatsapp Variables---------\\
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
	console.log('Client is ready!');
});

client.on('message_create', message => {
	if(message.body === '!START') {
		start();
    message.reply("[Spieler 1]" + spaces + hand1.toString())
    message.reply("[Spieler 2]" + spaces + hand2.toString())
	}
});

client.on('message', message => {
	if(message.body === '!START') {
		start();
    message.reply("[Spieler 1]" + spaces + hand1.toString())
    message.reply("[Spieler 2]" + spaces + hand2.toString())
	}
});

//-------------start function-------------\\
function start() {
    // Define the suits and ranks of a standard deck of cards
    const suits = ["Herz", "Karo", "Kreuz", "Piek"];
    const ranks = ["7", "8", "9", "10", "Bube", "Dame", "König", "Ass"];
    let id = 1;

    hand1 = []
    hand2 = []

    // Populate the deck with cards
    for (const suit of suits) {
      for (const rank of ranks) {
        // Create a card object with a rank, suit, and value (in this case, 4)
        const card = {
          rank: rank,
          suit: suit,
          value: 4,
          id:id,
        };
        deck.push(card);
        id++;
      }
    }

    console.log(deck)

    for (let i = 1; i <= 2; i++) {
      for (let ii = 1; ii <= 7; ii++) {
        let rand = Math.floor(Math.random() * 32)
        if (i == 1) {
          hand1.push(translate(rand))
        }
        if (i == 2) {
          hand2.push(translate(rand))
        }
      }
    }
    return hand1, hand2
    
}

//----------Translate ID to card ---------\\
function translate(target) {
	let returncard;
	for (const card of deck) {
	  if (card.id === target) {
		  returncard = card.suit + " " + card.rank;	  
		  break; // Exit the loop once the card is found
	  }
	}
  return returncard;
}
 

client.initialize();


 


