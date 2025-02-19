// JavaScript Document

/*----------------------------------------
  onload event
------------------------------------------*/
const onloads = document.querySelectorAll('.onload');
const onloadsquick = document.querySelectorAll('.onload_quick');
const onloadsdelay = document.querySelectorAll('.onload_delay');
window.addEventListener('load', () => {
  document.querySelector("body").classList.add("scroll_on");
  document.querySelector("main").classList.add("visible");
  onloadsquick. forEach ( onloadquick => {
    onloadquick.classList.add('open');
  });
  setTimeout( () => {
    onloads. forEach ( onload => {
      onload.classList.add('open');
    });
	},400);
  setTimeout( () => {
    onloadsdelay. forEach ( onloaddelay => {
      onloaddelay.classList.add('open');
    });
	},600);
});

/*----------------------------------------
  web storage
------------------------------------------*/
/* const webStorage = function(){
  const loadingAnims = document.querySelectorAll('#loading');
  const onloads = document.querySelectorAll('.onload');
  const onloadsdelay = document.querySelectorAll('.onload_delay');
  if(sessionStorage.getItem('access_opanimst')){
    loadingAnims.forEach ( loadingAnim => {
      loadingAnim.classList.remove('is_not_loaded');
      loadingAnim.classList.add('is_loaded');
    });
    onloads. forEach ( onload => {
      onload.classList.add('open');
    });
    onloadsdelay. forEach ( onloaddelay => {
      onloaddelay.classList.add('open');
    });
  } else {
    loadingAnims.forEach ( loadingAnim => {
      loadingAnim.classList.add('is_not_loaded');
      loadingAnim.classList.remove('is_loaded');
    });
    sessionStorage.setItem('access_opanimst', 0);
  }
}
webStorage(); */

/*----------------------------------------
  ios style
------------------------------------------*/
window.addEventListener("load", () => {
  const iosStyles = document.querySelectorAll(".ios_style_point");
  const linkBtns = document.querySelectorAll(".link_btn:not(.jp)");
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  if (isIOS) {
    iosStyles.forEach(iosStyle => {
      iosStyle.classList.add("ios_style");
    });
    linkBtns.forEach(linkBtn => {
      linkBtn.classList.add("ios_style");
    });
  }
});

/*----------------------------------------
  youtube replace
------------------------------------------*/
function ImageToYoutubeReplace(ytImage) {
  let youtubeId = ytImage.getAttribute('youtubeid');
  let youtubeVideo = '<iframe class="youtube_player" youtubeid="'+ youtubeId +'" src="https://www.youtube.com/embed/'+ youtubeId +'?playsinline=1&enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe>'
  ytImage.innerHTML = youtubeVideo;
  ytImage.classList.add('play');
};
function YoutubeToImageReplace(ytIframe) {
  let youtubeId = ytIframe.getAttribute('youtubeid');
  let youtubeImage = '<img src="http://img.youtube.com/vi/'+ youtubeId +'/maxresdefault.jpg" alt="thumbs">'
  ytIframe.innerHTML = youtubeImage;
  ytIframe.classList.remove('play');
};

/*----------------------------------------
  iframe youtube
------------------------------------------*/
const iframes = document.querySelectorAll('iframe');
if (iframes) {
  iframes.forEach(iframe => {
    if (iframe.title.includes('YouTube')) {
      iframe.classList.add('iframe_size_youtube');
    }
  });
}

/*----------------------------------------
  global nav
------------------------------------------*/
const navTriggers = document.querySelectorAll('.nav_trigger');
const globalNavs = document.querySelectorAll('#global_nav');
navTriggers.forEach((navTrigger) => {
  navTrigger.addEventListener('click' , () => {
    navTriggers.forEach((navTrigger) => {
      navTrigger.classList.toggle('active');
    });
    globalNavs.forEach((globalNav) => {
      globalNav.classList.toggle("active");
    });
    document.querySelector('body').classList.toggle("scroll_on");
  });
});
globalNavs.forEach((globalNav) => {
  globalNav.addEventListener('click' , () => {
    globalNav.classList.remove('active');
    navTriggers.forEach((navTrigger) => {
      navTrigger.classList.remove('active');
    });
    document.querySelector("body").classList.add("scroll_on");
  });
});

