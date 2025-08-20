$(function () {
  $('a[href^="#"]').click(function () {
    var speed = 400;
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });
});

$(function () {
  var topBtn = $('#page-top');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      500,
    );
    return false;
  });
});

$(function () {
  $('#from *').removeAttr('style');
});
