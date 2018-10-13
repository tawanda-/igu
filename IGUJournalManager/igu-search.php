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
Version: 1.0
Author URI: http://www.tawasz.co.za
*/

add_action( 'wp_enqueue_scripts', 'igu_load_css_js' );
function igu_load_css_js(){
    wp_enqueue_script("iguScript-js", plugin_dir_url( __FILE__ ) . "js/iguScript.js", array("jquery"), "" );
    wp_enqueue_script("iguScript-js");

    wp_localize_script( 'iguScript-js', 'the_ajax_script', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
}

add_action('wp_ajax_the_ajax_hook', 'igutoggle');
add_action('wp_ajax_nopriv_the_ajax_hook', 'igutoggle');

/*To display search bar on page simple use the following shortcode [igujournalssearchbar]*/
function igusearchbar(){
	return '<div style="margin-bottom:10px;"><form id="journals_form"><input type="hidden" name="action" value="the_ajax_hook"><input id="name" type="search" name="name"><select id="select01" name="filter" style="padding-top: 8px;padding-right: 0px;padding-bottom: 8px;padding-left: 0px;margin-left: 2px;margin-right: 2px;border-top-width: 0px;border-bottom-width: 0px;border-right-width: 0px;border-left-width: 0px;"><option value="name_of_journal">Journal Name</option><option value="country">Country</option><option value="ISSN">ISSN</option></select><input class="button" id="journals_search" onclick="submit_me();" type="button" name="submit" value="Search"></form></div><div id="journals"></div>';
}
add_shortcode('igujournalssearchbar', 'igusearchbar');

function igutoggle(){

	if($_POST === " " || $_POST === "" ){
		echo json_encode (new stdClass);
		die();
	}

	//validate data - remove illegal characters strip whitespaces
	//$needle = sanitize_key(sanitize_text_field($_POST['name']));
	$needle = sanitize_text_field($_POST['name']);
	$filter = sanitize_key(sanitize_text_field(strtolower($_POST['filter'])));
	
	if($needle === null || $needle == "" || $needle == "   " || $filter === null || $filter == ""){
		echo json_encode (new stdClass);
		die();
	}
	
	$categories = array ("name_of_journal", "country", "issn", "editor", "isi_category", "all", "keyword");
	
	$columns = array(
	'country' => 'Country',
	'name_of_journal' => 'Journal Name',
	'print_issn' => 'Print ISSN',
	'e_issn' => 'eISSN',
	'city_of_publication' => 'City of Publication',
	'name_of_publishing_company' => 'Publishing Company',
	'editor' => 'Editor',
	'editor_email_address' => 'Editor email Addres',
	'language' => 'Publication language',
	'since' => 'Since',
	'isi' => 'ISI',
	'isi_category' => 'ISI Category',
	'5_year_impact_factor' => '5 Year Impact Factor'
	);
	
	if( in_array( $filter, $categories ) ){
		$result = getBy( $filter, $needle );
		if($result != null ){		
			echo json_encode($result);
			
		}else{
			echo json_encode (new stdClass);
			
		}
	}else{
		    echo json_encode (new stdClass);	
	}
	die();
}

function getBy( $column = null, $needle = null){

	global $wpdb;

	if($column == "name_of_journal")
		$sql = $wpdb->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE (name_of_journal LIKE %s);",array('%'.like_escape($needle).'%'));
	if($column == "country")
		$sql = country($needle);
	if($column == "keyword")
		$sql = $wpdb->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE (isi_category LIKE %s);",array('%'.like_escape($needle).'%'));
	if($column == "editor")
		$sql = $wpdb->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE (editor LIKE %s);",array('%'.like_escape($needle).'%'));
	if($column == "issn")
		$sql = $wpdb->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE (print_issn=%d OR e_issn=%d);",array($needle, $needle));	
	if($column == "all")
		$sql = $wpdb->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE (name_of_journal LIKE %s) OR (country LIKE %s) OR (editor LIKE %s);",array('%'.like_escape($needle).'%','%'.like_escape($needle).'%','%'.like_escape($needle).'%'));

	return $wpdb->get_results( $sql, OBJECT );
}

function country($needle){

	global $wpdb;
	$uk = array('united kingdom', 'unitedkingdom', 'u.k', 'uk', 'england');
	$usa = array('united states', 'united states of america', 'u.s.a', 'usa', 'america', 'unitedstateofamerica', 'unitedstates');
	$sa = array('south africa', 's.a', 'sa', 'southafrica');

	if( in_array($needle, $uk) == true)
		return "SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE country LIKE 'england' OR country LIKE 'united kingdom' OR country LIKE 'wales' OR country LIKE 'scotland'";
	if( in_array($needle, $usa) == true )
		return "SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE country LIKE 'united states of america'";
	if( in_array($needle, $sa) == true )
		return "SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE country LIKE 'south africa'";
	else
		return $wpdb->prepare("SELECT SQL_CALC_FOUND_ROWS * FROM wp_igu_journals WHERE (country LIKE %s);", array('%'.like_escape($needle).'%'));
}

?>