/* ===============================================
# modal
=============================================== */
document.addEventListener("DOMContentLoaded", function () {
    const modalBox = document.querySelector(".modal_box");
    const modalInner = modalBox.querySelector(".modal_inner");
    const closeButton = modalBox.querySelector(".modal_box .close");

    // モーダルを開く
    function openModal(trigger) {
        const modalContent = trigger.nextElementSibling;

        if (modalContent && modalContent.classList.contains("modal_content_wrap")) {
            // .modal_inner に内容を挿入
            modalInner.innerHTML = modalContent.innerHTML;
            modalBox.classList.add("active");
        }
    }

    // モーダルを閉じる
    function closeModal() {
        modalBox.classList.remove("active");
        modalInner.innerHTML = ''; // 必要に応じて内容をクリア
    }

    // トリガークリック時の処理
    function setupModalTriggers(triggerSelector) {
        const modalTriggers = document.querySelectorAll(triggerSelector);
        modalTriggers.forEach(trigger => {
            trigger.addEventListener("click", function (e) {
                e.preventDefault();
                openModal(this);
            });
        });
    }

    // 閉じるボタンクリック時の処理
    closeButton.addEventListener("click", function (e) {
        e.stopPropagation(); // クリックが親要素に伝播するのを防ぐ
        closeModal();
    });

    // モーダル外クリック時の処理
    modalBox.addEventListener("click", function () {
        closeModal();
    });

    // モーダルトリガーの初期化
    setupModalTriggers(".modal_trigger");
});



/* ===============================================
# OP anime
=============================================== */
// $(window).on("load", function () {
// 	$("body")
// 		.delay(2600)
// 		.queue(function (next0) {
// 			$(".loader").addClass("off");
// 			next0();
// 		});

// 	$("body")
// 		.delay(10)
// 		.queue(function (next1) {
// 			$(".body_top").addClass("intro_on");                
// 			$(".onload").addClass("js-play");
// 			next1();
// 		});
// });
window.addEventListener('DOMContentLoaded', () => {
    function addClassAfterDelay(selector, className, delay) {
        setTimeout(() => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add(className);
            }
        }, delay);
    }
    addClassAfterDelay(".in_top", "intro_on", 10);
    addClassAfterDelay(".loading-container", "op_change", 2300);
    addClassAfterDelay(".loading-container", "off", 2600);
    addClassAfterDelay(".body_top", "intro_on", 2610);
});


/* ===============================================
# anime trigger
=============================================== */
// $(window).on("load scroll", function () {
// 	var elem = $(".anime");
// 	elem.each(function () {
// 		var elemOffset = $(this).offset().top;
// 		var scrollPos = $(window).scrollTop();
// 		var wh = $(window).height();
// 		if (scrollPos > elemOffset - wh + wh / 6) {
// 			$(this).addClass("js-play");
// 		}
// 	});
//     var elem = $(".anime-no-hidden");
// 	elem.each(function () {
// 		var elemOffset = $(this).offset().top;
// 		var scrollPos = $(window).scrollTop();
// 		var wh = $(window).height();
// 		if (scrollPos > elemOffset - wh + wh / 6) {
// 			$(this).addClass("js-play");
// 		}
// 	});
// });

window.addEventListener('DOMContentLoaded', () => {
    // 要素にスクロール時にクラスを追加する関数
    function addClassOnScroll(elementsSelector, className, offsetRatio = 6) {
        const elements = document.querySelectorAll(elementsSelector);
        elements.forEach(element => {
            const elemOffset = element.offsetTop;
            const scrollPos = window.pageYOffset;
            const wh = window.innerHeight;

            if (scrollPos > elemOffset - wh + wh / offsetRatio) {
                element.classList.add(className);
            }
        });
    }

    // スクロールイベントで特定のクラスを要素に追加
    function handleScroll() {
        addClassOnScroll(".anime", "js-play");
        addClassOnScroll(".anime-no-hidden", "js-play");
    }

    // スクロールイベントの登録
    window.addEventListener("scroll", handleScroll);
});


function applyAnimationDelay(selector = '.delayed-animation', delayInterval = 0.1) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        const delay = (index + 1) * delayInterval;
        element.style.animationDelay = `${delay}s`;
    });
}

applyAnimationDelay(); // デフォルトの`.delayed-animation`に適用
applyAnimationDelay('.delayed-animation-02', 0.2); // 別のクラスに適用


/* ===============================================
# smooth scroll
=============================================== */
// $(function () {
// 	$('a[href^="#"]').click(function () {
// 		let speed = 600;
// 		let href = $(this).attr("href");
// 		let target = $(href == "#" || href == "" ? "html" : href);
// 		let position = target.offset().top;
// 		$("html, body").animate({ scrollTop: position }, speed, "swing");
// 		return false;
// 	});
// });

const smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');
smoothScrollTriggers.forEach((smoothScrollTrigger) => {
  smoothScrollTrigger.addEventListener('click' , (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger.getAttribute('href');
    let targetElement = document.getElementById(href.replace('#', ''));
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.scrollY;
    const gap = 60;
    const target = rect + offset - gap;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  });
});

/* ===============================================
# navigation
=============================================== */
// $(function () {
// 	$(".nav__trigger").click(function () {
// 		$(this).parent().toggleClass("nav__active");
// 		return false;
// 	});

// 	$(".global a").click(function () {
// 		$(this).parents(".toggle_nav").removeClass("nav__active");
// 	});
// });

// if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
// 	$(function () {
// 		$(".nav ul li a").click(function () {
// 			$(".header").removeClass("nav__active");
// 		});
// 	});
// }

var triggers = document.querySelectorAll(".nav__trigger");
var body = document.body; // body要素を取得

triggers.forEach(function(trigger) {
    trigger.addEventListener("click", function() {
        this.parentNode.classList.toggle("nav__active");
        // body.classList.toggle('menu_open');
        return false;
    });
});

var globalLinks = document.querySelectorAll(".global a");
for (var i = 0; i < globalLinks.length; i++) {
    globalLinks[i].addEventListener("click", function() {
        this.closest(".toggle_nav").classList.remove("nav__active");
        // body.classList.toggle('menu_open');
    });
}

if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
    var navLinks = document.querySelectorAll(".nav ul li a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function() {
            document.querySelector(".header").classList.remove("nav__active");
        });
    }
}


/* ===============================================
# ヘッダーロゴタイミング
=============================================== */
window.addEventListener('scroll' , () => {
    const navColorModes = document.querySelectorAll('.body_top .header__title');
    const scroll = window.pageYOffset;
    const vh = window.innerHeight;
    if (navColorModes !== undefined) {
    navColorModes.forEach((navColorMode) => {
        if ( scroll > vh ) {
        navColorMode.classList.add('active');
        return
        } else {
        navColorMode.classList.remove('active');
        }
    });
    }
});

/* ===============================================
# スライダー
=============================================== */
//---------- videos swiper --------------
function initializeSwiperVideos(className) {
    let sliderSet = {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      effect:"slide",
      pagination: {
        el: `.${className}-swiper-pagination`,
        clickable: true,
      }, 
      /* scrollbar: {
        el: `.${className}-swiper-scrollbar`,
        draggable: true,
      }, */
      navigation: {
          nextEl: `.${className}-swiper-button-next`,
          prevEl: `.${className}-swiper-button-prev`,
      },
      spaceBetween: window.innerWidth*0.01*2,
      roundLengths: true,
      watchOverflow: true,
      breakpoints: {
        835: {
            // slidesPerView: 1.2,
          spaceBetween: window.innerWidth*0.01*3,
        }
      },
    }
    if (document.querySelectorAll(`.${className}_swiper .swiper-slide`).length == 1 ) {
      sliderSet = {
        loop: false,
        pagination: false, 
        scrollbar: false, 
        navigation: false, 
      }
      document.querySelector(`.${className}_swiper`).classList.add('no_controller');
    }
    const sliderVideos = new Swiper (`.${className}_swiper`, sliderSet);
  }
  initializeSwiperVideos('videos');



  //---------- special fv swiper --------------
