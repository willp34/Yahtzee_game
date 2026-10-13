    class Yahtzee_achievements {
        constructor(){
            this.api = new YahtzeeAPI();

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

        async load(){
            try{

                const achievementsData = await this.api.request("yg_achievements");


                const saved = achievementsData.achievements ?? {};

                Object.keys(this.achievements).forEach(id => {
                    if (saved[id]) {
                        this.achievements[id].unlocked =
                        Boolean(saved[id].unlocked);
                    }
                });
            } catch (error) {
                console.error('Unable to load achievements:', error);
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
            const possibleScores = data.possible_scores ?? {};

            if(data.rolls ==1 &&
                Number(possibleScores.yahtzee) ==50){
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
