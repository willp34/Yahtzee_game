
    class Yahtzee_game {

        constructor(){
            this.api = new YahtzeeAPI();
            this.dice = new YahtzeeDice(
                document.getElementById('dice-board')
            );
            this.scorecard = new YahtzeeScorecard();

            this.rollButton = document.getElementById('yg-roll');
            this.resetButton = document.getElementById('yg-reset');
            this.rollsDisplay = document.getElementById('rolls');
            this.turns = document.getElementById('turns');
            this.messages = document.getElementById('message-dialog');

            this.rolling = false;
            this.rollsLeft =3;
            this.hasRolledThisTurn = false;

            this.bindEvents();
            this.loadInitialState();
        }

        loadInitialState(){

            this.rollsDisplay.textContent = 0; //Yahtzee.rolls;
            this.turns.textContent =Yahtzee.turns ;
            this.dice.clickHandler = ( index => this.toggleHold(index));
            this.dice.setState(
                Yahtzee.dice || [1, 1, 1, 1, 1],
                Yahtzee.held || [false, false, false, false, false]
            )
            this.scorecard.update({},
                                 Yahtzee.score_board.used_scores ||{})

            this.scorecard.setTotals(Yahtzee);
        }

        bindEvents(){

            this.rollButton.addEventListener('click',() => this.rollDice() );

            this.resetButton.addEventListener('click' , () => this.resetGame());

            document.querySelectorAll(".score-row").forEach((row) => {
                row.addEventListener("click", () => this.selectScore(row))
            });

        }

        async rollDice(){

            if(this.rolling) return;

            this.rolling = true;
            this.rollButton.disabled = true;
            this.dice.startAnimation();
            try{

                const response = await this.api.roll();
                this.dice.stopAnimation();
                if(!response.success){
                    throw new Error(response.data.message);
                }
                this.applyState(response.data);
                thids.hasRolledThisTurn =true ;
            }
            catch(err){

                this.dice.stopAnimation();

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
                    this.messages.textContent = "Roll the dice first!";
                    return;
                }
            if(!row.classList.contains("available")) return ;

            try{
                const response = await this.api.score(
                    row.dataset.category
                )

                if(!response.success) return;

                this.applyState(response.data);
                this.hasRolledThisTurn =false;
                this.rollButton.disabled =false;

            } catch(err){
                console.error( err);
            }
        }

        async resetGame(){
            try {
                const response = await this.api.reset();

                if (!response.success) return;
                this.applyState(response.data);
                this.rollsDisplay.textContent = "0 ";
                this.hasRolledThisTurn =false;

                this.messages.textContent = "New game started!";
            } catch (err) {
                console.error("Reset error:", err);
                this.messages.textContent = err.message;
            }
        }
        async toggleHold(index){
            const held = this.dice.toggleHold(index);

            try{
                await this.api.hold(index,held);

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
                data.used_scores);

            this.scorecard.setTotals(data);

            if ("rolls" in data) {
                this.rollsLeft = 3 - data.rolls;
                this.rollsDisplay.textContent = `${this.rollsLeft} `;
                this.rollButton.disabled = this.rollsLeft === 0;
                //Player has rolled at least once.
                this.hasRolledThisTurn = data.rolls>0;
            }
            if("turns" in data){
                this.turns.textContent =data.turns;
            }
            if (this.scorecard.isGameOver(data.used_scores)) {
                this.rollButton.disabled = true;
                this.messages.textContent = "🎉 Game Over!";

            }
        }
    }
