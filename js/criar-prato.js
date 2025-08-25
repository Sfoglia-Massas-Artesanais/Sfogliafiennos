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
    const res = await fetch("http://localhost:5000/pratos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(prato),
    });

    if (res.ok) {
      const choice = await showModal("Prato criado com sucesso!");
      if (choice === "ok") {
        window.location.href = "../painelDeAdiministracao.html";
      }
    } else {
      const data = await res.json();
      await showModal(data.message || "Erro ao criar prato");
    }
  } catch {
    await showModal("Erro de conexão com o servidor");
  }
});
