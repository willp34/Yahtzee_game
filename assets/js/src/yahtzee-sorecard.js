    class YahtzeeScorecard{

        constructor(){

            this.upperBonus = document.getElementById('U-bonus');
            this.upperTotal = document.getElementById('U-total');
            this.lowerTotal = document.getElementById('L-total');
            this.grandTotal = document.getElementById('Grand-total');
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
const categories = [
        "ones","twos","threes","fours","fives","sixes",
        "three_kind","four_kind","full_house",
        "small_straight","large_straight","yahtzee","chance"
    ];
        const table = document.getElementById("score-card-body");
        table.innerHTML = "" ;
        // Highest available score
            const highest = Math.max(
                0 ,
                ...Object.entries(possibleScores)
                    .filter(([key]) => !usedCategories[key])
                    .map(([, score]) => score)
            );
            let  bestCategories = [];
            categories.forEach(category =>{
                const row = document.createElement("tr");
                row.dataset.category = category;

                const name = document.createElement("td");
                const value = document.createElement("td");

           //     name.textContent = this.categoryLabel(category);


                if (category in usedCategories) {
                    row.classList.add("score-used");
                    value.textContent = usedCategories[category];
                    name.innerHTML = `<i data-lucide="lock"></i> ${this.categoryLabel(category)}`;

                } else {
                    const score = possibleScores[category] ?? 0;
                    value.textContent = score;

                    if (score === highest && score > 0) {
                        name.innerHTML = `<i data-lucide="trophy"></i> ${this.categoryLabel(category)}`;
                        row.classList.add("score-best");
                        bestCategories.push(this.categoryLabel(category));
                        row.addEventListener("click", ()=>onSelect(row));
                    } else if (score > 0) {
                        name.innerHTML = `<i data-lucide="check-circle"></i> ${this.categoryLabel(category)}`;
                        row.classList.add("score-available");
                        row.addEventListener("click", ()=>onSelect(row));
                    } else {
                        name.innerHTML = `<i data-lucide="circle"></i> ${this.categoryLabel(category)}`;
                        row.classList.add("score-zero");
                    }
                }

                // Click to score
               /* if (!usedCategories[category]) {
                    row.addEventListener("click", () => {
                        this.selectScore(category);
                    });
                }*/
                row.append(name, value);
                table.appendChild(row);
            });

            /* old style
            document.querySelectorAll('.score-row').forEach(row =>{
                const category = row.dataset.category;
                const scoreCell  = row.querySelector(".score-value");

                row.classList.remove("used", "available", "zero");

                if(used.hasOwnProperty(category)){
                    row.classList.add("used");
                    scoreCell.textContent = used[category];
                }else if(possible.hasOwnProperty(category)){
                    row.classList.add("available");
                    scoreCell.textContent = possible[category];
                }
                else{
                    row.classList.add("zero");
                    scoreCell.textContent = 0;
                }
            });
*/
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

            this.upperBonus.textContent = data.upper_bonus;
            this.upperTotal.textContent = data.upper_section;
            this.lowerTotal.textContent = data.lower_section;
            this.grandTotal.textContent = data.grand_total;

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
