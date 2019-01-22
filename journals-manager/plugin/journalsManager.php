<?php
	/*
		Plugin Name: IGU Journals Manager
		Plugin URI: http://www.igujournals.org/journals
		Description: IGU Journals Manager
		Version: 2.0
		Author: Tawanda Muhwati
		Author URI: 
	*/
	
	/**
	* Set the wp-content and plugin urls/paths
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
			
			public function home(){
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
			
			public function validate_form($form_data){
			
				if(!empty($form_data['name_of_journal']))
					return true;
				
				return false;
			}
			
			private function viewJournals(){
				$current_url = set_url_scheme( 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );
				$jManagerListTable = new jManager_List_Table();
				$jManagerListTable->prepare_items();
				?>
					<div class="wrap">
						<form method="post">
							<input type="hidden" name="page" value="journalsManager">
							<?php $jManagerListTable->search_box('search','search_id');?>
						</form>
						<div id="icon-users" class="icon32"></div>
						<h2><a href="options-general.php?page=journalsManager.php">IGU Journals Manager</a></h2>
						<?php
							echo sprintf(
									"<a href='%s'>", 
									esc_url(add_query_arg('action', 'new', $current_url))
								);
							submit_button( __('Add New Journal'), 'button', false, false, array('id' => 'newJournal') );
							echo "</a>";
						?>
						<?php $jManagerListTable->display(); ?>
					</div>
				<?php
			}
						private function newJournalForm(){
				echo '<h2><a href="options-general.php?page=journalsManager.php">IGU Journals Manager</a> - Add New Journal</h2>
					 <form method="post">
						<table class="form-table">
							<tbody>
								<tr>
									<th scope="row"><label for="name_of_journal">Journal Name <span class="description">(required)</span></label></th>
									<td><input type="text" id="" name="name_of_journal" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="country"><strong>Country</strong></label></th>
									<td><input type="text" id="" name="country" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="print_issn"><strong>ISSN</strong></label></th>
									<td><input type="text" id="" size="10" name="print_issn" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="e_issn"><strong>eISSN</strong></label></th>
									<td><input type="text" id="" size="10" name="e_issn" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="city_of_publication"><strong>City Published</strong></label></th>
									<td><input type="text" id="" size="50" name="city_of_publication" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="name_of_publishing_company"><strong>Publishing Company</strong></label></th>
									<td><input type="text" id="" size="50" name="name_of_publishing_company" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="editor"><strong>Editor</strong></label></th>
									<td><input type="text" id="" size="50" name="editor" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="editor_info"><strong>Editor Info</strong></label></th>
									<td><input type="text" id="" size="50" name="editor_info" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="language"><strong>Language</strong></label></th>
									<td><input type="text" id="" size="50" name="language" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="since"><strong>Since</strong></label></th>
									<td><input type="text" id="" size="50" name="since" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="isi"><strong>ISI</strong></label></th>
									<td><input type="text" id="" size="50" name="isi" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="isi_category"><strong>ISI Category</strong></label></th>
									<td><input type="text" id="" size="50" name="isi_category" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="5_year_impact_factor"><strong>Impact factor</strong></label></th>
									<td><input type="text" id="" size="50" name="5_year_impact_factor" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="website"><strong>Website</strong></label></th>
									<td><input type="text" id="" size="50" name="website" class="regular-text"/></td>
								</tr>
							</tbody>
						</table>
						<p class="submit">
							<input type="submit" name="submit" id="submit" class="button button-primary" value="Save Journal">
							<button class="button button-primary"><a href="options-general.php?page=journalsManager.php">Cancel</a></button>
						</p>
					</form>';
			}
			
			private function editJournalForm( $data ){
				echo '<h2><a href="options-general.php?page=journalsManager.php">IGU Journals Manager</a> - Edit Journal</h2>
					 <form method="post">
						<input type="hidden" id="id" name="id" value="'.$data["id"].'" />
						<table class="form-table">
							<tbody>
								<tr>
									<th scope="row"><label for="name_of_journal">Journal Name <span class="description">(required)</span></label></th>
									<td><input type="text" id="name_of_journal" name="name_of_journal" value="'.$data["name_of_journal"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="country"><strong>Country</strong></label></th>
									<td><input type="text" id="" name="country" value="'.$data["country"].'" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="print_issn"><strong>ISSN</strong></label></th>
									<td><input type="text" id="" size="10" name="print_issn" value="'.$data["print_issn"].'" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="e_issn"><strong>eISSN</strong></label></th>
									<td><input type="text" id="" size="10" name="e_issn" value="'.$data["e_issn"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="city_of_publication"><strong>City Published</strong></label></th>
									<td><input type="text" id="" size="50" name="city_of_publication" value="'.$data["city_of_publication"].'" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="name_of_publishing_company"><strong>Publishing Company</strong></label></th>
									<td><input type="text" id="" size="50" name="name_of_publishing_company" value="'.$data["name_of_publishing_company"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="editor"><strong>Editor</strong></label></th>
									<td><input type="text" id="" size="50" name="editor" value="'.$data["editor"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="editor_info"><strong>Editor Info</strong></label></th>
									<td><input type="text" id="" size="50" name="editor_info" value="'.$data["editor_info"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="language"><strong>Language</strong></label></th>
									<td><input type="text" id="" size="50" name="language" value="'.$data["language"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="since"><strong>Since</strong></label></th>
									<td><input type="text" id="" size="4" name="since" value="'.$data["since"].'" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="isi"><strong>ISI </strong><span class="description">(Input 1 for Yes or 0 for No)</span></label></th>
									<td><input type="text" id="" size="1" name="isi" value="'.$data["isi"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="isi_category"><strong>ISI Category</strong></label></th>
									<td><input type="text" id="" size="50" name="isi_category" value="'.$data["isi_category"].'" class="regular-text"/></td>
								</tr>
								<tr>
									<th scope="row"><label for="5_year_impact_factor"><strong>Impact factor</strong></label></th>
									<td><input type="text" id="" size="50" name="5_year_impact_factor" value="'.$data["5_year_impact_factor"].'" class="regular-text"/></td>	
								</tr>
								<tr>
									<th scope="row"><label for="website"><strong>Website</strong></label></th>
									<td><input type="text" id="" size="50" name="website" value="'.$data["website"].'" class="regular-text"/></td>
								</tr>
							</tbody>
						</table>
						<p class="submit">
							<input type="submit" name="submit" id="submit" class="button button-primary" value="Update Journal"/>
							<button class="button button-primary"><a href="options-general.php?page=journalsManager.php">Cancel</a></button>
						</p>
					</form>';
			}
			
			private function clear_url($clear=true){
				$current_url = set_url_scheme( 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );
				
				if($clear === true){
					if(!empty($_GET['action']))
						$current_url = remove_query_arg('action', $current_url);
					if(!empty($_GET['edit']))
						$current_url = remove_query_arg('edit', $current_url);
					if(!empty($_GET['delete']))
						$current_url = remove_query_arg('delete', $current_url);
				}
				
				return $current_url;
			}
			
						private function generatePairs($data){
				return array(
					"country" => $data['country'],
					"name_of_journal" => $data['name_of_journal'],
					"print_issn" => $data['print_issn'],
					"e_issn" => $data['e_issn'],
					"city_of_publication" => $data['city_of_publication'],
					"name_of_publishing_company" => $data['name_of_publishing_company'],
					"editor" => $data['editor'],
					"editor_info" => $data['editor_info'],
					"language" => $data['language'],
					"since" => intval($data['since']),
					"isi" => intval($data['isi']),
					"isi_category" => $data['isi_category'],
					"5_year_impact_factor" => floatval($data['5_year_impact_factor']),
					"website" => $data['website']
				);
			}
		}
	}

	if (class_exists('jManager') && is_admin()) {
		ob_start();
		$jManager = new jManager();
	}
	
	if(!class_exists('WP_List_Table')){
			require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
	}
	
	class jManager_List_Table extends WP_List_Table{
		
		public function prepare_items(){
			$columns               = $this->get_columns();
			$hidden                = $this->get_hidden_columns();
			$sortable              = $this->get_sortable_columns();
			
			$perPage = 50;
			$total = 1500;
			$currentPage = $this->get_pagenum();
			
			$this->set_pagination_args( 
				array(
					'total_items' => $total,
					'per_page' => $perPage
				) 
			);
			
			$this->_column_headers = array($columns, $hidden, $sortable);
			
			if(!empty($_POST['s']))
				$this->items = $this->search($_POST['s']);
			else
				$this->items = $this->table_data();
		}
		
		private function set_total($total, $perPage=0){
			if($perPage === 0)
				$perPage = $this->get_pagination_arg('per_page');
			else
				$perPage = $total;
			
			$this->set_pagination_args(
				array(
					'total_items' => $total,
					'per_page' => $perPage
				)
			);
		}
		
		private function search($needle){
			global $wpdb;
			
			$where = "WHERE country LIKE '%".$needle."%' OR name_of_journal LIKE '%".$needle."%' OR  print_issn LIKE '%".$needle."%' OR e_issn LIKE '%".$needle."%' OR city_of_publication LIKE '%".$needle."%' OR name_of_publishing_company LIKE '%".$needle."%' OR editor  LIKE '%".$needle."%' OR editor_info  LIKE '%".$needle."%' OR language  LIKE '%".$needle."%' OR isi_category LIKE '%".$needle."%' OR since LIKE '%".$needle."%'";
			$sql = "SELECT * FROM wp_igu_journals {$where}";				
			
			$data = $wpdb->get_results( $sql, ARRAY_A );

			$total = count( $wpdb->get_results( $sql, ARRAY_A ) );
			$this->set_total($total, $total);
			
			return $data;			
		}
		
		public function get_columns(){
			$columns = array(
				'id' => 'id',
				'name_of_journal' => 'Journal Name',
				'country' => 'Country',
				'print_issn' => 'ISSN',
				'e_issn' => 'e_ISSN',
				'city_of_publication' => 'City Published',
				'name_of_publishing_company' => 'Publishing Company',
				'editor' => 'Editor',
				'editor_info' => 'Editor info',
				'language' => 'Language',
				'since' => 'Since',
				'isi' => 'ISI',
				'isi_category' => 'ISI Category',
				'5_year_impact_factor' => 'Impact Factor',
				'website' => 'Website'
			);
			return $columns;
		}

		public function get_hidden_columns(){
			return array('id' => 'id');
		}
		
		private function table_data(){
			global $wpdb;
			
			$perPage = $this->get_pagination_arg('per_page');
			$start = 0;
			$end = $perPage;

			if(!empty($_GET['paged'])){
				$start = ($_GET['paged']-1)*$perPage;
				$end = $perPage;
			}
			
			$sql = 'SELECT * FROM wp_igu_journals LIMIT '.$start.','.$end;
			
			$num_rows = $wpdb->get_var('SELECT COUNT(*) FROM wp_igu_journals');
			
			$this->set_total( $num_rows );
			
			return $wpdb->get_results( $sql, ARRAY_A );
		}

		public function column_default($item, $column_name){
			switch( $column_name ){
				case 'id':
				case 'name_of_journal':
				case 'country':
				case 'print_issn':
				case 'e_issn':
				case 'city_of_publication':
				case 'name_of_publishing_company':
				case 'editor':
				case 'editor_info':
				case 'language':
				case 'since':
				case 'isi':
				case 'isi_category':
				case '5_year_impact_factor':
				case 'website':
					return $item[ $column_name ];
				default:
					return print_r( $item, true );
			}
		}
		
		public function column_name_of_journal($item){
			$current_url = set_url_scheme( 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );
			$actions = array(
				'edit' => sprintf("<a href='%s'>%s</a>", esc_url(add_query_arg('edit', $item['id'], $current_url)) , 'Edit'),
				'delete' => sprintf("<a href='%s'>%s</a>", esc_url(add_query_arg('delete', $item['id'], $current_url)) , 'Delete'),
			);
			
			return sprintf('%1$s %2$s',  $item['name_of_journal'], $this->row_actions($actions));
		}
		
		public function column_website($item){
			return sprintf('<a href="%s">%s</a>', esc_url($item['website']), $item['website']);
		}
		
		public function no_items(){
			_e( 'No Journals found..' );
		}
	}
?>
