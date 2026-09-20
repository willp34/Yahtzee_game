
    class Yahtzee_game {

        constructor(){
            //Modal
            this.modal = document.getElementById('rjf-modal');
            this.modalBody = document.getElementById('rjf-job-content');
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


            //modal panel
            jQuery(document).on('click', '.yg-open-modal', () =>this.statistics_screen())
            /*document.querySelectorAll("#score-card-body tr").forEach((row) => {
                row.addEventListener("click", () => this.selectScore(row))
            });*/

        }

        async statistics_screen(){
            jQuery("#rjf-form").remove();
             jQuery(this.modalBody).html("Loading !!!!");
                // Open modal
                jQuery(this.modal).addClass('active');

                try{

                    const response = await this.api.statistics();
                    //this.dice.stopAnimation();

                    if(!response.success){
                        throw new Error(response.data.message);
                    }
                    this.modalBody.innerHTML = response.data.body


                }
                catch(err){
                    alert(err)
                    this.messages.textContent = err;
                }
                finally{

                }
        }
        async rollDice(){
            this.messages.style.display = "none";
            if(this.rolling || this.rollsLeft===0) return;

            this.rolling = true;
            this.rollButton.disabled = true;
            this.messages.textContent = "";
           // this.dice.startAnimation();
            try{

                const response = await this.api.roll();
                //this.dice.stopAnimation();
                if(!response.success){
                    throw new Error(response.data.message);
                }
                // Animate the dice before applying the new game state.
                this.dice.animateRoll(response.data.dice, () =>{
                    this.applyState(response.data);
                    this.rollButton.disabled= this.rollsLeft === 0;
                    this.hasRolledThisTurn =true ;
                })

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
            if(!row.classList.contains("score-available") &&
                !row.classList.contains("score-best")
            ) return ;

            try{
                const response = await this.api.score(
                    row.dataset.category
                )

                if(!response.success) return;

                this.applyState(response.data);
                // Update totals and bonus progress here.
                this.scorecard.setTotals(response.data);
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
                this.scorecard.setTotals(response.data);
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
                this.rollButton.disabled = true;


                this.messages.style.display = "block";
                this.messages.textContent = "🎉 Game Over!";

            }
        }
    }
