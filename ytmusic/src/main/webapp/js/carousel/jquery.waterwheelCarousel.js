/*! ResponsiveSlides.js v1.54 
2  * http://responsiveslides.com 
3  * http://viljamis.com 
4  * 
5  * Copyright (c) 2011-2012 @viljamis 
6  * Available under the MIT license 
7  */ 
8 
 
9 /*jslint browser: true, sloppy: true, vars: true, plusplus: true, indent: 2 */ 
10 
 
11 (function ($, window, i) { 
12   $.fn.responsiveSlides = function (options) { 
13 
 
14     // Default settings 
15     var settings = $.extend({ 
16       "auto": true,             // Boolean: Animate automatically, true or false 
17       "speed": 500,             // Integer: Speed of the transition, in milliseconds 
18       "timeout": 4000,          // Integer: Time between slide transitions, in milliseconds 
19       "pager": false,           // Boolean: Show pager, true or false 
20       "nav": false,             // Boolean: Show navigation, true or false 
21       "random": false,          // Boolean: Randomize the order of the slides, true or false 
22       "pause": false,           // Boolean: Pause on hover, true or false 
23       "pauseControls": true,    // Boolean: Pause when hovering controls, true or false 
24       "prevText": "Previous",   // String: Text for the "previous" button 
25       "nextText": "Next",       // String: Text for the "next" button 
26       "maxwidth": "",           // Integer: Max-width of the slideshow, in pixels 
27       "navContainer": "",       // Selector: Where auto generated controls should be appended to, default is after the <ul> 
28       "manualControls": "",     // Selector: Declare custom pager navigation 
29       "namespace": "rslides",   // String: change the default namespace used 
30       "before": $.noop,         // Function: Before callback 
31       "after": $.noop           // Function: After callback 
32     }, options); 
33 
 
34     return this.each(function () { 
35 
 
36       // Index for namespacing 
37       i++; 
38 
 
39       var $this = $(this), 
40 
 
41         // Local variables 
42         vendor, 
43         selectTab, 
44         startCycle, 
45         restartCycle, 
46         rotate, 
47         $tabs, 
48 
 
49         // Helpers 
50         index = 0, 
51         $slide = $this.children(), 
52         length = $slide.size(), 
53         fadeTime = parseFloat(settings.speed), 
54         waitTime = parseFloat(settings.timeout), 
55         maxw = parseFloat(settings.maxwidth), 
56 
 
57         // Namespacing 
58         namespace = settings.namespace, 
59         namespaceIdx = namespace + i, 
60 
 
61         // Classes 
62         navClass = namespace + "_nav " + namespaceIdx + "_nav", 
63         activeClass = namespace + "_here", 
64         visibleClass = namespaceIdx + "_on", 
65         slideClassPrefix = namespaceIdx + "_s", 
66 
 
67         // Pager 
68         $pager = $("<ul class='" + namespace + "_tabs " + namespaceIdx + "_tabs' />"), 
69 
 
70         // Styles for visible and hidden slides 
71         visible = {"float": "left", "position": "relative", "opacity": 1, "zIndex": 2}, 
72         hidden = {"float": "none", "position": "absolute", "opacity": 0, "zIndex": 1}, 
73 
 
74         // Detect transition support 
75         supportsTransitions = (function () { 
76           var docBody = document.body || document.documentElement; 
77           var styles = docBody.style; 
78           var prop = "transition"; 
79           if (typeof styles[prop] === "string") { 
80             return true; 
81           } 
82           // Tests for vendor specific prop 
83           vendor = ["Moz", "Webkit", "Khtml", "O", "ms"]; 
84           prop = prop.charAt(0).toUpperCase() + prop.substr(1); 
85           var i; 
86           for (i = 0; i < vendor.length; i++) { 
87             if (typeof styles[vendor[i] + prop] === "string") { 
88               return true; 
89             } 
90           } 
91           return false; 
92         })(), 
93 
 
94         // Fading animation 
95         slideTo = function (idx) { 
96           settings.before(idx); 
97           // If CSS3 transitions are supported 
98           if (supportsTransitions) { 
99             $slide 
100               .removeClass(visibleClass) 
101               .css(hidden) 
102               .eq(idx) 
103               .addClass(visibleClass) 
104               .css(visible); 
105             index = idx; 
106             setTimeout(function () { 
107               settings.after(idx); 
108             }, fadeTime); 
109           // If not, use jQuery fallback 
110           } else { 
111             $slide 
112               .stop() 
113               .fadeOut(fadeTime, function () { 
114                 $(this) 
115                   .removeClass(visibleClass) 
116                   .css(hidden) 
117                   .css("opacity", 1); 
118               }) 
119               .eq(idx) 
120               .fadeIn(fadeTime, function () { 
121                 $(this) 
122                   .addClass(visibleClass) 
123                   .css(visible); 
124                 settings.after(idx); 
125                 index = idx; 
126               }); 
127           } 
128         }; 
129 
 
130       // Random order 
131       if (settings.random) { 
132         $slide.sort(function () { 
133           return (Math.round(Math.random()) - 0.5); 
134         }); 
135         $this 
136           .empty() 
137           .append($slide); 
138       } 
139 
 
140       // Add ID's to each slide 
141       $slide.each(function (i) { 
142         this.id = slideClassPrefix + i; 
143       }); 
144 
 
145       // Add max-width and classes 
146       $this.addClass(namespace + " " + namespaceIdx); 
147       if (options && options.maxwidth) { 
148         $this.css("max-width", maxw); 
149       } 
150 
 
151       // Hide all slides, then show first one 
152       $slide 
153         .hide() 
154         .css(hidden) 
155         .eq(0) 
156         .addClass(visibleClass) 
157         .css(visible) 
158         .show(); 
159 
 
160       // CSS transitions 
161       if (supportsTransitions) { 
162         $slide 
163           .show() 
164           .css({ 
165             // -ms prefix isn't needed as IE10 uses prefix free version 
166             "-webkit-transition": "opacity " + fadeTime + "ms ease-in-out", 
167             "-moz-transition": "opacity " + fadeTime + "ms ease-in-out", 
168             "-o-transition": "opacity " + fadeTime + "ms ease-in-out", 
169             "transition": "opacity " + fadeTime + "ms ease-in-out" 
170           }); 
171       } 
172 
 
173       // Only run if there's more than one slide 
174       if ($slide.size() > 1) { 
175 
 
176         // Make sure the timeout is at least 100ms longer than the fade 
177         if (waitTime < fadeTime + 100) { 
178           return; 
179         } 
180 
 
181         // Pager 
182         if (settings.pager && !settings.manualControls) { 
183           var tabMarkup = []; 
184           $slide.each(function (i) { 
185             var n = i + 1; 
186             tabMarkup += 
187               "<li>" + 
188               "<a href='#' class='" + slideClassPrefix + n + "'>" + n + "</a>" + 
189               "</li>"; 
190           }); 
191           $pager.append(tabMarkup); 
192 
 
193           // Inject pager 
194           if (options.navContainer) { 
195             $(settings.navContainer).append($pager); 
196           } else { 
197             $this.after($pager); 
198           } 
199         } 
200 
 
201         // Manual pager controls 
202         if (settings.manualControls) { 
203           $pager = $(settings.manualControls); 
204           $pager.addClass(namespace + "_tabs " + namespaceIdx + "_tabs"); 
205         } 
206 
 
207         // Add pager slide class prefixes 
208         if (settings.pager || settings.manualControls) { 
209           $pager.find('li').each(function (i) { 
210             $(this).addClass(slideClassPrefix + (i + 1)); 
211           }); 
212         } 
213 
 
214         // If we have a pager, we need to set up the selectTab function 
215         if (settings.pager || settings.manualControls) { 
216           $tabs = $pager.find('a'); 
217 
 
218           // Select pager item 
219           selectTab = function (idx) { 
220             $tabs 
221               .closest("li") 
222               .removeClass(activeClass) 
223               .eq(idx) 
224               .addClass(activeClass); 
225           }; 
226         } 
227 
 
228         // Auto cycle 
229         if (settings.auto) { 
230 
 
231           startCycle = function () { 
232             rotate = setInterval(function () { 
233 
 
234               // Clear the event queue 
235               $slide.stop(true, true); 
236 
 
237               var idx = index + 1 < length ? index + 1 : 0; 
238 
 
239               // Remove active state and set new if pager is set 
240               if (settings.pager || settings.manualControls) { 
241                 selectTab(idx); 
242               } 
243 
 
244               slideTo(idx); 
245             }, waitTime); 
246           }; 
247 
 
248           // Init cycle 
249           startCycle(); 
250         } 
251 
 
252         // Restarting cycle 
253         restartCycle = function () { 
254           if (settings.auto) { 
255             // Stop 
256             clearInterval(rotate); 
257             // Restart 
258             startCycle(); 
259           } 
260         }; 
261 
 
262         // Pause on hover 
263         if (settings.pause) { 
264           $this.hover(function () { 
265             clearInterval(rotate); 
266           }, function () { 
267             restartCycle(); 
268           }); 
269         } 
270 
 
271         // Pager click event handler 
272         if (settings.pager || settings.manualControls) { 
273           $tabs.bind("click", function (e) { 
274             e.preventDefault(); 
275 
 
276             if (!settings.pauseControls) { 
277               restartCycle(); 
278             } 
279 
 
280             // Get index of clicked tab 
281             var idx = $tabs.index(this); 
282 
 
283             // Break if element is already active or currently animated 
284             if (index === idx || $("." + visibleClass).queue('fx').length) { 
285               return; 
286             } 
287 
 
288             // Remove active state from old tab and set new one 
289             selectTab(idx); 
290 
 
291             // Do the animation 
292             slideTo(idx); 
293           }) 
294             .eq(0) 
295             .closest("li") 
296             .addClass(activeClass); 
297 
 
298           // Pause when hovering pager 
299           if (settings.pauseControls) { 
300             $tabs.hover(function () { 
301               clearInterval(rotate); 
302             }, function () { 
303               restartCycle(); 
304             }); 
305           } 
306         } 
307 
 
308         // Navigation 
309         if (settings.nav) { 
310           var navMarkup = 
311             "<a href='#' class='" + navClass + " prev'>" + settings.prevText + "</a>" + 
312             "<a href='#' class='" + navClass + " next'>" + settings.nextText + "</a>"; 
313 
 
314           // Inject navigation 
315           if (options.navContainer) { 
316             $(settings.navContainer).append(navMarkup); 
317           } else { 
318             $this.after(navMarkup); 
319           } 
320 
 
321           var $trigger = $("." + namespaceIdx + "_nav"), 
322             $prev = $trigger.filter(".prev"); 
323 
 
324           // Click event handler 
325           $trigger.bind("click", function (e) { 
326             e.preventDefault(); 
327 
 
328             var $visibleClass = $("." + visibleClass); 
329 
 
330             // Prevent clicking if currently animated 
331             if ($visibleClass.queue('fx').length) { 
332               return; 
333             } 
334 
 
335             //  Adds active class during slide animation 
336             //  $(this) 
337             //    .addClass(namespace + "_active") 
338             //    .delay(fadeTime) 
339             //    .queue(function (next) { 
340             //      $(this).removeClass(namespace + "_active"); 
341             //      next(); 
342             //  }); 
343 
 
344             // Determine where to slide 
345             var idx = $slide.index($visibleClass), 
346               prevIdx = idx - 1, 
347               nextIdx = idx + 1 < length ? index + 1 : 0; 
348 
 
349             // Go to slide 
350             slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx); 
351             if (settings.pager || settings.manualControls) { 
352               selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx); 
353             } 
354 
 
355             if (!settings.pauseControls) { 
356               restartCycle(); 
357             } 
358           }); 
359 
 
360           // Pause when hovering navigation 
361           if (settings.pauseControls) { 
362             $trigger.hover(function () { 
363               clearInterval(rotate); 
364             }, function () { 
365               restartCycle(); 
366             }); 
367           } 
368         } 
369 
 
370       } 
371 
 
372       // Max-width fallback 
373       if (typeof document.body.style.maxWidth === "undefined" && options.maxwidth) { 
374         var widthSupport = function () { 
375           $this.css("width", "100%"); 
376           if ($this.width() > maxw) { 
377             $this.css("width", maxw); 
378           } 
379         }; 
380 
 
381         // Init fallback 
382         widthSupport(); 
383         $(window).bind("resize", function () { 
384           widthSupport(); 
385         }); 
386       } 
387 
 
388     }); 
389 
 
390   }; 
391 })(jQuery, this, 0); 
