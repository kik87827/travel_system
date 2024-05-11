window.addEventListener("DOMContentLoaded", () => {
  commonInit();
});
window.addEventListener("load", () => {
  headerMenu();
  layoutCommon();
});

$(function() {})

/**
 * device check
 */
function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf("samsung") > -1) {
    browserAdd("samsung");
  }

  if (
    navigator.platform.indexOf("Win") > -1 ||
    navigator.platform.indexOf("win") > -1
  ) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

/*
  resize
*/
function resizeAction(callback) {
  let windowWid = 0;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== windowWid) {
      if (callback) {
        callback();
      }
    }
    windowWid = window.innerWidth;
  });
}

/**
 * 레이아웃
 */
function layoutFunc() {

}

/**
 * menu rock
 */
function menuRock(target) {
  const targetDom = document.querySelectorAll(target);
  if (!!targetDom) {
    targetDom.forEach((target) => {
      if (!!target.closest(".mbmenu_nav_list > li")) {
        target.closest(".mbmenu_nav_list > li").classList.add("active");
      }
      target.classList.add("active");
    });
  }
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}




/* popup */
class DesignPopup {
  constructor(option) {
    // variable
    this.option = option;
    this.selector = document.querySelector(this.option.selector);
    if (!this.selector) {
      return;
    }
    this.touchstart = "ontouchstart" in window;
    this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.layer_wrap_parent = null;
    this.btn_closeTrigger = null;
    this.scrollValue = 0;

    // init
    const popupGroupCreate = document.createElement("div");
    popupGroupCreate.classList.add("layer_wrap_parent");
    if (!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")) {
      this.pagewrap.append(popupGroupCreate);
    }
    this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");


    // event
    this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
    this.bg_design_popup = this.selector.querySelector(".bg_dim");
    let closeItemArray = [...this.btn_close];
    if (!!this.selector.querySelectorAll(".close_trigger")) {
      this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
      closeItemArray.push(...this.btn_closeTrigger);
    }
    if (closeItemArray.length) {
      closeItemArray.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          this.popupHide(this.selector);
        }, false);
      });
    }
  }
  dimCheck() {
    const popupActive = document.querySelectorAll(".popup_wrap.active");
    if (!!popupActive[0]) {
      popupActive[0].classList.add("active_first");
    }
    if (popupActive.length > 1) {
      this.layer_wrap_parent.classList.add("has_active_multi");
    } else {
      this.layer_wrap_parent.classList.remove("has_active_multi");
    }
  }
  popupShow() {
    this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
    if (this.selector == null) {
      return;
    }
    this.selector_contents = this.selector.querySelector(".popup_contents_row");
    this.selector_contents_inner = this.selector.querySelector(".popup_contents_inner");
    if (this.touchstart) {
      this.domHtml.classList.add("touchDis");
    }
    this.selector.classList.add("active");
    setTimeout(() => {
      if (!!this.selector_contents_inner && !!this.selector_contents) {
        if (this.selector_contents.getBoundingClientRect().height < this.selector_contents_inner.getBoundingClientRect().height) {
          this.selector_contents.classList.add("scroll_mode");
        } else {
          this.selector_contents.classList.remove("scroll_mode");
        }
      }
      this.selector.classList.add("motion_end");
    }, 30);
    if ("beforeCallback" in this.option) {
      this.option.beforeCallback();
    }
    if ("callback" in this.option) {
      this.option.callback();
    }
    /* if (!!this.design_popup_wrap_active) {
      this.design_popup_wrap_active.forEach((element, index) => {
        if (this.design_popup_wrap_active !== this.selector) {
          element.classList.remove("active");
        }
      });
    } */
    this.layer_wrap_parent.append(this.selector);
    this.dimCheck();
  }
  popupHide() {
    let target = this.option.selector;
    if (!!target) {
      this.selector.classList.remove("motion");
      if ("beforeClose" in this.option) {
        this.option.beforeClose();
      }
      //remove
      this.selector.classList.remove("motion_end");
      setTimeout(() => {
        this.selector.classList.remove("active");
      }, 400);
      this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      this.dimCheck();
      if ("closeCallback" in this.option) {
        this.option.closeCallback();
      }
      console.log(this.design_popup_wrap_active.length);
      if (this.design_popup_wrap_active.length == 1) {
        this.domHtml.classList.remove("touchDis");
      }
    }
  }
}





