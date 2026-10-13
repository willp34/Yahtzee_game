
    class Yahtzee_game {

        constructor(){

            this.api = new YahtzeeAPI();
            this.dice = new YahtzeeDice(
                document.getElementById('dice-board')
            );
            this.scorecard = new YahtzeeScorecard();

            this.achievements = new Yahtzee_achievements();
            this.rollButton = document.getElementById('yg-roll');
            this.resetButton = document.getElementById('yg-reset');
            this.rollsDisplay = document.getElementById('rolls');
            this.turns = document.getElementById('turns');
            this.messages = document.getElementById('message-dialog');

            this.rolling = false;
            this.rollsLeft =3;
            this.hasRolledThisTurn = false;

            this.diceStats = {
                totalRolls: 0,
                yahtzees: 0,
                fullHouses: 0,
                smallStraights: 0,
                largeStraights: 0
            };

            this.bindEvents();
            this.loadInitialState();
        }

        loadInitialState(){

            this.rollsDisplay.textContent = 3; //Yahtzee.rolls;
            this.messages.style.display = "none";
            this.turns.textContent =Yahtzee.turns ;
            this.dice.clickHandler = ( index => this.toggleHold(index));
            this.dice.setState(
                Yahtzee.dice || [1, 1, 1, 1, 1],
                Yahtzee.held || [false, false, false, false, false]
            )
            this.scorecard.update(
                            {},
                            Yahtzee.score_board.used_scores ||{},
                           (row) => this.selectScore(row)
                                  );
            /*this.scorecard.update_table(
                {},
                Yahtzee.score_board.used_scores ||{},
            );
        */

            this.scorecard.setTotals(Yahtzee);
        }

        bindEvents(){

            this.rollButton.addEventListener('click',() => this.rollDice() );

            this.resetButton.addEventListener('click' , () => this.resetGame());


            /*document.querySelectorAll("#score-card-body tr").forEach((row) => {
                row.addEventListener("click", () => this.selectScore(row))
            });*/

        }


        async rollDice(){
            this.diceStats.totalRolls++;

            this.messages.style.display = "none";
            if(this.rolling || this.rollsLeft===0) return;

            this.rolling = true;
            this.rollButton.disabled = true;
            this.messages.textContent = "";
           // this.dice.startAnimation();
            try{

                const roll = await this.api.request('yg_roll');
                //this.dice.stopAnimation();

                // Animate the dice before applying the new game state.
                this.dice.animateRoll(roll.dice, () =>{
                    this.applyState(roll);
                    this.rollButton.disabled= this.rollsLeft === 0;
                    this.hasRolledThisTurn =true ;
                })
                this.updateDiceStatistics(roll.dice);
                this.achievements.checkAchievements(
                    "roll",
                    roll
                );

            }
            catch(err){

                //this.dice.stopAnimation();

                //'Unable to roll the dice. '+
                this.messages.textContent = err;
                this.rollButton.disabled = false;
            }
            finally{
                this.rolling = false;
            }
        }

        async selectScore(row){

            if (!this.hasRolledThisTurn) {

                    this.messages.style.display = "block";
                    this.messages.textContent = "Roll the dice first!";
                    return;
                }
            /*
             * Not needed
             * if(!row.classList.contains("score-available") &&
                !row.classList.contains("score-best")
            ) return ;
        */
            if(row.classList.contains("score-used")) return ;
            try{
                const scores = await this.api.request(
                    "yg_score",
                    { "category" : row.dataset.category });

                this.applyState(scores);
                this.achievements.checkAchievements(
                    "category",
                    scores
                );


                // Update totals and bonus progress here.
                this.scorecard.setTotals(scores);
                this.hasRolledThisTurn =false;
                this.rollButton.disabled =false;

            } catch(err){
                console.error( err);
            }
        }

        async resetGame(){
            try {
                const reset = await this.api.request("yg_reset");


                this.applyState(reset);
                this.scorecard.setTotals(reset);
                this.rollsDisplay.textContent = "3";
                this.hasRolledThisTurn =false;
                this.messages.style.display = "block";
                this.messages.textContent = "New game started!";
            } catch (err) {
                console.error("Reset error:", err);

                this.messages.style.display = "block";
                this.messages.textContent = err.message;
            }
        }
        async toggleHold(index){
            const held = this.dice.toggleHold(index);


            try{
                await this.api.request('yg_hold',{
                    die:index,
                    held: held ? '1' : '0'
                });


            }
            catch(err){
                console.error(err);
            }
        }

        applyState(data){
            this.dice.setState(data.dice,data.held )
            this.dice.render(index => this.toggleHold(index));

            this.scorecard.update(
                data.possible_scores,
                data.used_scores,
                (row) => this.selectScore(row)
            );
    /*
     *
            this.scorecard.setTotals(data);
            */

            if ("rolls" in data) {
                this.rollsLeft = 3 - data.rolls;
                this.rollsDisplay.textContent = `${this.rollsLeft} `;
                this.rollButton.disabled = this.rollsLeft === 0;
                //Player has rolled at least once.
               // this.hasRolledThisTurn = data.rolls>0;
            }
            if("turns" in data){
                this.turns.textContent =data.turns;
            }
            if (this.scorecard.isGameOver(data.used_scores)) {
                this.achievements.checkAchievements(
                    "gameOver",
                    scores
                );
                this.rollButton.disabled = true;
                this.messages.style.display = "block";
                this.messages.textContent = "🎉 Game Over!";

            }
        }

        updateDiceStatistics(dice) {

            const counts = {};

            dice.forEach(value => {
                counts[value] = (counts[value] || 0) + 1;
            });

            const values = Object.values(counts);

            // Yahtzee
            if (values.includes(5)) {
                this.diceStats.yahtzees++;
            }

            // Full House
            if (values.includes(3) && values.includes(2)) {
                this.diceStats.fullHouses++;
            }

            // Small Straight
            if (this.hasSmallStraight(dice)) {
                this.diceStats.smallStraights++;
            }

            // Large Straight
            if (this.hasLargeStraight(dice)) {
                this.diceStats.largeStraights++;
            }
        }
        hasSmallStraight(dice) {

            const unique = [...new Set(dice)].sort();

            const straights = [
                [1,2,3,4],
                [2,3,4,5],
                [3,4,5,6]
            ];

            return straights.some(straight =>
            straight.every(num => unique.includes(num))
            );
        }

        hasLargeStraight(dice) {

            const sorted = [...new Set(dice)].sort().join(",");

            return sorted === "1,2,3,4,5" || sorted === "2,3,4,5,6";
        }
    }
