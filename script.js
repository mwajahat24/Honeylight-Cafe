const cursorGlow = document.querySelector(".cursor-glow");
const floatLayers = document.querySelectorAll(".float-layer");
const toast = document.getElementById("toast");
const recommendation = document.getElementById("recommendation");

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

document.addEventListener("mousemove", (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }

  if (isTouchDevice) return;

  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  floatLayers.forEach((layer) => {
    const speed = Number(layer.dataset.speed || 4);
    layer.style.translate = `${x * speed * 1.5}px ${y * speed * 1.5}px`;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

const recommendations = {
  cozy: "Your order: Golden Honey Latte + Almond Croissant. Warm, buttery, emotionally correct.",
  focused:
    "Your order: Double espresso + Sunrise Toast. Clean energy, no chaos.",
  sweet:
    "Your order: Lemon Cloud Cake + Rose Cardamom Latte. Dessert-first behavior. Respectable.",
  fresh:
    "Your order: Iced mint tea + Strawberry Cream Tart. Bright, light, and very garden-coded.",
};

function recommendItem(mood) {
  if (!recommendation) return;

  recommendation.textContent =
    recommendations[mood] || "Today feels like coffee and a pastry.";
  recommendation.animate(
    [
      { transform: "scale(.98)", opacity: 0.5 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: 320, easing: "ease-out" },
  );
}

function bookTable(event) {
  event.preventDefault();
  showToast("Booking request sent ✨");
  event.target.reset();
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 2400);
}
