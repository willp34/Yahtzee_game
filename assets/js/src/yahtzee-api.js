// Server communication
    class YahtzeeAPI {

        async request(action, data=[]){
            const formData = new FormData();
            formData.append('action',action);
            formData.append('nonce',Yahtzee.nonce);

            Object.entries(data).forEach(([key,value]) => {
                formData.append(key,value);
            })
            const response = await fetch(Yahtzee.ajax_url,{
                method: 'POST',
                credentials: 'same-origin',
                body: formData
            })
            if(!response.ok){
                throw new Error(`HTTP ${response.status}`); ;
            }
            return response.json();
        }

        roll(){
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
    }
