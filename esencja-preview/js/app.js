document.addEventListener("DOMContentLoaded",(function(e){let n=new Audio("/esencja-preview/sound/sample-sound1.mp3"),t=new Audio("/esencja-preview/sound/sample-sound2.mp3"),a=document.getElementById("play-marta"),d=document.getElementById("play-gosia");t.onplay=()=>{a.innerText="Playing..."},t.onpause=t.onended=()=>{a.innerText="Play"},a.addEventListener("click",(function(e){t.paused?t.play():(t.pause(),t.currentTime=0)})),n.onplay=()=>{d.innerText="Playing..."},n.onpause=n.onended=()=>{d.innerText="Play"},d.addEventListener("click",(function(e){n.paused?n.play():(n.pause(),n.currentTime=0)}))}));