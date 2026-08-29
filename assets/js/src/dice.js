 class YahtzeeGame
 {
     constructor(){
         this.messages = document.getElementById('message-dialog');
         this.resetButton = document.getElementById('yg-reset');
         this.rollButton = document.getElementById('yg-roll');
         this.diceContainer = document.getElementById('dice-board');
         this.rollsDisplay = document.getElementById('rolls');
         this.turns = document.getElementById('turns');

         //totals
         this.upper_bonus = document.getElementById('U-bonus');
         this.upper_total = document.getElementById('U-total');
         this.lower_total = document.getElementById('L-total');
         this.grand_total = document.getElementById('Grand-total');

         if(!this.rollButton){return ;}

         this.rolling = false;
         this.animationTimer = null;

         this.rollsLeft =3;
         this.dice=[];
         this.held=[false,false,false,false,false];

         this.bindEvents();
    }
    bindEvents(){

        this.rollButton.addEventListener('click',() => this.rollDice() );

        this.resetButton.addEventListener('click' , () => this.resetGame());

        jQuery(() => {
            //alert("Loaded  "+Yahtzee.score_board.used_scores);
            /*if(!Yahtzee.score_board.possible_scores ||
                Yahtzee.score_board.used_scores) return;
           */
            this.turns.textContent =Yahtzee.turns ;

            this.dice = Yahtzee.dice || [1, 1, 1, 1, 1];
            this.held = Yahtzee.held || [false, false, false, false, false];

            this.renderDice(this.dice, this.held);
            this.updateScorecard({},
                            Yahtzee.score_board.used_scores ||{})

            this.setTotals(Yahtzee);
        })
/**
        document.querySelectorAll(".hold-checkbox").forEach((check) => {
            check.addEventListener("change", () => {
                this.setHeld(check.dataset.die, check.checked)
            });

        });

*/
        document.querySelectorAll(".score-row").forEach((row) => {
            row.addEventListener("click", () => this.selectScore(row))
        });

        }

    renderDice(dice, held) {
        this.diceContainer.innerHTML ='';
        dice.forEach((value, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'die-wrapper';
            const die = document.createElement('div');
            die.className= 'die';
            if(held[index]){
                die.classList.add('held');
            }

            this.drawDieFace(die,value)
            wrapper.appendChild(die);
            wrapper.addEventListener('click', () => this.toggleHold(index)  )
            this.diceContainer.appendChild(wrapper);
        });
    }

    drawDieFace(die ,value){

        const pipPositions = {
            1: [5],
            2: [1, 9],
            3: [1, 5, 9],
            4: [1, 3, 7, 9],
            5: [1, 3, 5, 7, 9],
            6: [1, 3, 4, 6, 7, 9]
        };
        die.innerHTML ='';

        // create 9 grid cells
            for(let i=1; i<=9 ; i++){
                const cell = document.createElement('div');
                cell.className='pip-cell';

                if(pipPositions[value].includes(i)){
                    const pip = document.createElement('div');
                    pip.className = 'pip';
                    cell.appendChild(pip);
                }
                die.appendChild(cell);
            }
    }

    updateScorecard(possibleScore,usedScores){
        document.querySelectorAll('.score-row').forEach(row =>{
            const category = row.dataset.category;
            const scoreCell  = row.querySelector(".score-value");

            row.classList.remove("used", "available");
            if(usedScores.hasOwnProperty(category)){
                row.classList.add("used");
                scoreCell.textContent = usedScores[category];
            }else{
                row.classList.add("available");
                scoreCell.textContent = possibleScore[category];
            }
        });

        if (this.isGameOver(usedScores)) {
            this.rollButton.disabled = true;
            this.messages.textContent = "🎉 Game Over! All score categories have been filled.";
        }


    }

    setTotals(scoreTotals){

        this.upper_bonus.textContent = scoreTotals.upper_bonus;
        this.upper_total.textContent = scoreTotals.upper_section;
        this.lower_total.textContent = scoreTotals.lower_section;
        this.grand_total.textContent = scoreTotals.grand_total;

    }

    isGameOver(usedScores){
        return Object.keys(usedScores).length === 13;

    }

    startAnimation() {
        this.animationTimer = setInterval(() => {

            document.querySelectorAll(".die").forEach((die, index) => {

                // Only animate dice that are NOT held
                if (!this.held[index]) {
                    const random = Math.floor(Math.random() * 6) + 1;
                    this.drawDieFace(die,random);
                    die.classList.add("rolling");
                }

            });

        }, 75);
    }

    stopAnimation() {
        clearInterval(this.animationTimer);
        document.querySelectorAll(".die").forEach((die) => {
            die.classList.remove("rolling");
        });
    }


    toggleHold(index){


        const held = !this.held[index];
        this.held[index] = held;
        this.renderDice(this.dice, this.held);

        this.setHeld(index,held);

    }

    async ajax(action, data=[]){
        const formData = new FormData();

        formData.append('action',action);
        formData.append('nonce',Yahtzee.nonce);

        Object.entries(data).forEach(([key,value]) => {
            formData.append(key,value);
        })
        const response = await fetch(Yahtzee.ajax_url,{
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        })

        if(!response.ok){
            throw new Error(`HTTP ${response.status}`); ;
        }
        return response.json();
    }

    async setHeld(index, held){

        try{
            await this.ajax('yg_hold',{
                die:index,
                held: held ? '1' : '0'
            });
            // Update local game state.
            this.held[index] = held;
            // Redraw the dice so the held highlight updates.
            this.renderDice(this.dice, this.held);

        }
        catch(err){
            console.error('Hold AJAX error: ',err);
        }
    }


    async rollDice(){

        if(this.rolling) return;

        this.rolling = true;
        this.rollButton.disabled = true;
        this.startAnimation();
        try{
            const response = await this.ajax('yg_roll');
            this.stopAnimation();
            if(!response.success){
                throw new Error(response.data.message);
            }
            this.dice=response.data.dice;
            this.held =response.data.held;
            this.renderDice(this.dice, this.held);
            this.updateScorecard(
                    response.data.possible_scores,
                    response.data.used_scores
                )
            this.rollsDisplay.textContent = 3 - response.data.rolls+ "/3";
            this.rollsLeft = 3 - response.data.rolls;
            this.rollButton.disabled = response.data.rolls >=3
        }
        catch(err){

            this.stopAnimation();
            this.rollButton.disabled = false;

            //'Unable to roll the dice. '+
            this.messages.innerHTML = err;
            console.error(err);
        }
        this.rolling = false;
    }

    async selectScore(row){

        if(!row.classList.contains("available")) return ;

        try{
             const response = await this.ajax("yg_score",{
                 category :row.dataset.category
            })

             if(!response.success) return;

            this.renderDice(response.data.dice, response.data.held);
            this.updateScorecard(
                response.data.possible_scores,
                response.data.used_scores
            )
            this.setTotals(response.data);
            this.rollsDisplay.textContent = "0 / 3" ;
            this.rollButton.disabled = false;
        } catch(err){
            console.error("Score error:", err);
        }
    }

    async resetGame(){
        try {
            const response = await this.ajax("yg_reset");

            if (!response.success) return;

            this.renderDice(response.data.dice, response.data.held);

            // clear all score rows
            document.querySelectorAll(".score-row").forEach(row => {
                row.classList.remove("used");
                row.classList.add("available");
                row.querySelector(".score-value").textContent = "0";
            });

            this.rollsDisplay.textContent = "0 /3";
            this.rollButton.disabled = false;
            this.messages.textContent = "New game started!";
        } catch (err) {
            console.error("Reset error:", err);
            this.messages.textContent = err.message;
        }
    }
}
