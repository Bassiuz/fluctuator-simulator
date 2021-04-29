
console.log(simulateGames(returnGreenDecklist));

function simulateTestGame()
{
    var gameState = getGameStateObject();
    gameState.deck = returnGreenDecklist();


    moveCardFromTo("Untapped Cycling Land", gameState.deck, gameState.hand);
    moveCardFromTo("Dromar's Cavern", gameState.deck, gameState.hand);
    moveCardFromTo("Fluctuator",gameState. deck, gameState.hand);
    moveCardFromTo("Cycling Card", gameState.deck, gameState.hand);
    moveCardFromTo("Cycling Card", gameState.deck, gameState.hand);
    moveCardFromTo("Cycling Card", gameState.deck, gameState.hand);
    moveCardFromTo("Cycling Card", gameState.deck, gameState.hand);

    if (isHandPlayable(gameState.hand))
    {
        return makePlay(gameState, false);
    }
}

function compareDecklists()
{    
    console.log("Simulating the core decklist");
    var averageTurnCoreDecklist = simulateGames(returnCoreDecklist);
    console.log("Simulating the provided variation");
    var averageTurnComparedDecklist = simulateGames(returnOriginalDecklist);

    console.log("Comparing the provided variation against the best list will cost you an average turn of: ")
    console.log(averageTurnComparedDecklist - averageTurnCoreDecklist);
}


function simulateAllLists()
{
    var sideboardcards = 1;
    var lands = 20;

    console.log("Core Decklist");
    simulateGames(() => returnDecklist(20, 0, 4, 1));

    console.log("Original Decklist");
    simulateGames(() => returnDecklist(15, 1, 0, 2));

    console.log("Removed Extra Kill Card Decklist");

    simulateGames(() => returnDecklist(15, 1, 0, 1));
    console.log("Upped Land Count Decklist");

    simulateGames(() => returnDecklist(20, 1, 0, 1));

    console.log("Removed Sideboard Card Decklist");

    simulateGames(() => returnDecklist(20, 0, 0, 1));

    console.log("Added 1 Brick Decklist");

    simulateGames(() => returnDecklist(20, 0, 1, 1));

    console.log("Added 3 Brick Decklist");

    simulateGames(() => returnDecklist(20, 0, 3, 1));

    console.log("Fully Boarded Original Decklist Decklist");

    simulateGames(() => returnDecklist(15, 1, 3, 2));
    

    while (sideboardcards < 15)
    {
        console.log(lands + ", " + sideboardcards + ", 0, 1");
        var boardOutLand = simulateGames(() => returnDecklist(lands - 1, sideboardcards, 0, 1));
        var boardOutCreature = simulateGames(() => returnDecklist(lands, sideboardcards, 0, 1));
        if (boardOutLand < boardOutCreature)
        {
            lands = lands - 1;
            console.log("board out a land instead");
        }
        sideboardcards = sideboardcards + 1;
    }
}

function returnCoreDecklist()
{
    return returnDecklist(20, 0, 0, 1, 0, 0)
}

function returnGreenDecklist()
{
    return returnDecklist(15, 0, 0, 1, 6, 20)
}

function returnOriginalDecklist()
{
    return returnDecklist(15, 1, 0, 2)
}

function simulateGames(returnCoreDecklist)
{
    var before = Date.now();
    
    var simulatingGames = 1;

    var turn2 = 0;
    var turn3 = 0;
    var turn4 = 0;
    var turn5 = 0;
    var turn6 = 0;
    var turn7 = 0;
    var turn8 = 0;
    var turn9 = 0;
    var turn10 = 0;

    var brick = 0;
    var totalScore = 0;
    var totalHandsize = 0;
    var onThePlay = true;

    for (var amountOfGames = 0; amountOfGames < simulatingGames; amountOfGames++) {
        onThePlay = !onThePlay;
        var gameResult = simulateGame(onThePlay, returnCoreDecklist);
        var mulligan = gameResult.mulligan;
        var turn = gameResult.turn;
        turn == 2 ? turn2 = turn2 + 1 : '';
        turn == 3 ? turn3 = turn3 + 1 : '';
        turn == 4 ? turn4 = turn4 + 1 : '';
        turn == 5 ? turn5 = turn5 + 1 : '';
        turn == 6 ? turn6 = turn6 + 1 : '';
        turn == 7 ? turn7 = turn7 + 1 : '';
        turn == 8 ? turn8 = turn8 + 1 : '';
        turn == 9 ? turn9 = turn9 + 1 : '';
        turn == 10 ? turn10 = turn10 + 1 : '';
        turn == 99 ? brick = brick + 1 : '';

        turn != 99 ? totalScore = totalScore + turn: '';
        
        totalHandsize = totalHandsize + mulligan;
    }

    var after = Date.now();

    var averageComboTurn = totalScore / (simulatingGames - brick);

    var averageHandsize = totalHandsize / (simulatingGames);
    console.log("Results after simulating " + simulatingGames + " games");
    console.log("*****************************")
    console.log("Average Combo Turn: " + averageComboTurn);
    console.log("Bricked Game Percentage: " + brick / simulatingGames * 100);
    console.log("Average Starting Hand Size " + averageHandsize);
    console.log("Turn 2: " + turn2 + " Turn 3: " + turn3 + " Turn 4: " + turn4 + " Turn 5: " + turn5 + " Turn 6: " + turn6 + " Turn 7: " + turn7 + " Turn 8: " + turn8 + " Turn 9: " + turn9 + " Turn 10: " + turn10+ " Brick: " + brick)
    console.log("Finished in " + (after - before) + " milliseconds");

    return averageComboTurn;
}


