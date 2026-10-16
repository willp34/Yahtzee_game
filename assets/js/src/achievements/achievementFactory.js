
    class AchievementFactory {

        static create(definition, progress){
           // console.log("Definition Type: ", definition.type);
            //console.log("Progress ", progress);
            switch(definition.type){
                case "total":
                    return new TargetAchievement(definition,progress);

                case "category":
                    return new CategoryAchievement(definition,progress);
                case "roll":
                       return new RollAchievement(definition,progress);
                case "score":

                case "collection":
                case "cumulative":
                case "streak":
                case "gameOver":
                case "game":

            }
        }
    }
