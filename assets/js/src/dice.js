 class YahtzeeGame
 {
     constructor(){
         this.rollButton = document.getElementById('yg-roll');
         this.diceContainer = document.getElementById('dice-board');
         this.rollsDisplay = document.getElementById('rolls');
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
            const scoreCell  = row.querySelector("score-value");

            if(usedScores.hasOwnProperty(category)){
                row.classList.add("used");
                scoreCell.textContent = usedScores[category];
            }else{
                row.classList.add("available");
                scoreCell.textContent = possibleScore[category];
            }
        });
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
            throw new Error('HTTP ${response.status} ') ;
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
                .getElementById(`die-${this.dataset.die}`)
                .classList.toggle("held", this.checked);
        }
        catch(err){
            console.error('Hold AJAX error: ',error);
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
            this.rollsDisplay.textContent = 3 - response.data.rolls;
            this.rollButton.disabled = response.data.rolls <3
        }
        catch(err){

            this.stopAnimation();
            this.rollButton.disabled = false;
            alert('Unable to roll the dice. '+ err);
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
            this.rollsDisplay.textContent = 3 ;
            this.rollButton.disabled = false;
        } catch(err){
            console.error("Score error:", err);
        }
    }

}
