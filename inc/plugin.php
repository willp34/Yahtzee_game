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
       // require_once YG_PATH.'inc/class-scorecard.php';

        add_action('wp_enqueue_scripts', [$this,'enqueue']);
        add_shortcode('yahtzee', [$this,'render_shortcode']);
       // new YG_Shortcode();
        new YG_Ajax();
    }

    public function render_shortcode()
    {
        ob_start();

        session_start();
        $rolls = $_SESSION['yahtzee_game']['rolls'] ?? 0;

        include YG_PATH.'templates/game.php';

        return ob_get_clean();
    }
    public function enqueue()
    {
        wp_enqueue_style(
            'yahtzee',
            YG_URL.'assets/css/game.css',
            [],
            '1.0'
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
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('yahtzee')
            ]
        );
    }
}
