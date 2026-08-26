<div id="yahtzee-game">
    <h2>Yahtzee </h2>


    <div class="roll-information">
        Rolls :
        <?php

        if(empty($_SESSION['yahtzee_game'] )){
            ?>
           <span id="rolls"> 0 /3 </span>
        <?php
        }
        else {
            ?>
                <span id="rolls"> <?php echo $_SESSION['yahtzee_game']['rolls'] ?> /3 </span>
            <?php
        }
        ?>

    </div>
    <div id="dice-board">

        <?php for ($i = 0; $i < 5; $i++) : ?>

            <div class="die-wrapper">

                <div class="die" id="die-<?php echo $i; ?>">⚀</div>

                <label>
                <input type="checkbox"
                class="hold-checkbox"
                data-die="<?php echo $i; ?>">
                Hold
                </label>

            </div>

        <?php endfor; ?>

    </div>

    <button type="btton"
    id="yg-roll"
    class="yahtzee-roll">
        Roll Dice
    </button>

    <div id="scorecard">

        <?php include 'scorecard.php'; ?>

    </div>

</div>
