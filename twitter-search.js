function loadScript(){
    const button = document.querySelector("button")

    function search(){
        const queryUrl = "http://localhost:3000/search"
        fetch(queryUrl)
    }

    button.addEventListener("click", search)
}
document.addEventListener("DOMContentLoaded", loadScript)