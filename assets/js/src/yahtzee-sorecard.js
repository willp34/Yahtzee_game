    class YahtzeeScorecard{

        constructor(){

            this.upperBonus = document.getElementById('U-bonus');
            this.upperTotal = document.getElementById('U-total');
            this.lowerTotal = document.getElementById('L-total');
            this.grandTotal = document.getElementById('Grand-total');

            this.bonusFill = document.getElementById('bonus-progress-fill');
            this.bonusText = document.getElementById('bonus-progress-text');
            this.bonusStatus = document.getElementById('bonus-progress-status');
        }
        categoryLabel(key) {

            const labels = {
                ones: "Ones",
                twos: "Twos",
                threes: "Threes",
                fours: "Fours",
                fives: "Fives",
                sixes: "Sixes",
                threeKind: "Three of a Kind",
                fourKind: "Four of a Kind",
                fullHouse: "Full House",
                smallStraight: "Small Straight",
                largeStraight: "Large Straight",
                yahtzee: "Yahtzee",
                chance: "Chance"
            };

            return labels[key] ?? key;
        }

    update(possibleScores,usedCategories ={},onSelect){
        //this.update_table(possibleScores, usedCategories);

        const table = document.getElementById("score-card-body");
        table.innerHTML = "" ;
        // Highest available score
        const availableScores = Object.entries(possibleScores)
        .filter(([key]) => !usedCategories[key])
        .map(([, score]) => score);

        const highest = availableScores.length ? Math.max(...availableScores) : 0;
        let  bestCategories = [];

        Object.entries(possibleScores).forEach(([category, score]) =>{
            const row = document.createElement("tr");
            const name = document.createElement("td");
            const value = document.createElement("td");

            name.textContent = this.categoryLabel(category);
            value.textContent = score;

            if (usedCategories[category]) {
                row.classList.add("score-used");
                value.textContent = usedCategories[category];
                name.innerHTML = `<i data-lucide="lock"></i> ${this.categoryLabel(category)}`;


            } else if (score === highest && score > 0) {
                row.classList.add("score-best");
                bestCategories.push(this.categoryLabel(category));
                name.innerHTML = `<i data-lucide="trophy"></i> ${this.categoryLabel(category)}`;

            } else if (score > 0) {
                row.classList.add("score-available");

                name.innerHTML = `<i data-lucide="check-circle"></i> ${this.categoryLabel(category)}`;

            } else {
                row.classList.add("score-zero");
            }
            // Click to score
            if (!usedCategories[category]) {
                row.dataset.category = category;   // keep the category on the row
                row.addEventListener("click", () => onSelect(row));
            }
            row.append(name, value);
            table.appendChild(row);
        });



        this.showBestMove(bestCategories,highest);
        lucide.createIcons();

    }


        showBestMove(categories, score){
            const banner =document.getElementById("best-move-banner");
            const text = document.getElementById("best-move-text");

            if(score<=0 || categories.length ===0){
                banner.style.display = "none";
                return;
            }
            banner.style.display = "flex";
            text.textContent =`${score} points — ${categories.join(" / ")}`;
        }

        setTotals(data){

            let upperScore = data.upper_section | null;
             // ...existing scoring code...
                    console.log("data: ", data);
            const bonus = upperScore >= 63 ? 35 : 0;
            this.upperBonus.textContent = data.upper_bonus;
            this.upperTotal.textContent = data.upper_section;
            this.lowerTotal.textContent = data.lower_section;
            this.grandTotal.textContent = data.grand_total;
            // Update progress bar
            if(upperScore !=null){
               this.updateBonusProgress(upperScore);
            }

            if(this.isGameOver(data.score_board.used_scores ||data.score_board.used_scores)){
                console.log("GAME OVER POPULATE STATISTICS");
            }

        }

        updateBonusProgress(upperScore){

            const target = 63 ;
            const progress = Math.min(upperScore,target);
            const percent = (progress/target)*100;

            this.bonusFill.style.width = `${percent}%` ;
            this.bonusText.textContent = `${progress} / ${target}`;

            switch (true) {
                case progress >= 63:
                    this.bonusFill.style.background = "#16a34a"; // Green
                    break;

                case progress >= 45:
                    this.bonusFill.style.background = "#84cc16"; // Lime
                    break;

                case progress >= 30:
                    this.bonusFill.style.background = "#f59e0b"; // Amber
                    break;

                default:
                    this.bonusFill.style.background = "#3b82f6"; // Blue
            }


            if(progress >= target){
                this.bonusStatus.textContent = "🎉 Bonus earned! +35 points";
                this.bonusStatus.classList.add("bonus-earned")
            }else{
                 const remaining = target - progress;
                this.bonusStatus.textContent =
                    `${remaining} point${remaining === 1 ? "" : "s"} needed for +35 bonus`;
                this.bonusStatus.classList.remove("bonus-earned");
            }
        }

        reset(){
            document.querySelectorAll(".score-row").forEach(row => {
                row.classList.remove("used");
                row.classList.add("available");
                row.querySelector(".score-value").textContent = "0";
            });
        }
        isGameOver(used){
            return Object.keys(used).length === 13;

        }


    }
