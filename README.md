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

# demo

* open the [demo presentation.html](http://cdn.rawgit.com/munen/p_slides/0.1.0/themes/zhaw/example_presentation.html) in your favourite browser
  * tested in current versions of chrome/safari/ff
* print the document to pdf if you need to
 * slides will automatically get separated into pages

# usage

* edit the [kickstart presentation.html](presentation.html) to create your content
  * use [markdown syntax](http://daringfireball.net/projects/markdown/syntax)
  * supports tables with [Github flavored markdown syntax](https://help.github.com/articles/organizing-information-with-tables/)
  * create page breaks using '---'

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

# syntax highlighting

* if you want to syntax highlight *all* your code in the same way
  then you can uncomment and customize the following line at the
  bottom of the presentation.html file:

<pre>
$('pre &gt; code').parent().addClass("syntax cpp");
</pre>

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

# rationale

* Five years ago I became a lecturer at the Zurich University of
  applied Sciences
* With this, I was tasked with creating great lectures with good
  presentations and labs
* Looking at the landscape of the popular tools out there, I saw that
  most people are doing WYSIWYG - however, I knew that this was going
  to be a waste of time (I'm not going into this generic argument
  here, if you don't agree, that's absolutely ok)
* I wanted a tool that
  * works well cross-platform
  * works well with version control
  * uses a succinct and well-known markup language (markdown, org-mode, ...)
  * has no dependencies to install for other lecturers
  * allows for demos in the browser with distribution via PDF
  * allows editing with a regular text editor (for me that was VIM for
    well over a decade, now it's Emacs), because this yields the
    greatest typing efficiency
* There was no such thing in 2011, so I created p_slides
* To this day p_slides prevails with regard to the above list
  * There are a lot of other tools out there, but as far as I know,
    they all fail one of the above criteria.

# p_slides design decisions

* a p_slide presentation is only a static file that you can put into
  version control and work on collaboratively with your peers
* p_slides is explicitly dumb
  * it has no requirements to install additional software, pre-compile
    anything or run a server
  * therefore it is completely self-contained/self-hosted and doesn't
    require any complications for less technical users
    * no usage of the command-line is required (no ruby, node, npm,
      browserify, gulp, babel, ...)
    * no compilation step is required
    * no hosting solution is preferred, not even Github Pages

# difference to reveal-js (and other popular options)

* Out of the box reveal-js does not support Markdown Slides. Yes, of
  course they do, but you'll have to write HTML per slide and then
  embed Markdown. With p_slides, you'll write your markdown directly
  inline - no HTML cruft where it doesn't add benefit.

* reveal-js is _much_ bigger whereas p_slides relies on well tested
  and established software. For example many features that you can
  find on the reveal-js README are also included in p_slides, because
  it uses W3Org slidy-js. p_slides actually is only very little code
  itself as it glues together very well established and good existing
  libraries. reveal-js does a lot by itself. Both options are valid,
  yet they are different(;




# development

## upgrade

* create a new tag
* change cdn.rawgit.com links to assets (examples and README) to refer to new tag
