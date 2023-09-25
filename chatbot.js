const qrcode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
	args: ['--no-sandbox'],
    }
})

let deck = [];

//-------------GAME VARIABLES------------\\
let players = 2;


//-------------Whatsapp Variables---------\\
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
	console.log('Client is ready!');
});

client.on('message_create', message => {
	if(message.body === '!Heyyy') {
		message.reply('Halöle du Menschi');
		start();
	}
});

client.on('message', message => {
	if(message.body === '!Heyy') {
		message.reply('Halöle du Menschi!');
	}
});

//-------------start function-------------\\
function start() {
    // Define the suits and ranks of a standard deck of cards
    const suits = ["Herz", "Karo", "Kreuz", "Piek"];
    const ranks = ["7", "8", "9", "10", "Bube", "Dame", "König", "Ass"];
    let id = 1;


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

    for (let i = 0; i <= players;)
    {
            for (let ii = 1; i <= 7;)
            {
                    let rand = Math.floor(Math.random() * 32)
                    translate(rand)
		    i++
            }
    }


}

//----------Translate ID to card ---------\\
function translate(target) {
	let returncard;
	for (const card of deck) {
	  if (card.id === target) {
		returncard = card.suit + " " + card.rank;	  
		console.log(returncard)
		break; // Exit the loop once the card is found
	  }
	}

}
 

client.initialize();


 