function headerMenu() {
  const header_wrap = document.querySelector(".header_wrap");
  const btn_header_total = document.querySelector("[name='pcmenu']");
  const global_menu_layer = document.querySelector(".global_menu_layer");
  const gmenu_toggle = document.querySelectorAll(".gmenu_toggle");
  const tmenu_one = document.querySelectorAll(".tmenu_one");
  const tmenu_one_text = document.querySelectorAll(".tmenu_one_text");
  const mobile_total_layer = document.querySelector(".mobile_total_layer");
  const gnb_twodepth_layer = document.querySelector(".gnb_twodepth_layer");
  const gnb_twodepth_layer_gnbtwocont = document.querySelectorAll(".gnb_twodepth_layer .gnb_two_cont");
  const mobile_total_menu = document.querySelectorAll("[name='totalmenu']");
  const btn_mb_total_close = document.querySelector(".btn_mb_total_close");
  const hgroup_nav_menu = document.querySelectorAll(".hgroup_nav_menu");
  const hgroup_gnb_row = document.querySelector(".hgroup_gnb_row");
  const hgroup_main_row = document.querySelector(".hgroup_main_row");
  const gnb_two_cont = document.querySelectorAll(".gnb_two_cont");
  const hgroup_nav_item = document.querySelectorAll(".hgroup_nav_item");

  const mb_total_quick_slide = document.querySelectorAll(".mb_total_quick_list .swiper-slide");
  const bodyDom = document.querySelector("body");
  const htmlDom = document.querySelector("html");
  let windowWidth = 0;

  let mbquickObj = null;
  if (btn_header_total === null || global_menu_layer === null) {
    return;
  }


  btn_header_total.addEventListener("click", (e) => {
    e.preventDefault();
    const thisTarget = e.currentTarget;
    thisTarget.classList.toggle("active");
    global_menu_layer.classList.toggle("active");
    textHeightResize2(global_menu_layer.querySelectorAll(".gmenu_one"));
    if (!!gnb_twodepth_layer) {
      gnb_twodepth_layer.classList.remove("active");
    }
  });


  window.addEventListener("resize", () => {
    if (windowWidth !== window.innerWidth) {
      if (window.innerWidth < 1024) {
        /* mobile_total_layer.classList.remove("active");
        bodyDom.classList.remove("touchDis") */
        gnbgmenuFunc();
      }
    }
    windowWidth = window.innerWidth;
  })

  if (!!gmenu_toggle) {
    gmenu_toggle.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const thisTarget = e.currentTarget;
        thisTarget.closest(".gmenu_item").classList.toggle("active");
        textHeightResize2(thisTarget.closest(".gmenu_item").querySelectorAll(".gmenu_one"));
      });
    });
  }


  gnbgmenuFunc();

  function gnbgmenuFunc() {
    const gnb_two_cont = document.querySelectorAll(".gnb_two_cont")
    const gnb_two_cont_li = document.querySelectorAll(".gnb_two_cont .gmenu_list > li")
    if (!!gnb_two_cont) {
      gnb_two_cont.forEach((item) => {
        if (item.querySelectorAll(".gmenu_list > li").length < 4) {
          item.classList.add("short");
        } else {
          item.classList.add("pos_center");
        }
      })
    }
  }

  if (!!hgroup_nav_menu) {
    hgroup_nav_menu.forEach((item) => {
      item.addEventListener("mouseenter", (e) => {
        const etarget = e.currentTarget;
        if (global_menu_layer.classList.contains("active")) {
          return;
        }
        if (etarget.getAttribute("href") === "#") {
          return;
        }
        const etwo = document.querySelector(etarget.getAttribute("href"));
        const etwo_li = etwo.querySelectorAll(".gmenu_list > li");
        if (!!gnb_two_cont) {
          gnb_two_cont.forEach((item) => {
            item.classList.remove("active", "pos_left", "pos_right", "ready");
          });
          etwo.classList.add("ready");
          gnb_twodepth_layer.classList.add("active");
          etwo.style.left = etarget.getBoundingClientRect().left + (etarget.getBoundingClientRect().width / 2) - etwo.getBoundingClientRect().width / 2 + "px";
          if (etwo.getBoundingClientRect().left < 0) {
            etwo.classList.add("pos_left");
          } else if (etwo.getBoundingClientRect().left + etwo.getBoundingClientRect().width > window.innerWidth) {
            etwo.classList.add("pos_right");
          }
          etwo.classList.remove("ready");
          etwo.classList.add("active");
          textHeightResize(etarget.getAttribute("href") + " .gmenu_one");
        }
      });
    });
  }
  if (!!hgroup_nav_item) {
    hgroup_nav_item.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        if (!!gnb_twodepth_layer) {
          gnb_twodepth_layer.classList.remove("active");
        }
      });
    })
  }

  if (!!hgroup_gnb_row) {
    hgroup_gnb_row.addEventListener("mouseleave", () => {
      if (!!gnb_twodepth_layer) {
        gnb_twodepth_layer.classList.remove("active");
      }
    });
  }

  if (!!hgroup_main_row) {
    hgroup_main_row.addEventListener("mouseleave", () => {
      if (!!gnb_twodepth_layer) {
        gnb_twodepth_layer.classList.remove("active");
      }
    });
  }

  if (!!tmenu_one_text) {
    tmenu_one_text.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const thisTarget = e.currentTarget;
        thisTarget.closest(".tmenu_toggle_item").classList.toggle("active");
      });
    });
  }

  if (!!mobile_total_menu) {
    mobile_total_menu.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (!!mobile_total_layer) {
          mobile_total_layer.classList.add("active");
        }

        mbQuickMenu();
        bodyDom.classList.add("touchDis")
      });
    });
  }

  if (!!btn_mb_total_close) {
    btn_mb_total_close.addEventListener("click", (e) => {
      e.preventDefault();
      mobile_total_layer.classList.remove("active");
      bodyDom.classList.remove("touchDis")
    });
  }

  function mbQuickMenu() {
    if (mb_total_quick_slide.length > 1) {
      if (mbquickObj == null) {
        mbquickObj = new Swiper(".mb_total_quick_wrap", {
          speed: 1000,
          slidesPerView: 4,
          slidesPerGroup: 4,
          freeMode: false,
          slidesPerGroupAuto: false,
          loop: false,
          pagination: {
            el: ".mb_total_quick_wrap .swiper-pagination",
            clickable: true
          }
        });
      }
    }
  }
}

