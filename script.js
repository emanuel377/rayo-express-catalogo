const phoneNumber = "50684442882";
const navLinks = document.querySelectorAll('a[href^="#"]');

function setActiveNav(targetId) {
  document.querySelectorAll(".tab-chip, .bottom-link").forEach((link) => {
    const isActive = link.getAttribute("href") === `#${targetId}`;
    link.classList.toggle("active", isActive);

    if (link.classList.contains("tab-chip")) {
      link.setAttribute("aria-selected", String(isActive));
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(target.id);
  });
});

document.querySelectorAll(".product-card").forEach((card) => {
  const qtyDisplay = card.querySelector("[data-qty]");
  const whatsappLink = card.querySelector("[data-whatsapp-link]");
  const productName = card.dataset.product;

  const updateLink = () => {
    const quantity = Number(qtyDisplay.textContent);
    const message = `Hola Rayo Express, quiero ${quantity} ${productName}. Me pueden dar mas informacion?`;
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  card.querySelectorAll(".qty-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const currentQty = Number(qtyDisplay.textContent);
      const nextQty =
        button.dataset.action === "increase"
          ? currentQty + 1
          : Math.max(1, currentQty - 1);

      qtyDisplay.textContent = String(nextQty);
      updateLink();
    });
  });

  updateLink();
});

setActiveNav("catalogo");
