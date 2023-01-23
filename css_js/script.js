/*===============================Preloader===================================
* Before every elements are loaded, a loading page apears
* then it disapears when all elements are loaded
*/


var md = document.querySelectorAll(".mixbox h1");
var clicked =false
window.addEventListener("click",function() {
    if(!clicked){
        document.getElementById("preloader").style.transform = "translateX(100%)";
        document.getElementById('GORDON').play();
        clicked=true
        setTimeout(() => {  
            document.querySelector("#preloader h1").style.display="none"
        }, 1500);
    }
        
});

function openSpot() {
    document.getElementsByClassName("layerspotify")[0].style.transform = "translateY(-100%)"
    document.getElementById("overlay").style.visibility="visible";
    document.getElementById("overlay").style.opacity = "1"; 
    document.getElementById("overlay").style.height = "60%"; 
}
function closeSpot() {
    document.getElementById("overlay").style.visibility="hidden";
    document.getElementById("overlay").style.opacity = "0"; 
    document.getElementById("overlay").style.height = "100%"; 
    document.getElementsByClassName("layerspotify")[0].style.transform = "translateY(100%)"
}

function openBio() {
    document.getElementById("preloader").style.transform = "translateX(0%)";
    document.getElementsByClassName("mainpage")[0].style.transform = "translateX(-100%)"
    setTimeout(() => {  
        document.getElementById("preloader").style.transform = "translateX(-100%)"
        document.getElementsByClassName("bio")[0].style.transform = "translateX(-100%)"
    }, 1250);
}
function closeBio() {
    document.getElementById("preloader").style.transform = "translateX(0%)";
    document.getElementsByClassName("bio")[0].style.transform = "translateX(0%)"
    setTimeout(() => {  
        document.getElementById("preloader").style.transform = "translateX(100%)";
        document.getElementsByClassName("mainpage")[0].style.transform = "translateX(0%)"
    }, 1250);
}

function openvid() {
    document.getElementById("preloader").style.transform = "translateX(0%)";
    document.getElementsByClassName("mainpage")[0].style.transform = "translateX(-100%)"
    setTimeout(() => {  
        document.getElementById("preloader").style.transform = "translateX(-100%)"
        document.getElementsByClassName("vid")[0].style.transform = "translateX(-100%)"
    }, 1250);
}
function closevid() {
    document.getElementById("preloader").style.transform = "translateX(0%)";
    document.getElementsByClassName("vid")[0].style.transform = "translateX(0%)"
    var iframe = document.querySelector( '#video1');
    var iframeSrc = iframe.src;
    iframe.src = iframeSrc;
    setTimeout(() => {  
        document.getElementById("preloader").style.transform = "translateX(100%)";
        document.getElementsByClassName("mainpage")[0].style.transform = "translateX(0%)"
    }, 1250);
}

document.getElementById("preloader").click()


for (var i = 0; i < md.length; i++) {
    md[i].addEventListener("click", function() {
        
        for (var y = 0; y < md.length; y++) {
            var audio=document.getElementById(md[y].textContent)
            md[y].style.color = "white";
            audio.pause();
            audio.currentTime = 0;
        }
        var headerText = this.textContent;
        var audio = document.getElementById(headerText);
        audio.play();
    });
}


var audioElements = document.getElementsByTagName("audio");
for (var i = 0; i < audioElements.length; i++) {
    audioElements[i].addEventListener("play", function() {
        var audioId = this.id;
        let headers = document.getElementsByTagName("h1");
        let header = Array.from(headers).find(h => h.textContent === audioId);
        header.style.color = "rgb(0, 136, 255)";
    });
}