function layoutCommon() {
  const header_wrap = document.querySelector(".header_wrap");
  const middle_wrap = document.querySelector(".middle_wrap");
  const footer_wrap = document.querySelector(".footer_wrap");
  const floating_layer = document.querySelector(".floating_layer");
  let header_wrap_height = 0;
  let footer_wrap_height = !!footer_wrap ? footer_wrap.getBoundingClientRect().height : 0;
  const bodyDom = document.querySelector("body");
  const htmlDom = document.querySelector("html");
  let scrollend = bodyDom.scrollHeight - window.innerHeight;

  //minHeightFunc();
  btnTop();

  let windowWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== windowWidth) {
      //minHeightFunc();
      footer_wrap_height = !!footer_wrap ? footer_wrap.getBoundingClientRect().height : 0;
    }
    windowWidth = window.innerWidth;
  });

  scrollFloating();
  window.addEventListener("scroll", () => {
    scrollFloating();
  });

  /* function minHeightFunc(){
  	if(!!middle_wrap){
  		header_wrap_height = !!header_wrap ? header_wrap.getBoundingClientRect().height : 0;
  		footer_wrap_height = !!footer_wrap ? footer_wrap.getBoundingClientRect().height : 0;
  		middle_wrap.style.minHeight = 'calc(100vh - '+(footer_wrap_height+header_wrap_height) +'px)';
  	}
  } */

  function btnTop() {
    let btn_gotop = document.querySelector(".btn_pagetop");
    if (btn_gotop === null) {
      return;
    }
    btn_gotop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    });
  }

  function scrollFloating() {
    if (!floating_layer) {
      return;
    }
    if (scrollend <= window.scrollY) {
      floating_layer.style.display = 'none';
    } else {
      floating_layer.style.display = 'block';
    }
  }
}

