
console.log(simulateGames());

function simulateTestGame()
{
    var deck = returnCoreDecklist();


    var hand = [];
    var graveyard = [];
    var battlefield = []

    moveCardFromTo("Untapped Cycling Land", deck, hand);
    moveCardFromTo("Dromar's Cavern", deck, hand);
    moveCardFromTo("Fluctuator", deck, hand);
    moveCardFromTo("Cycling Card", deck, hand);
    moveCardFromTo("Cycling Card", deck, hand);
    moveCardFromTo("Cycling Card", deck, hand);
    moveCardFromTo("Cycling Card", deck, hand);



    if (isHandPlayable(hand))
    {
        return makePlay(deck, hand, graveyard, battlefield, false);
    }
}


function simulateGames()
{
    var before = Date.now();
    var simulatingGames = 100000;

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
        var gameResult = simulateGame(onThePlay);
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
    console.log("Average Starging Hand Size " + averageHandsize);
    console.log("Turn 2: " + turn2 + " Turn 3: " + turn3 + " Turn 4: " + turn4 + " Turn 5: " + turn5 + " Turn 6: " + turn6 + " Turn 7: " + turn7 + " Turn 8: " + turn8 + " Turn 9: " + turn9 + " Turn 10: " + turn10+ " Brick: " + brick)
    console.log("Finished in " + (after - before) + " milliseconds");
}


function simulateGame(onThePlay = false)
{
    return mulligan(7, onThePlay);
}

