function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (e) {
    return true;
  }
}

const token = localStorage.getItem("token");

if (!token || isTokenExpired(token)) {
  localStorage.removeItem("token");
  window.location.href = "../login/login.html";
}

const lista = document.querySelector(".lista-pratos-painel");
const formPesquisa = document.querySelector(".pesquisa");

async function carregarPratos(search = "") {
  lista.innerHTML = "<p>Carregando...</p>";
  try {
    const res = await fetch(`http://localhost:5000/pratos?search=${search}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      await showModal("Sua sessão expirou. Faça login novamente.");
      window.location.href = "../login/login.html";
      return;
    }

    const pratos = await res.json();
    lista.innerHTML = "";

    pratos.forEach((prato) => {
      const div = document.createElement("div");
      div.classList.add("menu-item-painel");

      div.innerHTML = `
        <img class="imagem" src="${prato.imagem}" alt="${prato.nome}" />
        <div class="desc-painel">
          <h3 class="titulo">${prato.nome}</h3>
          <p class="descricao">${prato.descricao}</p>
          <p class="categoria" style="color: green; font-weight: 600">Categoria: ${
            prato.categoria
          }</p>
          <h4 class="preco">R$ ${prato.preco.toFixed(2)}</h4>
          <div class="button-prato-painel">
            <button class="btn-editar" data-id="${prato.id}">
              <i class="bx bx-edit"></i> Editar
            </button>
            <button class="btn-excluir" data-id="${prato.id}">
              <i class="bx bx-trash"></i> Excluir
            </button>
          </div>
        </div>
      `;

      lista.appendChild(div);
      if (pratos.length < 3) {
        lista.classList.add("lista-pratos-painel");
      } else {
        lista.classList.add("lista-pratos-painel-tree");
      }
    });

    adicionarEventos();
  } catch (err) {
    lista.innerHTML = "<p>Erro ao carregar pratos</p>";
  }
}

function adicionarEventos() {
  document.querySelectorAll(".btn-excluir").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const choice = await showModal("Deseja excluir este prato?", true);
      if (choice === "ok") {
        try {
          const res = await fetch(`http://localhost:5000/pratos/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (res.status === 401) {
            localStorage.removeItem("token");
            await showModal("Sua sessão expirou. Faça login novamente.");
            window.location.href = "../login/login.html";
            return;
          }

          if (res.ok) {
            await showModal("Prato excluído com sucesso!");
            carregarPratos();
          } else {
            await showModal("Erro ao excluir prato");
          }
        } catch {
          await showModal("Erro de conexão com o servidor");
        }
      }
    });
  });

  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `./formulario/editarPrato.html?id=${id}`;
    });
  });
}

formPesquisa.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector(".input-pesquisa").value;
  carregarPratos(search);
});

document.querySelector("#logout-btn").addEventListener("click", async () => {
  const choice = await showModal("Deseja realmente sair?", true);
  if (choice === "ok") {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  }
});

carregarPratos();
