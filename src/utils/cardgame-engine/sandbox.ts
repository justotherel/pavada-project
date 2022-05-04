import { CardgameEngine } from ".";

const game = CardgameEngine.instance;

console.log(game.player1.deck, game.player2.deck);


// game loop
// game start (draft)
// player turn 
    // use played cards' abilities, if any
    // play card
    // use played cards' abilities, if any
    // end turn
// enemy turn
// player turn
// ...
// game over


// redo dealDamage to only deal damage within card's health