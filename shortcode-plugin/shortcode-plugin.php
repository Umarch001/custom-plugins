<?php

/*
    * Plugin Name:Shortcode Generator
    * Description: This plugin will generate the shortcode which will be used anywhere on website.
    * Author: Muhammad Umar Farooq
    * Version: 1.0
*/


//Enqueue Style file into plugin

function shortcode_enqueue_styles() {
    wp_enqueue_style('plugin-css-file', plugin_dir_url(__FILE__) . 'css/style.css', array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'shortcode_enqueue_styles');



add_shortcode('text_message','display_shortcode_val');

function display_shortcode_val(){
    return "<p class='code-text'>Testing...Shortcode</p>";
}

add_shortcode('employee','intagleo_employee_data');


function intagleo_employee_data($attributes){

    $attributes = shortcode_atts(array(
        'name' => 'Ahmar',
        'employee_number' => 652,
        'designation'=> 'WordPress Developer',
    ), $attributes, 'employee' );

    return "<h3 class='code-text'>Hy this is Name - ".$attributes['name'].", Employee Number- ".$attributes['employee_number']." and Designation - ".$attributes['designation']."</h3>";
}

// Retrive posts from database.

add_shortcode('lists-posts','show_posts_by_class');

function wp_show_posts(){
    global $wpdb;
     $table_prefix = $wpdb->prefix;
     $table_name = $table_prefix."posts";


     $posts_data = $wpdb->get_results(
        "SELECT post_title FROM {$table_name} WHERE post_type = 'post' AND post_status = 'publish' ORDER BY post_date DESC"
     );

     if(count($posts_data) > 0){
    
        $outputHTML = "<ul>";
        foreach($posts_data as $post){
            $outputHTML.="<li>$post->post_title</li>";
        }
        $outputHTML .="</ul>";

        return $outputHTML;
     }

     return "No Posts here";
}


function show_posts_by_class($attributes){
     $attributes=shortcode_atts(array(
           'number'=>5,
     ),$attributes, "lists-posts");

$query= New WP_Query(array(
        "posts_per_page"=>$attributes['number'],
        "post_status"=>'publish',
));

$outputHTML="<ul>";

if($query->have_posts()){

     while($query->have_posts()){

        $query->the_post();

        $outputHTML .= "<li><a href='" . get_permalink() . "'>" . get_the_title() . "</a></li>";
    }
    $outputHTML .= "</ul>";
} else {
    $outputHTML .= "<li>No posts found.</li></ul>";
}

wp_reset_postdata();

return $outputHTML;
}
