function addStudent() {
    let name = document.getElementById("studentName").value;
    if (name === "") {
        alert("Enter student name");
        return;
    }
    let table = document.getElementById("studentTable");
    let row = table.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td class="status present">Present</td>
        <td>
            <button onclick="toggleStatus(this)">Toggle</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
    document.getElementById("studentName").value = "";
    updateStats();
    saveData();
}
// Present / Absent Toggle
function toggleStatus(btn) {
    let status = btn.parentElement.parentElement.children[1];
    if (status.innerText === "Present") {
        status.innerText = "Absent";
        status.classList.remove("present");
        status.classList.add("absent");
    } else {
        status.innerText = "Present";
        status.classList.remove("absent");
        status.classList.add("present");
    }
    updateStats();
    saveData();
}
// Delete Student
function deleteRow(btn) {
    btn.parentElement.parentElement.remove();

    updateStats();
    saveData();
}
// Update Total Students & Percentage
function updateStats() {
    let rows = document.querySelectorAll("#studentTable tr");
    let total = rows.length - 1;
    let present = document.querySelectorAll(".present").length;
    document.getElementById("totalCount").innerText = total;
    let percent = total === 0 ? 0 : (present / total) * 100;
    document.getElementById("attendancePercent").innerText =
        percent.toFixed(2);
}
// Save Data
function saveData() {
    localStorage.setItem(
        "attendanceData",
        document.getElementById("studentTable").innerHTML
    );
}
// Load Data
function loadData() {
    let data = localStorage.getItem("attendanceData");

    if (data) {
        document.getElementById("studentTable").innerHTML = data;
        updateStats();
    }
}
// Page Load
window.onload = function () {
    loadData();
};