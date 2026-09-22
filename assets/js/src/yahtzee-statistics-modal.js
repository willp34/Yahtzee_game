
    class Yahtzee_modal {

        constructor(){
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

                const response = await this.api.statistics();
                //this.dice.stopAnimation();

                if(!response.success){
                    throw new Error(response.data.message);
                }
                this.modalBody.innerHTML = response.data.body


            }
            catch(err){
                alert(err)
                this.messages.textContent = err;
            }
            finally{

            }
        }
    }
