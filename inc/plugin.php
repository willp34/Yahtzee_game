<?
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
        require_once YG_PATH.'inc/ajax.php';
        require_once YG_PATH.'inc/game.php';
        require_once YG_PATH.'inc/score-card.php';

        add_action('wp_enqueue_scripts', [$this,'enqueue']);
        add_shortcode('yahtzee', [$this,'render_shortcode']);
       // new YG_Shortcode();
        new YG_Ajax();
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
            [],
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
        wp_enqueue_script(
            'yahtzee_game',
            YG_URL.'assets/js/src/yahtzee-game.js',
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
