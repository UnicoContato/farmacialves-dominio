const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const modal = document.querySelector(".modal");
const modalImage = modal.querySelector("img");
const modalCaption = modal.querySelector("figcaption");
const modalClose = modal.querySelector(".modal-close");
const whatsappModal = document.querySelector(".whatsapp-modal");
const whatsappClose = document.querySelector(".whatsapp-close");
const whatsappOptions = document.querySelectorAll(".whatsapp-option");
let activeWhatsappTrigger = null;

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".whatsapp-queue").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activeWhatsappTrigger = link;
    const message = link.dataset.whatsappMessage || "Olá, vim pelo site da Drogaria Alves.";

    whatsappOptions.forEach((option) => {
      const number = option.dataset.whatsappNumber;
      option.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    });

    whatsappModal.hidden = false;
    document.body.classList.add("whatsapp-open");
    whatsappOptions[0].focus();
  });
});

function closeWhatsappModal() {
  whatsappModal.hidden = true;
  document.body.classList.remove("whatsapp-open");

  if (activeWhatsappTrigger) {
    activeWhatsappTrigger.focus();
    activeWhatsappTrigger = null;
  }
}

whatsappClose.addEventListener("click", closeWhatsappModal);

whatsappModal.addEventListener("click", (event) => {
  if (event.target === whatsappModal) {
    closeWhatsappModal();
  }
});

whatsappOptions.forEach((option) => {
  option.addEventListener("click", () => {
    closeWhatsappModal();
  });
});

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    modalImage.src = item.dataset.image;
    modalImage.alt = item.querySelector("img").alt;
    modalCaption.textContent = item.dataset.caption;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  });
});

function closeModal() {
  modal.hidden = true;
  modalImage.src = "";
  document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }

  if (event.key === "Escape" && !whatsappModal.hidden) {
    closeWhatsappModal();
  }
});