function textHeightResize(target) {
  const targetDom = $(target) || target;

  action();

  window.addEventListener("resize", () => {
    action();
  })

  function action() {
    targetDom.css({
      "height": ""
    });
    let arrayHeight = [];
    targetDom.each(function() {
      arrayHeight.push($(this).height());
    });
    targetDom.css({
      "height": Math.max.apply(null, arrayHeight)
    });
  }
}


function textHeightResize2(target) {
  const targetDom = target;

  action();

  window.addEventListener("resize", () => {
    action();
  })

  function action() {
    targetDom.forEach((item) => {
      item.removeAttribute("style");
    })
    let arrayHeight = [];
    targetDom.forEach((item) => {
      arrayHeight.push(item.getBoundingClientRect().height);
    })
    targetDom.forEach((item) => {
      item.style.height = Math.max.apply(null, arrayHeight) + "px";
    })
  }
}


function textWidthResize(target) {
  const targetDom = $(target) || target;

  action();

  window.addEventListener("resize", () => {
    action();
  })

  function action() {
    targetDom.css({
      "height": ""
    });
    let arrayWidth = [];
    targetDom.each(function() {
      arrayWidth.push($(this).width());
    });
    targetDom.css({
      "width": Math.max.apply(null, arrayWidth)
    });
  }
}




function detailVisualC() {
  let detail_mv_obj = null;
  const detail_multi_visual_wrap = document.querySelector(".detail_grid_visual_wrap");
  const detail_mv_slide = detail_multi_visual_wrap.querySelectorAll(".swiper-slide");
  const dgrid_thum_item = detail_multi_visual_wrap.querySelectorAll(".dgrid_thum_item");
  let windowWidth = window.innerWidth;

  if (detail_mv_slide.length > 1) {
    if (detail_mv_obj !== null) {
      detail_mv_obj.update();
    } else {
      if (window.innerWidth >= 1024) {
        pcFunc();
      } else {
        mbFunc();
      }
      //slideObj.update();

      window.addEventListener("resize", () => {
        if (windowWidth !== window.innerWidth) {
          detail_mv_obj.destroy();
          if (window.innerWidth >= 1024) {
            pcFunc();
          } else {
            mbFunc();
          }
        }
        windowWidth = window.innerWidth;
      });
    }

    function pcFunc() {
      detail_mv_obj = new Swiper(".detail_grid_main_swiper", {
        speed: 1000,
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      });
    }

    function mbFunc() {
      detail_mv_obj = new Swiper(".detail_grid_main_swiper", {
        speed: 1000,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".detail_grid_visual_wrap .swiper-pagination.d_mv_paging",
          type: "fraction",
        },
        navigation: {
          nextEl: '.detail_grid_visual_wrap .btn_d_mv_control.next',
          prevEl: '.detail_grid_visual_wrap .btn_d_mv_control.prev',
        }
      });
    }

    dgrid_thum_item.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (index < 3) {
          detail_mv_obj.slideToLoop(index);
        }
      });
    });
  } else {
    detail_multi_visual_wrap.classList.add("nodata_type");
  }
}



