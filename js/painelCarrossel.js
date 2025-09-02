const listaCarrossel = document.querySelector("#carousel-list");
const formCarrossel = document.querySelector("#form-carousel");

async function carregarCarrossel() {
  listaCarrossel.innerHTML = "<p>Carregando...</p>";
  try {
    const res = await fetch("https://server-sfoglia.onrender.com/carrossel");
    const imagens = await res.json();

    listaCarrossel.innerHTML = "";
    imagens.forEach((img) => {
      const div = document.createElement("div");
      div.classList.add("carousel-item-admin");
      div.innerHTML = `
        <img src="${img.url}" alt="propaganda" width="150"/>
        <button class="bnt-excluir-propaganda" data-id="${img.id}">Excluir</button>
      `;
      listaCarrossel.appendChild(div);
    });

    document.querySelectorAll(".bnt-excluir-propaganda").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const choice = await showModal("Deseja excluir esta imagem?", true);
        if (choice === "ok") {
          await fetch(`https://server-sfoglia.onrender.com/carrossel/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          carregarCarrossel();
        }
      });
    });
  } catch {
    listaCarrossel.innerHTML = "<p>Erro ao carregar imagens</p>";
  }
}

formCarrossel.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.querySelector("#carousel-url").value;

  await fetch("https://server-sfoglia.onrender.com/carrossel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ url }),
  });

  document.querySelector("#carousel-url").value = "";
  carregarCarrossel();
});

// Inicializar
carregarCarrossel();
