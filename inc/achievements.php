 <?php

    class Achievements {
        private $achievements =array();
        public function __construct(){


        }

        public function achievementsCollection(){
            $this->achievements = array(
                // ==========================================
                // BRONZE - Beginner achievements
                // ==========================================
                array(
                    "id" => "first_game",
                    "name" => "First Game",
                    "description" => "Complete your first game.",
                    "icon" => "🎮",
                    "type" => "games",
                    "event" => "gameOver",
                    // "condition" => "games_played_gte",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "bronze",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "yahtzee",
                    "name" => "Yahtzee",
                    "description" => "Score your first Yahtzee.",
                    "icon" => "🎲",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "yahtzee_rolled",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "bronze",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "instant_yahtzee",
                    "name" => "Instant Yahtzee",
                    "description" => "Roll a Yahtzee on your first roll.",
                    "icon" => "🍀",
                    "type" => "roll",
                    "event" => "roll",
                    // "condition" => "yahtzee_on_first_roll",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "single_turn",
                    //"unlocked" => false
                ),
                array(
                    "id" => "house_party",
                    "name" => "House Party",
                    "description" => "Score your first Full House.",
                    "icon" => "🏠",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "full-house_scored",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "bronze",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "getting_straight",
                    "name" => "Getting Straight",
                    "description" => "Score your first Small Straight.",
                    "icon" => "📏",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "small-straight_scored",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "bronze",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "straight_shooter",
                    "name" => "Straight Shooter",
                    "description" => "Score your first Large Straight.",
                    "icon" => "🛣️",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "large-straight_scored",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "four_of_a_kind",
                    "name" => "Four of a Kind",
                    "description" => "Score your first Four of a Kind.",
                    "icon" => "🎯",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "four-of-a-kind_scored",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "bronze",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "upper_bonus",
                    "name" => "Upper Bonus",
                    "description" => "Earn the upper-section bonus.",
                    "icon" => "🎓",
                    "type" => "score",
                    "event" => "gameOver",
                    // "condition" => "upper_section_bonus",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),

                // ==========================================
                // SCORE MILESTONES
                // ==========================================
                array(
                    "id" => "club_100",
                    "name" => "100 Club",
                    "description" => "Score 100 or more points in one game.",
                    "icon" => "💯",
                    "type" => "total",
                    "event" => "gameOver",
                    // "condition" => "game_total_gte",
                    "target" => 100,
                    //"progress" => 0,
                    "tier" => "bronze",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "club_200",
                    "name" => "200 Club",
                    "description" => "Score 200 or more points in one game.",
                    "icon" => "🥈",
                    "type" => "total",
                    "event" => "gameOver",
                    // "condition" => "game_total_gte",
                    "target" => 200,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "monster_yahtzee",
                    "name" => "Monster Yahtzee",
                    "description" => "Score 300 or more points in one game.",
                    "icon" => "💪",
                    "type" => "total",
                    "event" => "gameOver",
                    // "condition" => "game_total_gte",
                    "target" => 300,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "high_scorer",
                    "name" => "High Scorer",
                    "description" => "Set a new personal best score.",
                    "icon" => "🏆",
                    "type" => "total",
                    "event" => "gameOver",
                    // "condition" => "personal_best",
                    "target" => 1,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "near_perfection",
                    "name" => "Near Perfection",
                    "description" => "Score 400 or more points in one game.",
                    "icon" => "🌟",
                    "type" => "total",
                    "event" => "gameOver",
                    // "condition" => "game_total_gte",
                    "target" => 400,
                    //"progress" => 0,
                    "tier" => "diamond",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "risk_taker",
                    "name" => "Risk Taker",
                    "description" => "Score 30 or more points in Chance.",
                    "icon" => "🎲",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "chance_score_gte",
                    "target" => 30,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "ace_collector",
                    "name" => "Ace Collector",
                    "description" => "Score 5 points in the Ones category.",
                    "icon" => "🂡",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "ones_score_gte",
                    "target" => 5,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "six_appeal",
                    "name" => "Six Appeal",
                    "description" => "Score 30 points in the Sixes category.",
                    "icon" => "🎯",
                    "type" => "score",
                    "event" => "score",
                    // "condition" => "sixes_score_gte",
                    "target" => 30,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),

                // ==========================================
                // SILVER / GOLD - Category challenges
                // ==========================================
                array(
                    "id" => "house_proud",
                    "name" => "House Proud",
                    "description" => "Score 5 Full Houses across your games.",
                    "icon" => "🏠",
                    "type" => "category",
                    "event" => "category",
                    // "condition" => "full-house_scored",
                    "target" => 5,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "small_straight_master",
                    "name" => "Straight to the Point",
                    "description" => "Score 10 Small Straights.",
                    "icon" => "📐",
                    "type" => "category",
                    "event" => "category",
                    // "condition" => "small-straight_scored",
                    "target" => 10,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "large_straight_master",
                    "name" => "The Long Road",
                    "description" => "Score 10 Large Straights.",
                    "icon" => "🛣️",
                    "type" => "category",
                    "event" => "category",
                    // "condition" => "large-straight_scored",
                    "target" => 10,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "quad_squad",
                    "name" => "Quad Squad",
                    "description" => "Score 15 Four of a Kind combinations.",
                    "icon" => "🎲",
                    "type" => "category",
                    "event" => "category",
                    // "condition" => "four-of-a-kind_scored",
                    "target" => 15,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "yahtzee_collector",
                    "name" => "Yahtzee Collector",
                    "description" => "Roll 5 Yahtzees across your games.",
                    "icon" => "🎰",
                    "type" => "cumulative",
                    "event" => "roll",
                    // "condition" => "yahtzee_rolled",
                    "target" => 5,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "yahtzee_legend",
                    "name" => "Yahtzee Legend",
                    "description" => "Roll 25 Yahtzees across your games.",
                    "icon" => "👑",
                    "type" => "cumulative",
                    "event" => "roll",
                    // "condition" => "yahtzee_rolled",
                    "target" => 25,
                    //"progress" => 0,
                    "tier" => "platinum",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),

                // ==========================================
                // MULTI-YAHTZEE CHALLENGES
                // ==========================================
                array(
                    "id" => "double_trouble",
                    "name" => "Double Trouble",
                    "description" => "Score two Yahtzees in one game.",
                    "icon" => "🎲",
                    "type" => "game",
                    "event" => "gameOver",
                    // "condition" => "yahtzees_in_game_gte",
                    "target" => 2,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "triple_yahtzee",
                    "name" => "Triple Yahtzee",
                    "description" => "Score three Yahtzees in one game.",
                    "icon" => "🎰",
                    "type" => "game",
                    "event" => "gameOver",
                    // "condition" => "yahtzees_in_game_gte",
                    "target" => 3,
                    //"progress" => 0,
                    "tier" => "diamond",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "dice_deity",
                    "name" => "Dice Deity",
                    "description" => "Score five Yahtzees in one game.",
                    "icon" => "🔱",
                    "type" => "game",
                    "event" => "gameOver",
                    // "condition" => "yahtzees_in_game_gte",
                    "target" => 5,
                    //"progress" => 0,
                    "tier" => "legendary",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),

                // ==========================================
                // GAME COMPLETION CHALLENGES
                // ==========================================
                array(
                    "id" => "full_scorecard",
                    "name" => "No Empty Boxes",
                    "description" => "Complete all 13 scoring categories.",
                    "icon" => "📋",
                    "type" => "game",
                    "event" => "gameOver",
                    // "condition" => "all_categories_filled",
                    "target" => 13,
                    //"progress" => 0,
                    "tier" => "bronze",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "no_zero_hero",
                    "name" => "Zero to None",
                    "description" => "Finish a game without scoring zero in any category.",
                    "icon" => "🛡️",
                    "type" => "game",
                    "event" => "gameOver",
                    // "condition" => "zero_categories_eq",
                    "target" => 0,
                    //"progress" => 0,
                    "tier" => "diamond",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),
                array(
                    "id" => "all_rounder",
                    "name" => "All-Rounder",
                    "description" => "Score at least 20 points in every eligible category.",
                    "icon" => "🌈",
                    "type" => "game",
                    "event" => "gameOver",
                    // "condition" => "eligible_categories_gte",
                    "target" => 20,
                    //"progress" => 0,
                    "tier" => "platinum",
                    "scope" => "single_game",
                    //"unlocked" => false
                ),

                // ==========================================
                // STREAK ACHIEVEMENTS
                // ==========================================
                array(
                    "id" => "hot_streak",
                    "name" => "Hot Streak",
                    "description" => "Finish 3 consecutive games with 250+ points.",
                    "icon" => "🔥",
                    "type" => "gameOver",
                    "event" => "gameOver",
                    // "condition" => "consecutive_games_gte",
                    "target" => 3,
                    //"progress" => 0,
                    "tier" => "platinum",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "unstoppable",
                    "name" => "Unstoppable",
                    "description" => "Finish 5 consecutive games with 300+ points.",
                    "icon" => "⚡",
                    "type" => "streak",
                    "event" => "gameOver",
                    // "condition" => "consecutive_games_gte",
                    "target" => 5,
                    //"progress" => 0,
                    "tier" => "diamond",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),

                // ==========================================
                // LIFETIME STATISTICS
                // ==========================================
                array(
                    "id" => "dedicated_player",
                    "name" => "Dedicated Player",
                    "description" => "Complete 50 games.",
                    "icon" => "🎮",
                    "type" => "cumulative",
                    "event" => "gameOver",
                    // "condition" => "games_played_gte",
                    "target" => 50,
                    //"progress" => 0,
                    "tier" => "silver",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "yahtzee_veteran",
                    "name" => "Yahtzee Veteran",
                    "description" => "Complete 250 games.",
                    "icon" => "🎖️",
                    "type" => "cumulative",
                    "event" => "gameOver",
                    // "condition" => "games_played_gte",
                    "target" => 250,
                    //"progress" => 0,
                    "tier" => "platinum",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "score_machine",
                    "name" => "Score Machine",
                    "description" => "Earn 10,000 total points across all games.",
                    "icon" => "🧮",
                    "type" => "cumulative",
                    "event" => "gameOver",
                    // "condition" => "lifetime_points_gte",
                    "target" => 10000,
                    //"progress" => 0,
                    "tier" => "gold",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "legendary_score",
                    "name" => "Legendary Score",
                    "description" => "Earn 100,000 total points across all games.",
                    "icon" => "💎",
                    "type" => "cumulative",
                    "event" => "gameOver",
                    // "condition" => "lifetime_points_gte",
                    "target" => 100000,
                    //"progress" => 0,
                    "tier" => "diamond",
                    "scope" => "lifetime",
                    //"unlocked" => false
                ),
                array(
                    "id" => "category_collector",
                    "name" => "Category Collector",
                    "description" => "Score every category at least 10 times.",
                    "icon" => "🗂️",
                    "type" => "collection",
                    "event" => "category",
                    // "condition" => "every_category_count_gte",
                    "target" => 10,
                    //"progress" => 0,
                    "tier" => "platinum",
                    "scope" => "lifetime",
                    //"unlocked" => false
                )
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
            update_post_meta($post_id, 'achievement_id', $achievement['id']);
            update_post_meta($post_id,'type',$achievement["type"]);
            update_post_meta($post_id,'event',$achievement['event']);
            update_post_meta($post_id,'target',$achievement['target']);
            update_post_meta($post_id,'icon',$achievement['icon']);
            update_post_meta($post_id,'tier',$achievement['tier']);
            update_post_meta($post_id,'scope',$achievement['scope']);

        }

        public function getAchievements(){
            $posts = get_posts([
                'post_type' => 'achievement',
                'posts_per_page' => -1,
                //'numberposts' => 10
            ]);

            if(empty($posts)){
                return  null ;//"<p>No jobs found.</p>";

            }
            $achievements =[];

            foreach($posts as $post){
                $achievements["achievementDefinitions"][$post->post_name] = [
                    'id'          => (int) $post->ID,
                    'slug'        => $post->post_name,
                    'name'        => $post->post_title,
                    'description' => wp_strip_all_tags($post->post_content),
                    'type'        => get_post_meta($post->ID, 'type', true),
                    'target'      => (int) get_post_meta($post->ID, 'target', true),
                    'event'     => get_post_meta($post->ID, 'event', true)
                ];
                $achievements["achievementProgress"][$post->post_name] = [
                    "unlocked" => true,
                    "progress" => 0
                ] ;
            }

            $this->achievements = $achievements;
            return $this->achievements;

        }

    }
