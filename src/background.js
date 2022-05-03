import browser from "webextension-polyfill";


browser.runtime.onInstalled.addListener(({
  reason
}) => {
  if (reason === "install") {
    alert("yüklediğin için eyw hacı");
  }
});






browser.tabs.onUpdated.addListener(function (tabId, info) {
  if (info.url) {
    if (info.url.startsWith("https://www.turkanime.co/video/")) {
      console.log("turkanimedeyiz")  
    }
  }
  console.log(info)
})