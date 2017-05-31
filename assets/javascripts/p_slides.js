$(".presentation").each(function() {
  var md = new Remarkable('full', { html: true//,
                                    // Here goes a real syntax highlighter
                                    //highlight: function (str, lang) {
                                    //  return str;
                                    //}
                                  });
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

// XXX: Work Around
// RemarkableJS above translates content of <pre> Tags into HTML.
// Therefore empty lines will create new paragraphs. Remove those
// paragraphs, so that the newlines stay intact for code highlighting.

// Note: Indentation is lost and cannot be retrieved here

// Note: The better solution is to ditch jquery-syntax and go with
// something that can be used together with RemarkableJS.
$("pre.syntax").map(function(element) {
  $(this).html($(this).
               html().
               replace(/<p>/g, "\n").
               replace(/<\/p>/g, ""));
});

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
