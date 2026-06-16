/* ===============================================
# modal
=============================================== */

// Allow all origins (Use with caution in production)
        const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1fNqY7jkBBoXbw5w0EqzzdvtPHI2vMfXX1Sk4co11SJ4/gviz/tq?tqx=out:csv';
        const FORM_POST_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdBGDmLWliwRJrslJ8QW4lOtQM7_6BOYJ7V0EWUlQ-RDcP0gQ/formResponse';
        const TOMBSTONE_IMG = 'https://xiaoyou0710.github.io/suspension-list/file_0000000012cc722fadf5374a54f461bd.png';
        const BANNED_WORDS_FILE = 'https://xiaoyou0710.github.io/suspension-list/banned.txt';
        const BLACKLIST_FILE = 'https://xiaoyou0710.github.io/suspension-list/98d2d524-9735-4c1d-a2a2-66b266d88257.txt';
        let deadPeople = [];
        let bannedWords = [];
        let myUUID = "";

document.addEventListener("DOMContentLoaded", function () {


    // モーダルを開く
    function openModal(trigger) {
        if (trigger.classList.contains("image_mono_modal_trigger")) {
            // 画像の場合
            const imgSrc = trigger.getAttribute("src");
            const imgAlt = trigger.getAttribute("alt") || "Image";
            modalInner.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}" class="modal_image">`;
        } else {
            // 通常のトリガー
            const modalContent = trigger.nextElementSibling;
            if (modalContent && modalContent.classList.contains("modal_content_wrap")) {
                modalInner.innerHTML = modalContent.innerHTML;
            }
        }
        modalBox.classList.add("active");
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

    // 画像トリガーの処理
    function setupImageTriggers() {
        const imageTriggers = document.querySelectorAll(".image_mono_modal_trigger");
        imageTriggers.forEach(trigger => {
            trigger.addEventListener("click", function (e) {
                e.preventDefault();
                openModal(this);
            });
        });
    }




    // 初期化
    setupModalTriggers(".modal_trigger");
    setupImageTriggers();
});


 const pointer = document.getElementById('pointer');
        if (pointer) {
            document.addEventListener('mousemove', function(e) {
                pointer.style.left = (e.clientX + 8) + 'px';
                pointer.style.top = (e.clientY + 8) + 'px';
            });
            document.body.addEventListener('mouseleave', () => {
                pointer.style.opacity = '0';
            });
            document.body.addEventListener('mouseenter', () => {
                pointer.style.opacity = '1';
            });
          }
            //Meta


        // 1. 初始化 UUID
        function initUUID() {
            let uuid = localStorage.getItem('meta_funeral_uuid');
            if (!uuid) {
                uuid = 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase() + '-' + Date.now();
                localStorage.setItem('meta_funeral_uuid', uuid);
            }
            myUUID = uuid;
            console.log("Current UUID:", myUUID);
        }

        // 2. 檢查封鎖狀態
        async function checkBlacklist() {
            try {
                const response = await fetch(BLACKLIST_FILE);
                if (response.ok) {
                    const text = await response.text();
                    const blacklist = text.split('\n').map(u => u.trim());
                    if (blacklist.includes(myUUID)) {
                        document.getElementById('main-content').style.display = 'none';
                        document.getElementById('blocked-screen').style.display = 'flex';
                        return true; // 已被封鎖
                    }
                }
            } catch (e) { console.log("No blacklist found."); }
            return false;
        }

        window.onload = async () => {
            initUUID();
            const isBlocked = await checkBlacklist();
            if (isBlocked) return; // 停止後續載入

            await fetchBannedWords();
            await fetchGraves();
        };

        async function fetchBannedWords() {
            try {
                const response = await fetch(BANNED_WORDS_FILE);
                if (response.ok) {
                    const text = await response.text();
                    bannedWords = text.split('\n').map(word => word.trim()).filter(w => w);
                }
            } catch (e) {}
        }

        async function fetchGraves() {
            try {
                const response = await fetch(SHEET_CSV_URL);
                const text = await response.text();
                deadPeople = parseCSV(text);
                renderGraveyard(deadPeople);
            } catch (e) {
                document.getElementById('loading').innerText = 'Something went wrong';
            }
        }

        function parseCSV(csvText) {
            const lines = csvText.split('\n');
            const result = [];
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                const cleanData = row.map(val => val.replace(/^"|"$/g, '').replace(/""/g, '"'));
                result.push({
                    name: cleanData[1] || '無名氏',
                    id: cleanData[2] || '未知',
                    date: cleanData[3] || '日期不詳'
                });
            }
            return result.reverse(); 
        }

        function renderGraveyard(data) {
            const container = document.getElementById('graveyard');
            document.getElementById('loading').style.display = 'none';
            container.innerHTML = '';
            data.forEach(person => {
                const grave = document.createElement('div');
                grave.className = 'tombstone-wrapper';
                grave.innerHTML = `
                    <img src="${TOMBSTONE_IMG}">
                    <div class="tombstone-text">
                        <div class="name">${escapeHTML(person.name)}</div>
                        <div class="id">${escapeHTML(person.id)}</div>
                        <div class="date">${escapeHTML(person.date)}</div>
                    </div>
                `;
                container.appendChild(grave);
            });
        }

        function filterGraves() {
            const keyword = document.getElementById('searchInput').value.toLowerCase();
            const filtered = deadPeople.filter(p => 
                p.name.toLowerCase().includes(keyword) || p.id.toLowerCase().includes(keyword)
            );
            renderGraveyard(filtered);
        }

        function toggleRegisterForm() {
            const form = document.getElementById('register-form');
            form.style.display = (form.style.display === 'block') ? 'none' : 'block';
        }

        async function submitForm(e) {
            e.preventDefault();
            const name = document.getElementById('entryName').value;
            const id = document.getElementById('entryID').value;
            const date = document.getElementById('entryDate').value;
            const btn = document.getElementById('submitBtn');
            
            const fullContent = (name + id).toLowerCase();
            const hasBannedWord = bannedWords.some(word => fullContent.includes(word.toLowerCase()));

            btn.innerText = '安葬中...';
            btn.disabled = true;

            if (hasBannedWord) {
                setTimeout(() => {
                    alert('✅ 資料已送出，安葬完成！');
                    location.reload();
                }, 1000);
                return;
            }

            const formData = new URLSearchParams();
            formData.append('entry.510043352', name);
            formData.append('entry.1259375546', id);
            formData.append('entry.1128410849', date);
            formData.append('entry.1443440662', myUUID); // 傳送 UUID

            try {
                await fetch(FORM_POST_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData
                });
                alert('✅ 資料已送出，安葬完成！');
                location.reload(); 
            } catch (error) {
                alert('發生錯誤。');
                btn.disabled = false;
                btn.innerText = '確認送出安葬';
            }
        }

        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
        }
