/*
 * this is an extension for the zurich university of applied sciences
 *   - make sure every slide has a footer when no explicit footer is given
 *   - include page number in footer
 */

function zhaw() {
  page_count = 1;
  $('.slide').each(function() {
    footer = $(this).find("footer");
    console.log(footer);
    //
    if (footer.length == 0) {
      $(this).append("<footer>" + default_footer + "</footer>");
      footer = $(this).find("footer");
    }
    content = footer.html();
    footer.html(content + "<span class='page_no'>" + page_count++ + "</span>");
  });
};
