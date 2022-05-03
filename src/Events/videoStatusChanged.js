

let selam = {
 start: function(socket) {
  socket.on("videoStatusChanged", (data) => {
    const getIframe = document.querySelector("#videodetay > div > div.video-icerik > iframe")
 const videoElement = getIframe.contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video")
 const getPlayerName = document.getElementsByClassName("btn btn-sm btn-danger")[3].innerText.trim().toLowerCase().replace("(beta)", "")
   if (getPlayerName == "alucard") {
     if (data.playing == true) {
       try {
         document.querySelector("#videodetay > div > div.video-icerik > iframe").contentWindow.document.querySelector("#player > span").click()
       } catch (e) {
         videoElement.play()
         if (data.changeTime !== undefined) {
           videoElement.currentTime = data.changeTime
           document.querySelector("#videodetay > div > div.video-icerik > iframe").contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").innerText = data.timeText        
         }
       }
     } else {
       if (data.changeTime !== undefined) {
        videoElement.currentTime = data.changeTime
        document.querySelector("#videodetay > div > div.video-icerik > iframe").contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").innerText = data.timeText        
       }
       videoElement.pause()
     }
   } else if (getPlayerName == "hdvid" || getPlayerName == "anavids") {
     if (data.playing == true) {
       if (data.changeTime !== undefined) {
        videoElement.currentTime = data.changeTime
        document.querySelector("#videodetay > div > div.video-icerik > iframe").contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").innerText = data.timeText        
       }
       videoElement.play()
     } else {
       if (data.changeTime !== undefined) {
         videoElement.currentTime = data.changeTime
         document.querySelector("#videodetay > div > div.video-icerik > iframe").contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").innerText = data.timeText        
       }
      videoElement.pause()
     }
   }
  })
 }
}

export default selam