//Meta

//---------- videos swiper --------------
function initializeSwiperVideos(className) {
    let sliderSet = {
      slidesPerView: 1.1,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      speed: 1000,
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
            slidesPerView: 1.5,
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

/*----------------------------------------
  onload event
------------------------------------------*/
const onloadsquick = document.querySelectorAll('.onload_quick');
const onloadsdelay = document.querySelectorAll('.onload_delay');

// 花弁パーティクル
function bloomPetals() {
  const container = document.querySelector('#loading .img');
  if (!container) return;

  const colors = ['#FFB7C5', '#FFC8A2', '#FFE4B5', '#FFD1DC', '#FFA07A'];
  const petalCount = 14;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('span');
    petal.classList.add('petal');

    const angle = Math.random() * 360;
    const distance = 80 + Math.random() * 160;
    const size = 48 + Math.random() * 80;
    const duration = 1.2 + Math.random() * 0.8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.cssText = `
      position: absolute;
      top: 50%; left: 50%;
      width: ${size}px; height: ${size}px;
      background: ${color};
      border-radius: 50% 0 50% 0;
      transform: translate(-50%, -50%) rotate(${angle}deg);
      pointer-events: none;
      z-index: 10;
      animation: petalFly ${duration}s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      --angle: ${angle}deg;
      --distance: ${distance}px;
    `;

    container.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 100);
  }
}

