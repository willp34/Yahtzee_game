    class YahtzeeScorecard{

        constructor(){

            this.upperBonus = document.getElementById('U-bonus');
            this.upperTotal = document.getElementById('U-total');
            this.lowerTotal = document.getElementById('L-total');
            this.grandTotal = document.getElementById('Grand-total');
        }

    update(possible,used){

            document.querySelectorAll('.score-row').forEach(row =>{
                const category = row.dataset.category;
                const scoreCell  = row.querySelector(".score-value");

                row.classList.remove("used", "available");

                if(used.hasOwnProperty(category)){
                    row.classList.add("used");
                    scoreCell.textContent = used[category];
                }else if(possible.hasOwnProperty(category)){
                    row.classList.add("available");
                    scoreCell.textContent = possible[category];
                }
                else{

                    scoreCell.textContent = 0;
                }
            });

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