function makePlay(deck, hand, graveyard, battlefield, playedALand = false, extraManaThisTurn = 0, resultObject = {turn: 1, mulligan: hand.length})
{
    var playMade = false;
    var gameLogging = false;

    if (countCardInList(graveyard, "Cycling Card") > 19 && hand.includes("Lotus Petal") && hand.includes("Songs of the Damned") && hand.includes("Haunting Misery"))
    {
        // we win, give turn we won on.
        return resultObject;
    }

    if (countCardInList(battlefield, "Fluctuator") > 0)
        {
            // cycle a card
            if (hand.includes("Cycling Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
                        console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card", hand, graveyard);
                    drawACard(deck,hand);
                    playMade = true;
                }
            }

            if (hand.includes("Cycling Card - Sideboard Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
                        console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card - Sideboard Card", hand, graveyard);
                    drawACard(deck,hand);
                    playMade = true;
                }
            }
            // cycle a card
            if (hand.includes("Cycling Land"))
            {            
                if (!playMade) {
                    if (gameLogging){
                    console.log("cycle a cycling land");
                    }
                    moveCardFromTo("Cycling Land", hand, graveyard);
                    drawACard(deck,hand);
                    playMade = true;
                }
            }
            // cycle a card
            if (hand.includes("Untapped Cycling Land"))
            {            
                if (!playMade) {
                    if (gameLogging){
                    console.log("cycle a untapped cycling land");
                    }
                    moveCardFromTo("Untapped Cycling Land", hand, graveyard);
                    drawACard(deck,hand);
                    playMade = true;
                }
            }
            // play restless dreams, you don't have anything to cycle anymore
            if (hand.includes("Lotus Petal") && hand.includes("Restless Dreams") && countCardInList(graveyard, "Cycling Card") > 2)
            {            
                if (!playMade) {
                    if (gameLogging){
                        console.log("playing Restless Dreams");
                    }
                    moveCardFromTo("Lotus Petal", hand, graveyard);
                    moveCardFromTo("Restless Dreams", hand, graveyard);
                    
                    while(hand.includes("Fluctuator") && graveyard.includes("Cycling Card"))
                    {
                        moveCardFromTo("Fluctuator", hand, graveyard);
                        moveCardFromTo("Cycling Card", graveyard, hand);
                        extraManaThisTurn = 0;
                    }

                    drawACard(deck,hand);
                    playMade = true;
                }
            }
        }

    if (countCardInList(battlefield, "Fluctuator") == 0 && (countCardInList(battlefield, "Cycling Land") + countCardInList(battlefield, "Untapped Cycling Land") + countCardInList(battlefield, "Dromar's Cavern") + extraManaThisTurn) == 2)
    {
        if (countCardInList(hand, "Fluctuator") > 0)
        {
            // play fluctuator
            if (!playMade)
            {                                
                if (gameLogging){
                console.log("play Fluctuator");
                }
                moveCardFromTo("Fluctuator", hand, battlefield);
                playMade = true;
            }
        }
        else {
            // cycle a card
            cardCycled = false;
            if (hand.includes("Cycling Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
        
                    console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card", hand, graveyard);
                    drawACard(deck,hand);
                    extraManaThisTurn = 0;
                    cardCycled = true;
                }
            }

            if (hand.includes("Cycling Card - Sideboard Card"))
            {            
                if (!playMade) {
                    if (gameLogging){
        
                    console.log("cycle a cycling card");
                    }
                    moveCardFromTo("Cycling Card - Sideboard Card", hand, graveyard);
                    drawACard(deck,hand);
                    extraManaThisTurn = 0;
                    cardCycled = true;
                }
            }

            // cycle a card
            if (hand.includes("Cycling Land"))
            {            
                if (!playMade && !cardCycled) {
                    if (gameLogging){
                    console.log("cycle a cycling land");
                    }
                    moveCardFromTo("Cycling Land", hand, graveyard);
                    drawACard(deck,hand);
                    extraManaThisTurn = 0;
                    cardCycled = true;
                }
            }
            // cycle a card
            if (hand.includes("Untapped Cycling Land"))
            {            
                if (!playMade && !cardCycled) {
                    if (gameLogging){
                    console.log("cycle a cycling land");
                    }
                    moveCardFromTo("Untapped Cycling Land", hand, graveyard);
                    drawACard(deck,hand);
                }
            }
            
        }
    }
    else if (hand.includes("Untapped Cycling Land"))
    {
        // play land
        if (!playMade && !playedALand)
        {
            // do not set play made, we need to go to new turn after playing land
            if (gameLogging){
                console.log("play a untapped land");
            }
            moveCardFromTo("Untapped Cycling Land", hand, battlefield);
            playedALand = true;
            playMade = true;
        }
    }
    else if (hand.includes("Dromar's Cavern") && (battlefield.includes("Cycling Land") || battlefield.includes("Untapped Cycling Land")))
    {
        // play land
        if (!playMade && !playedALand)
        {
            // do not set play made, we need to go to new turn after playing land
            if (gameLogging){
                console.log("play a Dromar's Cavern land");
            }
            moveCardFromTo("Dromar's Cavern", hand, battlefield);
            if(battlefield.includes("Untapped Cycling Land"))
            {
                moveCardFromTo("Untapped Cycling Land", battlefield, hand);
            }
            else
            {
                moveCardFromTo("Cycling Land", battlefield, hand);
            }
            playedALand = true;
            playMade = true;
            extraManaThisTurn = 1;
        }
    }
    else if (hand.includes("Cycling Land"))
    {
        // play land
        if (!playMade && !playedALand)
        {
            // do not set play made, we need to go to new turn after playing land
            if (gameLogging){

            console.log("play a land");
            }
            playedALand = true;
            moveCardFromTo("Cycling Land", hand, battlefield);
        }
    }

    if (!playMade)
    {
        // take an extra turn
        if (gameLogging){
            console.log("take a turn, this hand has not plays:");
            console.log(hand)
        }
        playedALand = false;
        extraManaThisTurn = 0;
        resultObject.turn = resultObject.turn + 1;
        drawACard(deck,hand);
    }

    if (resultObject.turn > 10)
    {
        resultObject.turn = 99;
        return resultObject;
    }

    return makePlay(deck, hand, graveyard, battlefield, playedALand, extraManaThisTurn, resultObject);
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

function mulligan(size, onTheDraw = false)
{
    var deck = returnCoreDecklist();

    var hand = [];
    var graveyard = [];
    var battlefield = []

    for (i = 0; i < 7; i++) {
        drawACard(deck,hand);
    }

    londonMulliganHand(hand, deck, size);

    if (isHandPlayable(hand, size, onTheDraw))
    {
        if(onTheDraw)
        {
            drawACard(deck, hand);
        }
        return makePlay(deck, hand, graveyard, battlefield, false);
    }
    else
    {
        return mulligan(size - 1);
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

function returnCoreDecklist()
{
    var deck = [];
    deck.push("Lotus Petal");
    deck.push("Songs of the Damned");
    deck.push("Fluctuator");
    deck.push("Fluctuator");
    deck.push("Fluctuator");
    deck.push("Fluctuator");
    deck.push("Haunting Misery");
    deck.push("Untapped Cycling Land");
    deck.push("Untapped Cycling Land");
    deck.push("Untapped Cycling Land");
    deck.push("Untapped Cycling Land");
    deck.push("Dromar's Cavern");


    var lands = 20;
    var sideboardCyclers = 0;
    var misdirections = 0;
    var creatures = 60 - deck.length - sideboardCyclers - misdirections - lands;


    for (i = 0; i < lands; i++) {
        deck.push("Cycling Land");
    } 

    for (i = 0; i < creatures; i++) {
        deck.push("Cycling Card");
    } 

    for (i = 0; i < sideboardCyclers; i++) {
        deck.push("Cycling Card - Sideboard Card");
    } 

    for (i = 0; i < misdirections; i++) {
        deck.push("Misdirection");
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