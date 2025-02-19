// JavaScript Document




//----------------onload event----------------

$(window).on('load', function(){
  setTimeout(function(){
		$('.load_event').addClass('active');
    $('.onload').addClass('open');
    $('.onload_scroll').addClass('scroll_in');
	},200);
	setTimeout(function(){
		$('body').addClass('scroll_on');
	},800);
  
});



//----------------nav responsive---------------

$(function(){
  $(".nav_trigger_outer").click(function(){      
    $(this).toggleClass('active');
	  $("#gloval_nav").toggleClass('active');
    $('body').removeClass('scroll_on');
  });
  $("#gloval_nav").click(function(){      
    $(this).removeClass('active');
	  $(".nav_trigger_outer").removeClass('active');
    $('body').addClass('scroll_on');
  });
  $(".nav_anchor").click(function(){    
    $("#gloval_nav").removeClass('active');
  	$(".nav_trigger_outer").removeClass('active');
    $('body').addClass('scroll_on');
  });
});

//----------------pc nav----------------

$(function(){
  $(".event_trigger_hov").hover(function(){      
    $(".event_trigger").toggleClass('active');
	$(".event_link_box").toggleClass('active');
    return false;
  });
});

$(function(){
  $(".live_trigger_hov").hover(function(){
	$(".live_trigger").toggleClass('active');
    $(".live_link_box").toggleClass('active');
    return false;
  });
});

$(function(){
  $(".main_box").hover(function(){
	$(".event_link_box").removeClass('active');
    $(".live_link_box").removeClass('active');
    return false;
  });
});




//----------------modal---------------

$(function(){
  $(".mono_modal_open").click(function(){
    $(".mono_modal").removeClass('visible');
    $(this).next(".mono_modal").addClass('visible');
      return false;
  });
});



$(function(){
  $(".slide_modal_open").click(function(){
    const slideindex = $('.slide_modal_open_box .slide_modal_open').index(this); //クリックした発火要素が何番目か取得
    
    $(".slide_modal").addClass('visible'); //モーダルウィンドウオープン
    $('.slide_modal_content_box .slide_modal_content').removeClass('slide_visible'); //一度モーダルスライド全部非表示
    $('.slide_modal_content_box .slide_modal_content').eq(slideindex).addClass('slide_visible'); //クリックした発火要素と同じ順番のスライドを表示
    $('.slide_modal .modal_prev_btn , .slide_modal .modal_next_btn ').removeClass('disactive'); //コントローラーのステータスリセット
    
    const slidelength = $('.slide_modal_content_box .slide_modal_content').length; //スライドの数を取得
    if (slideindex == "0")  {
      $('.slide_modal .modal_prev_btn').addClass('disactive'); //最初のスライドをクリックした時、prevをクリック不可に
    }
    if (slideindex == (slidelength - 1))  {
      $('.slide_modal .modal_next_btn').addClass('disactive'); //最後のスライドをクリックした時、nextをクリック不可に
    }
    return false;
  });
});


  function modal_slide_right(){
    const slideindex = $('.slide_visible').index('.slide_modal_content_box .slide_modal_content'); // .slide_visible がついてる要素が何番目か取得
    
    $(".slide_modal_content_box .slide_modal_content").removeClass('slide_visible'); //一度モーダルスライド全部非表示
    $('.slide_modal_content_box .slide_modal_content').eq(slideindex).next().addClass('slide_visible'); //.slide_modal を次のスライドに付加
    $('.slide_modal .modal_prev_btn , .slide_modal .modal_next_btn ').removeClass('disactive'); //コントローラーのステータスリセット

    const slidelength = $('.slide_modal_content_box .slide_modal_content').length; //スライドの数を取得
    const slideindexnow = $('.slide_visible').index('.slide_modal_content_box .slide_modal_content'); //クラス移動後、.slide_visible がついてる要素が何番目か取得
    if (slideindexnow == (slidelength - 1))  {
      $('.slide_modal .modal_next_btn').addClass('disactive'); //最後のスライドのとき、nextをクリック不可に
    }
    else if (slideindexnow == "-1"){
      $(".slide_modal").removeClass('visible');
      $(".slide_modal_content").removeClass('slide_visible'); //最後のスライドで→キーを押したとき、全てリセット
    }
    return false;
  }

  function modal_slide_left(){
    const slideindex = $('.slide_visible').index('.slide_modal_content_box .slide_modal_content');
    
    $(".slide_modal_content_box .slide_modal_content").removeClass('slide_visible');
    $('.slide_modal_content_box .slide_modal_content').eq(slideindex).prev().addClass('slide_visible');
    $('.slide_modal .modal_prev_btn , .slide_modal .modal_next_btn ').removeClass('disactive');

    const slideindexnow = $('.slide_visible').index('.slide_modal_content_box .slide_modal_content');
    if (slideindexnow == "0")  {
      $('.slide_modal .modal_prev_btn').addClass('disactive');
    }
    else if (slideindexnow == "-1"){
      $(".slide_modal").removeClass('visible');
      $(".slide_modal_content").removeClass('slide_visible');
    }
    return false;
  }


