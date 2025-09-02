const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarPrato() {
  try {
    const res = await fetch(`https://server-sfoglia.onrender.com/pratos/${id}`);
    const prato = await res.json();

    document.querySelector("#nome").value = prato.nome;
    document.querySelector("#descricao").value = prato.descricao;
    document.querySelector("#categoria").value = prato.categoria;
    document.querySelector("#preco").value = prato.preco;
    document.querySelector("#imagem").value = prato.imagem;
  } catch {
    showToast("Erro ao carregar prato");
  }
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const prato = {
    nome: document.querySelector("#nome").value,
    descricao: document.querySelector("#descricao").value,
    categoria: document.querySelector("#categoria").value,
    preco: parseFloat(document.querySelector("#preco").value),
    imagem: document.querySelector("#imagem").value,
  };

  try {
    const res = await fetch(
      `https://server-sfoglia.onrender.com/pratos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(prato),
      }
    );

    if (res.ok) {
      const choice = await showModal("Prato atualizado com sucesso!");
      if (choice === "ok") {
        window.location.href = "../../painelDeAdiministracao.html";
      }
    } else {
      await showModal("Erro ao atualizar prato");
    }
  } catch {
    await showModal("Erro de conexão com o servidor");
  }
});

carregarPrato();
