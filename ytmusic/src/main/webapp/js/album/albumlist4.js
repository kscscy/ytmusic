var a = null;
var b = null;

$(function(event) {
	/*
	var num = 0;
	if(num == 0) {
		// 테이블 Drag & Drop 플러그인 
		var s4 = document.createElement('script');
		s4.type = "text/javascript";
		s4.src = "js/album/jquery.tablednd.js";
		document.body.appendChild(s4);
		num++;
		console.log("test1");
	}
	console.log("언제1");
	var s4 = document.createElement('script');
	s4.type = "text/javascript";
	s4.src = "js/album/jquery.tablednd.js";
	document.body.appendChild(s4);
	console.log("언제1");
	 */

	$.getJSON('album/albumlist.do?member_no='+sessionStorage.getItem('noSession'), function (resultObj) {
		var table = $("#listTable");
		for (var album of resultObj.data) {
			$("<tr>")
			.html("<td>" + album.a_no + 
					"</td><td>" + 
					"<a class='detailLnk' href='#' album_no='" + album.a_no + "'>" +
					//"<a class='detailLnk' href='myalbumlistdetail.html?album_no=" + album.a_no + "'>" +
					album.name + "</a>" +
					"</td><td><button id='"+ album.a_no +"' class='deleteBtn' type='button' class='btn btn-warning btn-xs'>삭제</button>" + 
					"</td></tr>"
			)
			.appendTo(table);

		}


		$("a.detailLnk").click(clickDetailLnk);
		$('.deleteBtn').click(
				function(event) {
					var result = confirm("앨범을 삭제하시겠습니까?");
					if(result){

						$.post('album/deletealbum.do', {
							album_no : this.id,
							member_no : sessionStorage.getItem('noSession')
						},
						function(resultObj) {
							var ajaxResult = resultObj.ajaxResult;
							if (ajaxResult.status == "success") {
								jQuery('#containers').load('myalbumlist.html');
								//location.reload(true);
							} else {
								alert("앨범 삭제 실패");
							}
						},'json');

					}
					else {
						return false;
					}
				});

	});



	function clickDetailLnk(event) {
		event.preventDefault(); // AJAX로 처리할 것이기 때문에 a 태그의 실행을 취소한다.
		var album_no=$(event.target).attr("album_no");
		var music = new Array();
		var musiclist = new Array();
		sessionStorage.removeItem('no_array_data');
		sessionStorage.removeItem("arrayObj");
		console.log("앨범번호 : " + album_no);

		$("#containers").empty();
		$("#containers").append("<div class='container'><h1>앨범 노래 목록</h1>" + 
				"<table id='musicListTable' class='table table-hover table-responsive'>" +
				"<thead><tr><th><input type='checkbox' id='allCheck'/></th>" +
				"<th>test</th><th>img</th>" +
				//"<th>seq</th>" +
				"<th>제목</th><th>" +
				"<button id='updateList' type='button' class='detailForm btn btn-info btn-xs'>저장하기</button>" +
				"<button id='deleteAllCheck' type='button' class='detailForm btn btn-warning btn-xs'>선택삭제</button>" +
		"</th></tr></thead><tbody id='listTbody'></tbody></table></div>");



		var c = function(album_no) {$.getJSON('album/musiclist.do?album_no=' + album_no, function (resultObj) {
			//$.getJSON('album/musiclist.do?album_no=' + album_no, function (resultObj) {

			var table = $("#listTbody");
			//var table = $("#musicListTable");
			if (resultObj.data != null) {
				for (music of resultObj.data) {
					$("<tr id=tablerow-" + music.seq_no + ">")
					.html("<td><input value='" + music.mu_no + "'id='checkMusic' type='checkbox'/>" + 
							"</td><td class='dragHandle'>" + " " +
							"</td><td><img src='" + music.img +"'width='100px'>"+ 
							//"</td><td>" + music.seq_no + 
							"</td><td>" + music.title +
							"</td><td> <button id='"+ music.mu_no +"' class='deleteMusicBtn' type='button' class='btn btn-warning btn-xs'>삭제</button>" + 
					"</td></tr>")
					.appendTo(table);
					musiclist.push(music);
					//console.log("길이: "+ musiclist.length);
				} 

				/////////////////////////////////////////////////////////////////


				$(function($, window, document, undefined) {
					//!function ($, window, document, undefined) {
					// Determine if this is a touch device
					var hasTouch   = 'ontouchstart' in document.documentElement,
					startEvent = 'touchstart mousedown',
					moveEvent  = 'touchmove mousemove',
					endEvent   = 'touchend mouseup';

					// If we're on a touch device, then wire up the events
					// see http://stackoverflow.com/a/8456194/1316086
					hasTouch
					&& $.each("touchstart touchmove touchend".split(" "), function(i, name) {
						$.event.fixHooks[name] = $.event.mouseHooks;
					});


					$(function(event) {
						function parseStyle(css) {
							var objMap = {},
							parts = css.match(/([^;:]+)/g) || [];
							while (parts.length)
								objMap[parts.shift()] = parts.shift().trim();

							return objMap;
						}
						a= $('#musicListTable').each(function () {
							if ($(this).data('#musicListTable') == 'dnd') {

								$(this).tableDnD({
									onDragStyle: $(this).data('ondragstyle') && parseStyle($(this).data('ondragstyle')) || null,
									onDropStyle: $(this).data('ondropstyle') && parseStyle($(this).data('ondropstyle')) || null,
									onDragClass: $(this).data('ondragclass') == undefined && "tDnD_whileDrag" || $(this).data('ondragclass'),
									onDrop: $(this).data('ondrop') && new Function('table', 'row', $(this).data('ondrop')), // 'return eval("'+$(this).data('ondrop')+'");') || null,
									onDragStart: $(this).data('ondragstart') && new Function('table', 'row' ,$(this).data('ondragstart')), // 'return eval("'+$(this).data('ondragstart')+'");') || null,
									onDragStop: $(this).data('ondragstop') && new Function('table', 'row' ,$(this).data('ondragstop')),
									scrollAmount: $(this).data('scrollamount') || 5,
									sensitivity: $(this).data('sensitivity') || 10,
									hierarchyLevel: $(this).data('hierarchylevel') || 0,
									indentArtifact: $(this).data('indentartifact') || '<div class="indent">&nbsp;</div>',
									autoWidthAdjust: $(this).data('autowidthadjust') || true,
									autoCleanRelations: $(this).data('autocleanrelations') || true,
									jsonPretifySeparator: $(this).data('jsonpretifyseparator') || '\t',
									serializeRegexp: $(this).data('serializeregexp') && new RegExp($(this).data('serializeregexp')) || /[^\-]*$/,
									serializeParamName: $(this).data('serializeparamname') || false,
									dragHandle: $(this).data('draghandle') || null
								});
							}


						});
					});

					b =jQuery.tableDnD = {
							/** Keep hold of the current table being dragged */
							currentTable: $('#musicListTable'),
							/** Keep hold of the current drag object if any */
							dragObject: null,
							/** The current mouse offset */
							mouseOffset: null,
							/** Remember the old value of X and Y so that we don't do too much processing */
							oldX: 0,
							oldY: 0,

							/** Actually build the structure */
							build: function(options) {
								// Set up the defaults if any

								this.each(function() {
									// This is bound to each matching table, set up the defaults and override with user options
									this.tableDnDConfig = $.extend({
										onDragStyle: null,
										onDropStyle: null,
										// Add in the default class for whileDragging
										onDragClass: "tDnD_whileDrag",
										onDrop: null,
										onDragStart: null,
										onDragStop: null,
										scrollAmount: 5,
										/** Sensitivity setting will throttle the trigger rate for movement detection */
										sensitivity: 10,
										/** Hierarchy level to support parent child. 0 switches this functionality off */
										hierarchyLevel: 0,
										/** The html artifact to prepend the first cell with as indentation */
										indentArtifact: '<div class="indent">&nbsp;</div>',
										/** Automatically adjust width of first cell */
										autoWidthAdjust: true,
										/** Automatic clean-up to ensure relationship integrity */
										autoCleanRelations: true,
										/** Specify a number (4) as number of spaces or any indent string for JSON.stringify */
										jsonPretifySeparator: '\t',
										/** The regular expression to use to trim row IDs */
										serializeRegexp: /[^\-]*$/,
										/** If you want to specify another parameter name instead of the table ID */
										serializeParamName: false,
										/** If you give the name of a class here, then only Cells with this class will be draggable */
										dragHandle: null
									}, options || {});

									// Now make the rows draggable
									$.tableDnD.makeDraggable(this);
									// Prepare hierarchy support
									this.tableDnDConfig.hierarchyLevel
									&& $.tableDnD.makeIndented(this);
								});

								// Don't break the chain
								return this;
							},
							makeIndented: function (table) {
								var config = table.tableDnDConfig,
								rows = table.rows,
								firstCell = $(rows).first().find('td:first')[0],
								indentLevel = 0,
								cellWidth = 0,
								longestCell,
								tableStyle;

								if ($(table).hasClass('indtd'))
									return null;

								tableStyle = $(table).addClass('indtd').attr('style');
								$(table).css({whiteSpace: "nowrap"});

								for (var w = 0; w < rows.length; w++) {
									if (cellWidth < $(rows[w]).find('td:first').text().length) {
										cellWidth = $(rows[w]).find('td:first').text().length;
										longestCell = w;
									}
								}
								$(firstCell).css({width: 'auto'});
								for (w = 0; w < config.hierarchyLevel; w++)
									$(rows[longestCell]).find('td:first').prepend(config.indentArtifact);
								firstCell && $(firstCell).css({width: firstCell.offsetWidth});
								tableStyle && $(table).css(tableStyle);

								for (w = 0; w < config.hierarchyLevel; w++)
									$(rows[longestCell]).find('td:first').children(':first').remove();

								config.hierarchyLevel
								&& $(rows).each(function () {
									indentLevel = $(this).data('level') || 0;
									indentLevel <= config.hierarchyLevel
									&& $(this).data('level', indentLevel)
									|| $(this).data('level', 0);
									for (var i = 0; i < $(this).data('level'); i++)
										$(this).find('td:first').prepend(config.indentArtifact);
								});

								return this;
							},
							/** This function makes all the rows on the table draggable apart from those marked as "NoDrag" */
							makeDraggable: function(table) {
								var config = table.tableDnDConfig;

								config.dragHandle
								// We only need to add the event to the specified cells
								&& $(config.dragHandle, table).each(function() {
									// The cell is bound to "this"
									$(this).bind(startEvent, function(e) {
										$.tableDnD.initialiseDrag($(this).parents('tr')[0], table, this, e, config);
										return false;
									});
								})
								// For backwards compatibility, we add the event to the whole row
								// get all the rows as a wrapped set
								|| $(table.rows).each(function() {
									// Iterate through each row, the row is bound to "this"
									if (! $(this).hasClass("nodrag")) {
										$(this).bind(startEvent, function(e) {
											if (e.target.tagName == "TD") {
												$.tableDnD.initialiseDrag(this, table, this, e, config);
												return false;
											}
										}).css("cursor", "move"); // Store the tableDnD object
									} else {
										$(this).css("cursor", ""); // Remove the cursor if we don't have the nodrag class
									}
								});
							},
							currentOrder: function() {
								var rows = this.currentTable.rows;
								return $.map(rows, function (val) {
									return ($(val).data('level') + val.id).replace(/\s/g, '');
								}).join('');
							},
							initialiseDrag: function(dragObject, table, target, e, config) {
								this.dragObject    = dragObject;
								this.currentTable  = table;
								this.mouseOffset   = this.getMouseOffset(target, e);
								this.originalOrder = this.currentOrder();

								// Now we need to capture the mouse up and mouse move event
								// We can use bind so that we don't interfere with other event handlers
								$(document)
								.bind(moveEvent, this.mousemove)
								.bind(endEvent, this.mouseup);

								// Call the onDragStart method if there is one
								config.onDragStart
								&& config.onDragStart(table, target);
							},
							updateTables: function() {
								this.each(function() {
									// this is now bound to each matching table
									if (this.tableDnDConfig)
										$.tableDnD.makeDraggable(this);
								});
							},
							/** Get the mouse coordinates from the event (allowing for browser differences) */
							mouseCoords: function(e) {
								if (e.originalEvent.changedTouches)
									return {
									x: e.originalEvent.changedTouches[0].clientX,
									y: e.originalEvent.changedTouches[0].clientY
								};

								if(e.pageX || e.pageY)
									return {
									x: e.pageX,
									y: e.pageY
								};

								return {
									x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
									y: e.clientY + document.body.scrollTop  - document.body.clientTop
								};
							},
							/** Given a target element and a mouse eent, get the mouse offset from that element.
				     To do this we need the element's position and the mouse position */
							getMouseOffset: function(target, e) {
								var mousePos,
								docPos;

								e = e || window.event;

								docPos    = this.getPosition(target);
								mousePos  = this.mouseCoords(e);

								return {
									x: mousePos.x - docPos.x,
									y: mousePos.y - docPos.y
								};
							},
							/** Get the position of an element by going up the DOM tree and adding up all the offsets */
							getPosition: function(element) {
								var left = 0,
								top  = 0;

								// Safari fix -- thanks to Luis Chato for this!
								// Safari 2 doesn't correctly grab the offsetTop of a table row
								// this is detailed here:
								// http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari/
								// the solution is likewise noted there, grab the offset of a table cell in the row - the firstChild.
								// note that firefox will return a text node as a first child, so designing a more thorough
								// solution may need to take that into account, for now this seems to work in firefox, safari, ie
								if (element.offsetHeight == 0)
									element = element.firstChild; // a table cell

								while (element.offsetParent) {
									left   += element.offsetLeft;
									top    += element.offsetTop;
									element = element.offsetParent;
								}

								left += element.offsetLeft;
								top  += element.offsetTop;

								return {
									x: left,
									y: top
								};
							},
							autoScroll: function (mousePos) {
								var config       = this.currentTable.tableDnDConfig,
								yOffset      = window.pageYOffset,
								windowHeight = window.innerHeight
								? window.innerHeight
										: document.documentElement.clientHeight
										? document.documentElement.clientHeight
												: document.body.clientHeight;

								// Windows version
								// yOffset=document.body.scrollTop;
								if (document.all)
									if (typeof document.compatMode != 'undefined'
										&& document.compatMode != 'BackCompat')
										yOffset = document.documentElement.scrollTop;
									else if (typeof document.body != 'undefined')
										yOffset = document.body.scrollTop;

								mousePos.y - yOffset < config.scrollAmount
								&& window.scrollBy(0, - config.scrollAmount)
								|| windowHeight - (mousePos.y - yOffset) < config.scrollAmount
								&& window.scrollBy(0, config.scrollAmount);

							},
							moveVerticle: function (moving, currentRow) {

								if (0 != moving.vertical
										// If we're over a row then move the dragged row to there so that the user sees the
										// effect dynamically
										&& currentRow
										&& this.dragObject != currentRow
										&& this.dragObject.parentNode == currentRow.parentNode)
									0 > moving.vertical
									&& this.dragObject.parentNode.insertBefore(this.dragObject, currentRow.nextSibling)
									|| 0 < moving.vertical
									&& this.dragObject.parentNode.insertBefore(this.dragObject, currentRow);

							},
							moveHorizontal: function (moving, currentRow) {
								var config       = this.currentTable.tableDnDConfig,
								currentLevel;

								if (!config.hierarchyLevel
										|| 0 == moving.horizontal
										// We only care if moving left or right on the current row
										|| !currentRow
										|| this.dragObject != currentRow)
									return null;

								currentLevel = $(currentRow).data('level');

								0 < moving.horizontal
								&& currentLevel > 0
								&& $(currentRow).find('td:first').children(':first').remove()
								&& $(currentRow).data('level', --currentLevel);

								0 > moving.horizontal
								&& currentLevel < config.hierarchyLevel
								&& $(currentRow).prev().data('level') >= currentLevel
								&& $(currentRow).children(':first').prepend(config.indentArtifact)
								&& $(currentRow).data('level', ++currentLevel);

							},
							mousemove: function(e) {
								var dragObj      = $($.tableDnD.dragObject),
								config       = $.tableDnD.currentTable.tableDnDConfig,
								currentRow,
								mousePos,
								moving,
								x,
								y;

								e && e.preventDefault();

								if (!$.tableDnD.dragObject)
									return false;

								// prevent touch device screen scrolling
								e.type == 'touchmove'
									&& event.preventDefault(); // TODO verify this is event and not really e

								// update the style to show we're dragging
								config.onDragClass
								&& dragObj.addClass(config.onDragClass)
								|| dragObj.css(config.onDragStyle);

								mousePos = $.tableDnD.mouseCoords(e);
								x = mousePos.x - $.tableDnD.mouseOffset.x;
								y = mousePos.y - $.tableDnD.mouseOffset.y;

								// auto scroll the window
								$.tableDnD.autoScroll(mousePos);

								currentRow = $.tableDnD.findDropTargetRow(dragObj, y);
								moving = $.tableDnD.findDragDirection(x, y);

								$.tableDnD.moveVerticle(moving, currentRow);
								$.tableDnD.moveHorizontal(moving, currentRow);

								return false;
							},
							findDragDirection: function (x,y) {
								var sensitivity = this.currentTable.tableDnDConfig.sensitivity,
								oldX        = this.oldX,
								oldY        = this.oldY,
								xMin        = oldX - sensitivity,
								xMax        = oldX + sensitivity,
								yMin        = oldY - sensitivity,
								yMax        = oldY + sensitivity,
								moving      = {
										horizontal: x >= xMin && x <= xMax ? 0 : x > oldX ? -1 : 1,
												vertical  : y >= yMin && y <= yMax ? 0 : y > oldY ? -1 : 1
								};

								// update the old value
								if (moving.horizontal != 0)
									this.oldX    = x;
								if (moving.vertical   != 0)
									this.oldY    = y;

								return moving;
							},
							/** We're only worried about the y position really, because we can only move rows up and down */
							findDropTargetRow: function(draggedRow, y) {
								var rowHeight = 0,
								rows      = this.currentTable.rows,
								config    = this.currentTable.tableDnDConfig,
								rowY      = 0,
								row       = null;

								for (var i = 0; i < rows.length; i++) {
									row       = rows[i];
									rowY      = this.getPosition(row).y;
									rowHeight = parseInt(row.offsetHeight) / 2;
									if (row.offsetHeight == 0) {
										rowY      = this.getPosition(row.firstChild).y;
										rowHeight = parseInt(row.firstChild.offsetHeight) / 2;
									}
									// Because we always have to insert before, we need to offset the height a bit
									if (y > (rowY - rowHeight) && y < (rowY + rowHeight))
										// that's the row we're over
										// If it's the same as the current row, ignore it
										if (draggedRow.is(row)
												|| (config.onAllowDrop
														&& !config.onAllowDrop(draggedRow, row))
														// If a row has nodrop class, then don't allow dropping (inspired by John Tarr and Famic)
														|| $(row).hasClass("nodrop"))
											return null;
										else
											return row;
								}
								return null;
							},
							processMouseup: function() {
								if (!this.currentTable || !this.dragObject)
									return null;

								var config      = this.currentTable.tableDnDConfig,
								droppedRow  = this.dragObject,
								parentLevel = 0,
								myLevel     = 0;

								// Unbind the event handlers
								$(document)
								.unbind(moveEvent, this.mousemove)
								.unbind(endEvent,  this.mouseup);

								config.hierarchyLevel
								&& config.autoCleanRelations
								&& $(this.currentTable.rows).first().find('td:first').children().each(function () {
									myLevel = $(this).parents('tr:first').data('level');
									myLevel
									&& $(this).parents('tr:first').data('level', --myLevel)
									&& $(this).remove();
								})
								&& config.hierarchyLevel > 1
								&& $(this.currentTable.rows).each(function () {
									myLevel = $(this).data('level');
									if (myLevel > 1) {
										parentLevel = $(this).prev().data('level');
										while (myLevel > parentLevel + 1) {
											$(this).find('td:first').children(':first').remove();
											$(this).data('level', --myLevel);
										}
									}
								});

								// If we have a dragObject, then we need to release it,
								// The row will already have been moved to the right place so we just reset stuff
								config.onDragClass
								&& $(droppedRow).removeClass(config.onDragClass)
								|| $(droppedRow).css(config.onDropStyle);

								this.dragObject = null;
								// Call the onDrop method if there is one
								config.onDrop
								&& this.originalOrder != this.currentOrder()
								&& $(droppedRow).hide().fadeIn('fast')
								&& config.onDrop(this.currentTable, droppedRow);

								// Call the onDragStop method if there is one
								config.onDragStop
								&& config.onDragStop(this.currentTable, droppedRow);

								this.currentTable = null; // let go of the table too
							},
							mouseup: function(e) {
								e && e.preventDefault();
								$.tableDnD.processMouseup();
								return false;
							},
							jsonize: function(pretify) {
								var table = this.currentTable;
								if (pretify)
									return JSON.stringify(
											this.tableData(table),
											null,
											table.tableDnDConfig.jsonPretifySeparator
									);
								return JSON.stringify(this.tableData(table));
							},
							serialize: function() {
								return $.param(this.tableData(this.currentTable));
							},
							serializeTable: function(table) {
								var result = "";
								var paramName = table.tableDnDConfig.serializeParamName || table.id;
								var rows = table.rows;
								for (var i=0; i<rows.length; i++) {
									if (result.length > 0) result += "&";
									var rowId = rows[i].id;
									if (rowId && table.tableDnDConfig && table.tableDnDConfig.serializeRegexp) {
										rowId = rowId.match(table.tableDnDConfig.serializeRegexp)[0];
										result += paramName + '[]=' + rowId;
									}
								}
								return result;
							},
							serializeTables: function() {
								var result = [];
								$('#musicListTable').each(function() {
									this.id && result.push($.param(this.tableData(this)));
								});
								return result.join('&');
							},
							tableData: function (table) {
								var config = table.tableDnDConfig,
								previousIDs  = [],
								currentLevel = 0,
								indentLevel  = 0,
								rowID        = null,
								data         = {},
								getSerializeRegexp,
								paramName,
								currentID,
								rows;

								if (!table)
									table = this.currentTable;
								if (!table || !table.id || !table.rows || !table.rows.length)
									return {error: { code: 500, message: "Not a valid table, no serializable unique id provided."}};

									rows      = config.autoCleanRelations
									&& table.rows
									|| $.makeArray(table.rows);
									paramName = config.serializeParamName || table.id;
									currentID = paramName;

									getSerializeRegexp = function (rowId) {
										if (rowId && config && config.serializeRegexp)
											return rowId.match(config.serializeRegexp)[0];
										return rowId;
									};

									data[currentID] = [];
									!config.autoCleanRelations
									&& $(rows[0]).data('level')
									&& rows.unshift({id: 'undefined'});



									for (var i=0; i < rows.length; i++) {
										if (config.hierarchyLevel) {
											indentLevel = $(rows[i]).data('level') || 0;
											if (indentLevel == 0) {
												currentID   = paramName;
												previousIDs = [];
											}
											else if (indentLevel > currentLevel) {
												previousIDs.push([currentID, currentLevel]);
												currentID = getSerializeRegexp(rows[i-1].id);
											}
											else if (indentLevel < currentLevel) {
												for (var h = 0; h < previousIDs.length; h++) {
													if (previousIDs[h][1] == indentLevel)
														currentID         = previousIDs[h][0];
													if (previousIDs[h][1] >= currentLevel)
														previousIDs[h][1] = 0;
												}
											}
											currentLevel = indentLevel;

											if (!$.isArray(data[currentID]))
												data[currentID] = [];
											rowID = getSerializeRegexp(rows[i].id);
											rowID && data[currentID].push(rowID);
										}
										else {
											rowID = getSerializeRegexp(rows[i].id);
											rowID && data[currentID].push(rowID);
										}
									}
									return data;
							}
					};

					jQuery.fn.extend(
							{
								tableDnD             : $.tableDnD.build,
								tableDnDUpdate       : $.tableDnD.updateTables,
								tableDnDSerialize    : $.proxy($.tableDnD.serialize, $.tableDnD),
								tableDnDSerializeAll : $.tableDnD.serializeTables,
								tableDnDData         : $.proxy($.tableDnD.tableData, $.tableDnD)
							}
					);

				}(jQuery, window, window.document));




/////////////////////////////////////////////////////////////////////








			}



			$(function(){
				//전체선택 체크박스 클릭
				$("#allCheck").click(function(){
					//만약 전체 선택 체크박스가 체크된상태일경우
					if($("#allCheck").prop("checked")) {
						//해당화면에 전체 checkbox들을 체크해준다
						$("input[type=checkbox]").prop("checked",true);
						// 전체선택 체크박스가 해제된 경우
					} else {
						//해당화면에 모든 checkbox들의 체크를해제시킨다.
						$("input[type=checkbox]").prop("checked",false);
					}
				});
			});

			$('.deleteMusicBtn').click(
					function(event) {
						var result = confirm("곡을 삭제하시겠습니까?");
						if(result){

							$.post('album/deletemusic.do', {
								album_no : album_no,
								music_no : this.id
							},
							function(resultObj) {
								var ajaxResult = resultObj.ajaxResult;
								if (ajaxResult.status == "success") {
									jQuery('#containers').load('myalbumlist.html');
									//location.reload(true);
								} else {
									alert("음악 삭제 실패");
								}
							},'json');
						}
						else {
							return false;
						}
					});

			$('#deleteAllCheck').click(
					function(event) {

						var count = $("input[type='checkbox']:checked").length;
						if ($("input:checkbox[id='allCheck']").is(":checked") == true){
							count = count-2;
							//count = count-1;
						}

						if (count !=0) {
							var result = confirm(count+"개의 곡을 삭제하시겠습니까?");
							if (result){

								$('input:checkbox[id="checkMusic"]').each(function() {
									if(this.checked == true){
										$.post('album/deletemusic.do', {
											album_no : album_no,
											music_no : this.value
										},
										function(resultObj) {
											var ajaxResult = resultObj.ajaxResult;
											if (ajaxResult.status == "success") {

												jQuery('#containers').load('myalbumlist.html');
												//location.reload(true);

											} else {
												alert("음악 삭제 실패");
											}
										},'json');
									} 
								});

							}
							else {
								return false;
							}
						}
						else {
							alert("선택된 곡이 없습니다!");
						}
					});




			// 짤라 붙인 부분
						
			$(function() {    	

				//var num = 0;
				$('#musicListTable').tableDnD({
					onDragStart: function(table, row) {

						$(table).parent().find('.result').text('');
					},
					onDrop: function(table, row) {
						var data = $(table).tableDnDSerialize();

						var array_data = data.split("&");	// 테이블행이 포함된 순서
						var no_array_data = new Array();	// 새로 잘라낸 순서?  a
						var no_array_data2 = new Array();	// 새로 잘라낸 순서?  a
						
						var ori_array = new Array(); 					// 원래 순서 저장용
						var temp_array = new Array();					// 임시 배열    b
						
						var arrayObj = new Array();
						var arrayObjData = new Array();
						var num =0;
						for (var i = 0; i < array_data.length; i++) {
							ori_array[i] = [musiclist[i].mu_no,musiclist[i].seq_no];
							no_array_data2[i] = array_data[i].substring(21);
							
							no_array_data[i] = array_data[i].substring(21);
							temp_array[i] = 0;
							
							
							if (no_array_data[i] != 0 && temp_array[i] == 0) {
								temp_array[i] = no_array_data[i];
								
							} else if(no_array_data[i] != 0 && temp_array[i] != 0) {
								temp_array[i+1] = no_array_data[i];
								
							} else if(no_array_data[i] == 0 && temp_array[i] == 0) {
								temp_array[i] = no_array_data[i+1];
								no_array_data[i+1] = 0;
							} 
							num++;
							console.log("num:" + num);
						};

						console.log("바뀌는 순서번호 :" + no_array_data);
						console.log("임시 음악/순서 : " + temp_array);
						console.log("num2 :" + num);
						if(num == no_array_data.length) {
							no_array_data=temp_array;
							temp_array = 0;
							console.log("바뀌는 순서번호 :" + no_array_data);
							console.log("임시 음악/순서 : " + temp_array);
							
						}
						//console.log("원래 음악/순서 : " + ori_array);
						//console.log("바뀌는 순서번호test :" + no_array_data2);
						
						
						sessionStorage.setItem("no_array_data",no_array_data);
						
						//var seq_session = sessionStorage.getItem('no_array_data').split(",");
						
						
							//musiclist[i].seq_no = parseInt(seq_session[i]);
							//music_no = musiclist[i].mu_no;
							
							//arrayObjData = {"music_no" : music_no, "seq_no" : musiclist[i].seq_no};
							//arrayObj.push(arrayObjData);
						
						
						//$("#listTbody").empty();
						//jQuery('#containers').load(c(album_no));
						sessionStorage.setItem("arrayObj", JSON.stringify(arrayObj));

					},
					dragHandle: ".dragHandle"

				});

				$("#musicListTable ").find("tr").hover(function() {
					$(this.cells[1]).addClass('showDragHandle');
				}, function() {
					$(this.cells[1]).removeClass('showDragHandle');
				});
			});

			$('#updateList').click(
					function(event) {
						if(sessionStorage.getItem('no_array_data')===null){
							alert("변경 사항이 없습니다.");
						}else {
							var result = confirm("저장 하시겠습니까?");

							var seq_session = sessionStorage.getItem('no_array_data').split(",");
							/////var new_seq = new Array();
							//console.log("길이2: "+ musiclist.length);
							//console.log(seq_session);
							var music_no = null;
							if(result){
								for (var i=0; i< musiclist.length; i++) {
									//console.log("바뀌기전 seq_no: "+musiclist[i].seq_no);
									////////console.log(musiclist[i].mu_no);
									musiclist[i].seq_no = seq_session[i];
									music_no = musiclist[i].mu_no;
									////////console.log("musiclist[i].seq_no "+musiclist[i].seq_no);
									//console.log("music_no : " + music_no);
									//console.log("seq_no : " + musiclist[i].seq_no);
									//console.log("=================================")
									$.post('album/updatemusic.do', {
										album_no : album_no,
										music_no : music_no,
										seq_no : musiclist[i].seq_no
									},
									function(resultObj) {
										var ajaxResult = resultObj.ajaxResult;
										if (ajaxResult.status == "success") {
											//$("#containers").empty();
											//jQuery('#containers').load(c(album_no));
											jQuery('#containers').load('myalbumlist.html');
											//location.reload(true);
										} else {
											alert("목록 변경 실패");
										}
									},'json');
								}
							}
							else {
								return false;
							}
						}
					});


		});
		};

		c(album_no);
	}


});