function initializeSwiperSpecialFv(className) {
    let sliderSet = {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      effect:"fade",
      pagination: {
        el: `.${className}-swiper-pagination`,
        clickable: true,
      },
      /* scrollbar: {
        el: `.${className}-swiper-scrollbar`,
        draggable: true,
      }, */
      navigation: {
          nextEl: `.${className}-swiper-button-next`,
          prevEl: `.${className}-swiper-button-prev`,
      },
      /* spaceBetween: window.innerWidth*0.01*2, */
      spaceBetween: 0,
      roundLengths: true,
      watchOverflow: true,
      breakpoints: {
        835: {
          /* spaceBetween: window.innerWidth*0.01*5, */
          spaceBetween: 0,
        }
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    }
    if (document.querySelectorAll(`.${className}_swiper .swiper-slide`).length == 1 ) {
      sliderSet = {
        loop: false,
        pagination: false, 
        scrollbar: false, 
        navigation: false, 
      }
      document.querySelector(`.${className}_swiper_controller`).classList.add('no_controller');
    }
    const sliderSpecialFv = new Swiper (`.${className}_swiper`, sliderSet);
  }
  initializeSwiperSpecialFv('special_fv');


//---------- merch swiper --------------
function initializeSwiperMerch(className) {
    let sliderSet = {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      effect:"slide",
      
      pagination: {
        el: `.${className}-swiper-pagination`,
        clickable: true,
      },
      /* scrollbar: {
        el: `.${className}-swiper-scrollbar`,
        draggable: true,
      }, */
      navigation: {
          nextEl: `.${className}-swiper-button-next`,
          prevEl: `.${className}-swiper-button-prev`,
      },
      /* spaceBetween: window.innerWidth*0.01*2, */
      spaceBetween: 10,
      roundLengths: true,
      watchOverflow: true,
      breakpoints: {
        835: {
          /* spaceBetween: window.innerWidth*0.01*5, */
          spaceBetween: 20,
        }
      },
    }
    if (document.querySelectorAll(`.${className}_swiper .swiper-slide`).length == 1 ) {
      sliderSet = {
        loop: false,
        pagination: false, 
        scrollbar: false, 
        navigation: false, 
      }
      // document.querySelector(`.${className}_swiper_controller`).classList.add('no_controller');
    }
    const sliderMerch = new Swiper (`.${className}_swiper`, sliderSet);
  }
  initializeSwiperMerch('merch');
  
  //---------- food swiper --------------
  function initializeSwiperFood(className) {
    let sliderSet = {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      effect:"slide",
      pagination: {
        el: `.${className}-swiper-pagination`,
        clickable: true,
      },
      /* scrollbar: {
        el: `.${className}-swiper-scrollbar`,
        draggable: true,
      }, */
      navigation: {
          nextEl: `.${className}-swiper-button-next`,
          prevEl: `.${className}-swiper-button-prev`,
      },
      /* spaceBetween: window.innerWidth*0.01*2, */
      spaceBetween: 10,
      roundLengths: true,
      watchOverflow: true,
      breakpoints: {
        835: {
          /* spaceBetween: window.innerWidth*0.01*5, */
          spaceBetween: 20,
        }
      },
    }
    if (document.querySelectorAll(`.${className}_swiper .swiper-slide`).length == 1 ) {
      sliderSet = {
        loop: false,
        pagination: false, 
        scrollbar: false, 
        navigation: false, 
      }
      document.querySelector(`.${className}_swiper_controller`).classList.add('no_controller');
    }
    const sliderFood = new Swiper (`.${className}_swiper`, sliderSet);
  }
  initializeSwiperFood('food');



    //---------- food swiper --------------
    function initializeSwiperFood(className) {
      let sliderSet = {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        loopAdditionalSlides: 2,
        effect:"slide",
        pagination: {
          el: `.${className}-swiper-pagination`,
          clickable: true,
        },
        /* scrollbar: {
          el: `.${className}-swiper-scrollbar`,
          draggable: true,
        }, */
        navigation: {
            nextEl: `.${className}-swiper-button-next`,
            prevEl: `.${className}-swiper-button-prev`,
        },
        /* spaceBetween: window.innerWidth*0.01*2, */
        spaceBetween: 10,
        roundLengths: true,
        watchOverflow: true,
        breakpoints: {
          835: {
            /* spaceBetween: window.innerWidth*0.01*5, */
            spaceBetween: 20,
          }
        },
      }
      if (document.querySelectorAll(`.${className}_swiper .swiper-slide`).length == 1 ) {
        sliderSet = {
          loop: false,
          pagination: false, 
          scrollbar: false, 
          navigation: false, 
        }
        document.querySelector(`.${className}_swiper_controller`).classList.add('no_controller');
      }
      const sliderFood = new Swiper (`.${className}_swiper`, sliderSet);
    }
    initializeSwiperFood('holo-guide-detail');

/* ===============================================
# YouTubeスライダー
=============================================== */
// $(document).on('click', '.yt_video', function(){
//     var video = '<iframe class="slide_youtube_player" youtubeid="'+ $(this).attr('youtubeid') +'" src="'+ $(this).attr('youtube') +'" frameborder="0"></iframe>';
//     $(this).replaceWith(video);
//     $(".swiper-slide").addClass("play");
//     $(".play-button").addClass("play");
// });

// $(function(){
//     slider.on('slideChange', function (){
//         $(".slide_youtube_player").each(function(){
//             var videothumb = '<div class="video-block yt_video" youtubeid="'+ $(this).attr('youtubeid') +'" youtube="https://www.youtube.com/embed/'+ $(this).attr('youtubeid') +'?rel=0&showinfo=0&enablejsapi=1"><img src="http://img.youtube.com/vi/'+ $(this).attr('youtubeid') +'/maxresdefault.jpg" alt="#"></div>';
//             $(this).replaceWith(videothumb);
//         $('.swiper-slide').removeClass("play");
//         $(".play-button").removeClass("play");
//         });
//     });
// });





document.querySelectorAll('.single .content_block img').forEach(function(img) {
    // 画像のwidth属性を取得
    const widthValue = img.getAttribute('width');
  
    // width属性が設定されていれば、インラインスタイルで適用
    if (widthValue) {
      img.style.width = widthValue + 'px'; // 'width'属性の値をインラインスタイルとして設定
    }
  });
  




//   document.addEventListener("DOMContentLoaded", () => {
//     // .kv_change要素が存在するか確認
//     const kvChangeElement = document.querySelector(".kv_change");

//     // .kv_changeが存在しない場合は処理を終了
//     if (!kvChangeElement) return;

//     // .kv要素をすべて取得
//     const kvElements = kvChangeElement.querySelectorAll(".kv");

//     // 現在のインデックス
//     let currentIndex = 0;

//     // ループ処理の関数
//     function cycleActiveClass() {
//         // すべての要素から.activeを削除
//         kvElements.forEach(kv => kv.classList.remove("active"));

//         // 現在の要素に.activeを追加
//         kvElements[currentIndex].classList.add("active");

//         // 次のインデックスに移動（最後なら最初に戻る）
//         currentIndex = (currentIndex + 1) % kvElements.length;
//     }

//     // 一定間隔でcycleActiveClassを実行
//     setInterval(cycleActiveClass, 4500); // 4500ミリ秒（4秒）間隔

//     // 初期状態で最初の要素に.activeを付与
//     cycleActiveClass();
// });







document.addEventListener("DOMContentLoaded", () => {
  // `.kv_change_random` の処理
  const kvChangeRandomElement = document.querySelector(".kv_change_random");
  if (kvChangeRandomElement) {
      const kvRandomElements = Array.from(kvChangeRandomElement.querySelectorAll(".kv"));
      if (kvRandomElements.length > 0) {
          let remainingIndices = [...Array(kvRandomElements.length).keys()];

          function shuffleArray(array) {
              for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
              }
          }

          shuffleArray(remainingIndices);

          function cycleActiveClassRandom() {
              kvRandomElements.forEach(kv => kv.classList.remove("active"));
              const currentIndex = remainingIndices.pop();
              const selectedElement = kvRandomElements[currentIndex];
              selectedElement.classList.add("active");

              // data-img-num属性を取得してimgタグを生成
              const imgNum = selectedElement.getAttribute("data-img-num");

              // PHPで設定したtemplateUrlが存在するか確認
              if (typeof templateUrl !== "undefined") {
                  const imgSrc = `${templateUrl}/images/expo/fv/${imgNum}.webp`;
                  selectedElement.innerHTML = `<img src="${imgSrc}" alt="Image ${imgNum}">`;
              }

              if (remainingIndices.length === 0) {
                  remainingIndices = [...Array(kvRandomElements.length).keys()];
                  shuffleArray(remainingIndices);
              }
          }

          cycleActiveClassRandom();
          setInterval(cycleActiveClassRandom, 4500);
      }
  }

  // `.kv_change` の処理（元のコード）
  const kvChangeElement = document.querySelector(".kv_change");
  if (kvChangeElement) {
      const kvElements = kvChangeElement.querySelectorAll(".kv");
      let currentIndex = 0;

      function cycleActiveClassSequential() {
          kvElements.forEach(kv => kv.classList.remove("active"));
          kvElements[currentIndex].classList.add("active");
          currentIndex = (currentIndex + 1) % kvElements.length;
      }

      cycleActiveClassSequential();
      setInterval(cycleActiveClassSequential, 4500);
  }
});




document.addEventListener("DOMContentLoaded", function() {
  // 2つ目の.link_flexを取得
  const linkFlexList = document.querySelectorAll('.link_flex');
  const secondLinkFlex = linkFlexList[1];

  if (secondLinkFlex) {
    // 最初の3つの<a>タグを.wrapで囲む
    const aTags = secondLinkFlex.querySelectorAll('a');
    if (aTags.length >= 3) {
      const wrapDiv = document.createElement('div');
      wrapDiv.classList.add('wrap');

      // 最初の3つの<a>を.wrapに追加
      for (let i = 0; i < 3; i++) {
        wrapDiv.appendChild(aTags[i]);
      }

      // .link_flexに.wrapを追加
      secondLinkFlex.insertBefore(wrapDiv, secondLinkFlex.firstChild);
    }
  }
});

