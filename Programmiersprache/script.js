// JavaScript Document

//----------------web storage----------------
const webStorage = function(){
  const loadings = document.querySelectorAll('#op_anim');
  const onloadsdelay = document.querySelectorAll('.onload_delay');
  if(sessionStorage.getItem('access_opanimst')){
    loadings.forEach ( loading => {
      loading.classList.remove('is_active');
    });
    window.addEventListener('load', () => {
      onloadsdelay. forEach ( onloaddelay => {
        onloaddelay.classList.add('open');
      });
    });
  } else {
    loadings.forEach ( loading => {
      loading.classList.add('is_active');
    });
    sessionStorage.setItem('access_opanimst', 0);
  }
}
webStorage();

//----------------onload event----------------

const onloads = document.querySelectorAll('.onload');
const onloadsdelay = document.querySelectorAll('.onload_delay');

window.addEventListener('load', () => {
  setTimeout( () => {
    onloads. forEach ( onload => {
      onload.classList.add('open');
    });
    document.querySelector("body").classList.add("scroll_on");
	},300);
  setTimeout( () => {
    onloadsdelay. forEach ( onloaddelay => {
      onloaddelay.classList.add('open');
    });
	},500);
});

// ----- cast message onload event -----
const castMessageGrids = document.querySelectorAll('.cast_message_grid');
window.addEventListener('load', () => {
  castMessageGrids.forEach ( castMessageGrid => {
    setTimeout( () => {
      castMessageGrid.children[0].classList.add('scroll_in');
    },0);
    setTimeout( () => {
      castMessageGrid.children[1].classList.add('scroll_in');
    },100);
  });
});

//----------------youtube replace----------------
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

//----------------nav responsive---------------

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

//----------------nav colormode---------------

window.addEventListener('scroll' , () => {
  const navColorModes = document.querySelectorAll('.nav_color_mode');
  const scroll = window.pageYOffset;
  const vh = window.innerHeight;
  if (navColorModes !== undefined) {
  navColorModes.forEach((navColorMode) => {
    if ( scroll > vh ) {
      navColorMode.classList.remove('color_changed');
      return
    } else {
      navColorMode.classList.add('color_changed');
    }
  });
  }
});


//---------------- vh ---------------
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
//window.addEventListener('resize', setFillHeight);
setFillHeight();
/*min-height: 100vh; min-height: calc(let(--vh, 1vh) * 100);*/


//---------------- # scroll ---------------

const smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');

smoothScrollTriggers.forEach((smoothScrollTrigger) => {
  smoothScrollTrigger.addEventListener('click' , (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger.getAttribute('href');
    let targetElement = document.getElementById(href.replace('#', ''));
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.pageYOffset;
    const gap = 60;
    const target = rect + offset - gap;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  });
});


//----------------scroll reveal---------------

let targets = document.querySelectorAll('.reveal');
let offset = window.innerHeight *0.3;

window.addEventListener('scroll', function() {
  let scroll = window.scrollY;
  let h = window.innerHeight;
  targets.forEach(target => {
    let pos = target.getBoundingClientRect().top + scroll;
    if (scroll > pos - h + offset) {
      target.classList.add('scroll_in');
    };
  });
});

// ---------------- lang change ---------------
const langChangeBtnBoxes = document.querySelectorAll('.lang_change_btn_box');
const langChangeContentBoxes = document.querySelectorAll('.lang_change_content_box');

langChangeBtnBoxes.forEach((langChangeBtnBox) => {
  const langChangeBtns = langChangeBtnBox.querySelectorAll('.lang_change_btn');
  let langChangeBtnsArray = [].slice.call(langChangeBtns);
  langChangeBtns.forEach((langChangeBtn) => {
    langChangeBtn.addEventListener('click', () => {
      let langChangeBtnIndex = langChangeBtnsArray.indexOf(langChangeBtn);
      langChangeBtnBoxes.forEach((langChangeBtnBox) => {
        const langChangeBtns = langChangeBtnBox.querySelectorAll('.lang_change_btn');
        langChangeBtns.forEach((langChangeBtn) => {langChangeBtn.classList.remove('now');});
        langChangeBtnBox.children[langChangeBtnIndex].classList.add('now');
      });
      langChangeContentBoxes.forEach((langChangeContentBox) => {
        const langChangeContents = langChangeContentBox.querySelectorAll('.lang_change_content');
        langChangeContents.forEach((langChangeContent) => {langChangeContent.classList.remove('active');});
        langChangeContentBox.children[langChangeBtnIndex].classList.add('active');
      });
    });
  });
});

