(function( $ ) {

  $.fn.exportable = function(options) {
	  
	  var settings = {
			  
		  table_header: true, // use thead, tbody
		  enclosed_by: '"',
		  field_end: ',',
		  strip_html: true,
		  line_end: '\n'

	  };
	  
	  // overide the settings
	  if (options) {
		  
		  $.extend(settings, options);
		  
	  }
	  
	  var etable = this;
	  var thead = [];
	  var tbody = [];
	  var output = [];
	  var col_count = $(etable).find('tr')[0].cells.length;
	  
	  $(etable).find('tr').each(function(counter){
		  
		  if (settings.table_header){
			  
			  // get the headers
			  $(this).filter(':visible').find('th').each(function(counter){
				  
				  tmp = format_cell(this, counter);
				  thead.push(tmp);
				  
				  if ((col_count - 1) == counter) {
					  
					  tmp = thead.join(settings.field_end);
					  output.push(tmp);
					  
					  // empty array
					  thead.length = 0;
					  
				  }
				  
			  });
			  
		  }
		  
		  // get the data
		  $(this).filter(':visible').find('td').each(function(counter){
			  
			  tmp = format_cell(this, counter);
			  tbody.push(tmp);
			  
			  if ((col_count - 1) == counter) {
				  
				  tmp = tbody.join(settings.field_end);
				  output.push(tmp);
				  
				  // empty array
				  tbody.length = 0;
				  
			  }
			  
		  });
		  
	  });
	 
	  function format_cell(cell, counter)
	  {
		  // strip html if required here
		  if (settings.strip_html) {
			  
			  data = $(cell).text();
			  
		  } else {
			  
			  data = $(cell).html();
			  
		  }
		  
		  // format data for csv
		  tmp = settings.enclosed_by + data + settings.enclosed_by;

		  if ((col_count - 1) == counter) {
			  
			  // add newline
			  tmp += settings.line_end;

		  }
		  
		  return tmp;
	  }
	  
	  function output_csv()
	  {
		  csv = output.join('');
		  
		  return csv;
	  }
	  
	  return output_csv();
  };
  
})( jQuery );