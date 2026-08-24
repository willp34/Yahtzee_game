document.addEventListener('DOMContentLoaded', yahtzeeInitialise )

function yahtzeeInitialise(){

    const rollButton = document.getElementById('yg-roll');
    const diceContainer = document.getElementById('dice-board');
    const rollsDisplay = document.getElementById('rolls');
    if(!rollButton){return ;}
    alert("init function");

    const diceSymbols={
       1: "⚀",
       2: "⚁",
       3: "⚂",
       4: "⚃",
       5: "⚄",
       6: "⚅"
    };
    let rolling = false;

    jQuery(document).on('click', '#yg-roll',rollDice )

    //Render dice

    function renderDice(dice, held){

        diceContainer.innerHTML = '' ;

        dice.forEach(function(value,index){
            const wrapper = document.createElement('div');
            wrapper.className = 'die-wrapper';
            const die = document.createElement('div');
            die.className = 'die';

            if(held[index]){
                die.classList.add('held');
            }

            die.textContent = diceSymbols[value];
            wrapper.appendChild(die);

            const label = document.createElement('label')
            const checkbox = document.createElement('input');

            checkbox.type = 'checkbox' ;
            checkbox.checked = held[index];
            checkbox.dataset.die = index;

            checkbox.addEventListener('change' , function(event){
                console.log('Changed:', index, event.target.checked);
                setHeld(index,
                        event.target.checked
                        );
            });

            label.appendChild(checkbox);
            label.appendChild(
                document.createTextNode('Hold')
            );

            wrapper.appendChild(label);
            diceContainer.appendChild(wrapper);
        })
    }

    function setHeld(index, held){

        const formData = new FormData();
        formData.append(
            'action',
            'yg_hold'
        );

        formData.append(
            'nonce',
            Yahtzee.nonce
        );

        formData.append(
            'dice',
            index
        );

        formData.append(
            'held',
            held ? '1' : '0'
        );

        fetch(Yahtzee.ajaxUrl, {
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        })
        ,then (response => response.json())
        .then (function(response){
            if(!response.success){
                console.error(
                    response.data?.message
                );
            }
        })
        .catch(function(error){
            console.error(
                'Hold AJAX error: ',
                error
            );
        })
    }

    function rollDice(){

        if(rolling){
            return;
        }
        rolling = true;
        rollButton.disabled = true;
        flickerDice();
        const formData = new FormData();

        formData.append(
            'action',
            'yg_roll'
        );

        formData.append(
            'nonce',
            Yahtzee.nonce
        );
        fetch(Yahtzee.ajax_url,{
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        })
        .then(function(response){

            if(!response.ok){
                throw new Error(
                    'HTTP eror '+ response.status
                )
            }
            return response.json();
        })
        .then( function (response){
          // throw Error

            console.log("Before response");

            if(!response.success){
                throw new Error(
                    response.data?.message ||
                    'Roll failed.'
                )
            }
            renderDice(
                response.data.dice,
                response.data.held
            );
            // No  of Rolls


            if(rollsDisplay){
                rollsDisplay.textContent = response.data.rolls + ' /3';
            }

            //Stop flickering

            stopFlicker();

            if(response.data.rolls <3){
                rollButton.disabled=false;
            }
            rolling =false;

        })
        .catch(function(error){
            console.error(
                    'Yahtzee Ajax error ' ,
                    error
            );
            stopFlicker();
            rollButton.disabled = false;
            rolling = false;
            alert(
                'Unable to roll the dice. ',
                error.message
            );
        })

    }
}

function flickerDice(){
    const dice = document.querySelectorAll(".die");
    dice.forEach( function (die){

        die.classList.add('flicker');
    })
}

function stopFlicker(){
    const dice = document.querySelectorAll(".die");
    dice.forEach( function (die){

        die.classList.remove('flicker');
    })
}