$(".slide_modal .modal_next_btn").click(modal_slide_right);
$(".slide_modal .modal_prev_btn").click(modal_slide_left);

$(window).keydown(function (e) {
  if (e.keyCode == 39) {
    modal_slide_right();
  }
  else if (e.keyCode == 37){
    modal_slide_left();
  }
});

window.addEventListener('load', () => {
  var images = document.querySelectorAll('img[data-src]');
  $(".slide_modal_open").click(function(){
    for(var i = 0; i < images.length; i++) {
        images[i].setAttribute('src', images[i].getAttribute('data-src'));
    }
    return false;
  });
});


$(function(){
  $(".modal_close_btn , .modal_bg").click(function(){
    $(".mono_modal").removeClass('visible');
    $(".slide_modal").removeClass('visible');
    $(".slide_modal_content").removeClass('slide_visible');
    return false;
  });
});





//---------------- vh ---------------
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 画面のサイズ変動があった時に高さを再計算する
//window.addEventListener('resize', setFillHeight);

// 初期化
setFillHeight();

/*min-height: 100vh; min-height: calc(var(--vh, 1vh) * 100);*/

//---------------- # scroll ---------------

$(function(){
  $('a[href^="#"]').click(function(){
    let speed = 500;
    let href= $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});


//----------------tickets tabs----------------

$(function(){
  $(".tickets_switch_venue").click(function(){
	$(this).removeClass('off');
	$(".tickets_switch_streaming").addClass('off');
	$("#tickets_tabbox_venue").removeClass('disactive');
	$("#tickets_tabbox_streaming").addClass('disactive');
  });
  $(".tickets_switch_streaming").click(function(){
	$(this).removeClass('off');
	$(".tickets_switch_venue").addClass('off');
	$("#tickets_tabbox_streaming").removeClass('disactive');
	$("#tickets_tabbox_venue").addClass('disactive');
  });
});




//----------------scroll reveal---------------

jQuery(function ($) {
  var fadeIn = $('.top_nav');
  $(window).on('scroll', function () {
    $(fadeIn).each(function () {
      var scroll = $(window).scrollTop(); 
      /*var windowHeight = $(window).height();*/
      if (scroll > 1) {
        $(this).addClass("scroll_in");
      }
      else if (scroll < 1) {
        $(this).removeClass("scroll_in");
      }
    });
  });
  $(window).on('load', function () {
    $(fadeIn).each(function () {
      var scroll = $(window).scrollTop(); 
      /*var windowHeight = $(window).height();*/
      if (scroll > 1) {
        $(this).addClass("scroll_in");
      }
    });
  });
});

jQuery(function ($) {
  var fadeIn = $('.reveal');
  $(window).on('scroll', function () {
    $(fadeIn).each(function () {
      var offset = $(this).offset().top;
      var scroll = $(window).scrollTop(); 
      var windowHeight = $(window).height();
      if (scroll > offset - windowHeight + 130) {
        $(this).addClass("scroll_in");
      }
      /* else if (scroll < offset - windowHeight + 150) {
        $(this).removeClass("scroll_in");
      } */
    });
  });
  $(window).on('load', function () {
    $(fadeIn).each(function () {
      var offset = $(this).offset().top;
      var scroll = $(window).scrollTop(); 
      var windowHeight = $(window).height();
      if (scroll > offset - windowHeight + 130) {
        $(this).addClass("scroll_in");
      }
    });
  });
});

