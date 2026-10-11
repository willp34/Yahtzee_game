// Server communication
    class YahtzeeAPI {


        constructor(){
              // Use the URL and nonce provided by wp_localize_script()
            this.ajaxURL= Yahtzee.ajax_url;
            this.nonce =Yahtzee.nonce;
        }
        async request(action, data={}){

            const formData = new FormData();
            formData.append('action',action);
            formData.append('nonce',this.nonce);

            Object.entries(data).forEach(([key,value]) => {
                formData.append(
                    key,
                    typeof value === 'object' && value !== null
                    ? JSON.stringify(value)
                    : value);
            })
            const response = await fetch(this.ajaxURL,{
                method: 'POST',
                credentials: 'same-origin',
                body: formData
            })
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();


            if (!result.success) {
                throw new Error(
                    result.data?.message || 'AJAX request failed'
                );

            }
            return result.data;
        }
    }
     /*   roll(){
            return this.request('yg_roll');
        }

        hold(index, held){
            return this.request('yg_hold',{
                die:index,
                held: held ? '1' : '0'
            });
        }

        score(category){
            return this.request("yg_score",{ category : category })
        }

        reset(){
            return this.request("yg_reset");
        }

        statistics(){

            return this.request("yg_statistics");
        }

        achievements(){
            return this.request("yg_achievements");
        }
    }
*/
