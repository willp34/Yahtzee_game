document.addEventListener('DOMContentLoaded', function(){


    if (Yahtzee.initLucide && window.lucide) {
        lucide.createIcons();
    }
    new Yahtzee_game();


});


