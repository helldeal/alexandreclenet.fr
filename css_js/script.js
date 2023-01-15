/*===============================Preloader===================================
* Before every elements are loaded, a loading page apears
* then it disapears when all elements are loaded
*/

//const loader = document.getElementById("preloader");



function openSpot() {
    document.getElementsByClassName("layerspotify")[0].style.transform = "translateY(-100%)"
    document.getElementById("overlay").style.display="block"
    document.body.classList.add("notScrollable")
}



/* Set the width of the side navigation to 0 */
function closeSpot() {
    document.getElementsByClassName("layerspotify")[0].style.transform = "translateY(100%)"
    document.getElementById("overlay").style.display="none"
    document.body.classList.remove("notScrollable")
}