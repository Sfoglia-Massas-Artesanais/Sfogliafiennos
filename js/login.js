document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      const choice = await showModal("Login realizado com sucesso!"); // ✅ espera clicar OK
      if (choice === "ok") {
        window.location.href = "../admin/painelDeAdiministracao.html";
      }
    } else {
      await showModal(data.message || "Erro ao fazer login");
    }
  } catch (err) {
    await showModal("Erro de conexão com o servidor");
  }
});
