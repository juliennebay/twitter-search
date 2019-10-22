function loadScript() {
  const button = document.querySelector("button");
  const ul = document.querySelector("ul");
  const input = document.querySelector("input");

  function search() {
    //clear old search results, if any
    Array.from(ul.children).forEach(item => item.remove());

    const queryUrl = `http://localhost:3000/search?q=${input.value}`;
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
