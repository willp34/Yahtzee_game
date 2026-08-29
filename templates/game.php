<div id="yahtzee-game">
    <div id="message-dialog" class='notice notice-error'> </div>
    <h2>Yahtzee </h2>


    <div class="roll-information">
        <button id="yg-reset" class="button">Reset Game</button>
        Rolls :

            <span id="rolls"> <?php echo $rolls ; ?> /3 </span>

    </div>
    <div id="dice-board">

        <?php for ($i = 0; $i < 5; $i++) : ?>

            <div class="die-wrapper">

                <div class="die" ></div>

            </div>

        <?php endfor; ?>

    </div>

    <button type="button"
    id="yg-roll"
    class="yahtzee-roll">
        Roll Dice
    </button>

    <div id="scorecard">

        <?php include 'scorecard.php'; ?>

    </div>

</div>