function stickyTab() {
  const header_wrap = document.querySelector(".header_wrap");
  const detailAnchorContentsWrap = document.querySelector(".detail_anchor_contents_wrap");
  const stickyTabsContainerZone = document.querySelector(".sticky_tabs_container_zone");
  const tabContents = document.querySelectorAll(".tab_contents");
  const stickyTabsInnerWrap = document.querySelector(".sticky_tabs_inner_wrap");
  const stickyTabsInner = document.querySelector(".sticky_tabs_inner");
  const stickyTab = document.querySelectorAll(".sticky_tab");
  let detailAnchorContentsWrapPos = !!detailAnchorContentsWrap ? detailAnchorContentsWrap.getBoundingClientRect().top + window.scrollY : 0;
  let getPosValue = getLayerPos();
  let getPosHeight = getHeight();
  let getPosArrayValue = getPosArray();
  let getWindowWid = window.innerWidth;
  let activeItem = document.querySelector(".sticky_tab.active");
  let btnClickIs = false;

  let detail_anctab_obj = null;
  const detail_anctab_swiper = document.querySelector(".sticky_tabs_swiper_container");
  const detail_anctab_slide = !!detail_anctab_swiper ? detail_anctab_swiper.querySelectorAll(".swiper-slide") : null;

  if (!!stickyTabsContainerZone && !!stickyTabsInnerWrap) {
    stickyTabsContainerZone.style.minHeight = stickyTabsInnerWrap.getBoundingClientRect().height + "px";
  }

  if (!!detail_anctab_slide) {
    if (detail_anctab_obj !== null) {
      detail_anctab_obj.update();
    } else {
      if (window.innerWidth < 1024) {
        mbFunc();
      }

      window.addEventListener("resize", () => {
        if (getWindowWid !== window.innerWidth) {
          if (detail_anctab_obj !== null) {
            detail_anctab_obj.destroy();
          }
          if (window.innerWidth < 1024) {
            mbFunc();
          }
        }
        getWindowWid = window.innerWidth;
      });
    }

    function mbFunc() {
      detail_anctab_obj = new Swiper(".sticky_tabs_swiper_container", {
        slidesPerView: 'auto',
        slidesPerGroupAuto: true,
        freeMode: true,
      });
    }
  }
  updateActiveMenu();
  let windowwid = window.innerWidth;
  window.addEventListener("resize", () => {
    //btnClickIs = false;
    //activeSlideTo();
    if (windowwid !== window.innerWidth) {
      updateOnlyActiveMenu();
      triggerActiveScroll();
    }
    windowwid = window.innerWidth;
  });


  window.addEventListener("touchstart", () => {
    btnClickIs = false;
  });

  window.addEventListener("mousewheel", () => {
    btnClickIs = false;
  });

  window.addEventListener("mousedown", () => {
    btnClickIs = false;
    updateValue();
  });

  window.addEventListener("scroll", () => {
    updateValue();
    scrollAction();
  });

  window.addEventListener("touchmove", () => {
    updateValue();
    scrollAction();
  });


  detailAnchorContentsWrap.addEventListener("updateScroll", () => {
    updateValue();
    scrollAction();
  })


  function updateValue() {
    getPosValue = getLayerPos();
    getPosHeight = getHeight();
    getPosArrayValue = getPosArray();
    detailAnchorContentsWrapPos = !!detailAnchorContentsWrap ? detailAnchorContentsWrap.getBoundingClientRect().top + window.scrollY : 0;
  }



  stickyTab.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const thisTarget = e.currentTarget;
      const thisScrollPosTop = document.querySelector(thisTarget.getAttribute("href")).getBoundingClientRect().top;
      let thisScrollGo = 0;
      let headerWrapHeight = !!header_wrap ? header_wrap.getBoundingClientRect().height : 0;
      let stickyHeight = !!stickyTabsInner ? stickyTabsInner.getBoundingClientRect().height : 0;
      let thisScrollPos = (thisScrollPosTop + window.scrollY - getPosHeight);
      let thisScrollMbPos = (thisScrollPosTop + window.scrollY - (stickyHeight + headerWrapHeight));

      if (window.innerWidth > 1023) {
        thisScrollGo = thisScrollPos;
      } else {
        thisScrollGo = thisScrollMbPos;
      }

      if (!!thisScrollPos) {
        window.scrollTo({
          top: thisScrollGo,
          left: 0,
          behavior: "smooth",
        });
      }
      btnClickIs = true;
      activeTab(thisTarget);
    });
  });


  function triggerActiveScroll() {
    const stickyTabActive = document.querySelector(".sticky_tab.active");
    // Create the event
    let event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    });
    if (document.querySelectorAll(".sticky_tab")[0] == stickyTabActive && !stickyTabsInnerWrap.classList.contains("fixed")) {
      return;
    }
    setTimeout(() => {
      stickyTabActive.dispatchEvent(event);
    }, 100);


  }

  function getLayerPos() {
    if (!!stickyTabsContainerZone) {
      let localTop = stickyTabsContainerZone.getBoundingClientRect().top;
      return localTop - (stickyTabsInnerWrap.getBoundingClientRect().height / 2) + window.scrollY;
    }
  }

  function getPosArray() {
    let posArray = [];
    let headerWrapHeight = !!header_wrap ? header_wrap.getBoundingClientRect().height : 0;
    let stickyFixedHeight = !!stickyTabsInner ? stickyTabsInner.getBoundingClientRect().height : 0;
    if (!!tabContents) {
      tabContents.forEach((item) => {
        let eachTop = item.getBoundingClientRect().top;
        if (window.innerWidth > 1023) {
          posArray.push(eachTop + window.scrollY - getPosHeight);
        } else {
          posArray.push(eachTop + window.scrollY - (stickyFixedHeight + headerWrapHeight));
        }
      });
    }
    return posArray;
  }


  function getHeight() {
    if (!!stickyTabsInner) {
      return stickyTabsInner.getBoundingClientRect().height;
    }
  }

  function scrollAction() {
    if (!stickyTabsInnerWrap) {
      return;
    }
    if (getPosValue < window.scrollY) {
      stickyTabsInnerWrap.classList.add("fixed");
    } else {
      stickyTabsInnerWrap.classList.remove("fixed");
    }
    if (!btnClickIs) {
      updateActiveMenu();
    }
  }

  function updateActiveMenu() {
    stickyTab.forEach((item, index) => {
      if (getPosArrayValue[index] <= window.scrollY) {
        activeTab(item);
      }
    });
  }

  function activeSlideTo() {
    stickyTab.forEach((item, index) => {
      if (detail_anctab_obj !== null && window.innerWidth < 1024) {
        if (item.classList.contains("active")) {
          detail_anctab_obj.slideTo(index);
        }
      }
    });
  }

  function updateOnlyActiveMenu() {
    if (!btnClickIs) {
      stickyTab.forEach((item, index) => {
        if (getPosArrayValue[index] <= window.scrollY) {
          activeTab(item);
        }
      });
    }
  }


  function activeTab(target) {
    if (activeItem) {
      activeItem.classList.remove("active");
    }
    target.classList.add("active");
    activeSlideTo();
    activeItem = target;
  }
}

