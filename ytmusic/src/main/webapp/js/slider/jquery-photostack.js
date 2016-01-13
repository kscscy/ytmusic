$(function() {
    /**
     * navR,navL are flags for controlling the categories navigation
     * first gives us the position of the category on the left
     * positions are the left positions for each of the 5 categories displayed at a time
     */
    var navR, navL = false;
    var first = 1;
    var positions = {
        '0': 0,
        '1': 1240,
        '2': 1240
    }

    var $categories = $('#categories');
    /**
     * number of categories available
     */
    var elems = $categories.children().length;
    
    var $slider = $('#slider');
    
    var $ulCountId0= $('#ulCountId-0');
    var $ulCountId10= $('#ulCountId-10');
    var $ulCountId20= $('#ulCountId-20');
    var viewUl = $ulCountId0;
    
    var pos = 0;
    var ulPos = {
            '0': $ulCountId0,
            '1': $ulCountId10,
            '2': $ulCountId20
    }
    
    var hiddenRight1 = $(window).width() - $categories.offset().left;
    console.log(hiddenRight1);
    $ulCountId10.css('left', hiddenRight1 + 1000 +'px');
    $ulCountId20.css('left', hiddenRight1 + 1000 +'px');

    /**
     * let's position all the categories on the right side of the window
     */
    var hiddenRight = $(window).width() - $categories.offset().left;
    $categories.children('ul').css('left', hiddenRight + 'px');
    /**
     * move the first 5 categories to the viewport
     */
    $categories.children('ul:lt(3)').each(function(i) {
        var $elem = $(this);
        //console.log("테스트 i : " + i);
        $elem.animate({
            'left': positions[i] + 'px',
/*            'opacity': 1*/
            }, 800, function() {
            if (elems > 5) enableNavRight();
        });
    });
    /**
     * next category
     */
    $slider.find('.next').bind('click', function() {
        /*if (!$categories.children('ul:nth-child(' + parseInt(first + 5) + ')').length || !navR) return;*/
        disableNavRight();
        disableNavLeft();
        moveRight();
    });
    /**
     * we move the first category (the one on the left) to the left side of the window
     * the next 4 categories slide one position, and finally the next one in the list
     * slides in, to fill the space of the first one
     */
    
    
    function moveRight() {
    	var hiddenLeft = $categories.offset().left + 163;
    	
        var cnt = 0;
    	cnt = pos + 1;
    	console.log("pos1 : " + pos);
        if(cnt > 2) {
        	return;
        }
    	

        console.log("pos2 : " + pos);
        ulPos[pos].animate(
    			{
    				'left': -1240 + 'px',
    				'opacity': 0
    			},
            	500,
        		function() {
        			pos++;
    				if(pos > 2) {
    					pos = 2;
    				}
        			ulPos[pos].animate({
    					'left' : 0 + 'px',
    					'opacity' : 1
    				}, 500, function(){});
        	        console.log("pos3 : " + pos);
        		}
        );

    };
    
    
    /**
    * previous category
    */
    $slider.find('.prev').bind('click', function() {
        disableNavRight();
        disableNavLeft();
        moveLeft();
    });
    
    function moveLeft() {
    	var hiddenLeft = $categories.offset().left + 163;
    	var cnt = 0;
    	console.log("pos1 : " + pos);
    	viewUl = ulPos[pos];
    	cnt = pos - 1;
        if(cnt < 0) {
        	cnt++;
        	return;
        }
        console.log("pos2 : " + pos);
    	viewUl.animate(
    			{
    				'left': 1240 + 'px',
    				'opacity': 0
    			},
            	500,
        		function() {
        			pos--;
    				if(pos < 0) {
    					pos = 0;
    				}
        			viewUl = ulPos[pos];
        			viewUl.animate({
    					'left' : 0 + 'px',
    					'opacity' : 1
    				}, 500, function(){});
        			console.log("pos3 : " + pos);
        		}
        );
    };
    /**
     * we move the last category (the one on the right) to the right side of the window
     * the previous 4 categories slide one position, and finally the previous one in the list
     * slides in, to fill the space of the last one
     */
    function moveLeft2() {
            var hiddenRight = $(window).width() - $categories.offset().left;
            var cnt = 0;
            var last = first + 4;
            $categories.children('li:nth-child(' + last + ')').animate({
                'left': hiddenRight + 'px',
                'opacity': 0
            }, 500, function() {
                var $this = $(this);
                $categories.children('li').slice(parseInt(last - 5), parseInt(last - 1)).each(function(i) {
                    var $elem = $(this);
                    $elem.animate({
                        'left': positions[i + 1] + 'px'
                    }, 800, function() {
                        ++cnt;
                        if (cnt == 4) {
                            $categories.children('li:nth-child(' + parseInt(last - 5) + ')').animate({
                                'left': positions[0] + 'px',
                                'opacity': 1
                            }, 500, function() {
                                //$this.hide();
                                --first;
                                enableNavRight();
                                if (first > 1) enableNavLeft();
                            });
                        }
                    });
                });
            });
        }
    /**
    * disable or enable category navigation
    */
    function disableNavRight() {
        navR = false;
        $slider.find('.next').addClass('disabled');
    }

    function disableNavLeft() {
        navL = false;
        $slider.find('.prev').addClass('disabled');
    }

    function enableNavRight() {
        navR = true;
        $slider.find('.next').removeClass('disabled');
    }

    function enableNavLeft() {
        navL = true;
        $slider.find('.prev').removeClass('disabled');
    }
});