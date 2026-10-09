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

            ///reset_game

            add_action('wp_ajax_yg_reset', [$this, 'reset_game']);
            add_action('wp_ajax_nopriv_yg_reset', [$this, 'reset_game']);

            //statistics

            add_action('wp_ajax_yg_statistics', [$this, 'yahtzee_statistics']);
            add_action('wp_ajax_nopriv_yg_statistics', [$this, 'yahtzee_statistics']);
        }


        private function check_request(){
            check_ajax_referer('yahtzee', 'nonce');

            if(!session_id()){
                session_start();
            }
        }
        public function reset_game() {
            $this->check_request();

            unset($_SESSION['yahtzee_game']);

            // Create a new game
            $_SESSION['yahtzee_game'] = [
                'dice' => [1,1,1,1,1],
                'held' => [false,false,false,false,false],
                'rolls' => 0,
                'turns' => 0,
                'used_scores' => [],
                'possible_scores' => []
            ];

            wp_send_json_success($_SESSION['yahtzee_game']);
        }

        public function roll()
        {
            $this->check_request();
            $game =  YG_Game::load();

            if (count($_SESSION['yahtzee_game']['used_scores'] ?? []) >= 13) {
                wp_send_json_error([
                    'message' => 'Game Over'
                ]);
            }
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
            $category = sanitize_key($_POST['category']);
            $game =  YG_Game::load();

            if (count($_SESSION['yahtzee_game']['used_scores'] ?? []) >= 13) {
                wp_send_json_error([
                    'message' => 'Game Over'
                ]);
            }
            if(!$game->score_category($category)){
                wp_send_json_error(['message' => 'Category already used.']);
            }

              wp_send_json_success([
                'turns'           => $game->get_turns(),
                'dice'            => $game->get_dice(),
                'held'            => $game->get_held(),
                'rolls'           => $game->get_rolls(),
                'possible_scores' => $game->possible_scores(),
                'used_scores'     => $game->get_scores(),
                'upper_bonus'       => $game->get_bonus(),
                'upper_section' => $game->get_upper_total(),
                'lower_section' => $game->get_lower_total(),
                'grand_total' => $game->get_grand_total(),
                'gameOver' => $game->gameOver()
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



        /*
         * Render statistics
         *
         */
        public function yahtzee_statistics() {

            ob_start();
            // Load template file
            include plugin_dir_path(dirname(__FILE__)) . 'templates/statistics.php';

            $contents = ob_get_clean();
             wp_send_json_success([
                 'body' => $contents,
             ]);
        }
    }
