"use strict";

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select?.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
selectItems?.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.textContent.toLowerCase();
    console.log("Select item clicked:", selectedValue); // Debug log
    selectValue.textContent = this.textContent;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  console.log("Filtering for:", selectedValue); // Debug log
  filterItems.forEach(item => {
    const category = item.dataset.category?.toLowerCase() || "";
    console.log("Item category:", category); // Debug log
    if (selectedValue === "all" || category === selectedValue) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let selectedValue = this.textContent.toLowerCase();
    console.log("Filter button clicked:", selectedValue, "Debug:", this.dataset.debug); // Debug log
    selectValue.textContent = this.textContent; // Sync select dropdown
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (const input of formInputs) {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetPage = this.textContent.toLowerCase();
    pages.forEach((page) => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        this.classList.add("active");
      } else {
        page.classList.remove("active");
        navigationLinks.forEach((otherLink) => {
          if (otherLink !== this) otherLink.classList.remove("active");
        });
      }
    });
    window.scrollTo(0, 0);
  });
});

// Initialize with "All" selected
console.log("Initializing with All"); // Debug log
filterFunc("all");