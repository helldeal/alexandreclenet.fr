/*===============================Preloader===================================
* Before every elements are loaded, a loading page apears
* then it disapears when all elements are loaded
*/


var md = document.querySelectorAll(".mixbox h1");
// setTimeout(() => {  
//     document.getElementById("preloader").style.transform = "translateX(100%)";
// }, 500);


function openProjet() {
    document.getElementById("preloader").style.transform = "translateX(0%)";
    document.getElementsByClassName("mainpage")[0].style.transform = "translateX(-100%)"
    setTimeout(() => {  
        document.getElementById("preloader").style.transform = "translateX(-100%)"
        document.getElementsByClassName("projet")[0].style.transform = "translateX(-100%)"
    }, 1250);
}
function closeProjet() {
    document.getElementById("preloader").style.transform = "translateX(0%)";
    document.getElementsByClassName("projet")[0].style.transform = "translateX(0%)"
    setTimeout(() => {  
        document.getElementById("preloader").style.transform = "translateX(100%)";
        document.getElementsByClassName("mainpage")[0].style.transform = "translateX(0%)"
    }, 1250);
}

//document.getElementById("preloader").click()
