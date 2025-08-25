const images = document.querySelector(".carousel-images");
let totalSlides = 0;
let index = 0;

const updateCarousel = () => {
  if (totalSlides > 0) {
    images.style.transform = `translateX(${-index * 100}%)`;
  }
};

document.querySelector(".next").addEventListener("click", () => {
  if (totalSlides > 0) {
    index = (index + 1) % totalSlides;
    updateCarousel();
  }
});

document.querySelector(".prev").addEventListener("click", () => {
  if (totalSlides > 0) {
    index = (index - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }
});

setInterval(() => {
  if (totalSlides > 0) {
    index = (index + 1) % totalSlides;
    updateCarousel();
  }
}, 5000);

async function carregarCarrossel() {
  const container = document.querySelector(".carousel-images");
  try {
    const res = await fetch("http://localhost:5000/carrossel");
    const imagens = await res.json();

    container.innerHTML = "";
    imagens.forEach((img) => {
      const el = document.createElement("img");
      el.src = img.url;
      el.alt = "propaganda";
      container.appendChild(el);
    });

    totalSlides = imagens.length;
    index = 0;
    updateCarousel();
  } catch (err) {
    console.error("Erro ao carregar carrossel:", err);
  }
}

carregarCarrossel();
