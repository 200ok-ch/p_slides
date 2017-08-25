#!/usr/bin/env phantomjs

var system = require("system");

if (!system.args[1]) {
    console.log("Usage: ./create_pdf.js URL");
    phantom.exit();
}

var page = require('webpage').create();
page.viewportSize = { width: 1280, height: 1024 };
page.dpi = 300;
page.paperSize = {
    format: 'B7',
    orientation: 'landscape'
};

page.open(system.args[1], function() {
    page.dpi = 300;
    page.render('tmp.pdf');
    var process = require("child_process");
    var spawn = process.spawn;
    var execFile = process.execFile;

    var child = execFile("pdftk", ["tmp.pdf", "cat", "2-end", "output", "presentation.pdf"],
                         null,
                         function(err, stdout, stderr) {
                             phantom.exit();
                         });
});
