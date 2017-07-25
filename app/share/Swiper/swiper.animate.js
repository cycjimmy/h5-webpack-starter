// based on swiper.animate(1.0.2)
// doc http://www.swiper.com.cn

let clearSwiperAnimate = () => {
  let
    allBoxes = window.document.documentElement.querySelectorAll(".ani")
    , effect
  ;
  for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].attributes["swiper-animate-style-cache"] && allBoxes[i].setAttribute("style", allBoxes[i].attributes["swiper-animate-style-cache"].value), allBoxes[i].style.visibility = "hidden", allBoxes[i].className = allBoxes[i].className.replace("animated", " "), allBoxes[i].attributes["swiper-animate-effect"] && (effect = allBoxes[i].attributes["swiper-animate-effect"].value, allBoxes[i].className = allBoxes[i].className.replace(effect, " "))
  }
};

let swiperAnimateCache = () => {
  let
    allBoxes = window.document.documentElement.querySelectorAll(".ani")
  ;
  for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].attributes["style"]
      ? allBoxes[i].setAttribute("swiper-animate-style-cache", allBoxes[i].attributes["style"].value)
      : allBoxes[i].setAttribute("swiper-animate-style-cache", " "), allBoxes[i].style.visibility = "hidden"
  }
};


let swiperAnimate = (swiper) => {
  clearSwiperAnimate();

  let
    activeBoxes = swiper.slides[swiper.activeIndex].querySelectorAll(".ani")
    , effect
    , style
    , duration
    , delay
  ;

  for (let i = 0; i < activeBoxes.length; i++) activeBoxes[i].style.visibility = "visible", effect = activeBoxes[i].attributes["swiper-animate-effect"] ? activeBoxes[i].attributes["swiper-animate-effect"].value : "", activeBoxes[i].className = activeBoxes[i].className + "  " + effect + " " + "animated", style = activeBoxes[i].attributes["style"].value, duration = activeBoxes[i].attributes["swiper-animate-duration"] ? activeBoxes[i].attributes["swiper-animate-duration"].value : "", duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"), delay = activeBoxes[i].attributes["swiper-animate-delay"] ? activeBoxes[i].attributes["swiper-animate-delay"].value : "", delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"), activeBoxes[i].setAttribute("style", style)
};

export {
  swiperAnimateCache,
  swiperAnimate,
  clearSwiperAnimate,
}