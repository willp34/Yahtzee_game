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

         this.diceSymbols={
             1: "⚀", 2: "⚁", 3: "⚂",
             4: "⚃", 5: "⚄", 6: "⚅"
         };
         this.rolling = false;
         this.animationTimer = null;
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
            this.updateScorecard({},
                            Yahtzee.score_board.used_scores ||{})

            this.setTotals(Yahtzee);
        })

        document.querySelectorAll(".hold-checkbox").forEach((check) => {
            check.addEventListener("change", () => {
                this.setHeld(check.dataset.die, check.checked)
            });

        });


        document.querySelectorAll(".score-row").forEach((row) => {
            row.addEventListener("click", () => this.selectScore(row))
        });

        }

    renderDice(dice, held) {
        dice.forEach((value, index) => {

            const die = document.getElementById(`die-${index}`);
            const check = document.querySelector(
                `.hold-checkbox[data-die="${index}"]`
            );

            die.textContent = this.diceSymbols[value];
            die.classList.toggle("held", held[index]);
            check.checked = held[index];
        });
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
                const check = document.querySelector(
                    `.hold-checkbox[data-die="${index}"]`
                );
                // Only animate dice that are NOT held
                if (!check.checked) {
                    const random = Math.floor(Math.random() * 6) + 1;
                    die.textContent = this.diceSymbols[random];
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
            document
                .getElementById(`die-${index}`)
                .classList.toggle("held", held);
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
            this.renderDice(response.data.dice, response.data.held);
            this.updateScorecard(
                    response.data.possible_scores,
                    response.data.used_scores
                )
            this.rollsDisplay.textContent = 3 - response.data.rolls+ "/3";
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

            this.rollsDisplay.textContent = 3;
            this.rollButton.disabled = false;
            this.messages.textContent = "New game started!";
        } catch (err) {
            console.error("Reset error:", err);
            this.messages.textContent = err.message;
        }
    }
}
