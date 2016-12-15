$(".presentation").each(function() {
    var md = new Remarkable('full', { html: true });
    var markup = md.render($(this).html());
    var slides = markup.split('<hr>');
    var new_document = [];
    for (var j = 0; j < slides.length; j++)
        new_document.push('<div class=slide>' + slides[j] + '</div>');
    document.write(new_document.join(""));
});
$(".presentation").remove();

// If you want to syntax highlight all your code in the same way then
// you can uncomment and customize the next line
//
//$("pre>code").parent().addClass("syntax cpp");

w3c_slidy.add_listener(document.body, "touchend", w3c_slidy.mouse_button_click);

$.syntax();

// Automatic detection for theme javascript. It will run after slides
// have been generated
for(i in document.styleSheets) {
    stylesheet = document.styleSheets[i].href;
    if (stylesheet && stylesheet.indexOf("theme") != -1) {
        theme = stylesheet.slice(stylesheet.lastIndexOf("/")+1, stylesheet.length);
        eval(theme.replace(".css", "()"));
    }
}