// openクラス付与 + 花弁発火
function triggerOpen() {
  const loading = document.querySelector('#loading');
  if (!loading) return;
  loading.classList.add('open');
  setTimeout(() => {
    bloomPetals();
  }, 100);
}

window.addEventListener('load', () => {
  document.querySelector("body").classList.add("scroll_on");
  document.querySelector("main").classList.add("visible");
  setTimeout(() => {
    onloadsquick.forEach(onloadquick => {
      onloadquick.classList.add('open');
    });
  }, 500);
  setTimeout(() => {
    document.querySelectorAll('.onload:not(#loading)').forEach(onload => {
      onload.classList.add('open');
    });
  }, 700);
  setTimeout(() => {
    onloadsdelay.forEach(onloaddelay => {
      onloaddelay.classList.add('open');
    });
  }, 1700);
  setTimeout(() => {
    triggerOpen();
  }, 2000);
});

/*----------------------------------------
  web storage
------------------------------------------*/
const webStorage = function(){
  const opAnimations = document.querySelectorAll('#loading');

  if (sessionStorage.getItem('visited_top')) {
    // 2回目以降のトップアクセス → ローディングをスキップ
    opAnimations.forEach(opAnimation => {
      opAnimation.classList.add('is_loaded');
      opAnimation.classList.remove('is_not_loaded');
    });
    // bodyにre_openを付与
    document.querySelector('body').classList.add('re_open');
  } else {
    // 初回アクセス → ローディング発生
    sessionStorage.setItem('visited_top', '1');
    opAnimations.forEach(opAnimation => {
      opAnimation.classList.remove('is_loaded');
      opAnimation.classList.add('is_not_loaded');
    });
  }
}
webStorage();


/* ===============================================
# anime trigger
=============================================== */
$(window).on("load scroll", function () {
	var elem = $(".anime");
	elem.each(function () {
		var elemOffset = $(this).offset().top;
		var scrollPos = $(window).scrollTop();
		var wh = $(window).height();
		if (scrollPos > elemOffset - wh + wh / 2) {
			$(this).addClass("js-play");
		}
	});
    var elem = $(".anime-no-hidden");
	elem.each(function () {
		var elemOffset = $(this).offset().top;
		var scrollPos = $(window).scrollTop();
		var wh = $(window).height();
		if (scrollPos > elemOffset - wh + wh / 4) {
			$(this).addClass("js-play");
		}
	});
    var elem = $("#poem .anime");
	elem.each(function () {
		var elemOffset = $(this).offset().top;
		var scrollPos = $(window).scrollTop();
		var wh = $(window).height();
		if (scrollPos > elemOffset - wh + wh / 2) {
			$(this).addClass("js-play");
		}
	});
});

// window.addEventListener('DOMContentLoaded', () => {
//     // 要素にスクロール時にクラスを追加する関数
//     function addClassOnScroll(elementsSelector, className, offsetRatio = 2) {
//         const elements = document.querySelectorAll(elementsSelector);
//         elements.forEach(element => {
//             const elemOffset = element.offsetTop;
//             const scrollPos = window.pageYOffset;
//             const wh = window.innerHeight;

//             if (scrollPos > elemOffset - wh + wh / offsetRatio) {
//                 element.classList.add(className);
//             }
//         });
//     }

//     // スクロールイベントで特定のクラスを要素に追加
//     function handleScroll() {
//         addClassOnScroll(".anime", "js-play");
//         addClassOnScroll(".anime-no-hidden", "js-play");
//     }

//     // スクロールイベントの登録
//     window.addEventListener("scroll", handleScroll);
// });


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

