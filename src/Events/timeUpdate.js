var times = []
module.exports = {
 watchTimeUpdate: function () {
  return new Promise((resolve) => {
   function recur() {
    try{
     const getIframe = document.querySelector("#videodetay > div > div.video-icerik > iframe")
     var videoElement = getIframe.contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video")
     if (times.length == 2) {
      if (Math.abs(times[0] - times[1]) > 3) {
       if (videoElement.playing) {
 
        resolve({
         playing:true
        })
       } else {
 
        resolve({
         playing:false
        })
       }
      }
      times = times.slice(1)
     }
     times.push(Math.round(videoElement.currentTime))
     setTimeout(() => {
      recur()
     }, 100);
    } catch(e) {
     setTimeout(() => {
      recur()
     }, 100)
    }
   }
   recur()
  })
 }
}