 <?php

    class Achievements {
        private $achievements =array();
        public function __construct(){


        }

        private function achievementsCollection(){

            $this->achievements = array(
                array(
                    "name" => "First Game",
                    "description" => "Complete your first game",
                    "type" => "games",
                    "target" => 1
                ),
                array(
                    "name" => "Yahtzee",
                    "description" => "Score a Yahtzee",
                    "type" => "Score",
                    "target" => 1
                ),
                array(
                    "name" => "Upper Bonus",
                    "description" => "Get the upper bonus",
                    "type" => "score",
                    "target" => 1
                ),
                array(
                    "name" => "100 club",
                    "description" => "Score 100+",
                    "type" => "total",
                    "target" => 100
                ),
                array(
                    "name" => "200 club",
                    "description" => "Score 200+",
                    "type" => "total",
                    "target" => 200
                ),
            );
            //print_r($this->achievements);
            foreach($this->achievements as $achievement){
                $this->createAchievements($achievement);
            }
        }

        private function createAchievements($achievement){

            $post_id =wp_insert_post([

                'post_title' => sanitize_text_field( $achievement['name']),
                'post_content' => $achievement['description'],
                'post_type' => 'achievement',
                'post_status' => 'publish',
            ],true);

            // 🔴 Handle insert failure
            if (is_wp_error($post_id)) {
                throw new Exception('Achievement insert failed: ' . $post_id->get_error_message());
            }
            if (!$post_id) {
                throw new Exception('Achievement insert failed: invalid post ID (0)');
            }

            update_post_meta($post_id,'type',$achievement["type"]);
            update_post_meta($post_id,'target',$achievement['target']);

        }

        public function getAchievements(){
            $posts = get_posts([
                'post_type' => 'achievement',
                //'numberposts' => 10
            ]);

            if(empty($posts)){
                return  null ;//"<p>No jobs found.</p>";

            }
            $achievements =[];

            foreach($posts as $post){
                $achievements[] = [
                    'id'          => (int) $post->ID,
                    'slug'        => $post->post_name,
                    'name'        => $post->post_title,
                    'description' => wp_strip_all_tags($post->post_content),
                    'type'        => get_post_meta($post->ID, 'type', true),
                    'target'      => (int) get_post_meta($post->ID, 'target', true),
                ];
            }

            $this->achievements = $achievements;
            return $this->achievements;

        }

    }
