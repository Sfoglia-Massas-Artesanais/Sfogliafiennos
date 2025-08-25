const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarDetalhes() {
  if (!id) {
    document.querySelector(".prato-details").innerHTML =
      "<p>Prato não encontrado.</p>";
    return;
  }

  try {
    const res = await fetch(`https://server-sfoglia.onrender.com/pratos/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar prato");

    const prato = await res.json();

    // Preenche os campos do prato principal
    document.querySelector("#img").src = prato.imagem;
    document.querySelector("#titulo").textContent = prato.nome;
    document.querySelector("#descricao").textContent = prato.descricao;
    document.querySelector("#preco").textContent = `R$ ${prato.preco.toFixed(
      2
    )}`;

    // Configura botões
    document.querySelector(".wpp").addEventListener("click", () => {
      window.open(
        `https://wa.me/5581984073966?text=Olá! Gostaria de saber mais informações sobre o prato ${prato.nome} que vocês oferecem. Seria possível me enviar detalhes sobre os ingredientes, tamanho e preço.`,
        "_blank"
      );
    });

    document.querySelector(".ifood").addEventListener("click", () => {
      window.open(
        "https://www.ifood.com.br/delivery/camaragibe-pe/sfoglia-massas-artesanais-santa-monica/2f66d94e-8da0-410e-90ff-32312fcf2db0?UTM_Medium=share&fbclid=PAZXh0bgNhZW0CMTEAAafC8Qg5s-XByI99n0qqNA0N37qACtE6lAuuL6Y501ZGQ7WiL9xpcfSfi8HcyQ_aem_dHCMaXHav_YA7XMPaTO5-Q",
        "_blank"
      );
    });

    // Carrega outros pratos
    carregarOutrosPratos(prato.id);
  } catch (err) {
    console.error(err);
    document.querySelector(".prato-details").innerHTML =
      "<p>Erro ao carregar detalhes do prato.</p>";
  }
}

async function carregarOutrosPratos(idAtual) {
  try {
    const res = await fetch("http://localhost:5000/pratos");
    if (!res.ok) throw new Error("Erro ao buscar outros pratos");

    const pratos = await res.json();
    const outros = pratos.filter((p) => p.id !== idAtual).slice(0, 4); // mostra até 4

    const lista = document.querySelector(".dishes-list");
    lista.innerHTML = "";

    if (outros.length === 0) {
      lista.innerHTML = "<p>Nenhum outro prato disponível.</p>";
      return;
    }

    outros.forEach((prato) => {
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

    // Ativa os botões "Veja Mais!"
    document.querySelectorAll(".ver-mais").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.location.href = `detalhes.html?id=${id}`;
      });
    });
  } catch (err) {
    console.error(err);
    document.querySelector(".dishes-list").innerHTML =
      "<p>Erro ao carregar outros pratos.</p>";
  }
}

carregarDetalhes();
