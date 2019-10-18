function loadScript() {
  const button = document.querySelector("button");
  const ul = document.querySelector("ul");

  function search() {
    const queryUrl = "http://localhost:3000/search";
    fetch(queryUrl)
      .then(response => response.json())
      .then(result => {
        result.statuses.forEach(statusObj => {
          const li = document.createElement("li");
          li.textContent = statusObj.text;
          ul.appendChild(li);
        });
      });
  }

  button.addEventListener("click", search);
}
document.addEventListener("DOMContentLoaded", loadScript);
