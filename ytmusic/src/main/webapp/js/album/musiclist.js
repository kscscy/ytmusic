$(function() {    	
        prettyPrint();
        // Initialise the first table (as before)
        var num = 0;
        $('#listTable').tableDnD({
            onDragStart: function(table, row) {
            		
                $(table).parent().find('.result').text('');
                //console.log("dropstart??");
            },
            onDrop: function(table, row) {
                var data = $(table).tableDnDSerialize();
                                
                var array_data = data.split("&");
                var no_array_data = new Array();
                for (i=0; i<array_data.length; i++) {
                	no_array_data[i] = array_data[i].substring(16);
                	console.log(no_array_data[i]);
                }
                
                console.log(array_data);
                console.log(no_array_data);
                sessionStorage.setItem("no_array_data",no_array_data);
                
                /*
                $(table).parent().find('.result').append(
                        $('<strong>').text('The urlencoded serialized string:'))
                        .append($('<pre class="prettyprint">').text(data))
                        .append($('<strong>').text('Which looks like this through decodeURIComponent:'))
                        .append($('<pre class="prettyprint">').text(decodeURIComponent(data)));
                        
                prettyPrint();
                */
            },
            dragHandle: ".dragHandle"
            	
        });
        /*
         * 
         */
        
        
        $("#listTable ").find("tr").hover(function() {
            $(this.cells[1]).addClass('showDragHandle');
        }, function() {
            $(this.cells[1]).removeClass('showDragHandle');
        });

    });

