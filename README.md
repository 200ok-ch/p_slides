# p_slides
## dead simple way to create semantic, nice to look at slides

  * forget about styling, only think about content
  * p_slides is static files only, it doesn't need a server, installed
    software, pre-compilation or a special editor (unless of course
    *your* favorite and very special editor!)
  * for editing and presenting, there are no external dependencies -
    it's just a html file (therefore it can easily be put into version
    control for example)
  * it's extendable and supports themes(see section "extensibility" for details)
  * write markdown (uses [remarkable.js](https://github.com/jonschlinkert/remarkable))
  * slides are automatically styled nicely (uses [twitter bootstrap](http://twitter.github.com/bootstrap/))
  * code samples are syntactically highlighted (uses [jquery syntax](https://github.com/ioquatix/jquery-syntax))
  * generates nice slides in the browser (uses [slidy.js](http://www.w3.org/Talks/Tools/Slidy2/))
    * use arrow keys to navigate
    * use the generated 'table of contents' for quick navigation
    * supports printing to pdf (see [presentation.pdf](https://cdn.rawgit.com/munen/p_slides/0.1.0/build/presentation.pdf))
    * every slide has a unique url for easy sharing
    * supports having a timer in the presentation (see meta[name="duration"] element in presentation.html
      * use an empty first slide if you don't want the timer to start
        automatically

---

# demo

* open the [demo presentation.html](http://cdn.rawgit.com/munen/p_slides/0.1.0/themes/zhaw/example_presentation.html) in your favourite browser
  * tested in current versions of chrome/safari/ff
* print the document to pdf if you need to
 * slides will automatically get separated into pages

---

# usage

* edit the [kickstart presentation.html](presentation.html) to create your content
  * use [markdown syntax](http://daringfireball.net/projects/markdown/syntax)
  * supports tables with [Github flavored markdown syntax](https://help.github.com/articles/organizing-information-with-tables/)
  * create page breaks using '---'

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
# extensibility

* p_slides supports themes
* see
  * [example presentation](http://cdn.rawgit.com/munen/p_slides/0.1.0/themes/zhaw/example_presentation.html)
     * All links within this example are linking to cdn.rawgit.com to
       enable immediate preview from Github. When you're building your
       own presentation, you can use the
       [kickstart presentation.html](presentation.html) which refers
       to local assets.
  * [example presentation pdf](https://cdn.rawgit.com/munen/p_slides/0.1.0/themes/zhaw/zhaw_presentation.pdf)
  * [zhaw theme](https://cdn.rawgit.com/munen/p_slides/tree/0.1.0/themes/zhaw)

---
# development

## upgrade

* create a new tag
* change cdn.rawgit.com links to assets (examples and README) to refer to new tag