const subNavOpens = document.querySelectorAll(".sub_nav_open");
subNavOpens.forEach(function (subNavOpen) {
  subNavOpen.addEventListener("mouseover", () => {
      subNavOpen.firstElementChild.classList.add("active");
      subNavOpen.lastElementChild.classList.add("active");
    },false
  );
  subNavOpen.addEventListener("mouseout", () => {
    subNavOpen.firstElementChild.classList.remove("active");
    subNavOpen.lastElementChild.classList.remove("active");
  },false
  );
});

/*----------------------------------------
  vh vw
------------------------------------------*/
const setFillHeightWidth = () => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  document.documentElement.style.setProperty('--vh', `${vh}`);
  document.documentElement.style.setProperty('--vw', `${vw}`);
  document.documentElement.style.setProperty('--vh_px', `${vh}px`);
  document.documentElement.style.setProperty('--vw_px', `${vw}px`);
  const inPageTitleArea = document.querySelector('.in_page_title_area');
  if (inPageTitleArea ) {
    const inPageTitleAreaHeight = inPageTitleArea.offsetHeight;
    document.documentElement.style.setProperty('--in_page_title_area_height', `${inPageTitleAreaHeight}px`);
  }
}
//window.addEventListener('resize', setFillHeightWidth);
setFillHeightWidth();

/*min-height: 100vh; min-height: calc(var(--vh_px, 1vh) * 1);*/
/*min-width: 100vh; min-width: calc(var(--vw_px, 1vw) * 1);*/

/* const setInTopFvModeKvWidth = () => {
  const inTopFvModeKv = document.querySelector('#in_top_fv_mode_kv');
  if (inTopFvModeKv) {
    const inTopFvModeKvWidth = inTopFvModeKv.offsetWidth;
    document.documentElement.style.setProperty('--in_top_fv_mode_kv_width', `${inTopFvModeKvWidth}px`);
  }
}
setInTopFvModeKvWidth();
window.addEventListener('resize', setInTopFvModeKvWidth); */

/*----------------------------------------
  # scroll
------------------------------------------*/
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

/* # link
-------------------------------*/
const id_links = document.querySelectorAll('a[data-hash]');
if (id_links) {
  id_links.forEach((id_link) => {
    id_link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = id_link.getAttribute('data-hash');
      sessionStorage.setItem('scrollToHash', hash);
      window.location.href = id_link.href;
    });
  });
}
window.addEventListener('load', () => {
  const storedHash = sessionStorage.getItem('scrollToHash');
  if (storedHash) {
    const targetElement = document.querySelector(`#anchor${storedHash}`);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const offset = window.scrollY;
      const gap = window.innerHeight * 0.3;
      const distanceFromTop = rect.top + offset - gap;
      window.scrollTo({
        top: distanceFromTop,
        behavior: 'smooth',
      });
      sessionStorage.removeItem('scrollToHash');
    }
  }
});
/* #idのリンク先とは違うページから#idにリンクさせる場合、urlではなくdata-hash属性にリンク先のidを入れる。 */

/*----------------------------------------
  scroll reveal
------------------------------------------*/
let scrollRevealTargets = document.querySelectorAll('.reveal');
let scrollRevealOffset = window.innerHeight*0.3;
function scrollReveal() {
  let scroll = window.scrollY;
  let h = window.innerHeight;
  scrollRevealTargets.forEach(target => {
    let pos = target.getBoundingClientRect().top + scroll;
    if (scroll > pos - h + scrollRevealOffset) {
      target.classList.add('scroll_in');
    };
  });
};
window.addEventListener('scroll', function() {
  scrollReveal();
});
window.addEventListener('load', function() {
  scrollReveal();
});