function updateTrigger() {
  const detailAnchorContentsWrap = document.querySelector(".detail_anchor_contents_wrap");
  if (!!detailAnchorContentsWrap) {

    // Create the event
    let event = new CustomEvent('updateScroll', {
      bubbles: true,
      cancelable: true
    });

    // Emit the event
    detailAnchorContentsWrap.dispatchEvent(event);
  }
}




function stickyPanel() {
  const detailCalculationZone = document.querySelector(".detail_calculation_zone");
  const detailCalculationWrap = document.querySelector(".detail_calculation_wrap");
  const dc_inner_get_container = document.querySelector(".dc_inner_get_container");
  const detailContentsGlobalZone = document.querySelector(".detail_contents_global_zone");
  const detailContentsZone = document.querySelector(".detail_contents_zone");
  const footerWrap = document.querySelector(".footer_wrap");
  let footerWrapPos = !!footerWrap ? footerWrap.getBoundingClientRect().top + window.scrollY : 0;
  let footerWrapHeight = !!footerWrap ? footerWrap.getBoundingClientRect().height : 0;
  let detailContentsZoneHeight = !!detailContentsZone ? detailContentsZone.getBoundingClientRect().height : 0;
  let detailCalculationWrapHeight = !!detailCalculationWrap ? detailCalculationWrap.getBoundingClientRect().height : 0;
  let detailCalculationZonePos = !!detailCalculationZone ? detailCalculationZone.getBoundingClientRect().top + window.scrollY : 0;
  let detailContentsGlobalZonePos = !!detailContentsGlobalZone ? detailContentsGlobalZone.getBoundingClientRect().top + detailContentsGlobalZone.getBoundingClientRect().height + window.scrollY : 0;
  let getWindowWid = window.innerWidth;
  let dcInnerGetContainerHeight = !!dc_inner_get_container ? dc_inner_get_container.getBoundingClientRect().height : 0;
  let bodyHeight = document.querySelector("body").getBoundingClientRect().height;
  window.addEventListener("resize", () => {
    if (getWindowWid !== window.innerWidth) {
      detailCalculationZonePos = !!detailCalculationZone ? detailCalculationZone.getBoundingClientRect().top + window.scrollY : 0;
    }
    getWindowWid = window.innerWidth;
  });


  window.addEventListener("scroll", () => {
    scrollAction();
  });

  window.addEventListener("touchmove", () => {
    scrollAction();
  });

  function scrollAction() {
    detailContentsZoneHeight = !!detailContentsZone ? detailContentsZone.getBoundingClientRect().height : 0;
    detailCalculationWrapHeight = !!detailCalculationWrap ? detailCalculationWrap.getBoundingClientRect().height : 0;
    footerWrapPos = !!footerWrap ? footerWrap.getBoundingClientRect().top + 120 + window.scrollY : 0;
    footerWrapHeight = !!footerWrap ? footerWrap.getBoundingClientRect().height : 0;
    dcInnerGetContainerHeight = !!dc_inner_get_container ? dc_inner_get_container.getBoundingClientRect().height : 0;
    //detailContentsGlobalZonePos = !!detailContentsGlobalZone ? detailContentsGlobalZone.getBoundingClientRect().top + detailContentsGlobalZone.getBoundingClientRect().height + window.scrollY : 0;
    detailContentsGlobalZonePos = !!detailContentsGlobalZone ? detailContentsGlobalZone.getBoundingClientRect().bottom + window.scrollY : 0;


    if (!!detailCalculationWrap) {
      if (detailCalculationWrapHeight >= detailContentsZoneHeight) {
        return;
      }
      if (detailCalculationZonePos < window.scrollY) {
        detailCalculationWrap.classList.add("fixed");
        if (detailContentsGlobalZonePos - dcInnerGetContainerHeight < window.scrollY) {
          detailCalculationWrap.classList.add("bottom");
        } else {
          detailCalculationWrap.classList.remove("bottom");
        }
      } else {
        detailCalculationWrap.classList.remove("fixed");
      }
    }

  }
}


