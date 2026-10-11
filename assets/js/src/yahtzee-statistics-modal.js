
    class Yahtzee_modal {

        constructor(){
            this.messages = document.getElementById('message-dialog');

            //Modal
            this.modal = document.getElementById('rjf-modal');
            this.modalBody = document.getElementById('rjf-job-content');
            this.api = new YahtzeeAPI();

            this.bindEvents();
        }


        bindEvents(){

            //modal panel
            jQuery(document).on('click', '.yg-open-modal', () =>this.statistics_screen());
        }

        async statistics_screen(){
            jQuery("#rjf-form").remove();
            jQuery(this.modalBody).html("Loading !!!!");
            // Open modal
            jQuery(this.modal).addClass('active');

            try{

                const stats = await this.api.request("yg_statistics");
                //this.dice.stopAnimation();


                this.modalBody.innerHTML = stats.body;

                //STATISTICS

                this.YahtzeeStats = new Yahtzee_statistics();
                this.YahtzeeStats.loadStatistics();

            }
            catch(err){
                alert(err);

                this.messages.style.display = "block";
                this.messages.textContent = err;
            }
            finally{

            }
        }
    }
