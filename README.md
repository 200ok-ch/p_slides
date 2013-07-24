# p_slides
## dead simple way to create semantic, nice to look at slides

  * forget about styling, only think about content
    * write markdown (uses [showdown.js](https://github.com/coreyti/showdown))
    * slides are automatically styled nicely (uses [twitter bootstrap](http://twitter.github.com/bootstrap/))
    * code samples are syntactically highlighted (uses [jquery syntax](http://www.oriontransfer.co.nz/projects/jquery-syntax/index.en))
    * generates nice slides in the browser (uses [slidy.js](http://www.w3.org/Talks/Tools/Slidy2/))
      * use arrow keys to navigate
      * use the generated 'table of contents' for quick navigation
      * supports printing to pdf (see [presentation.pdf](https://github.com/munen/p_slides/raw/master/build/presentation.pdf))

---

# usage

* edit presentation.html to create your content
  * use [markdown syntax](http://daringfireball.net/projects/markdown/syntax)
    with [table extension](https://github.com/coreyti/showdown/blob/master/src/extensions/table.js)
  * create page breaks using '---'
* open presentation.html in your favourite browser
  * tested in current versions of chrome/safari/ff
* if need be, print the document to pdf
 * slides will automatically get separated into pages

---
# syntax highlighting

* write your code in &lt;pre&gt; tags
* annotate the given language using a css class

## example code
<pre>
&lt;pre class="syntax c"&gt;
static int foo;
void bar(void) {
    foo = 0;
    while (foo != 255) ; }
&lt;/pre&gt;
</pre>

## becomes
```c
static int foo;
void bar(void) {
    foo = 0;
    while (foo != 255) ; }
```

---
# syntax highlighting

* if you want to syntax highlight *all* your code in the same way
  then you can uncomment and customize the following line at the
  bottom of the presentation.html file:

<pre>
$('pre &gt; code').parent().addClass("syntax cpp");
</pre>

---
# extendability

* p_slides supports theming
* see
 * [example presentation](https://github.com/munen/p_slides/raw/master/themes/zhaw/example_presentation.html)
 * [example presentation pdf](https://github.com/munen/p_slides/raw/master/themes/zhaw/zhaw_presentation.pdf)
 * [example theme](https://github.com/munen/p_slides/tree/master/themes/zhaw)
