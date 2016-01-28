$(function() {    	
        prettyPrint();
        // Initialise the first table (as before)

        $('#listTable').tableDnD({
            onDragStart: function(table, row) {
                $(table).parent().find('.result').text('');
                console.log("dropstart??");
            },
            onDrop: function(table, row) {
                var data = $(table).tableDnDSerialize();
/*
                $(table).parent().find('.result').append(
                        $('<strong>').text('The urlencoded serialized string:'))
                        .append($('<pre class="prettyprint">').text(data))
                        .append($('<strong>').text('Which looks like this through decodeURIComponent:'))
                        .append($('<pre class="prettyprint">').text(decodeURIComponent(data)));
                        */
                prettyPrint();
            },
            dragHandle: ".dragHandle"
            	
        });
				
        
        
        $("#listTable ").find("tr").hover(function() {
            $(this.cells[1]).addClass('showDragHandle');
        }, function() {
            $(this.cells[1]).removeClass('showDragHandle');
        });

    });