/*----------------------------------------
  accordion
------------------------------------------*/
const accordionSlideDown = (el) => {
  el.style.display = 'block';
  el.style.height = 'auto';
  let h = el.offsetHeight; 
  el.style.height = h + 'px';
  el.animate([{ height: 0 },{ height: h + 'px' }], {duration: 400, easing: 'cubic-bezier(.63,.08,.47,.99)',});
  el.style.height = 'auto';
};
const accordionSlideUp = (el) => {
  let h = el.offsetHeight;
  el.style.height = h + 'px';
  el.animate([{ height: h + 'px' },{ height: 0 }], {duration: 400, easing: 'cubic-bezier(.63,.08,.47,.99)',});
  el.style.height = 0;
};
const accordionSlideToggle = (el) => {
  if (el.classList.contains('accordion_open') == true) {
    return accordionSlideUp(el);
  } else {
    return accordionSlideDown(el);
  }
};
const accordionBoxes = document.querySelectorAll(".accordion_box");
accordionBoxes.forEach((accordion) => {
  const accordionTriggers = accordion.querySelectorAll(".accordion_trigger");
  const accordionContents = accordion.querySelectorAll(".accordion_content");
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      accordionTriggers.forEach((trigger) => {
        trigger.classList.toggle("accordion_active");
      });
      accordionContents.forEach((content) => {
        accordionSlideToggle(content);
        content.classList.toggle("accordion_open");
      });
    });
  });
});

/*----------------------------------------
  x scroll
------------------------------------------*/
const xScrollElements = document.querySelectorAll(".x_scroll_area");
if ( xScrollElements ) {
  xScrollElements.forEach((xScrollElement) => {
    xScrollElement.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      /* const maxScrollLeft = xScrollElement.scrollWidth - xScrollElement.clientWidth;
      if (
        (xScrollElement.scrollLeft <= 0 && e.deltaY < 0) ||
        (xScrollElement.scrollLeft >= maxScrollLeft && e.deltaY > 0)
      ) return; */
      e.preventDefault();
      xScrollElement.scrollLeft += e.deltaY*0.4;
    });
  });
}


/*----------------------------------------
  swiper
------------------------------------------*/

