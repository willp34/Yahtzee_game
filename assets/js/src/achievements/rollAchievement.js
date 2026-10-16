
    class RollAchievement extends Achievement  {

/*        constructor(definition){
            this.definition = definition;
        }
*/
        check(data){
            const condition = this.definition;
            console.log("condition " ,condition);
            switch(condition.slug){
                case "instant-yahtzee":
                    console.log("Test" , data.rolls, "  ", data.possible_scores.yahtzee)

                    if(
                        Number(data.rolls) === 1 &&
                        Number(data.possible_scores?.yahtzee) ==50
                    ){
                        const value = 1;
                        return this.updateProgress(value);
                    }
            }
            return false;
        }
    }
