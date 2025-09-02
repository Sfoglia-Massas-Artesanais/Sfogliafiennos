async function carregarPratosAleatorios() {
  try {
    const res = await fetch("https://server-sfoglia.onrender.com/pratos");
    const pratos = await res.json();

    if (!pratos.length) return;

    // Embaralha os pratos
    const aleatorios = pratos.sort(() => Math.random() - 0.5).slice(0, 4);

    // Divide em 2 linhas
    const linha1 = document.getElementById("linha-1");
    const linha2 = document.getElementById("linha-2");

    linha1.innerHTML = "";
    linha2.innerHTML = "";

    aleatorios.forEach((prato, index) => {
      const div = document.createElement("div");
      div.classList.add("menu-item");

      div.innerHTML = `
        <img src="${prato.imagem}" alt="${prato.nome}" />
        <h3>${prato.nome}</h3>
        <p>${prato.descricao}</p>
        <h4>R$ ${prato.preco.toFixed(2)}</h4>
      `;

      if (index < 2) {
        linha1.appendChild(div);
      } else {
        linha2.appendChild(div);
      }
    });
  } catch (err) {
    console.error("Erro ao carregar pratos:", err);
  }
}

carregarPratosAleatorios();
