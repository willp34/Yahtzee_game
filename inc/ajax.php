<?php
    class YG_Ajax{

        public function __construct(){

            //roll
            add_action('wp_ajax_yg_roll',[$this,'roll']);
            add_action('wp_ajax_nopriv_yg_roll',[$this,'roll']);
        }


        private function check_request(){
            check_ajax_referer('yahtzee', 'nonce');

            if(!session_id()){
                session_start();
            }
        }
        public function roll()
        {
            $this->check_request();

            $game =  YG_Game::load();

            if($game->get_rolls() >=3){
                wp_send_json_error([
                    'message' => 'You have used all three rolls.'
                ]);
            }

            $dice = $game->roll();
            wp_send_json_success([
                'dice' => $dice,
                'held' => $game->get_held(),
                'rolls' => $game->get_rolls()
            ]);
        }

        public function hold(){
            $this->check_request();

            $die = isset($_POST['die'])
            ? absint($_POST['die'])
            : -1;

            $held = isset($_POST['held'])
            ? (bool) absint($_POST['held'])
            : false;

            if($die <0 || $die >4){
                wp_send_json_error([
                'message' => 'Invalid die.'
                ]);
            }

            $game =  YG_Game::load();

            $game->set_held($die, $held);
            //$game->save()
            wp_send_json_success([
                'held' => $game->get_held(),
                ]);
        }
    }
