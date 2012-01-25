# p_slides
## dead simple way to create semantic, nice to look at slides

  * forget about styling, only think about content
    * write markdown inline in html (uses [showdown.js](https://github.com/coreyti/showdown))
    * slides are automatically styled nicely (uses [twitter bootstrap](http://twitter.github.com/bootstrap/))
    * code samples are syntactically highlighted (uses [jquery syntax](http://www.oriontransfer.co.nz/projects/jquery-syntax/index.en))
    * generates nice slides in the browser (uses [slidy.js](http://www.w3.org/Talks/Tools/Slidy2/))
      * use arrow keys to navigate
      * use the generated 'table of contents' for quick navigation
      * supports printing to pdf (see presentation.pdf)

## usage

* edit presentation.html to create your content
  * use regular [markdown syntax](http://daringfireball.net/projects/markdown/syntax)
  * create page breaks using '---'
* open presentation.html in your favourite browser (tested in chrome/safari)
* if need be, print the document to pdf
 * slides will automatically get separated into pages
 * styling will keep intact
