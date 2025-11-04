<?php
/*
    * Plugin Name: Avatar Replay Screen
    * Description: Displays a replay overlay after avatar stream completion with a 2-second delay before unloading.
    * Author: Muhammad Umar Farooq
    * Version: 1.0
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue JavaScript file
function avatar_replay_enqueue_scripts() {
    wp_enqueue_script(
        'avatar-replay-js',
        plugin_dir_url(__FILE__) . 'js/avatar-replay.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'avatar_replay_enqueue_scripts');

// Enqueue CSS file
function avatar_replay_enqueue_styles() {
    wp_enqueue_style(
        'avatar-replay-css',
        plugin_dir_url(__FILE__) . 'css/avatar-replay.css',
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'avatar_replay_enqueue_styles');

// Add shortcode to embed avatar player container
add_shortcode('avatar_player', 'avatar_player_shortcode');

function avatar_player_shortcode($attributes) {
    $attributes = shortcode_atts(array(
        'poster' => plugin_dir_url(__FILE__) . 'images/default-poster.jpg',
        'stream_url' => '',
    ), $attributes, 'avatar_player');

    ob_start();
    ?>
    <div class="avatar-player-wrapper" data-poster="<?php echo esc_url($attributes['poster']); ?>" data-stream-url="<?php echo esc_url($attributes['stream_url']); ?>">
        <div id="avatar-player-container">
            <video id="avatar-video-player" poster="<?php echo esc_url($attributes['poster']); ?>">
                <?php if (!empty($attributes['stream_url'])): ?>
                    <source src="<?php echo esc_url($attributes['stream_url']); ?>" type="video/mp4">
                <?php endif; ?>
                Your browser does not support the video tag.
            </video>
        </div>
        <div id="avatar-replay-overlay" class="avatar-replay-overlay" style="display: none;">
            <div class="avatar-replay-content">
                <button id="avatar-replay-button" class="avatar-replay-button">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="30" r="29" stroke="white" stroke-width="2"/>
                        <path d="M25 20L40 30L25 40V20Z" fill="white"/>
                    </svg>
                    <span>Replay</span>
                </button>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
