
    class TargetAchievement extends Achievement {

       /* constructor(definition){
            this.definition = definition;
        }
*/
        check(data){
            const {stat, target} = this.definition;
            const value = Number(data[stat] ?? 0) ;
            console.log("Target checked")
            if(!Number.isFinite(value))  return false;

            /*this.definition.progress = Math.min(
                Math.Max(0,value),
                Number(target));
    */

            return this.updateProgress(value);
        }
    }
