    class Yahtzee_achievements {
        constructor(){
            this.achievements ={
                luckGame: {
                    name : 'Lucky Game' ,
                    description:'Yahtzee on first roll.' ,
                    unlocked : false
                },
                hotStreak:{
                    name: 'Lucky Roll' ,
                    description :'3 games over 250',
                    unlocked : false
                } ,
                perfectionist :{
                    name :'Perfectionist',
                    description: 'Upper bonus achieved',
                    unlocked: false
                },
                riskTaker :{
                    name: 'Risk Taker',
                    description: 'Score Chance with 30+ points' ,
                    unlocked: false
                },
                century: {
                    name: '100 Club',
                    description: 'Finish a game with 100 or more points',
                    unlocked: false
                },

                doubleCentury: {
                    name: '200 Club',
                    description: 'Finish a game with 200 or more points',
                    unlocked: false
                },
                monsterYahtzee :{
                    name :'Monster Yahtzee',
                    description :'Score 300+ total',
                    unlocked: false
                }

            };

            this.load();
        }

        unlock(id){
            if(!this.achievements[id]){
                return ;
            }
            if(this.achievements[id].unlocked){
                return ;
            }
            this.achievements[id].unlocked = true;
            this.save();
            this.show(id);
        }

        save(){
            localStorage.setItem(
                'yahtzee_achievements',
                JSON.stringify(this.achievements)
            );
        }

        load(){
            try{
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
            }
        }
        checkAchievements(event,data){
            switch(event){
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
            }
        }

        //validate Achievements
        checkScoreAchievements(data){

        }

        checkRollAchievements(data){

        }
        checkCategoryAchievements(data){
            // Risk taker
            // Score Chance with 30+ points
            if(
                category =='chance' &&
                data.possible_scores.chance >=30){
                    this.unlock("riskTaker");
            }
        }
        checkGameAchievements(data){
            //Perfectionist
            //upper bonus achieved
            if(data.upper_bonus ==35){
                this.unlock("perfectionist");
            }

            //100 club
            // Finish a game withh 100+
            if(data.grand_total >=100){
                this.unlock("century");
            }

            //200 club
            // Finish a game withh 200+
            if( data.grand_total >=200){
                this.unlock("doubleCentury");
            }

            // Monster Yahtzee
            // Score 300+
            if( data.grand_total >=300){
                this.unlock("monsterYahtzee");
            }
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
