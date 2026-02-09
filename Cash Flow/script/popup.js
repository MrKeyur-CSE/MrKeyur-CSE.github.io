const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

const form = document.getElementById("dataForm");
const empInput = document.getElementById("empInput");
const empNumberInput = document.getElementById("empNumberInput");
const tableBody = document.getElementById("employeeTableBody");

// -------------------------------
// Load data from localStorage
// -------------------------------
let entries = JSON.parse(localStorage.getItem("employees")) || [];

// Render table
function renderTable() {
    tableBody.innerHTML = "";

    entries.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.number}</td>
    `;
        tableBody.appendChild(row);
    });
}

// Initial render on page load
renderTable();

// -------------------------------
// Modal controls
// -------------------------------
openBtn.onclick = () => {
    modal.style.display = "block";
    empInput.focus();
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// -------------------------------
// Form submit (SAVE permanently)
// -------------------------------
form.onsubmit = (e) => {
    e.preventDefault();

    const name = empInput.value.trim();
    const number = empNumberInput.value.trim();

    if (!name || !number) return;

    const entry = { name, number };

    entries.push(entry);

    // Save permanently
    localStorage.setItem("employees", JSON.stringify(entries));

    renderTable();

    form.reset();
    modal.style.display = "none";
};