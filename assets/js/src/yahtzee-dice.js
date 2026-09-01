//Dice Implementation
    class YahtzeeDice{
        constructor(container){
            this.container = container;
            this.timer = null;
            this.dice=[];
            this.held=[false,false,false,false,false];
            this.clickHandler = null

        }
        setState(dice, held){
            this.dice = [...dice];
            this.held= [...held];
            this.render(this.clickHandler);
        }

        render(onClick =this.clickHandler) {

            this.container.innerHTML ='';
            this.clickHandler = onClick;
            this.dice.forEach((value, index) => {

                const wrapper = document.createElement('div');
                wrapper.className = 'die-wrapper';

                const die = document.createElement('div');
                die.className= 'die';

                if(this.held[index]){
                    die.classList.add('held');
                }

                this.drawFace(die,value)
                wrapper.appendChild(die);
                if(onClick){
                    wrapper.addEventListener('click', () => onClick(index)  )
                }

                this.container.appendChild(wrapper);
            });
        }

        drawFace(die ,value){

            const Positions = {
                1: [5],
                2: [1, 9],
                3: [1, 5, 9],
                4: [1, 3, 7, 9],
                5: [1, 3, 5, 7, 9],
                6: [1, 3, 4, 6, 7, 9]
            };
            die.innerHTML ='';

            // create 9 grid cells
            for(let i=1; i<=9 ; i++){

                const cell = document.createElement('div');
                cell.className='pip-cell';

                if(Positions[value].includes(i)){
                    const pip = document.createElement('div');
                    pip.className = 'pip';
                    cell.appendChild(pip);
                }
                die.appendChild(cell);
            }
        }

        toggleHold(index){

            this.held[index] = !this.held[index];
            const die = this.container.querySelectorAll(".die")[index];
            die.classList.toggle("held", this.held[index]);

            return this.held[index];
            //this.setHeld(index,held);
        }

        startAnimation() {
            this.timer = setInterval(() => {

                document.querySelectorAll(".die").forEach((die, index) => {

                    // Only animate dice that are NOT held
                    if (!this.held[index]) {
                        const random = Math.floor(Math.random() * 6) + 1;
                        this.dice[index] = random
                        this.drawFace(die,random);
                        die.classList.add("rolling");
                    }
                });
            }, 75);
        }

        stopAnimation() {
            clearInterval(this.timer);
            document.querySelectorAll(".die").forEach((die) => {
                die.classList.remove("rolling");
            });
        }

    }
