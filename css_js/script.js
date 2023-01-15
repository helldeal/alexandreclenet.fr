/*===============================Preloader===================================
* Before every elements are loaded, a loading page apears
* then it disapears when all elements are loaded
*/

//const loader = document.getElementById("preloader");
window.addEventListener("click",function() {
        document.getElementById("preloader").style.transform = "translateX(100%)";
        if(window.innerWidth <= 800) {
            titleGeneral.classList.add('isVisible');
        }
    document.getElementById('music').play();
});