<?php
	/*
		Plugin Name: IGU Journals Manager
		Plugin URI: http://www.igujournals.org/journals
		Description: IGU Journals Manager
		Version: 3.0
		Author: Tawanda Muhwati
		Author URI: 
	*/
	
	/**
	* Set the wp-content and plugin urls/paths
    
    
        get - journals (pagination)
        post - journals (1 or more)
    
	*/
	
	define( 'jManager_URL' , plugins_url(plugin_basename(dirname(__FILE__)).'/') );
	
	if (!class_exists('jManager')) {
		class jManager{
	
			/**
			 * Constructor
			 */
			public function __construct(){
				add_action('admin_menu', array(&$this, 'add_submenu'));
			}
			
			public function add_submenu(){
				add_options_page('IGU Journals Manager', 'IGU Journals Manager', 'manage_options', basename(__FILE__), array(&$this, 'home'));
			}
			
			/*
                get json data
                for each json item
                    validate item
                    create sql statement
                    update db
            */
			public function home(){
                
                //var_dump($_POST);
                //var_dump($_GET);
				/*
                if(!empty($_POST['submit'])){
					if($this->validate_form($_POST)){
						$data = $this->generatePairs($_POST);
						if($_POST['submit'] === 'Save Journal')
							$this->dbQuery('insert', $data);
						if($_POST['submit'] === 'Update Journal')
							$this->dbQuery('update', $data);
						//print_r($_GET);
						wp_safe_redirect( $this->clear_url(true) );
						exit;
					}else{
						wp_safe_redirect($this->clear_url(false));
						exit;
					}
				}elseif($_GET['action'] === 'new' && !empty($_GET['action'])){
					$this->clear_url();
					$this->newJournalForm();exit;
				}elseif(!empty($_GET['edit']) && absint( $_GET['edit'] )){
					$data = $this->dbQuery('select', absint( $_GET['edit'] ));
					$this->editJournalForm($data[0]);exit;
				}elseif(!empty($_GET['delete']) && absint( $_GET['delete'] )){
					$this->dbQuery('delete', absint( $_GET['delete'] ));
					wp_redirect( $this->clear_url(true) );
					exit;
				}else
					$this->viewJournals();exit;
                */
			}
			
			public function dbQuery( $sqlMethod='', $data ){
				global $wpdb;
				
				if( $sqlMethod === 'insert' )
					$wpdb->insert('wp_igu_journals', $data);
				if( $sqlMethod === 'update' )
					$wpdb->update( 'wp_igu_journals', $data, array( "id" => absint($_POST['id']) ) );
				if( $sqlMethod === 'delete')
					$wpdb->query("DELETE FROM wp_igu_journals WHERE id = '$data' ");
				if( $sqlMethod === 'select'){
					$id = absint( $_GET['edit'] );
					$sql = "SELECT * FROM wp_igu_journals WHERE id LIKE '$id'";
					return $wpdb->get_results( $sql, ARRAY_A );
				}
			}
        }
    }

    if (class_exists('jManager') && is_admin()) {
		ob_start();
		$jManager = new jManager();
	}
?>