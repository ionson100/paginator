(function ($) {
    $.fn.Panelnavigations = function (options) {
        var settings = $.extend({
            'totalcount': 100,
            'select': 1,
            'prefixcount': 10,
            'image1': null,
            'image2': null,
            'image3': null,
            'image4': null,
            'eventclick': null,
            'isshowimage': true,
            'ishidebloc': false,
            'appender': '<div>{0}</div>',
            'isget': false,
        }, options);
        var intem = settings.select;
        if (settings.select <= 0 || settings.select > settings.totalcount) {
            intem = 1;
        }
        if (settings.prefixcount > 1 && settings.prefixcount <= settings.totalcount && settings.totalcount != 0) {
            firstRendering(intem, this, settings);
        }
    };

    function firstRendering(intem, div, settings) {

        
        var table = $("<table></table>").addClass('pn_tabe');
        var tr = $('<tr></tr>').addClass('pn_tabe_row');

        if (settings.isshowimage) {
            if (intem != 1 || !settings.ishidebloc) {
                if (settings.image1 != null) {

                    addTdImage(tr, intem == 1 ? 'pn_image1' : 'pn_image1 pn', -1, settings.image1.alt, settings.image1.url, settings, div, intem != 1);
                }
                if (settings.image2 != null) {
                    addTdImage(tr, intem == 1 ? 'pn_image2' : 'pn_image2 pn', -2, settings.image2.alt, settings.image2.url, settings, div, intem != 1);
                }
            }
        }

        if (settings.prefixcount + 5 >= settings.totalcount) {
           prinItem(intem, tr, div, settings);
        } else {

            if (intem >= 1 && intem <= settings.prefixcount - 1) {
                for (var i = 0; i < settings.prefixcount; i++) {
                    prinItemOne(intem, i, tr, div, settings);

                }

                printZero(tr);
                prinItemOne(intem, settings.totalcount - 1, tr, div, settings);
            } else

                if (intem >= settings.totalcount - settings.prefixcount + 2 && intem <= settings.totalcount) {
                    prinItemOne(intem, 0, tr, div, settings);
                    printZero(tr);
                    for (var j = settings.totalcount - settings.prefixcount; j < settings.totalcount; j++) {
                        prinItemOne(intem, j, tr, div, settings);
                    }
                } else {
                    var point = Math.round(settings.prefixcount / 2);

                    var start = intem - point;
                    prinItemOne(intem, 0, tr, div, settings);
                    printZero(tr);
                    var current = 0;
               
                    for (var k = start; k < start + settings.prefixcount; k++) {
                        current = k;
                        if (k <= settings.totalcount)
                            prinItemOne(intem, k, tr, div, settings);
                    }
                    if (k < settings.totalcount - 1) {
                        printZero(tr);
                        prinItemOne(intem, settings.totalcount - 1, tr, div, settings);
                    }
                }
        }

        if (settings.isshowimage) {
            if (intem != settings.totalcount || !settings.ishidebloc) {
                if (settings.image3 != null) {
                    addTdImage(tr, intem == settings.totalcount ? 'pn_image2' : 'pn_image2 pn', -3, settings.image3.alt, settings.image3.url, settings, div, intem != settings.totalcount);
                }
                if (settings.image4 != null) {
                    addTdImage(tr, intem == settings.totalcount ? 'pn_image1' : 'pn_image1 pn', -4, settings.image4.alt, settings.image4.url, settings, div, intem != settings.totalcount);
                }
            }
        }

        addSelectHidde(tr, intem);
        $(div).append(table.append(tr));
    }

    function addTdImage(tr, divclass, valueclick, altimage, imageurl, settings, divs, isbind) {
        var td = $("<td></td>");//;
        var div = $("<div  class='" + divclass + "'></div>");
        var image = $("<img src='" + imageurl + "'  alt='" + altimage + "' />");
        if (isbind) {
            image.bind("click", { page: valueclick, settings: settings, div: divs, isimage: true }, selector);
        }
        tr.append(td.append(div.append(image)));
    };

    function addTdItem(tr, valueclick, classdiv, settings, divs, isbind) {
        var td = $("<td></td>");//;
        var div = $("<div class='" + classdiv + "'></div>");
        var pattern = $(String.format(settings.appender, valueclick));
        if (isbind) {

            pattern.bind("click", { page: valueclick, settings: settings, div: divs }, selector);
        } else {
            pattern = $(String.format("<div>{0}</div>", valueclick));
        }
        tr.append(td.append(div.append(pattern)));
    }

    function addSelectHidde(tr, value) {
        var td = $("<td></td>");
        var zip = $("#selectitem").size();
        var addin = zip == 0 ? "" : zip + 1;
        tr.append(td.append($("<input type='hidden' name='selectitem' value='" + value + "' id='selectitem" + addin + "' />")));
    }

    function selector(base) {
        var val = base.data.page;
        var valreal = val;

        var value = $(base.data.div).find("[name = 'selectitem']").val();
        if (val == -1) {
            valreal = 1;
        }
        if (val == -2) {
            var v = parseInt(value) - 1;
            valreal = v;
        }
        if (val == -3) {
            v = parseInt(value) + 1;
            valreal = v;
        }
        if (val == -4) {
            valreal = base.data.settings.totalcount;
        }
        if (val < -4 || val > base.data.settings.totalcount) {
            valreal = 1;
        }

        $(base.data.div).empty();
        firstRendering(valreal, base.data.div, base.data.settings);
        if (base.data.settings.eventclick != null) {
            base.data.settings.eventclick(val, valreal);
        }

        if (base.data.isimage && base.data.settings.isget) {

            var ee = $(String.format(base.data.settings.appender, valreal));
            window.location = ee[0].href;
        }
    }

    function prinItem(intem, tr, div, settings) {
        for (var i = 0; i < settings.totalcount; i++) {
            if (intem == i + 1) {
                addTdItem(tr, (i + 1), 'pn_item_select', settings, div, false);
            } else {
                addTdItem(tr, (i + 1), 'pn_item pn', settings, div, true);
            }
        }

    }

    function prinItemOne(intem, i, tr, div, settings) {

        if (intem == i + 1) {
            addTdItem(tr, (i + 1), 'pn_item_select', settings, div, false);
        } else {
            addTdItem(tr, (i + 1), 'pn_item pn', settings, div, true);
        }
    }

    function printZero(tr) {
        var td = $("<td></td>");
        var d = $("<div class='pn_zero'></div>");
        d.append("...");
        td.append(d);
        tr.append(td);
    }
    if (!String.format) {
        String.format = function (format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                  ? args[number]
                  : match
                ;
            });
        };
    }

})(jQuery);








