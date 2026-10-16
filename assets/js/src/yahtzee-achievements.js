    class Yahtzee_achievements {

        constructor(definitions){
            this.achievements = definitions;
            this.checkers = {};
            //console.log("Achievements ", definitions);
            this.load();
            const savedProgress = this.achievements;
            //console.log("SAVED " ,savedProgress);
            for(const [id,definition] of Object.entries(definitions.achievementDefinitions)){
                //console.log("award  ", definition);
                const gameProgress =savedProgress.achievementProgress[id];

              //  console.log("progress object ", gameProgress);
                this.checkers[id]  = AchievementFactory.create(definition,
                                                               gameProgress);
            }

            console.log("Achievements Object: ", this.checkers);
/*
            this.load();
            */
        }

        unlock(id){
            const achievement = this.achievements[id];

            if(!achievement  || achievement.unlocked) return ;

            achievement.unlocked = true;
            this.save();
            this.show(id);
        }

        save(){
            localStorage.setItem(
                'achievementProgress',
                JSON.stringify(this.achievements)
            );
        }

        load(){
            try {
                const progress = JSON.parse(
                    localStorage.getItem('achievementDefinitions').achievementProgress || '{}'
                );

                for (const [id, achievement] of Object.entries(this.achievements.achievementProgress)) {
                    achievement.unlocked = Boolean(progress[id]?.unlocked);
                }
            } catch (error) {
                console.error('Unable to load achievement progress:', error);
            }
            /*try{
                const saved = localStorage.getItem('yahtzee_achievements');
                if (!saved) {
                    return;
                    }

                const data = JSON.parse(saved);
                Object.keys(data).forEach(id => {
                    if(this.achievements[id]){
                        this.achievements[id].unlocked = data[id].unlocked;
                    }
                });
            }catch(error){
                console.error(
                    'Unable to load achievement',
                    error
                );
            }*/
        }
        checkAchievements(event, data){
               console.log("Checker count:", Object.keys(this.checkers).length);
            for(const [id, checker] of Object.entries(this.checkers)){
               //

                if(checker){



                    const definition =this.achievements.achievementDefinitions[id];
                    const progress = this.achievements.achievementProgress[id];


                    if(definition.event !== event){
                        continue;
                    }

                    if(!progress || progress.unlocked){
                        continue;
                    }
                    //console.log("check Event ");
                    //console.log("checker Object  ", checker);
                    //console.log("Event ", event," evv ",checker.definition.event);
                    console.log("definition " , id,  "  :  ",checker.check(data));

                    if(checker.check(data)){

                        console.log("Event can be unlocked ", event," evv ",checker.definition.target);
                    }

                }

                //if(definition.event !== event) continue ;

               // console.log("Unlock ", unlocked);
               // if(unlocked) continue;



                /*if(checker.check(data)){
                    this.unlock(id);
                }*/
            }
            /* switch(event){
                case 'score':
                    this.checkScoreAchievements(data);
                    break;
                case 'category':
                    this.checkCategoryAchievements(data);
                    break;
                case 'roll':
                    this.checkRollAchievements(data);
                    break;
                case 'gameOver':
                    this.checkGameAchievements(data);
                    break;
            } */
        }

        //validate Achievements
        checkScoreAchievements(data){

        }

        checkRollAchievements(data){
            const possibleScores = data.possible_scores ?? {};

            if(data.rolls ==1 &&
                Number(data.possibleScores.yahtzee) ==50){
                    this.unlock("luckGame");
                }

        }
        checkCategoryAchievements(data){
            // Risk taker
            // Score Chance with 30+ points
            const usedScores = data.used_scores ?? {};

            if(
                Object.hasOwn(usedScores, 'chance') &&
                 Number(usedScores.chance) >=30){
                    this.unlock("riskTaker");
            }
        }
        checkGameAchievements(data){
            const total =Number(data.grand_total ?? 0);
            const upperBonus = Number(data.upper_bonus ?? 0) ;
            //Perfectionist
            //upper bonus achieved
            if(upperBonus >=35){
                this.unlock("perfectionist");
            }

            //100 club
            // Finish a game withh 100+
            if(total >=100) this.unlock("century");


            //200 club
            // Finish a game withh 200+
            if( total >=200) this.unlock("doubleCentury");


            // Monster Yahtzee
            // Score 300+
            if( total >=300) this.unlock("monsterYahtzee");

        }

        show(id){
            const achievement = this.achievements[id];
            if(!achievement){
                return;
            }
             console.log(
                `Achievement unlocked: ${achievement.name}`
            );
        }
    }