const langChangeMonoBtnBoxes = document.querySelectorAll('.lang_change_mono_btn_box');

langChangeMonoBtnBoxes.forEach((langChangeMonoBtnBox) => {
  const langChangeMonoBtns = langChangeMonoBtnBox.querySelectorAll('.lang_change_btn');
  let langChangeMonoBtnsArray = [].slice.call(langChangeMonoBtns);
  langChangeMonoBtns.forEach((langChangeMonoBtn) => {
    langChangeMonoBtn.addEventListener('click', () => {
      let langChangeMonoBtnIndex = langChangeMonoBtnsArray.indexOf(langChangeMonoBtn);
      langChangeMonoBtnBoxes.forEach((langChangeMonoBtnBox) => {
        const langChangeMonoBtns = langChangeMonoBtnBox.querySelectorAll('.lang_change_btn');
        langChangeMonoBtns.forEach((langChangeMonoBtn) => {langChangeMonoBtn.classList.add('changeto');});
        langChangeMonoBtnBox.children[langChangeMonoBtnIndex].classList.remove('changeto');
      });
      langChangeContentBoxes.forEach((langChangeContentBox) => {
        const langChangeContents = langChangeContentBox.querySelectorAll('.lang_change_content');
        langChangeContents.forEach((langChangeContent) => {langChangeContent.classList.remove('active');});
        langChangeContentBox.children[langChangeMonoBtnIndex].classList.add('active');
      });
    });
  });
});

//----------------modal---------------

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

const SeparateMonoModalOpens = document.querySelectorAll('.mono_separate_modal_open_box .mono_separate_modal_open');
const SeparateMonoModalBox = document.querySelector('.mono_separate_modal_box');
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
const ytSeparateMonoModalOpens = document.querySelectorAll('.yt_mono_separate_modal_open');
const ytSeparateMonoModalBox = document.querySelector('.yt_mono_separate_modal_box');
let ytSeparateMonoModalOpensArray = [].slice.call(ytSeparateMonoModalOpens);

ytSeparateMonoModalOpens.forEach((ytSeparateMonoModalOpen) => {
  ytSeparateMonoModalOpen.addEventListener('click', () => {
    let ytSeparateMonoModalOpenIndex = ytSeparateMonoModalOpensArray.indexOf(ytSeparateMonoModalOpen);
    let ytSeparateMonoModalOpenTarget = ytSeparateMonoModalBox.children[ytSeparateMonoModalOpenIndex];
    ytSeparateMonoModalOpenTarget.classList.add('visible');
    let ytSeparateMonoModalOpenTargetYtVideoBox = ytSeparateMonoModalOpenTarget.children[1].children[0];
    ImageToYoutubeReplace(ytSeparateMonoModalOpenTargetYtVideoBox);
  });
});
/*-- youtube separate modal --*/

//----------------slide modal----------------
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
//----------------slide modal----------------

/*-- modal close --*/
const modalCloseElements = document.querySelectorAll('.modal_close_element');
const modalLayers = document.querySelectorAll('.modal_layer');
modalCloseElements.forEach((modalCloseElement) => {
  modalCloseElement.addEventListener('click' , () => {
    modalLayers.forEach((modalLayer) => {
      modalLayer.classList.remove('visible');
    });
    const yt_video_boxs = document.querySelectorAll('.yt_video_box');
    yt_video_boxs.forEach((yt_video_box) => {
      YoutubeToImageReplace(yt_video_box);
    });
  });
  return false;
});
/*-- modal close --*/