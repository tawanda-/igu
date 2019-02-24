<?php
/**
 * @package igu-search
 * @version 1.0
 */
/*
Plugin Name: IGU Search
Plugin URI:
Description: Search IGU Database
Author: Tawanda Muhwati, Ngoni Munyaradzi
Version: 2.0
*/

$html_output = "";
$admin_html_output = "";

//Search frontend files from react
$search_chunk_css = "frontendSearch/static/css/1.54be5b4f.chunk.css";
$search_chunk1_js = "frontendSearch/static/js/1.f2fb7eb2.chunk.js";
$search_chunk2_js = "frontendSearch/static/js/main.280e1239.chunk.js";

/** Check if logged in */
function check_logged_in()
{
    if ( is_user_logged_in() ) 
    {

		$GLOBALS['html_output'] = '
			<div style="
				padding-left: 15px;
				margin-bottom: 10px;
			">
				<button
					style="
						border-radius: 4px;
						color: #fff;
						background-color: #124a7d;
						border-color: #124a7d;
						margin-bottom
					"
					class="btn"
				>
					<a 
						style="color:#fff"
						href="journals-admin">
						Edit Journals
					</a>
				</button>
			</div>
            <div id="journals"></div>';
            add_action( 'wp_enqueue_scripts', 'frontendSearch_css_js' );
		    add_action( 'wp_footer', 'frontendSearch_footer_scripts' );
    }else{

		$GLOBALS['html_output'] = '<div id="journals"></div>';

		add_action( 'wp_enqueue_scripts', 'frontendSearch_css_js' );
		add_action( 'wp_footer', 'frontendSearch_footer_scripts' );
	}
}
add_action('init', 'check_logged_in');

/** Journals Search Front End load CSS and JS */

function frontendSearch(){
    
    $GLOBALS['html_output'] = '<div id="journals"></div>';

    add_action( 'wp_enqueue_scripts', 'frontendSearch_css_js' );
    add_action( 'wp_footer', 'frontendSearch_footer_scripts' );
}

function frontendSearch_css_js(){
    
    wp_enqueue_style("iguScript-css", plugin_dir_url( __FILE__ )."frontendSearch/vendor/bootstrap/css/bootstrap.min.css");
    
    wp_enqueue_style("iguScript-css", plugin_dir_url( __FILE__ )."frontendSearch/css/scrolling-nav.css");
    
    wp_enqueue_style("igu-style-css", plugin_dir_url( __FILE__ )."frontendSearch/css/style.css");
    
    wp_enqueue_style("search-chunk-css", plugin_dir_url( __FILE__ ).$GLOBALS['search_chunk_css']);
    
    wp_enqueue_script("iguScript-js", plugin_dir_url( __FILE__ ) . "frontendSearch/js/iguScript.js", array(), "" );
    wp_enqueue_script("iguScript-js");

    wp_localize_script( 'iguScript-js', 'the_ajax_script', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
}

function frontendSearch_footer_scripts(){
    
    wp_enqueue_script("search-chunk1-js", plugin_dir_url( __FILE__ ) .$GLOBALS['search_chunk1_js'] , array(), "" );
    wp_enqueue_script("search-chunk1-js");

    wp_enqueue_script("search-chunk2-js", plugin_dir_url( __FILE__ ) .$GLOBALS['search_chunk2_js'], array(), "" );
    wp_enqueue_script("search-chunk2-js");
}

/** END Journals Search Front End load CSS and JS */

/** Load CSS and JS for Admin Editor**/

function frontendAdmin(){
    
    $GLOBALS['html_output'] = '<div id="journals"></div>';
            
    add_action( 'wp_enqueue_scripts', 'frontendAdmin_css_js' );
    add_action( 'wp_footer', 'frontendAdmin_footer_scripts' );
}

function frontendAdmin_css_js(){
    
    wp_enqueue_style("admin-chunk-css", plugin_dir_url( __FILE__ )."frontendAdmin/static/css/main.d9a1dfb6.chunk.css");
    
    wp_enqueue_script("admin-chunk-js", plugin_dir_url( __FILE__ ) . "frontendAdmin/adminScript.js", array(), "" );
    wp_enqueue_script("admin-chunk-js");
    
    wp_localize_script( 'admin-chunk-js', 'the_ajax_script', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
}

function frontendAdmin_footer_scripts(){

    wp_enqueue_script("admin-chunk1-js", plugin_dir_url( __FILE__ ) . "frontendSearch/static/js/1.acc757e3.chunk.js", array(), "" );
    wp_enqueue_script("admin-chunk1-js");
    
    wp_enqueue_script("admin-chunk2-js", plugin_dir_url( __FILE__ ) . "frontendSearch/static/js/main.280e1239.chunk.js" , array(), "" );
    wp_enqueue_script("admin-chunk2-js");
}

/** END Load CSS and JS for Admin Editor**/

/** AJAX Queries */
add_action('wp_ajax_the_ajax_hook', 'processRequest');
add_action('wp_ajax_nopriv_the_ajax_hook', 'processRequest');

/** Journals Page UI to display search bar */
function igusearchbar(){
	global $html_output;
	return $html_output;
}
add_shortcode('igujournalssearchbar', 'igusearchbar');

/** END Search Bar */

/** Journals Admin Page UI */

function iguadminui(){
    global $html_output;
    return $html_output;

}
add_shortcode('igujournalsadminui', 'iguadminui');

/** END Journlas Admin Page UI */

/** Database queries */

function processRequest(){
    
    $payload = $_POST;
    $filter = NULL;
    $result = NULL;
    
    
    if(isset($payload['action'])){
        unset($payload['action']);
    }
        
    if(isset($payload['filter'])){
        $filter = $payload['filter'];
        unset($payload['filter']);
    }else{
        echo json_encode (new stdClass);
		die();
    }

    switch($filter){
        case "get":
            $result = get();
            break;
        case "insert":
            $result = insert($payload);
            if(false !== $result){
                $result = get();   
            }
            break;
        case "delete":
            $result = delete($payload);
            if(false !== $result){
                $result = get();   
            }
            break;
        case "update":
            $result = update($payload);
            if(false !== $result){
                $result = get();   
            }
            break;
        case "bulk":
            break;
        default:
            break;
    }
    
    if(!is_null($result)){		
        echo json_encode($result);
    }else{
        echo json_encode (new stdClass);
    }

	die();
}


function get(){
    
    global $wpdb;
    
    $sql = "SELECT * FROM `wp_igu_journals` ORDER BY `name_of_journal` ASC";
    
	return $wpdb->get_results( $sql, OBJECT );
    
}

function delete($payload) {
    
    global $wpdb;
    
    return $wpdb->delete( 'wp_igu_journals', array( 'id' => $payload['payload'] ) );;

}

function insert($payload){
    
    global $wpdb;
    
    if(isset($payload['id'])){
        unset($payload['id']);
    }
    
    if(isset($payload['editor_email_address'])){
        $payload['editor_info'] = $payload['editor_email_address'];
        unset($payload['editor_email_address']);
    }
    
    return $wpdb->insert( "wp_igu_journals", $payload);
}

function update($payload){
    
    global $wpdb;    
    
    if(isset($payload['id'])){
     return $wpdb->update( 'wp_igu_journals', $payload, array('id' => $payload['id']) );   
    }else{
        return 0;
    }
}

/** END Database queries */

/* Debugging*/

function enableDebugging($debug){
    if($debug){
        error_reporting(E_ALL);
        ini_set('display_errors', True);
    }
}

function console_log( $data ){
  echo '<script>';
  echo 'console.log('. json_encode( $data ) .')';
  echo '</script>';
}

?>