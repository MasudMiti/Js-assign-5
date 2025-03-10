// Define Elements
const root = document.getElementById("root");
const btn = document.getElementById("change-btn");
const dateAt = document.getElementById("show-date");
const dayAt = document.getElementById("show-day");
const completeButtons = document.querySelectorAll("#complete-btn");
const taskCountEl = document.getElementById("task-count");
const navCountEl = document.getElementById("nav-count");
const activityLogEl = document.getElementById("activity-log");
const clearEl = document.getElementById("clear-btn");
// Working on date
const deadline = new Date();
const dayName = deadline.toLocaleString("default", { weekday: "short" });
const dayNumber = deadline.getDate();
const monthName = deadline.toLocaleString("default", { month: "short" });
const year = deadline.getFullYear();
const formattedDate = ` ${monthName} ${dayNumber} ${year}`;
dayAt.innerText = dayName;
dateAt.innerText = formattedDate;
// Working on background color changed
window.onload = () => {
  main();
};
function main() {
  btn.addEventListener("click", function () {
    const bgColor = generateRGBColor();
    root.style.backgroundColor = bgColor;
  });
}
function generateRGBColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}
// Working on completed buttons
completeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.disabled) {
      // Disable the button
      button.disabled = true;
      button.textContent = "Completed";
      // Reduce task count
      let taskCount = parseInt(taskCountEl.textContent);
      if (taskCount > 0) {
        taskCountEl.textContent = taskCount - 1;
      }
      // Increase navigation count
      let navCount = parseInt(navCountEl.textContent);
      navCountEl.textContent = navCount + 1;
      // Add entry
      const taskTitle = button.dataset.taskTitle;
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const logEntry = document.createElement("p");
      logEntry.className = "my-4 bg-blue-50 p-2 rounded-lg";
      logEntry.textContent = `You have completed the task "${taskTitle}" at ${currentTime}`;
      activityLogEl.prepend(logEntry);
    }
  });
});
clearEl.addEventListener("click", () => {
  activityLogEl.innerHTML = "";
});