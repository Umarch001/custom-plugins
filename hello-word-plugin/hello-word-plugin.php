<?php
/*
    * Plugin Name: Hello World
    * Description: This plugin for print the piece of information.
    * Author: Muhammad Umar Farooq
    * Version: 1.0
*/


//Admin Notices
//Admin Widget Dashboard


add_action('admin_notices','display_message_on_dashboard');

function display_message_on_dashboard(){
    echo '<div class="notice notice-success is-dismissible"><p>This is first message through plugin</p></div>';
}

add_action('wp_dashboard_setup', 'hw_wp_widget_dashboard');

function hw_wp_widget_dashboard(){
    wp_add_dashboard_widget( 'hw_widget_plugin', 'Hello World', 'show_hw_widget_text' );
}

function show_hw_widget_text(){
   echo "Testing....Widget";
}
