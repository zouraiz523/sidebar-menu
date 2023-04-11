const buttons = document.querySelectorAll("button");

const buttons_span = document.querySelectorAll("span");

const indicator = document.querySelector(".indicator");

const nav = document.querySelector("nav");

const svg_path = document.querySelectorAll("path");

svg_path.forEach((el) => el.setAttribute("fill", "#c0c0c0"));

svg_path.forEach((el) => el.setAttribute("stroke-width", "0.7"));

svg_path.forEach((el) => el.setAttribute("stroke", "#c0c0c0"));

buttons.forEach((button) => button.addEventListener("click", clickItem));

const initial_selected_item = document.getElementById("2");

let initial_selected_item_text = initial_selected_item.querySelector("span");
let initial_selected_item_svg = initial_selected_item.querySelector("svg");

initial_selected_item_text.className = "selected-text";

initial_selected_item_svg.setAttribute("stroke", "#ffffff");
initial_selected_item_svg.style.opacity = "1";

localStorage.setItem("stored_selected_item_id", "2");

function clickItem(e) {
  let previous_selected_item = document.getElementById(
    localStorage.getItem("stored_selected_item_id")
  );

  let previous_selected_item_text =
    previous_selected_item.querySelector("span");
  let previous_selected_item_svg = previous_selected_item.querySelector("svg");

  previous_selected_item_text.className = "deselected-text";

  previous_selected_item_svg.setAttribute("stroke", "#c0c0c0");
  previous_selected_item_svg.style.opacity = "0.5";
  previous_selected_item_svg.style.animation = "none";

  let selected_item = e.target;

  localStorage.setItem(
    "stored_selected_item_id",
    selected_item.querySelector("div").getAttribute("id")
  );

  let inner_text = selected_item.querySelector("span");
  let inner_svg = selected_item.querySelector("svg");

  inner_text.className = "selected-text";

  inner_svg.setAttribute("stroke", "#ffffff");
  inner_svg.style.opacity = "1";
  inner_svg.style.animation = "move-svg 0.5s 0.2s";

  indicator.style.top = `${
    -nav.getBoundingClientRect().top +
    selected_item.getBoundingClientRect().top -
    2
  }px`;
}

const anchor = document.querySelector(".expand-sidebar > div:nth-child(2)");

const sidebar = document.querySelector(".sidebar");
sidebar.style.setProperty("--sidebar-width", "18.5rem");

const sidebar_open = sidebar.getAttribute("open");

const badge = document.querySelector(".badge");

anchor.addEventListener("click", resizeSidebar);

function resizeSidebar() {
  let sidebar_open = sidebar.getAttribute("open");
  if (sidebar_open === "true") {
    buttons_span.forEach((el) => (el.style.display = "none"));
    sidebar.style.setProperty("--sidebar-width", "5rem");
    sidebar.setAttribute("open", "false");
    anchor.className = "open-anchor";
    badge.className = "badge badge-attached";
  } else {
    sidebar.setAttribute("open", "true");
    sidebar.style.setProperty("--sidebar-width", "18.5rem");
    anchor.className = "close-anchor";
    setTimeout(() => {
      buttons_span.forEach((el) => (el.style.display = "inline"));
      badge.className = "badge";
    }, 200);
  }
}