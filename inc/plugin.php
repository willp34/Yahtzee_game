<?php
class YG_Plugin
{
    private static $instance;

    public static function instance()
    {
        return self::$instance ??= new self();
    }

    private function __construct()
    {
        //require_once YG_PATH.'includes/class-assets.php';
       // require_once YG_PATH.'includes/class-shortcode.php';
        require_once YG_PATH.'inc/achievements.php';
        require_once YG_PATH.'inc/ajax.php';
        require_once YG_PATH.'inc/game.php';
        require_once YG_PATH.'inc/score-card.php';

        // Activate plug-in
        add_action('init',[$this, 'register_achievements_cpt']);
        add_action('wp_enqueue_scripts', [$this,'enqueue']);
        add_shortcode('yahtzee', [$this,'render_shortcode']);


       // new YG_Shortcode();

        new YG_Ajax();


    }
    /** * Register the achievement custom post type. */
    public function register_achievements_cpt() {

        register_post_type('achievement', [
            'labels' => [
                'name' => 'Achievements',
                'singular_name' => 'Achievement'
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'achievements'],
            'supports' => ['title' , 'editor', 'custom-fields'],
        ]);
        //new Achievements();
    }

    public function render_shortcode()
    {
        ob_start();

//        session_start();
        $rolls = $_SESSION['yahtzee_game']['rolls'] ?? 0;
        $turns = $_SESSION['yahtzee_game']['turns'] ?? 0;

        include YG_PATH.'templates/game.php';

        return ob_get_clean();
    }
    public function enqueue()
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }
        wp_enqueue_script(
            'lucide',
            'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js',
            ['jquery'],
            '1.46.0',
            true
        );
        wp_enqueue_style(
            'yahtzee',
            YG_URL.'assets/css/game.css',
            [],
            '1.0'
        );

        wp_enqueue_style(
            'yahtzee_design',
            YG_URL.'assets/css/yahtzee-game.css',
            [],
            '1.0'
        );

        wp_enqueue_style(
            'yahtzee_statistics',
            YG_URL.'assets/css/yahtzee-statistics.css',
            [],
            '1.0'
        );
        wp_enqueue_script(
            'yahtzee_game',
            YG_URL.'assets/js/src/yahtzee-game.js',
            [],
            '1.0',
            true
        );
        wp_enqueue_script(
            'yahtzee_modal',
            YG_URL.'assets/js/src/yahtzee-statistics-modal.js',
            ['jquery'],
            '1.0',
            true
        );
        wp_enqueue_script(
            'yahtzee_achievements',
            YG_URL.'assets/js/src/yahtzee-achievements.js',
            ['jquery'],
            '1.0',
            true
        );
        wp_enqueue_script(
            'yahtzee_achievements_factory',
            YG_URL.'assets/js/src/achievements/achievementFactory.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_enqueue_script(
            'yahtzee_achievement',
            YG_URL.'assets/js/src/achievements/achievement.js',
            ['jquery'],
            '1.0',
            true
        );


        wp_enqueue_script(
            'yahtzee_achievements_category',
            YG_URL.'assets/js/src/achievements/categoryAchievement.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_enqueue_script(
            'yahtzee_achievements_roll',
            YG_URL.'assets/js/src/achievements/rollAchievement.js',
            ['jquery'],
            '1.0',
            true
        );
        wp_enqueue_script(
            'yahtzee_achievements_target',
            YG_URL.'assets/js/src/achievements/targetAchievement.js',
            ['jquery'],
            '1.0',
            true
        );
        wp_enqueue_script(
            'yahtzee_stats',
            YG_URL.'assets/js/src/yahtzee-statistics.js',
            ['jquery'],
            '1.0',
            true
        );
        wp_enqueue_script(
            'yahtzee_dice',
            YG_URL.'assets/js/src/yahtzee-dice.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_enqueue_script(
            'yahtzee_scorecard_',
            YG_URL.'assets/js/src/yahtzee-sorecard.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_enqueue_script(
            'yahtzee_api',
            YG_URL.'assets/js/src/yahtzee-api.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_enqueue_script(
            'yahtzee',
            YG_URL.'assets/js/game.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_localize_script(
            'yahtzee',
            'Yahtzee',
            [
                'initLucide' => true,
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('yahtzee'),
                'score_board' =>  [
                    'used_scores' => $_SESSION['yahtzee_game']['scores'] ?? []
                ],
                'turns' => $_SESSION['yahtzee_game']['turns'] ?? 0,
                'upper_bonus' => $_SESSION['yahtzee_game']['upper_bonus'] ?? 0,
                'upper_section' => $_SESSION['yahtzee_game']['upper_section'] ?? 0,
                'lower_section' => $_SESSION['yahtzee_game']['lower_section'] ?? 0,
                'grand_total' => $_SESSION['yahtzee_game']['grand_total'] ?? 0 ,

            ]
        );

    }
}
