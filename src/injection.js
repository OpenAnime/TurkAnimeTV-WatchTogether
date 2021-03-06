import browser from "webextension-polyfill";

//IMPORT EVENTS
import timeUpdate from "./Events/timeUpdate"
import videoStatusChanged from "./Events/videoStatusChanged"



console.clear = () => {} //prevent website from clearing the console

let get = document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-4 > div > div:nth-child(2) > div")

get.innerHTML="",get.style="",get.setAttribute("class","chatBar"),get.style.display="flex",get.style.flexDirection="column",get.style.backgroundColor="rgba(32, 28, 28, 1)",get.style.height="50rem";let title=document.createElement("p");title.innerHTML="TürkAnimeTV Watch Together",title.style.fontFamily="Segoe UI",title.style.fontSize="2rem",title.style.fontWeight="400",title.style.color="#C8C4C4",title.style.margin="0 auto",title.style.paddingTop="3rem";let divider=document.createElement("img");divider.src=browser.runtime.getURL("assets/divider1.svg"),divider.style.paddingTop="1rem";let inputs=document.createElement("div");inputs.style.width="100%",inputs.style.overflow="auto",inputs.style.marginTop="5rem",inputs.style.display="flex",inputs.style.flexDirection="column",inputs.style.gap="2.5rem";let idinput=document.createElement("input");idinput.id="roomID",idinput.placeholder="Oda ID",idinput.style.setProperty("color","#C8C4C4","important"),idinput.style.fontFamily="Segoe UI",idinput.style.fontSize="1.3rem",idinput.style.border="1px solid #333030",idinput.style.outline="none",idinput.style.background="linear-gradient(269.55deg, #302C2C 37.46%, rgba(48, 44, 44, 0) 152.75%)",idinput.style.borderRadius="4px",idinput.style.margin="0 auto",idinput.style.display="block",idinput.style.height="3.5rem",idinput.style.paddingLeft="1rem",idinput.style.width="75%",idinput.style.paddingRight="1rem";let usernameinput=document.createElement("input");usernameinput.id="username",usernameinput.placeholder="Kullanıcı Adı",usernameinput.style.setProperty("color","#C8C4C4","important"),usernameinput.style.fontFamily="Segoe UI",usernameinput.style.fontSize="1.3rem",usernameinput.style.border="1px solid #333030",usernameinput.style.outline="none",usernameinput.style.background="linear-gradient(269.55deg, #302C2C 37.46%, rgba(48, 44, 44, 0) 152.75%)",usernameinput.style.borderRadius="4px",usernameinput.style.margin="0 auto",usernameinput.style.display="block",usernameinput.style.height="3.5rem",usernameinput.style.paddingLeft="1rem",usernameinput.style.width="75%",usernameinput.style.paddingRight="1rem";let button=document.createElement("button");button.id="connectSocket",button.style.height="5rem",button.style.fontFamily="Segoe UI",button.innerHTML="Bağlan",button.style.color="white",button.style.fontSize="1.7rem",button.style.border="1px solid #333030",button.style.background="linear-gradient(269.55deg, #302C2C 37.46%, rgba(48, 44, 44, 0) 152.75%)",button.style.borderRadius="4px",button.style.fontWeight="400",button.style.display="block",button.style.margin="0 auto",button.style.width="75%",get.appendChild(title),get.appendChild(divider),inputs.appendChild(idinput),inputs.appendChild(usernameinput),inputs.appendChild(button),get.appendChild(inputs);


document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-4 > div > div:nth-child(5)").remove() //clear unnecessary divs to make more space
document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-4 > div > div:nth-child(5)").remove()



