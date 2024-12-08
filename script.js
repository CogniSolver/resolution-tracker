const form = document.getElementById("resolution-form");
const input = document.getElementById("resolution-input");
const list = document.getElementById("resolution-list");

// Load resolutions from localStorage on page load
document.addEventListener("DOMContentLoaded", loadResolutions);

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const resolution = input.value.trim();
  if (resolution) {
    addResolution(resolution);
    input.value = "";
  }
});

// Add a resolution to the list
function addResolution(resolution) {
  const li = document.createElement("li");
  li.innerHTML = `
                <input type="checkbox" />
                <span>${resolution}</span>
                <button class="delete-btn">Delete</button>
            `;
  list.appendChild(li);
  saveResolutions();
}

// Save resolutions to localStorage
function saveResolutions() {
  const resolutions = Array.from(
    document.querySelectorAll("#resolution-list li")
  ).map((li) => ({
    text: li.querySelector("span").textContent,
    completed: li.querySelector("input").checked,
  }));
  localStorage.setItem("resolutions", JSON.stringify(resolutions));
}

// Load resolutions from localStorage
function loadResolutions() {
  const resolutions = JSON.parse(localStorage.getItem("resolutions")) || [];
  resolutions.forEach(({ text, completed }) => {
    const li = document.createElement("li");
    li.innerHTML = `
                    <input type="checkbox" ${completed ? "checked" : ""} />
                    <span>${text}</span>
                    <button class="delete-btn">Delete</button>
                `;
    list.appendChild(li);
  });
}

// Handle resolution interactions (delete, toggle complete)
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveResolutions();
  } else if (e.target.type === "checkbox") {
    saveResolutions();
  }
});
