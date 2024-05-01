window.addEventListener("DOMContentLoaded", () => {
    commonInit();
});
window.addEventListener("load", () => {
  layoutFunc();
  
});

$(function() {
})
  
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
  function resizeAction(callback){
    let windowWid = 0;
    window.addEventListener("resize",()=>{
      if(window.innerWidth !== windowWid){
        if(callback){
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
    function scrollTop(){
      const btn_top_go = document.querySelector(".btn_top_go");
      if(!!btn_top_go){
        btn_top_go.addEventListener("click",(e)=>{
          e.preventDefault();
          window.scrollTo({
            top : 0,
            left : 0,
            behavior : "smooth"
          })
        });
      }
    }
    function pcGnb(){
      const header_wrap = document.querySelector(".header_wrap");
      /* const bg_depth = document.querySelector(".bg_depth"); */
      const header_nav_list = document.querySelector(".header_nav_list");
      const header_nav_li = document.querySelectorAll(".header_nav_list > li");
      if(!!header_nav_li){
        let hoverTimeout;
        header_nav_li.forEach((this_li)=>{
          this_li.addEventListener("mouseenter",(e)=>{
            let thisEvent = e.currentTarget;
            let thisEventNot = siblings(thisEvent);
            
            thisEventNot.forEach((item)=>{
              if(thisEvent !== item){
                leaveAction(item);
              }
            });

            hoverAction(thisEvent);
          });
        });
      }

      function hoverAction(target){
        const this_item = target;
        const this_item_parent = this_item.closest(".header_nav_list > li");
        const this_item_not = siblings(this_item);
        const this_item_depth = this_item.querySelector(".header_two_list_wrap");
        const this_item_depth_inner =  this_item.querySelector(".header_two_inner");

        if(this_item_depth.classList.contains("type2")){
          this_item_depth_inner.style.left = this_item_parent.getBoundingClientRect().left + "px";
        }else{
          this_item_depth_inner.style.left = this_item_parent.getBoundingClientRect().left + (this_item_parent.getBoundingClientRect().width/2) + "px";
        }

        this_item_not.forEach((item)=>{
          item.classList.remove("active");
        });

        this_item.classList.add("active");
        header_wrap.classList.add("active");
        this_item_depth.style.height = this_item_depth_inner.getBoundingClientRect().height + "px";
      }

      function leaveAction(target){
        const this_item = target;
        const this_item_depth = this_item.querySelector(".header_two_list_wrap");

        this_item.classList.remove("active");
        header_wrap.classList.remove("active");
        this_item_depth.style.height = "0px";
      }

      if(!!header_wrap){
        
        header_wrap.addEventListener("mouseleave",()=>{
          header_nav_li.forEach((item)=>{
            leaveAction(item);
          });
        });
      }
    }
    function mbTotal() {
      var touchstart = "ontouchstart" in window;
      var btn_panel_menu = document.querySelector(".btn_panel_menu"),
        mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
        mainmenu_dim = document.querySelector(".mainmenu_dim"),
        btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
        mobile_mainmenu_wrap = document.querySelector(".mobile_mainmenu_wrap");
        mbmenu_nav_menu = document.querySelectorAll(".mbmenu_nav_menu");
        domHtml = document.querySelector("html"),
        domBody = document.querySelector("body");
  
      // init 
      if (mobile_mainmenu_zone === null) {
        return;
      }
      btn_panel_menu.addEventListener("click", function(e) {
        e.preventDefault();
        totalOpen();
      }, false);
      btn_mbmenuclose.addEventListener("click", function(e) {
        e.preventDefault();
        totalClose();
      }, false);
      mainmenu_dim.addEventListener("click", function(e) {
        e.preventDefault();
        totalClose();
      }, false);
      resizeAction(()=>{
        if(window.innerWidth > 1023){
          totalClose();
        }
      });

      if(!!mbmenu_nav_menu){
        mbmenu_nav_menu.forEach((item)=>{
          item.addEventListener("click",(e)=>{
            const thisEventTarget = e.currentTarget;
            const thisEventParent = thisEventTarget.closest("li");
            const thisEventParentGlobalLi = siblings(thisEventParent);
            thisEventParentGlobalLi.forEach((item)=>{
              if(item !== thisEventParent){
                item.classList.remove("active");
              }
            });
            thisEventParent.classList.toggle("active");
          });
        });
      }
  
      function totalOpen() {
        mobile_mainmenu_zone.classList.add("active")
        setTimeout(function() {
          mobile_mainmenu_zone.classList.add("motion");
          if (touchstart) {
            domHtml.classList.add("touchDis");
          }
        }, 30);
      }
  
      function totalClose() {
        mobile_mainmenu_zone.classList.remove("motion");
        setTimeout(function() {
          mobile_mainmenu_zone.classList.remove("active");
          domHtml.classList.remove("touchDis");
        }, 500);
      }
    }
    pcGnb();
    mbTotal();
    scrollTop();
  }
  
  /**
   * menu rock
   */
  function menuRock(target) {
    const targetDom = document.querySelectorAll(target);
    if (!!targetDom) {
      targetDom.forEach((target)=>{
        if(!!target.closest(".mbmenu_nav_list > li")){
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
    constructor (option){
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
            },false);
        });
      }
    }
    dimCheck(){
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
    popupShow(){
      this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      if (this.selector == null) { return; }
      this.selector_contents = this.selector.querySelector(".popup_contents_row");
      this.selector_contents_inner = this.selector.querySelector(".popup_contents_inner");
      if(this.touchstart){
        this.domHtml.classList.add("touchDis");
      }
      this.selector.classList.add("active");
      if(!!this.selector_contents_inner && !!this.selector_contents){
        if(this.selector_contents.getBoundingClientRect().height < this.selector_contents_inner.getBoundingClientRect().height){
          this.selector_contents.classList.add("scroll_mode");
        }else{
          this.selector_contents.classList.remove("scroll_mode");
        }
      }
      setTimeout(() => {
        this.selector.classList.add("motion_end");
      }, 30);
      if ("beforeCallback" in this.option) {
        this.option.beforeCallback();
      }
      if ("callback" in this.option) {
        this.option.callback();
      }
      if (!!this.design_popup_wrap_active) {
        this.design_popup_wrap_active.forEach((element, index) => {
          if (this.design_popup_wrap_active !== this.selector) {
            element.classList.remove("active");
          }
        });
      }
      this.layer_wrap_parent.append(this.selector);
      this.dimCheck();
    }
    popupHide(){
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
        if (this.design_popup_wrap_active.length == 1) {
          this.domHtml.classList.remove("touchDis");
        }
      }
    }
  }


  function tabMenuFunc(){
    const tab_menu = document.querySelectorAll(".tab_menu");
    if(!!tab_menu){
      tab_menu.forEach((item)=>{
        item.addEventListener("click",(e)=>{
          e.preventDefault();
          const thisEvent = e.currentTarget;
          const thisParent = thisEvent.closest(".ui_tab");
          const thisEventNot = thisParent.querySelectorAll(".tab_menu");
          const thisContentGroup = document.querySelector(thisParent.dataset.contgroup);
          const thisContent = document.querySelector(thisEvent.getAttribute("href"));
          const thisContentNot = thisContentGroup.querySelectorAll(".tab_cont");

          if(!!thisEvent){
            thisEventNot.forEach((item)=>{
              if(thisContent !== item){
                item.classList.remove("active");
              }
            });
          }
          thisEvent.classList.add("active");

          if(!!thisContent){
            thisContentNot.forEach((item)=>{
              if(thisContent !== item){
                item.classList.remove("active");
              }
            });
            thisContent.classList.add("active");
          }
        });
      });
    }
  }


  function responTableStyle(){
    action();
    window.addEventListener("resize",()=>{
      action();
    });

    function action(){
      const respon_table_wrap = document.querySelectorAll(".respon_table_wrap");
      if(!!respon_table_wrap){
        respon_table_wrap.forEach((item)=>{
          const thisItem = item;
          const thItem = thisItem.querySelectorAll(".respon_thtext");
          let thWidth = [];
          if(!!thItem){
            thItem.forEach((item)=>{
              item.style.removeProperty("width");
            });
            if(window.innerWidth > 1023){return;}
            thItem.forEach((item)=>{
              thWidth.push(item.getBoundingClientRect().width);
            });
            thItem.forEach((item)=>{
              item.style.width = Math.max.apply(null,thWidth) +"px";
            });
          }
        });
      }
    }
  }


  function toggleFunc(){
    const toggle_bar = document.querySelectorAll(".toggle_bar");
    if(!!toggle_bar){
      toggle_bar.forEach((item)=>{
        item.addEventListener("click",(e)=>{
          const thisItem = e.currentTarget;
          const thisParnet = thisItem.closest(".toggle_item");
          if(!!thisParnet){
            thisParnet.classList.toggle("active");
          }
        });
      });
    }
  }


  function responElement(type){
    const responItem = document.querySelectorAll(".respon");

    action();
    window.addEventListener("resize",()=>{
      action();
    });

    function action(){
      if(!!responItem){
        responItem.forEach((item)=>{
          const thisDataStyle = item.dataset.width;
          console.log(thisDataStyle);
          item.style.removeProperty("width");
          if(window.innerWidth > 768){
            if(type == "width"){
              item.style.width = thisDataStyle;
            }
          }
        });
      }
    };
  }