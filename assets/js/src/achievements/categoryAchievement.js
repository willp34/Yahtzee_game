
    class CategoryAchievement extends Achievement  {

        /* constructor(definition){
            this.definition = definition;
        }
*/
        check(data){
            const scores = data.used_scores ?? {} ;
            const {category, target} = this.definition;

            if( !Object.hasOwn(scores, category)) return false;

            const value = Number(scores[category]) ;

            this.definition.progress = Math.min(
                Math.max(0, value),
                Number(target)
            );

            return value >= Number(target);

        }
    }