window.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a[href^="#"]');
    const speed = 600;
    
    links.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        
        const href = link.getAttribute("href");
        const target = href === "#" || href === "" ? document.documentElement : document.querySelector(href);
        const position = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: position,
          behavior: "smooth"
        });
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
        var fixBtn = document.querySelector(".fix_btn");
        if (fixBtn) {
            if (this.parentNode.classList.contains("nav__active")) {
                fixBtn.classList.remove("active");
            } else {
                fixBtn.classList.add("active");
            }
        }
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



document.addEventListener("DOMContentLoaded", function () {
    const talentIcons = document.querySelectorAll(".talent_icon");
    const talentImages = document.querySelectorAll(".talent_img img");

    talentIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const selectedTalent = this.getAttribute("data-talent");

            // .talent_img 内のすべての img から .active クラスを削除
            talentImages.forEach(img => {
                img.classList.remove("active");
            });

            // .talent_icon 内のすべての要素から .active クラスを削除
            talentIcons.forEach(icon => {
                icon.classList.remove("active");
            });

            // 選択された data-talent に一致する img に .active クラスを追加
            const targetImg = document.querySelector(`.talent_img img[data-talent='${selectedTalent}']`);
            if (targetImg) {
                targetImg.classList.add("active");
            }

            // クリックしたアイコンにも .active クラスを追加
            this.classList.add("active");
        });
    });
});


//動画埋め込みページ用
const video = document.getElementById('commentMovie');
const playBtn = document.getElementById('playBtn');

// 要素が存在するページでのみ処理を実行
if (video && playBtn) {
  // ボタンをクリックして再生
  playBtn.addEventListener('click', function() {
    video.play();
    playBtn.classList.add('is-hidden');
  });

  // 再生が始まったら（ボタン経由でも、シークバー経由でも）ボタンを隠す
  video.addEventListener('play', function() {
    playBtn.classList.add('is-hidden');
  });

  // 一時停止されたらボタンを出す
  video.addEventListener('pause', function() {
    playBtn.classList.remove('is-hidden');
  });

  // 動画上での右クリックを禁止する
  video.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
}