function simulateGame(onThePlay = false, returnDecklistFunction)
{
    return mulligan(7, onThePlay, returnDecklistFunction);
}

function makePlay(gameState, playedALand = false, extraManaThisTurn = 0, resultObject = {turn: 1, mulligan: gameState.hand.length})
{
    
    var playMade = false;
    var gameLogging = true;

    if (countCardInList(gameState.graveyard, "Cycling Card") + countCardInList(gameState.graveyard,"Cycling Creature - Green") > 19 && (gameState.hand.includes("Lotus Petal") || extraManaThisTurn == 1) && gameState.hand.includes("Songs of the Damned") && gameState.hand.includes("Haunting Misery"))
    {
        // we win, give turn we won on.
        return resultObject;
    }

    if (countCardInList(gameState.battlefield, "Fluctuator") > 0)
        {
            // cycle a card
            if (gameState.hand.includes("Cycling Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
                        console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck, gameState.hand);
                    playMade = true;
                }
            }

            // cycle a card
            if (gameState.hand.includes("Cycling Enchantment"))
            {            
                if (!playMade) {
                    if (gameLogging){
                    console.log("cycle a Cycling Enchantment");
                    }
                    moveCardFromTo("Cycling Enchantment", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                    playMade = true;
                }
            }

            if (gameState.hand.includes("Cycling Card - Sideboard Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
                        console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card - Sideboard Card", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck, gameState.hand);
                    playMade = true;
                }
            }
            
            // cycle a card
            if (gameState.hand.includes("Cycling Land"))
            {            
                if (!playMade) {
                    if (gameLogging){
                    console.log("cycle a cycling land");
                    }
                    moveCardFromTo("Cycling Land", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck, gameState.hand);
                    playMade = true;
                }
            }
            // cycle a card
            if (gameState.hand.includes("Untapped Cycling Land"))
            {            
                if (!playMade) {
                    if (gameLogging){
                    console.log("cycle a untapped cycling land");
                    }
                    moveCardFromTo("Untapped Cycling Land", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                    playMade = true;
                }
            }

            if ( (gameState.hand.includes("Lotus Petal") || extraManaThisTurn == 1) && gameState.hand.includes("Rofellos Gift") && countCardInList(gameState.graveyard, "Cycling Enchantment") > 1 && countCardInList(gameState.hand, "Cycling Creature - Green") > 0)
            {
                // cast rofellos gift

                if(extraManaThisTurn == 1)
                {
                    extraManaThisTurn = 0;
                } else
                {
                    moveCardFromTo("Lotus Petal", gameState.hand, gameState.graveyard);
                }

                moveCardFromTo("Rofellos Gift", gameState.hand, gameState.graveyard);


                var amountOfCardsToGet = Math.min(countCardInList(gameState.graveyard, "Cycling Enchantment"), countCardInList(gameState.hand, "Cycling Creature - Green"))
                if (gameLogging){
                    console.log("returing amount of cards: " + gameState.hand);

                    console.log("returing amount of cards: " + amountOfCardsToGet);
                    }
                for (i = 0; i < amountOfCardsToGet; i++) {
                    if (gameLogging){
                        console.log("return card");
                    }
                    moveCardFromTo("Cycling Enchantment", gameState.graveyard, gameState.hand);
                }
            }

                                    // cycle a card
            if (gameState.hand.includes("Cycling Creature - Green"))
            {            
                if (!playMade) {
                    if (gameLogging){
                    console.log("cycle a Green Creature");
                    }
                    moveCardFromTo("Cycling Creature - Green", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                    playMade = true;
                }
            }

            
            // play restless dreams, you don't have anything to cycle anymore
            if (gameState.hand.includes("Lotus Petal") && gameState.hand.includes("Restless Dreams") && countCardInList(gameState.graveyard, "Cycling Card") > 2)
            {            
                if (!playMade) {
                    if (gameLogging){
                        console.log("playing Restless Dreams");
                    }
                    moveCardFromTo("Lotus Petal", gameState.hand, gameState.graveyard);
                    moveCardFromTo("Restless Dreams", gameState.hand, gameState.graveyard);
                    
                    while(gameState.hand.includes("Fluctuator") && gameState.graveyard.includes("Cycling Card"))
                    {
                        moveCardFromTo("Fluctuator", gameState.hand, gameState.graveyard);
                        moveCardFromTo("Cycling Card", gameState.graveyard, gameState.hand);
                        extraManaThisTurn = 0;
                    }

                    drawACard(gameState.deck, gameState.hand);
                    playMade = true;
                }
            }
        }

    if (countCardInList(gameState.battlefield, "Fluctuator") == 0 && (countCardInList(gameState.battlefield, "Cycling Land") + countCardInList(gameState.battlefield, "Untapped Cycling Land") + countCardInList(gameState.battlefield, "Dromar's Cavern") + extraManaThisTurn) == 2)
    {
        if (countCardInList(gameState.hand, "Fluctuator") > 0)
        {
            // play fluctuator
            if (!playMade)
            {                                
                if (gameLogging){
                console.log("play Fluctuator");
                }
                moveCardFromTo("Fluctuator", gameState.hand, gameState.battlefield);
                playMade = true;
            }
        }
        else {
            // cycle a card
            cardCycled = false;
            if (gameState.hand.includes("Cycling Enchantment"))
            {            
                if (!playMade) {
                    if (gameLogging){
        
                    console.log("cycle a cycling Enchantment");
                    }
                    moveCardFromTo("Cycling Enchantment", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                    extraManaThisTurn = 0;
                    cardCycled = true;
                }
            }
            
            if (gameState.hand.includes("Cycling Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
        
                    console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                    extraManaThisTurn = 0;
                    cardCycled = true;
                }
            }
            
            if (gameState.hand.includes("Cycling Card - Sideboard Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
                        console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card - Sideboard Card", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                    extraManaThisTurn = 0;
                    cardCycled = true;
                }
            }

            // cycle a card
            if (gameState.hand.includes("Cycling Land"))
            {            
                if (!playMade && !cardCycled) {
                    if (gameLogging){
                        console.log("cycle a cycling land");
                    }
                    moveCardFromTo("Cycling Land", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                    extraManaThisTurn = 0;
                    cardCycled = true;
                }
            }
            // cycle a card
            if (gameState.hand.includes("Untapped Cycling Land"))
            {            
                if (!playMade && !cardCycled) {
                    if (gameLogging){
                    console.log("cycle a cycling land");
                    }
                    moveCardFromTo("Untapped Cycling Land", gameState.hand, gameState.graveyard);
                    drawACard(gameState.deck,gameState.hand);
                }
            }
            
        }
    }
    else if (gameState.hand.includes("Untapped Cycling Land"))
    {
        // play land
        if (!playMade && !playedALand)
        {
            // do not set play made, we need to go to new turn after playing land
            if (gameLogging){
                console.log("play a untapped land");
            }
            moveCardFromTo("Untapped Cycling Land", gameState.hand, gameState.battlefield);
            playedALand = true;
            playMade = true;
        }
    }
    else if (gameState.hand.includes("Dromar's Cavern") && (gameState.battlefield.includes("Cycling Land") || gameState.battlefield.includes("Untapped Cycling Land")))
    {
        // play land
        if (!playMade && !playedALand)
        {
            // do not set play made, we need to go to new turn after playing land
            if (gameLogging){
                console.log("play a Dromar's Cavern land");
            }
            moveCardFromTo("Dromar's Cavern", gameState.hand, gameState.battlefield);
            if(gameState.battlefield.includes("Untapped Cycling Land"))
            {
                moveCardFromTo("Untapped Cycling Land", gameState.battlefield, gameState.hand);
            }
            else
            {
                moveCardFromTo("Cycling Land", gameState.battlefield, gameState.hand);
            }
            playedALand = true;
            playMade = true;
            extraManaThisTurn = 1;
        }
    }
    else if (gameState.hand.includes("Cycling Land"))
    {
        // play land
        if (!playMade && !playedALand)
        {
            // do not set play made, we need to go to new turn after playing land
            if (gameLogging){

            console.log("play a land");
            }
            playedALand = true;
            moveCardFromTo("Cycling Land", gameState.hand, gameState.battlefield);
        }
    }

    if (!playMade)
    {
        // take an extra turn
        if (gameLogging){
            console.log("take a turn, this hand has not plays:");
            console.log(gameState.hand)
        }
        playedALand = false;
        extraManaThisTurn = 0;
        resultObject.turn = resultObject.turn + 1;
        drawACard(gameState.deck, gameState.hand);
    }

    if (resultObject.turn > 10)
    {
        resultObject.turn = 99;
        return resultObject;
    }

    return makePlay(gameState, playedALand, extraManaThisTurn, resultObject);
}

function londonMulliganHand(hand, deck, handsize)
{

    var mulliganedCards = [];

    // first determine which cards to mulligan
    while(hand.length > handsize)
    {
        if (countCardInList(hand, "Fluctuator") > 1)
        {
            putCardFromHandOnBottomOfDeck("Fluctuator", hand, mulliganedCards);
        }
        else if (hand.includes("Lotus Petal"))
        {
            putCardFromHandOnBottomOfDeck("Lotus Petal", hand, mulliganedCards);
        } else if (hand.includes("Haunting Misery"))
        {
            putCardFromHandOnBottomOfDeck("Haunting Misery", hand, mulliganedCards);
        } else if (hand.includes("Songs of the Damned"))
        {
            putCardFromHandOnBottomOfDeck("Songs of the Damned", hand, mulliganedCards);
        } else if (hand.includes("Restless Dreams"))
        {
            putCardFromHandOnBottomOfDeck("Restless Dreams", hand, mulliganedCards);
        } else if (hand.includes("Misdirection"))
        {
            putCardFromHandOnBottomOfDeck("Misdirection", hand, mulliganedCards);
        } else if (hand.includes("Cycling Card"))
        {
            putCardFromHandOnBottomOfDeck("Cycling Card", hand, mulliganedCards);
        } else if (hand.includes("Cycling Card - Sideboard Card"))
        {
            putCardFromHandOnBottomOfDeck("Cycling Card - Sideboard Card", hand, mulliganedCards);
        } else if (hand.includes("Cycling Land"))
        {
            putCardFromHandOnBottomOfDeck("Cycling Land", hand, mulliganedCards);
        }else if (hand.includes("Untapped Cycling Land"))
        {
            putCardFromHandOnBottomOfDeck("Untapped Cycling Land", hand, mulliganedCards);
        } else
        {
            putCardFromHandOnBottomOfDeck(getRandomCardFrom(hand), hand, mulliganedCards);
        }
    }

    // then put them back in a good order
    while(mulliganedCards.length > 0)
    {

        if (mulliganedCards.includes("Cycling Card - Sideboard Card"))
        {
            putCardFromHandOnBottomOfDeck("Cycling Card - Sideboard Card", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Cycling Land"))
        {
            putCardFromHandOnBottomOfDeck("Cycling Land", mulliganedCards, deck);
        }else if (mulliganedCards.includes("Untapped Cycling Land"))
        {
            putCardFromHandOnBottomOfDeck("Untapped Cycling Land", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Cycling Card"))
        {
            putCardFromHandOnBottomOfDeck("Cycling Card", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Lotus Petal"))
        {
            putCardFromHandOnBottomOfDeck("Lotus Petal", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Haunting Misery"))
        {
            putCardFromHandOnBottomOfDeck("Haunting Misery", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Songs of the Damned"))
        {
            putCardFromHandOnBottomOfDeck("Songs of the Damned", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Restless Dreams"))
        {
            putCardFromHandOnBottomOfDeck("Restless Dreams", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Fluctuator"))
        {
            putCardFromHandOnBottomOfDeck("Fluctuator", mulliganedCards, deck);
        } else if (mulliganedCards.includes("Misdirection"))
        {
            putCardFromHandOnBottomOfDeck("Misdirection", mulliganedCards, deck);
        } else
        {
            putCardFromHandOnBottomOfDeck(getRandomCardFrom(hand), mulliganedCards, deck);
        }
    }
}

function isHandPlayable(hand, onTheDraw = false)
{
    /// tested it, but with the current configuration there are not mulligan differences on the play or on the draw
    if (!onTheDraw)
    {
        // snap-keep every hand with fluctuator and lands
        if (hand.includes("Fluctuator") && (hand.includes("Untapped Cycling Land") || hand.includes("Cycling Land")))
        {
            return true;
        }
        // keep every 6-er with a fluctuator, you'll draw lands
        if (hand.length < 7 && hand.includes("Fluctuator"))
        {
            return true;
        }
        // keep every 5-er with lands, you need some cards in hand to combo
        if (hand.length < 6 && (hand.includes("Untapped Cycling Land") || hand.includes("Cycling Land")))
        {
            return true;
        }
        // going lower then 4 will cost you combo turns, so always keep after 4.
        if (hand.length < 5)
        {
            return true;
        }
        return false;
    }
    else
    {
        // snap-keep every hand with fluctuator and lands
        if (hand.includes("Fluctuator") && (hand.includes("Untapped Cycling Land") || hand.includes("Cycling Land")))
        {
            return true;
        }
        // keep every 6-er with a fluctuator, you'll draw lands
        if (hand.length < 7 && hand.includes("Fluctuator"))
        {
            return true;
        }
        // keep every 5-er with lands, you need some cards in hand to combo
        if (hand.length < 6 && (hand.includes("Untapped Cycling Land") || hand.includes("Cycling Land")))
        {
            return true;
        }
        // going lower then 4 will cost you combo turns, so always keep after 4.
        if (hand.length < 5)
        {
            return true;
        }
        return false;
    }
    
}

function mulligan(size, onTheDraw = false, returnDecklistFunction)
{
    var gameState = getGameStateObject();
    gameState.deck = returnDecklistFunction();

    for (i = 0; i < 7; i++) {
        drawACard(gameState.deck, gameState.hand);
    }

    londonMulliganHand(gameState.hand, gameState.deck, size);

    if (isHandPlayable(gameState.hand, size, onTheDraw))
    {
        if(onTheDraw)
        {
            drawACard(gameState.deck, gameState.hand);
        }
        return makePlay(gameState, false);
    }
    else
    {
        return mulligan(size - 1, onTheDraw, returnDecklistFunction);
    }
}

function drawACard(deck, hand)
{
    if (deck.length != 0)
    {
        moveCardFromTo(deck[0], deck, hand);
    }
    else
    {
        console.log("deckout!!!");
    }
}

function countCardInList(list, card){
    return list.filter(x => x==card).length
}

function moveCardFromTo(card, from, to)
{
    from.splice(from.indexOf(card), 1);
    to.push(card);
}

function putCardFromHandOnBottomOfDeck(card, hand, deck)
{
    hand.splice(hand.indexOf(card), 1);
    deck.push(card);
}

function getRandomCardFrom(list)
{
    return list[Math.floor(Math.random() * list.length)];
}

function returnDecklist(tappedCyclingLands, sideboardCyclers, sideboardCards, killconditions = 1, enchantmentsCycler, greenCreatureCyclers)
{
    var deck = [];
    deck.push("Lotus Petal");
    deck.push("Lotus Petal");
    deck.push("Rofellos Gift");
    deck.push("Fluctuator");
    deck.push("Fluctuator");
    deck.push("Fluctuator");
    deck.push("Fluctuator");
    deck.push("Songs of the Damned");
    deck.push("Untapped Cycling Land");
    deck.push("Untapped Cycling Land");
    deck.push("Untapped Cycling Land");
    deck.push("Untapped Cycling Land");
    deck.push("Dromar's Cavern");

    for (i = 0; i < killconditions; i++) {
        deck.push("Haunting Misery");
    } 

    for (i = 0; i < enchantmentsCycler; i++) {
        deck.push("Cycling Enchantment");
    } 

    for (i = 0; i < greenCreatureCyclers; i++) {
        deck.push("Cycling Creature - Green");
    } 

    for (i = 0; i < tappedCyclingLands; i++) {
        deck.push("Cycling Land");
    } 

    for (i = 0; i < sideboardCyclers; i++) {
        deck.push("Cycling Card - Sideboard Card");
    } 

    for (i = 0; i < sideboardCards; i++) {
        deck.push("Misdirection");
    } 

    var creatures = 60 - deck.length;

    for (i = 0; i < creatures; i++) {
        deck.push("Cycling Card");
    } 

    return shuffle(deck);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function getGameStateObject()
{
    return {
        deck: [],
        hand: [],
        battlefield: [],
        graveyard: []
    }
}