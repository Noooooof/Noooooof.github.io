
//下面这一段全部来自于hexo-theme-nexmoe的部分源码，感谢大佬，指路: https://github.com/theme-nexmoe/hexo-theme-nexmoe
const getRealPath = (pathname, desc = false) => {
    if (!pathname) {
      pathname = window.location.pathname;
    }
    let names = pathname.split("/");
    if (desc === false) {
      for (let i = names.length - 1; i >= 0; --i) {
        let name = names[i].trim();
        if (name.length > 0 && name !== "/" && name !== "index.html") {
          return name;
        }
      }
    } else {
      for (let i = 0; i < names.length; ++i) {
        let name = names[i].trim();
        if (name.length > 0 && name !== "/" && name !== "index.html") {
          return name;
        }
      }
    }
    return "/";
  };

let links = document.querySelectorAll(".nav-link");
let rootRealPath = getRealPath(window.location.pathname, true);
for (let link of links) {
  let linkPath = link.getAttribute("href");
  if (linkPath && getRealPath(linkPath, true) === rootRealPath) {
    link.className = "active-link nav-link";
  }
}
// mobile-nav-link
let mlinks = document.querySelectorAll(".mobile-nav-link");
let mrootRealPath = getRealPath(window.location.pathname, true);
for (let mlink of mlinks) {
  let mlinkPath = mlink.getAttribute("href");
  if (mlinkPath && getRealPath(mlinkPath, true) === mrootRealPath) {
    mlink.className = "moibile-active-link mobile-nav-link";
  }
}

//设置收起的menu点击的效果
var mmenu =document.getElementById("mobile-menu");
var mmain=document.getElementById("mobile-main");
var mclose=document.getElementById("mobile-close");

mmenu.onclick=function(){
  mmain.style.display="block";
}
mclose.onclick=function(){
  mmain.style.display="none";
}

