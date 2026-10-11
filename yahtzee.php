<?php
/**
 * Plugin Name: Yahtzee Game
 * Description: Play Yahtzee inside WordPress.
 * Version: 1.0.0
 * Author: William Pritchard
 */

defined('ABSPATH') || exit;

define('YG_PATH', plugin_dir_path(__FILE__));
define('YG_URL', plugin_dir_url(__FILE__));

require_once YG_PATH.'inc/plugin.php';



/** * Create default achievements on activation only. */
function yg_activate_plugin() {
    $plugin = YG_Plugin::instance();

    $plugin->register_achievements_cpt();

    require_once YG_PATH . 'inc/achievements.php';

    $achievements = new Achievements();
    $achievements->achievementsCollection();

    flush_rewrite_rules();

}
register_activation_hook(__FILE__, 'yg_activate_plugin');
register_deactivation_hook(__FILE__, 'yg_deactivate_plugin');

function yg_deactivate_plugin()
{
    $achievements = get_posts([
        'post_type'      => 'achievement',
        'post_status'    => 'any',
        'posts_per_page' => -1,
        'fields'         => 'ids',
    ]);

    foreach ($achievements as $achievement_id) {
        wp_delete_post($achievement_id, true);
    }

    flush_rewrite_rules();
}
YG_Plugin::instance();
