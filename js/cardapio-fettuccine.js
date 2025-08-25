const lista = document.querySelector(".dishes-list");

async function carregarPratos() {
  lista.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch("http://localhost:5000/pratos?search=fettuccine");
    const pratos = await res.json();

    lista.innerHTML = "";

    if (pratos.length === 0) {
      lista.innerHTML = "<p>Nenhum prato encontrado nesta categoria.</p>";
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

    adicionarEventos();
  } catch (err) {
    lista.innerHTML = "<p>Erro ao carregar os pratos.</p>";
  }
}

function adicionarEventos() {
  document.querySelectorAll(".ver-mais").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `../details/detalhes.html?id=${id}`;
    });
  });
}

// Inicializar
carregarPratos();
