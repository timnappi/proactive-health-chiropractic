const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const appointmentForm = document.querySelector("#appointment-form");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", document.body.classList.contains("booking-page") || window.scrollY > 20);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

appointmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(appointmentForm);
  const name = formData.get("name")?.toString().trim() || "New patient";
  const contact = formData.get("contact")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";
  const subject = encodeURIComponent(`Appointment request from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone or email: ${contact}\n\nWhat I would like help with:\n${message}`
  );

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
