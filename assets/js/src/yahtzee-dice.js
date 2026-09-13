//Dice Implementation
    class YahtzeeDice{
        constructor(container){
            this.container = container;
            this.timer = null;
            this.dice=[];
            this.held=[false,false,false,false,false];
            this.clickHandler = null;

            // Rolling sound
            this.rollSound = new Audio("sounds/dice-roll.mp3");
            this.rollSound.volume = 0.4;

        }
        setState(dice, held){
            this.dice = [...dice];
            this.held= [...held];
            this.render(this.clickHandler);
        }

        render(onClick =this.clickHandler, rolling=false) {

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
                if (rolling && !this.held[index]) die.classList.add("rolling");

                this.drawFace(die,value)
                wrapper.appendChild(die);
                if(onClick){
                    wrapper.addEventListener('click', () => onClick(index)  )
                }

                this.container.appendChild(wrapper);
            });
        }
        animateRoll(finalDice, onFinish){

            clearInterval(this.timer);
            //Small vibration on mobile
            if(navigator.vibrate) navigator.vibrate(20);
            // play rolling sound
            this.rollSound.currentTime = 0;
            this.rollSound.play().catch(() =>{});
            const currentDice = [...this.dice];

            const rollingDice = this.held
                .map((held,i) => held ? null :i)
                .filter(i => i !== null );
            // Random stop order feels more realistic
            rollingDice.sort(() => Math.Random() - 0.5);
            // Rapidly change values while rolling
            this.timer = setInterval(() => {
                rollingDice.forEach(index =>{
                   currentDice[index] = Math.floor(Math.Random()*6)+1;
                });
                this.dice = [...currentDice];
                this.render(null,true);
            },55);

            // Stop each die one by one

            rollingDice.forEach((index,order) =>{
                setTimeout(() => {
                    currentDice[index] = finalDice[index];
                    this.dice =[...currentDice];
                    this.render(onClick = this.clickHandler);
                    const die = this.container.children[index].querySelector(".die");
                    die.classList.add("land");

                    setTimeout(() => {
                        die.classList.remove("land");
                    }, 350);

                    // Last die stops
                    if(order === rollingDice.length -1){
                        clearInterval(this.timer);
                        setTimeout(() => {
                            this.dice =[...finalDice];
                            this.render(this.clickHandler);
                            onFinish?.();
                        },60);
                    }
                },650 +order * 120 );
            });
            if(rollingDice.length ===0){
                onFinish?.();
            }
        }
const Positions = {
                1: [5],
                2: [1, 9],
                3: [1, 5, 9],
                4: [1, 3, 7, 9],
                5: [1, 3, 5, 7, 9],
                6: [1, 3, 4, 6, 7, 9]
            };
        drawFace(die ,value){

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
