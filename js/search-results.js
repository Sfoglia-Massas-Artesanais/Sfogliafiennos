const params = new URLSearchParams(window.location.search);
const query = params.get("q");

const lista = document.querySelector(".dishes-list");

async function buscarPratos() {
  lista.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch(
      `http://localhost:5000/pratos?search=${encodeURIComponent(query)}`
    );
    const pratos = await res.json();

    lista.innerHTML = "";

    if (!pratos.length) {
      lista.innerHTML = "<p>Nenhum prato encontrado.</p>";
      return;
    }

    pratos.forEach((prato) => {
      const div = document.createElement("div");
      div.classList.add("menu-item");

      div.innerHTML = `
        <img class="imagem" src="${prato.imagem}" alt="${prato.nome}" />
        <h3 class="titulo">${prato.nome}</h3>
        <p class="descricao">${prato.descricao}</p>
        <h4 class="preco">R$ ${prato.preco.toFixed(2)}</h4>
        <button class="ver-mais" data-id="${prato.id}">Veja Mais!</button>
      `;

      lista.appendChild(div);
      if (pratos.length === 1) {
        lista.classList.add("dishes-list-um");
      } else if (pratos.length === 2) {
        lista.classList.add("dishes-list-dois");
      } else if (pratos.length === 3) {
        lista.classList.add("dishes-list");
      } else if (pratos.length > 3) {
        lista.classList.add("dishes-list-tree");
      }
    });

    // clique no "Veja Mais!"
    document.querySelectorAll(".ver-mais").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.location.href = `../details/detalhes.html?id=${id}`;
      });
    });
  } catch (err) {
    lista.innerHTML = "<p>Erro ao buscar pratos.</p>";
  }
}

if (query) {
  buscarPratos();
} else {
  lista.innerHTML = "<p>Digite algo para pesquisar.</p>";
}
