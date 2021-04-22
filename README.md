# Let's simulate le Tour de France! 

This very [bodged](https://www.youtube.com/watch?v=lIFE7h3m40U) simulator simulates Fluctuator in pre-modern. The decklist is tweakable and the ideal decklist will perform on an average turn 4 kill.

To run the simulation, check out the repository or donwnload the simulate.js file and run `node simulate.js`. The decklist on the bottom of the code is configurable to test different deck configurations.

```
Results after simulating 10000000 games
*****************************
Average Combo Turn: 4.042703553654869
Bricked Game Percentage: 4.98402
Average Starging Hand Size 6.2089191
Turn 2: 674091 Turn 3: 4021596 Turn 4: 1916249 Turn 5: 1620743 Turn 6: 546059 Turn 7: 243927 Turn 8: 192961 Turn 9: 156788 Turn 10: 129184 Brick: 498402
```

And this simulation resulted in this decklist:
https://scryfall.com/@Bassiuz/decks/55e569e9-8ca2-4b86-a5c1-496ad706e064

## Lands
The first Dromar's Cavern is always optimal. It is an extra untapped source to combo on turn or the turn you draw that as a second land. It also won't cost you a turn in most of your combo turns (The only time that is possible is if you are combo-ing after playing a untapped cycling land).
Playing the second Dromar's Cavern is worse than playing none at all, so stay at 1.

Exactly 20 tapped cycling lands is ideal in addition to the 4 untapped cycling lands and the Dromar's Cavern. Even if you had a theoretical 21st land, that would not gain you any speed.

## When to go off
You need to keep in mind how many non-cyclers you have in your deck left; and assess if you need to go off or if you can wait. Against discards spells, it is a good idea to keep your hand full of cyclers instead of your win conditions. So if you don't have to win in a specific turn, you can just pass the turn and wait untill you have enough cyclers in hand to guarantee going off. On the other hand, if you already have a critical piece in hand, go off as fast as possible as you already lose to discard spells.

## Cyclers
While it doesn't really matter which Cycling Creatures you play, we advice to play as many 2 drops as you can. It is sub-optimal to ever play the 3rd land, because every cycler you remove from your hand will cost you a combo turn.
This also applies to your cycling creatures by the way; so there are almost no scenario's where you would play them. (In game one to beat a Tormod's Crypt or in a game where you drawn out a lot of cards to find the Fluctuator and need a blocker are acceptable examples)

## Mulligan Strategies

The general mulligan strategy is as follows:

```
On 7: Keep every hand with a Fluctuator and at least one land
On 6: Keep every hand with a Fluctuator
On 5: Keep every hand with a land.
On 4: Keep every hand.
```

There is a very slight change in stats when you are on the play. On the play, it is better to keep 6 non-lands and a Flucuator instead of taking the mulligan. This gains you about 0.0002 average turns. This is so little, that probably the impact of actually casting a sideboard card or creature is bigger than this extremely small speed gain.

When taking a London mulligan, please keep in mind in what order you put the cards back on the bottom. Always make sure you put cyclers on top, Fluctuator's and other non cyclers non combo pieces on the bottom, and the set of combo cards in the middle. 
## Sideboard cards
Notice that all sideboard cards are cyclers aswell. Having non-cycling cards in your deck is a debt in your combo turn and will cost you an average of 0.8 turn for the first card!
Whilst we thought about cards like Misdirection and Orim's Chant in the sideboard, adding in the playlist will put our average turn on about turn 7; which was unacceptable.

Whilst all the sideboard cards being cycling cards, they still cost you 'something'. Every non-creature cycler will cost you about 0.04 turns, and this number grows exponentially. Adding 7 sideboard cards (which is the max in the current setup, you cannot go below 21 creatures), will cost you about 0.5 turns.
If needed, cutting some mainboard creatures for mainboard sideboard options to broaden your package is optional, but not free.

## Other considered options
### Songs of the Damned vs Dark Ritual
Late in the simulation we figured that using Dark Ritual instead of Songs of the Damned gave our opponent the opportunity to use Tormod's Crypt too late. Songs of the Damned screams "crack the crypt now!" whilst Dark Ritual doesn't. After Dark Ritual resolves, your opponent does not have time to respond to the Haunting Misery anymore with the Tormod's Crypt.
### Restless Dreams
We tried a Restless Dreams setup that could make you cycle away your Fluctuators (and possible Sideboard cards). We never found a consistent setup and believe it will brick you more often than it will benefit you.
### Patriachs Bidding & Living Death
The line of adding Patriachs bidding to return all cyclers of the same creature type was also an option. Unfortunately we only have 12 of the same creature type at most (Clerics). This makes Bidding not efficient enough. This also does not circumvent the problem of still being a graveyard deck.
Living Death is also an option; and could be a viable sideboard strategy against lifegain decks that can consistenly get their life total highter then 28 before turn 4. This seems like a stretch. You could win mind games with this playing around Meddling Mage and around True Believer. With this option, you lose the option of casting your cheap creatures because you want the biggest once instead, and you lose the option of playing Dark Ritual.
### Stoic Champion
As an alternative to graveyard removal, we considered Stoic Champion but the double white was too much of a barrier to actually be good enough.
### Drain Life
Some Fluctuator lists play Drain Life, but this seems worse. You always need 2 mana and thus 2 creatures more in the graveyard, which will cost you about 0.06 average turns for no extra gain. You also lose the option to play Dark Ritual instead of Songs of the Damned.
### Enlightened Tutor
Enlightened Tutor can make you find your fluctuator faster, however this has some problems:
- You only have 5 white sources, which is not really enough to consistenlty cast it.
- As said before, every non-cycling card you put in your deck costs you an average of 0.8 turns. The consistency you gain by adding a Enlightened Tutor will not weigh up against the slow down you get in your combo turns.
