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

YG_Plugin::instance();
