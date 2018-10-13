function submit_me(){
	jQuery("#journals").html('<p style="font-size:120%;">Loading..</p>');
	jQuery.post(
		the_ajax_script.ajaxurl,
		jQuery("#journals_form").serialize(),
		function(odata){ 
			var data = jQuery.parseJSON(odata);
			var html_data = '';
			var name_data = '';
			var table_data = '';
			if(jQuery.isEmptyObject(data)){
				html_data = "<p>Oops we could not find a matching result..</p>";
			}			
			else{
				html_data = '';
				jQuery.each(data, function() { 
					var col = {
						country:"Country",
						name_of_journal:"Name of Journal",
						print_issn:"Print ISSN",
						e_issn:"e ISSN",
						city_of_publication:"City Published",
						name_of_publishing_company:"Publisher",
						editor:"Editor", 
						editor_info:"Editor Information",
						language:"Language", 
						since:"Since", 
						isi:"ISI", 
						isi_category:"ISI Category", 
						'5_year_impact_factor':"5 Year Impact Factor",
						website:"Website"
					};
					name_data = '';
					details_data = '';
					table_data = '';
					jQuery.each(this, function(k , v) {
						if(k != "id"){
							if(k=="name_of_journal"){
								name_data = '<hr style="margin-bottom:5px;"><div class="journal_name" style="cursor:pointer;"><span style="color:#1a80b6; font-size:18px; font-weight:bold;"><u>'+v+'</u><span></div>';
							}
							else{
								if(v!=null || v!=0){
							     		if(k=="website"){
										table_data += '<tr><td>Website:</td><td><a href="'+v+'" target="_blank">Follow Link</a></td></tr>';
									}
									else{
										table_data += '<tr><td>'+col[k]+'</td><td>'+v+'</td></tr>';
									}								
								}
							}
						}
					});
					html_data += '<div class="journal" style="width:100%;">';
					html_data += name_data;
					html_data += '<div class="journal_details"><hr style="margin-bottom:5px;"><table style="border:0px; border-spacing:1px;">'+table_data+'</table></div>';
				});
				html_data += html_data+'<hr style="margin-bottom:5px;">';
			}
			jQuery("#journals").html('<i>Results</i>'+html_data);
			toggle_details();
		}
	);
}

function toggle_details(){
	jQuery("#journals div.journal_name").show();
	jQuery("#journals div.journal_details").hide();
	jQuery("#journals div.journal_name").click(function(){
		jQuery("#journals div.journal_details").hide();
		jQuery(this).next("div").toggle();
		jQuery(this).find(".arrow").toggleClass("up");
	});
}