/*----------------------------------------
  modal
------------------------------------------*/
/**
 * モーダル機能（複数タイプ対応）
 * 
 * 使い方:
 * 
 * 【1. 汎用モノモーダル】
 * <button data-modal="mono_modal_open" data-mono_modal_target_id="modal1">開く</button>
 * <div class="cmn_modal_layer" data-mono_modal_id="modal1">
 *   <div class="modal_bg" data-modal="modal_close_element"></div>
 *   <div class="modal_inner">コンテンツ</div>
 *   <div class="modal_close_btn" data-modal="modal_close_element"></div>
 * </div>
 * 
 * 【2. 画像モーダル（自動生成）】
 * <img data-modal="img_mono_modal_trigger" src="image.jpg" alt="">
 * 画像をクリックするとモーダルで拡大表示（自動でモーダル要素を生成）
 * 
 * 【3. YouTubeモーダル】
 * <button data-modal="youtube_mono_modal_open" data-youtube_modal_target_id="yt1">動画を見る</button>
 * <div class="cmn_modal_layer" data-youtube_modal_id="yt1">
 *   <div class="modal_bg" data-modal="modal_close_element"></div>
 *   <div class="modal_inner">
 *     <div class="modal_youtube_video_box" youtubeid="VIDEO_ID">
 *       <img src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" alt="">
 *     </div>
 *   </div>
 *   <div class="modal_close_btn" data-modal="modal_close_element"></div>
 * </div>
 * 
 * 【4. スライドモーダル（ギャラリー）】
 * <div data-modal="slide_modal_open_box" data-slide_modal_target_id="gallery1">
 *   <img data-modal="slide_modal_open" src="thumb1.jpg" alt="">
 *   <img data-modal="slide_modal_open" src="thumb2.jpg" alt="">
 * </div>
 * <div class="cmn_modal_layer" data-slide_modal_id="gallery1">
 *   <div class="modal_bg" data-modal="modal_close_element"></div>
 *   <div class="modal_inner">
 *     <div data-modal="slide_modal_content"><img data-src="image1.jpg" alt=""></div>
 *     <div data-modal="slide_modal_content"><img data-src="image2.jpg" alt=""></div>
 *   </div>
 *   <div class="modal_prev_btn" data-modal="modal_prev_element"></div>
     <div class="modal_next_btn" data-modal="modal_next_element"></div>
     <div class="modal_close_btn" data-modal="modal_close_element"></div>
 * </div>
 * 
 * 矢印キー（←→）でスライド操作可能
 * 
 * 全モーダル共通:
 * - 開いた状態でclass="visible"を追加
 * - data-modal="modal_close_element"でモーダルを閉じる
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    visibleClass: 'visible',
    slideVisibleClass: 'slide_visible',
    playClass: 'play'
  };
  
  // YouTube動画の埋め込み/削除
  function replaceToYouTubeIframe(container) {
    const youtubeId = container.getAttribute('youtubeid');
    if (!youtubeId) return;
    
    const iframe = `<iframe class="youtube_player" youtubeid="${youtubeId}" src="https://www.youtube.com/embed/${youtubeId}?playsinline=1&enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe>`;
    container.innerHTML = iframe;
    container.classList.add(CONFIG.playClass);
  }
  
  function replaceToYouTubeThumbnail(container) {
    const youtubeId = container.getAttribute('youtubeid');
    if (!youtubeId) return;
    
    const thumbnail = `<img src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" alt="YouTube thumbnail">`;
    container.innerHTML = thumbnail;
    container.classList.remove(CONFIG.playClass);
  }
  
  // 1. 汎用モノモーダル
  function initMonoModal() {
    const triggers = document.querySelectorAll('[data-modal="mono_modal_open"]');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-mono_modal_target_id');
        const targetModal = document.querySelector(`[data-mono_modal_id="${targetId}"]`);
        
        if (targetModal) {
          targetModal.classList.add(CONFIG.visibleClass);
        }
      });
    });
  }
  
  // 2. 画像モーダル（自動生成）
  function initImageMonoModal() {
    const images = document.querySelectorAll('[data-modal="img_mono_modal_trigger"]');
    
    images.forEach(image => {
      const imageSrc = image.getAttribute('src');
      const modalHTML = `
        <div data-modal="img_mono_modal_open" class="cmn_img_mono_modal_trigger">
          <img src="${imageSrc}" alt="modal open">
        </div>
        <div class="cmn_modal_layer">
          <div class="modal_bg" data-modal="modal_close_element"></div>
          <div class="modal_inner">
            <img src="${imageSrc}" class="img_mono_modal_content" alt="">
          </div>
          <div class="modal_close_btn" data-modal="modal_close_element"></div>
        </div>
      `;
      
      const fragment = document.createRange().createContextualFragment(modalHTML);
      image.parentNode.replaceChild(fragment, image);
    });
    
    // 生成されたトリガーにイベント設定
    const generatedTriggers = document.querySelectorAll('[data-modal="img_mono_modal_open"]');
    generatedTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetModal = trigger.nextElementSibling;
        if (targetModal) {
          targetModal.classList.add(CONFIG.visibleClass);
        }
      });
    });
  }
  
  // 3. YouTubeモーダル
  function initYouTubeModal() {
    const triggers = document.querySelectorAll('[data-modal="youtube_mono_modal_open"]');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-youtube_modal_target_id');
        const targetModal = document.querySelector(`[data-youtube_modal_id="${targetId}"]`);
        
        if (targetModal) {
          targetModal.classList.add(CONFIG.visibleClass);
          const videoBox = targetModal.querySelector('.modal_youtube_video_box');
          if (videoBox) {
            replaceToYouTubeIframe(videoBox);
          }
        }
      });
    });
  }
  
  // 4. スライドモーダル
  function initSlideModal() {
    const openBoxes = document.querySelectorAll('[data-modal="slide_modal_open_box"]');
    
    openBoxes.forEach(openBox => {
      const targetId = openBox.getAttribute('data-slide_modal_target_id');
      const modalLayer = document.querySelector(`[data-slide_modal_id="${targetId}"]`);
      
      if (!modalLayer) return;
      
      const triggers = openBox.querySelectorAll('[data-modal="slide_modal_open"]');
      const contents = modalLayer.querySelectorAll('[data-modal="slide_modal_content"]');
      const prevBtn = modalLayer.querySelector('[data-modal="modal_prev_element"]');
      const nextBtn = modalLayer.querySelector('[data-modal="modal_next_element"]');
      
      // 指定インデックスの画像を data-src → src に読み込む
      function loadImageAt(index) {
        if (index < 0 || index >= contents.length) return;
        const img = contents[index].querySelector('img[data-src]');
        if (img) {
          img.setAttribute('src', img.getAttribute('data-src'));
          img.removeAttribute('data-src'); // 二重読み込み防止
        }
      }
      
      // 指定インデックスを中心に前後1枚を読み込む
      function loadAround(index) {
        loadImageAt(index - 1);
        loadImageAt(index);
        loadImageAt(index + 1);
      }
      
      // スライド移動関数
      function moveSlide(direction) {
        const visibleContent = modalLayer.querySelector(`.${CONFIG.slideVisibleClass}`);
        if (!visibleContent) return;
        
        const contentsArray = Array.from(contents);
        const currentIndex = contentsArray.indexOf(visibleContent);
        const nextIndex = direction === 'next'
          ? (currentIndex + 1) % contents.length
          : (currentIndex - 1 + contents.length) % contents.length;
        
        contents.forEach(content => content.classList.remove(CONFIG.slideVisibleClass));
        contents[nextIndex].classList.add(CONFIG.slideVisibleClass);
        
        loadAround(nextIndex); // 移動後に前後を先読み
      }
      
      // トリガークリックで開く
      triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
          modalLayer.classList.add(CONFIG.visibleClass);
          contents.forEach(content => content.classList.remove(CONFIG.slideVisibleClass));
          contents[index].classList.add(CONFIG.slideVisibleClass);
          
          loadAround(index); // クリックした画像とその前後のみ読み込み
        });
      });
      
      // 前へ・次へボタン
      if (prevBtn) {
        prevBtn.addEventListener('click', () => moveSlide('prev'));
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => moveSlide('next'));
      }
      
      // キーボード操作
      document.addEventListener('keydown', (e) => {
        if (!modalLayer.classList.contains(CONFIG.visibleClass)) return;
        
        if (e.code === 'ArrowLeft') {
          moveSlide('prev');
        } else if (e.code === 'ArrowRight') {
          moveSlide('next');
        }
      });
    });
  }
  
  // モーダルを閉じる
  function initModalClose() {
    const closeElements = document.querySelectorAll('[data-modal="modal_close_element"]');
    const modalLayers = document.querySelectorAll('.cmn_modal_layer');
    
    closeElements.forEach(closeElement => {
      closeElement.addEventListener('click', () => {
        // 全モーダルを閉じる
        modalLayers.forEach(layer => {
          layer.classList.remove(CONFIG.visibleClass);
        });
        
        // スライドモーダルのスライド表示をリセット
        const slideContents = document.querySelectorAll('[data-modal="slide_modal_content"]');
        slideContents.forEach(content => {
          content.classList.remove(CONFIG.slideVisibleClass);
        });
        
        // YouTube動画をサムネイルに戻す
        const youtubeBoxes = document.querySelectorAll('.modal_youtube_video_box');
        youtubeBoxes.forEach(box => {
          replaceToYouTubeThumbnail(box);
        });
      });
    });
  }
  
  // 初期化
  function init() {
    initMonoModal();
    initImageMonoModal();
    initYouTubeModal();
    initSlideModal();
    initModalClose();
  }
  
  // DOM読み込み後に実行
  document.addEventListener('DOMContentLoaded', init);
  
})();


