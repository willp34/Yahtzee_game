<?php
    class YG_Ajax{

        public function __construct(){

            //roll
            add_action('wp_ajax_yg_roll',[$this,'roll']);
            add_action('wp_ajax_nopriv_yg_roll',[$this,'roll']);

            //Held
            add_action('wp_ajax_yg_hold',[$this,'hold']);
            add_action('wp_ajax_nopriv_yg_hold',[$this,'hold']);

            //select Scores
            add_action('wp_ajax_yg_score',[$this,'score']);
            add_action('wp_ajax_nopriv_yg_score',[$this,'score']);

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

            $game->roll();
            wp_send_json_success([
                'dice' => $game->get_dice(),
                'held' => $game->get_held(),
                'rolls' => $game->get_rolls(),
                'possible_scores' => $game->possible_scores(),
                'used_scores' => $game->get_scores()
            ]);
        }

        public function score(){

            check_ajax_referer('yahtzee', 'nonce');
            $category = sanitize_key($_POST['held']);
            $game =  YG_Game::load();

            if(!$game->score_category($category)){
                wp_send_json_error(['message' => 'Category already used.']);
            }

              wp_send_json_success([
                'dice'            => $game->get_dice(),
                'held'            => $game->get_held(),
                'rolls'           => $game->get_rolls(),
                'possible_scores' => $game->possible_scores(),
                'used_scores'     => $game->get_scores(),
                'upper_total'     => $game->get_upper_total(),
                'bonus'           => $game->get_bonus(),
                'lower_total'     => $game->get_lower_total(),
                'grand_total'     => $game->get_grand_total()
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
