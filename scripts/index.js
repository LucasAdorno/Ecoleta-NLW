const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const cancelSearch = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", ()=> modal.classList.remove("hide"))

cancelSearch.addEventListener("click", () => modal.classList.add("hide"))