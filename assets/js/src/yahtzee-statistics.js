

    class Yahtzee_statistics
    {

        constructor(){
            this.gamesPlayed = document.getElementById('gamesPlayed');
            this.bestScore = document.getElementById('bestScore');
            this.averageScore = document.getElementById('averageScore');
            this.bonusPercent = document.getElementById('bonusPercent');


            this.bonusBar = document.getElementById('bonusBar');
            this.scoreHistory = document.getElementById('scoreHistory');
        }

        saveStatistics(finalScore, scoreCard,diceStats, earnedUpperBonus){

            const game_stats = JSON.parse(localStorage.getItem("yahtzeeStats")) ||
            {
                gamesPlayed : 0,
                bestScore: 0,
                totalScore: 0,
                upperBonus: 0,
                scoreHistory: [],
                categoryTotals:{},
                diceStats: {
                    totalRolls: 0,
                    yahtzees: 0,
                    fullHouses: 0,
                    smallStraights: 0,
                    largeStraights: 0
                }
            };

            game_stats.gamesPlayed++;
            game_stats.totalScore+= finalScore;
            game_stats.bestScore = Math.max(game_stats.bestScore, finalScore) ;

            if(earnedUpperBonus){
                game_stats.upperBonus++;
            }

            // Keep last 10 Games Played
            game_stats.scoreHistory.push(finalScore);
            if(game_stats.scoreHistory.length >10){
                game_stats.scoreHistory.shift();
            }
            // Add Category Totals
            Object.entries(scoreCard).forEach(([category, score]) =>{
                    game_stats.categoryTotals[category] =
                                      (game_stats.categoryTotals[category]|| 0)+ score ;
            })
            game_stats.diceStats = game_stats.diceStats || {
                        totalRolls: 0,
                        yahtzees: 0,
                        fullHouses: 0,
                        smallStraights: 0,
                        largeStraights: 0
                    };

            game_stats.diceStats.totalRolls += diceStats.totalRolls;
            game_stats.diceStats.yahtzees += diceStats.yahtzees;
            game_stats.diceStats.fullHouses += diceStats.fullHouses;
            game_stats.diceStats.smallStraights += diceStats.smallStraights;
            game_stats.diceStats.largeStraights += diceStats.largeStraights;
            localStorage.setItem("yahtzeeStats" , JSON.stringify(game_stats));
        }
        loadStatistics(){

            const game_stats = JSON.parse(localStorage.getItem("yahtzeeStats")) ||
                {
                gamesPlayed : 0,
                bestScore: 0,
                totalScore: 0,
                upperBonus: 0,
                scoreHistory: []
                };
            const average = game_stats.gamesPlayed
                    ? Math.round( game_stats.totalScore/ game_stats.gamesPlayed)
                    : 0;
            const bonus = game_stats.gamesPlayed
                ? Math.round( (game_stats.upperBonus/ game_stats.gamesPlayed)*100)
                : 0;

            this.gamesPlayed.textContent = game_stats.gamesPlayed;
            this.bestScore.textContent = game_stats.bestScore;
            this.averageScore.textContent = average;
            this.bonusPercent.textContent = bonus + "%";
            this.bonusPercent.style.width = bonus + "%";

            this.scoreHistory.innerHTML ="";
            game_stats.scoreHistory.slice(-5).reverse().forEach(score =>{
                this.scoreHistory.innerHTML +=
                    `<div class="score-pill">${score} </div>` ;
            })

        }
    }
