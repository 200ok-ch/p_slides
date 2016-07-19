$(".presentation").each(function() {
    var md = new Remarkable('full', { html: true });
    var markup = md.render($(this).html());
    var slides = markup.split('<hr>');
    for (var j = 0; j < slides.length; j++)
        document.write('<div class=slide>' + slides[j] + '</div>');
});
$(".presentation").remove();

// if you want to syntax highlight *all* your code in the same way
// then you can uncomment and customize the next line
//
//$("pre>code").parent().addClass("syntax cpp");

w3c_slidy.add_listener(document.body, "touchend", w3c_slidy.mouse_button_click);

$.syntax();

// automatic detection for theme javascript so that it can run after
// slides have been generated
for(i in document.styleSheets) {
    stylesheet = document.styleSheets[i].href
    if (stylesheet && stylesheet.indexOf("theme") != -1) {
        theme = stylesheet.slice(stylesheet.lastIndexOf("/")+1, stylesheet.length);
        eval(theme.replace(".css", "()"));
    }
}