document.querySelector("#connectSocket").addEventListener("click", () => {
  const socket = io("http://127.0.0.1:3000");
  //send a message to the server to join a specific chat room
  socket.emit("join room", {
    username: document.querySelector("#username").value,
    roomName: document.querySelector("#roomID").value,
    location: window.location.href //for identifying the user is room creator or not
  })

  socket.on("changeLocation", (data) => {
    if (data.changeTo !== window.location.href) { //if the participant url and creator of the room's url does not mach change the url of the participant
      alert("The creator of the room is curently watching a different anime. Redirecting...")
      window.location.href = data.changeTo
    }
  })

  var getPlayerName;
  var videoElement;
  socket.on("send data", (data) => { //create a chatbox

    let getDiv =
      document.querySelector("#arkaplan > div:nth-child(3) > div.col-xs-4 > div > div:nth-child(2) > div")
    getDiv.setAttribute("class", "chat")
    getDiv.innerHTML = ""
    getDiv.style="",getDiv.style.height="60rem",getDiv.style.display="flex",getDiv.style.flexDirection="column",getDiv.style.backgroundColor="#161716";let create=document.createElement("p");create.style.marginLeft="1rem",create.style.marginTop="1rem",create.innerText="Connected to: "+data.roomname+" as "+data.username,create.style.fontSize="2rem",getDiv.appendChild(create);let chatBar=document.createElement("div");chatBar.style.backgroundColor="#1d1e1f",chatBar.style.width="90%",chatBar.style.position="relative",chatBar.style.height="80%",chatBar.style.margin="0 auto",chatBar.id="chatBar";let alt=document.createElement("div");alt.style.display="flex",alt.style.alignItems="center",alt.style.bottom="0%",alt.style.height="5rem",alt.style.position="absolute",alt.style.backgroundColor="#0b0d0c",alt.style.width="100%";let msginput=document.createElement("input");msginput.style.position="relative",msginput.style.outline="none",msginput.style.border="none",msginput.style.height="100%",msginput.style.width="80%",msginput.style.fontSize="1.2rem",msginput.style.paddingLeft="10px",msginput.style.paddingRight="10px",alt.appendChild(msginput);let sendBut=document.createElement("button");sendBut.style.position="relative",sendBut.style.height="100%",sendBut.style.width="20%",sendBut.style.backgroundColor="#141414",sendBut.style.outline="none",sendBut.style.border="none";

    sendBut.addEventListener("click", () => {
      if (msginput.value.trim().length > 0) {
        socket.emit("serverMessage", msginput.value.trim())
        msginput.value = ""
      }
    })

    msginput.addEventListener('keydown', function onEvent(event) {
      if (event.key === "Enter") {
        if (msginput.value.trim().length > 0) {
          socket.emit("serverMessage", msginput.value.trim())
          msginput.value = ""
        }
      }
    });

    alt.appendChild(sendBut)
    chatBar.appendChild(alt)
    getDiv.appendChild(chatBar)

    function start() {
      getPlayerName = document.getElementsByClassName("btn btn-sm btn-danger")[3].innerText.trim().toLowerCase().replace("(beta)", "")
      const getIframe = document.querySelector("#videodetay > div > div.video-icerik > iframe")
      if (getIframe.src.includes("player")) { //if src includes player that means the player is jw player based(hdvid, anavids, alucard)
        //dunno why but mutation observer is not working on iframes so gonna go with recursive function instead
        //EDIT: yes, we can not use mutation observer IN IFRAMES but we can watch the changes outside of the iframe 😁 so, I'm not gonna go with recursive anymore.(PLANNED FOR NEXT COMMITS) 
        function serviceWorker() {
          try {
             videoElement = getIframe.contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video")
            //TIME UPDATE
            timeUpdate.watchTimeUpdate().then((data) => {
              if(data.playing == true) {  
              socket.emit("changeVideoStatus", {
                playing: true,
                player: getPlayerName,
                changeTime: videoElement.currentTime,
                timeText: document.querySelector("#videodetay > div > div.video-icerik > iframe").contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").innerText.trim()
              })
              } else {
                socket.emit("changeVideoStatus", {
                  playing: false,
                  player: getPlayerName,
                  changeTime: videoElement.currentTime,
                  timeText: document.querySelector("#videodetay > div > div.video-icerik > iframe").contentWindow.document.querySelector("#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed").innerText.trim()
                })
              }
            })

            //PLAY AND PAUSE
            videoElement.addEventListener("play", () => {
              socket.emit("changeVideoStatus", {
                playing: true,
                player: getPlayerName
              })
            })

            videoElement.addEventListener("pause", () => {
              socket.emit("changeVideoStatus", {
                playing: false,
                player: getPlayerName
              })
            })
          } catch (e) {
            setTimeout(() => {
              serviceWorker()
            }, 100);
          }
        }
        serviceWorker()
      } else {
        //next commit
      }
    }

    var targetNode = document.getElementById('videodetay');

    var config = {
      attributes: true,
      childList: true
    };

    let fired = false;
    var callback = function (mutationsList) { //fire when player changed
      for (var mutation of mutationsList) {
        if (mutation.type == 'childList') {
          //fires 2 times so handle that
          if (fired == true) {
            fired = false
            return;
          }
          fired = true
          start()
        }
      }
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  })

  videoStatusChanged.start(socket)

  socket.on("clientMessage", (data) => {
    let chatBarGet = document.querySelector("#chatBar")
    let message = document.createElement("p")
    message.style.fontSize = "1.5rem"
    message.innerText = data.author + ": " + data.messageContent
    chatBarGet.appendChild(message)
  })

})

