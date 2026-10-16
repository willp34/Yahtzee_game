
    class Achievement {
        constructor(achievement_definition, achievement_progress= {}){
            this.definition = achievement_definition;

            this.progress = achievement_progress.progress ?? 0;
            this.unlocked = achievement_progress.unlocked ?? false ;


        }

        updateProgress(value){
            if(this.unlocked){return false; }

            this.progress =Math.min(
                value,
                this.definition.target
            ) ;

            if(this.progress>= this.definition.target){
                this.unlocked = true;
                return this.unlocked;
            }
            return false;
        }
        getProgress() {
            return {
                id: this.definition.id,
                progress: this.progress,
                target: this.definition.target,
                unlocked: this.unlocked
            };
        }
    }