//---------- fes fv swiper --------------
window.addEventListener('load', () => {

  // Convert NodeList to array
  const slides = Array.from(document.querySelectorAll('.slide_randomize .swiper-slide'));
  // Shuffle the array
  for (let i = slides.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slides[i], slides[j]] = [slides[j], slides[i]];
  }
  // Put shuffled elements back into the .swiper-slide container
  const swiperContainer = document.querySelector('.slide_randomize');
  slides.forEach(slide => {
      swiperContainer.appendChild(slide);
  });

function initializeSwiperFesFv(className) {
  let sliderSet = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    //loopAdditionalSlides: 2,
    effect:"fade",
    speed: 1000,
    /* pagination: {
      el: `.${className}-swiper-pagination`,
      clickable: true,
    }, */
    /* scrollbar: {
      el: `.${className}-swiper-scrollbar`,
      draggable: true,
    }, */
    /* navigation: {
        nextEl: `.${className}-swiper-button-next`,
        prevEl: `.${className}-swiper-button-prev`,
    }, */
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
      delay: 5000,
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
    //document.querySelector(`.${className}_swiper_controller`).classList.add('no_controller');
  }
  const sliderFesFv = new Swiper (`.${className}_swiper`, sliderSet);
}
initializeSwiperFesFv('fes_fv');

});

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
  const sliderVideos = new Swiper (`.${className}_swiper`, sliderSet);
}
initializeSwiperVideos('videos');

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
    spaceBetween: 0,
    roundLengths: true,
    watchOverflow: true,
    breakpoints: {
      835: {
        /* spaceBetween: window.innerWidth*0.01*5, */
        spaceBetween: 0,
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
    spaceBetween: 0,
    roundLengths: true,
    watchOverflow: true,
    breakpoints: {
      835: {
        /* spaceBetween: window.innerWidth*0.01*5, */
        spaceBetween: 0,
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

/*----------------------------------------
  modal
------------------------------------------*/
/*-- image_mono_modal_trigger --*/
const imageMonoModals = document.querySelectorAll('.image_mono_modal_trigger');
imageMonoModals.forEach((image) => {
  const imageSrc = image.getAttribute('src');
  const newHTML = `
    <div class="mono_modal_open" style="cursor: pointer;">
      <img class="image_mono_modal_trigger" src="${imageSrc}" alt="merch_img" loading="lazy" width="1920px" height="1080px">
    </div>
    <div class="mono_modal modal_layer">
      <div class="modal_bg modal_close_element"></div>
      <div class="modal_inner">
        <img src="${imageSrc}" alt="merch_img" loading="lazy" width="1920px" height="1080px">
      </div>
      <div class="modal_close_btn modal_close_element"></div>
    </div>
  `;
  image.parentNode.replaceChild(document.createRange().createContextualFragment(newHTML), image);
});
/*-- image_mono_modal_trigger --*/
/*-- mono modal open --*/
const monoModalOpens = document.querySelectorAll ('.mono_modal_open');
monoModalOpens.forEach((monoModalOpen) => {
  monoModalOpen.addEventListener('click' , () => {
    let monoModalOpenTarget = monoModalOpen.nextElementSibling;
    monoModalOpenTarget.classList.add('visible');
  });
});
/*-- mono modal --*/
/*-- separate modal --*/
const SeparateMonoModalOpens = document.querySelectorAll('.separate_mono_modal_open_box .separate_mono_modal_open');
const SeparateMonoModalBox = document.querySelector('.separate_mono_modal_box');
let SeparateMonoModalOpensArray = [].slice.call(SeparateMonoModalOpens);
SeparateMonoModalOpens.forEach((SeparateMonoModalOpen) => {
  SeparateMonoModalOpen.addEventListener('click', () => {
    let SeparateMonoModalOpenIndex = SeparateMonoModalOpensArray.indexOf(SeparateMonoModalOpen);
    SeparateMonoModalBox.children[SeparateMonoModalOpenIndex].classList.add('visible');
  });
});
/*-- separate modal --*/
/*-- youtube modal --*/
const ytMonoModalOpens = document.querySelectorAll ('.yt_mono_modal_open');
ytMonoModalOpens.forEach((ytMonoModalOpen) => {
  ytMonoModalOpen.addEventListener('click' , () => {
    const ytMonoModalOpenTarget = ytMonoModalOpen.nextElementSibling;
    ytMonoModalOpenTarget.classList.add('visible');
    const ytMonoModalOpenTargetYtVideoBox = ytMonoModalOpenTarget.children[1].children[0];
    ImageToYoutubeReplace(ytMonoModalOpenTargetYtVideoBox);
  });
});
/*-- youtube modal --*/
/*-- youtube separate modal --*/
const ytSeparateMonoModalOpens = document.querySelectorAll('.yt_separate_mono_modal_open_box .yt_separate_mono_modal_open');
const ytSeparateMonoModalBox = document.querySelector('.yt_separate_mono_modal_box');
ytSeparateMonoModalOpens.forEach((ytSeparateMonoModalOpen) => {
  ytSeparateMonoModalOpen.addEventListener('click', () => {
    const youtubeId = ytSeparateMonoModalOpen.dataset.youtubeid;
    const ytSeparateMonoModalOpenTarget = ytSeparateMonoModalBox.querySelector(`[data-youtubeid="${youtubeId}"]`);
    if (ytSeparateMonoModalOpenTarget) {
      ytSeparateMonoModalOpenTarget.classList.add('visible');
      const ytSeparateMonoModalOpenTargetYtVideoBox = ytSeparateMonoModalOpenTarget.querySelector('.yt_video_box');
      ImageToYoutubeReplace(ytSeparateMonoModalOpenTargetYtVideoBox);
    }
  });
});
/*-- youtube separate modal --*/
/*-- slide modal --*/
const slideModals = document.querySelectorAll('.slide_modal');
slideModals.forEach((slideModal) => {

  let slideModalLayer = slideModal.querySelector('.slide_modal_layer');
  let slideModalOpens = slideModal.querySelectorAll('.slide_modal_open');
  let slideModalOpensArray = [].slice.call(slideModalOpens);
  let slideModalContents = slideModal.querySelectorAll('.slide_modal_content');
  let slideModalContentsArray = [].slice.call(slideModalContents);
  let slideModalContentsLength = slideModalContents.length;
  let images = slideModal.querySelectorAll('img[data-src]');

  slideModalOpens.forEach((slideModalOpen) => {
    slideModalOpen.addEventListener('click', () => {
      images.forEach((image) => {image.setAttribute('src', image.getAttribute('data-src'));});
      slideModalLayer.classList.add('visible');
      slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
      let slideModalOpenIndex = slideModalOpensArray.indexOf(slideModalOpen);
      slideModalContents[slideModalOpenIndex].classList.add('slide_visible');
    });
  });

  function slideModalMoveRight() {
    if ( slideModal.querySelector('.slide_visible') ) {
      let visibleContent = slideModal.querySelector('.slide_visible');
      let visibleContentIndex = slideModalContentsArray.indexOf(visibleContent);
      slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
      if (visibleContentIndex == (slideModalContentsLength - 1) ) {
        slideModalContents[0].classList.add('slide_visible');
      } else {
        slideModalContents[visibleContentIndex].nextElementSibling.classList.add('slide_visible');
      }
    }
  }
  function slideModalMoveLeft() {
    if ( slideModal.querySelector('.slide_visible') ) {
      let visibleContent = slideModal.querySelector('.slide_visible');
      let visibleContentIndex = slideModalContentsArray.indexOf(visibleContent);
      slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
      if (visibleContentIndex == (0) ) {
        slideModalContents[(slideModalContentsLength - 1)].classList.add('slide_visible');
      } else {
        slideModalContents[visibleContentIndex].previousElementSibling.classList.add('slide_visible');
      }
    }
  }

  let modalNextBtn = slideModal.querySelector('.modal_next_btn');
  modalNextBtn.addEventListener('click' , () => { slideModalMoveRight(); });
  let modalPrevBtn = slideModal.querySelector('.modal_prev_btn');
  modalPrevBtn.addEventListener('click' , () => { slideModalMoveLeft(); });

  document.addEventListener('keydown', (e) => {
    if(e.code == 'ArrowLeft'){
      slideModalMoveLeft();
    } else if (e.code == 'ArrowRight') {
      slideModalMoveRight();
    }
  });

});
/*-- slide modal --*/
/*-- modal close --*/
const modalCloseElements = document.querySelectorAll('.modal_close_element');
const modalLayers = document.querySelectorAll('.modal_layer');
modalCloseElements.forEach((modalCloseElement) => {
  modalCloseElement.addEventListener('click' , () => {
    modalLayers.forEach((modalLayer) => {
      modalLayer.classList.remove('visible');
    });
    const slideModalContents = document.querySelectorAll('.slide_modal_content');
    slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
    const yt_video_boxs = document.querySelectorAll('.yt_video_box');
    yt_video_boxs.forEach((yt_video_box) => {
      YoutubeToImageReplace(yt_video_box);
    });
  });
  return false;
});
/*-- modal close --*/

/*----------------------------------------
  parallax
------------------------------------------*/
if(document.querySelector('.rellax')){
var rellax = new Rellax('.rellax', {
  center:true,
  breakpoints:[ 1 , 2 , 835 ]
});
}

/*----------------------------------------
  slide disactive sync
------------------------------------------*/
const merchSlideDisactive = document.querySelector('.merch_slide_disactive');
const merchSlideBtnDisactives = document.querySelectorAll('.merch_slide_btn_disactive');
if(merchSlideDisactive) {
if (merchSlideDisactive.classList.contains('disactive')) {
  merchSlideBtnDisactives.forEach((merchSlideBtnDisactive) => {
    merchSlideBtnDisactive.classList.add('disactive');
  });
}
}

const foodSlideDisactive = document.querySelector('.food_slide_disactive');
const foodSlideBtnDisactives = document.querySelectorAll('.food_slide_btn_disactive');
if(foodSlideDisactive) {
if (foodSlideDisactive.classList.contains('disactive')) {
  foodSlideBtnDisactives.forEach((foodSlideBtnDisactive) => {
    foodSlideBtnDisactive.classList.add('disactive');
  });
}
}