function mobileBottomLayer() {
  const footer_wrap = document.querySelector(".footer_wrap");
  const mb_bottom_layer = document.querySelector(".mb_bottom_layer");
  const middle_wrap = document.querySelector(".middle_wrap");
  const domHtml = document.querySelector("html");
  let btn_mbb_toggle = null;
  let mb_bottom_content = null;
  if (!!mb_bottom_layer) {
    btn_mbb_toggle = mb_bottom_layer.querySelector(".btn_mbb_toggle");
    mb_bottom_content = mb_bottom_layer.querySelector(".mb_bottom_content");
  }
  let windowWid = window.innerWidth;

  if (!mb_bottom_layer) {
    return;
  }
  action();
  window.addEventListener("resize", () => {
    if (windowWid !== window.innerWidth) {
      action();
    }
    windowWid = window.innerWidth;
  });
  btn_mbb_toggle.addEventListener("click", (e) => {
    e.preventDefault();
    btn_mbb_toggle.classList.toggle("active");
    mb_bottom_content.classList.toggle("active");
    domHtml.classList.toggle("touchDis");
  });

  function action() {
    if (window.innerWidth < 1024) {
      footer_wrap.style.paddingBottom = mb_bottom_layer.getBoundingClientRect().height + 40 + "px";
    } else {
      domHtml.classList.remove("touchDis");
      footer_wrap.style.paddingBottom = "0px";
    }
  }
}

function toggleTarget() {
  var targetDom = $("[data-target]");
  targetDom.each(function() {
    $(this).attr("data-origin", $(this).text());
  });
  targetDom.on("click", function(e) {
    var $this = $(this);
    var $thisText = $this.attr("data-text");
    var $thisTarget = $($this.attr("data-target"));
    var $thisTargetEach = $thisTarget.find(".detail_toggle_item");

    e.preventDefault();

    if ($thisTarget.length) {

      // $thisTargetEach.removeClass("active");
      if ($thisTargetEach.filter(".active").length === 0) {
        $this.text($this.attr("data-origin"));
        $thisTargetEach.addClass("active");
      } else {
        $thisTargetEach.removeClass("active");
        $this.text($thisText);
      }
      /* if($thisTargetEach.hasClass("active")){
      	$this.text($this.attr("data-origin"));
      }else{
      	$this.text($thisText);
      } */
    }
  });
}


function fieldList() {
  const field_col_list_tr = document.querySelectorAll(".field_list_tr");

  col2Action();
  window.addEventListener("resize", () => {
    col2Action();
  });

  function col2Action() {
    if (!!field_col_list_tr) {

      field_col_list_tr.forEach((thistr) => {
        const this_tr_item = thistr;
        const field_indt_key = this_tr_item.querySelectorAll(".field_indt_key");

        let indt_odd = null;
        let indt_even = null;

        if (window.innerWidth >= 768) {
          if (!!field_indt_key) {
            field_indt_key.forEach((thisKey, index) => {
              if (index % 2 === 0) {
                thisKey.classList.add("odd");
              } else {
                thisKey.classList.add("even");
              }
            })
          }

          indt_odd = this_tr_item.querySelectorAll(".field_indt_key.odd");
          indt_even = this_tr_item.querySelectorAll(".field_indt_key.even");

          let odd_array = [];
          let even_array = [];

          if (!!indt_odd) {
            indt_odd.forEach((item) => {
              odd_array.push(item.getBoundingClientRect().width);
            });
            indt_odd.forEach((item) => {
              item.style.removeProperty("width");
              item.style.width = Math.max.apply(null, odd_array) + "px";
            });
          }

          if (!!indt_even) {
            indt_even.forEach((item) => {
              even_array.push(item.getBoundingClientRect().width);
            });
            indt_even.forEach((item) => {
              item.style.removeProperty("width");
              item.style.width = Math.max.apply(null, even_array) + "px";
            });
          }
        } else {
          let single_array = [];
          if (!!field_indt_key) {
            field_indt_key.forEach((item) => {
              single_array.push(item.getBoundingClientRect().width);
            });
            field_indt_key.forEach((item) => {
              item.style.removeProperty("width");
              item.style.width = Math.max.apply(null, single_array) + "px";
            });
          }
        }

      });
    }
  }
}




function datePicker() {
  var $datepicker = $(".field_input.calendar");
  if ($datepicker.length) {
    $datepicker.each(function() {
      var $dateThis = $(this);
      $dateThis.datepicker({
        monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        showOtherMonths: true,
        selectOtherMonths: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
      });
    });
  }
}