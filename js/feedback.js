document
  .querySelector("#feedback-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      showToast(result.message);

      if (res.ok) form.reset();
    } catch (err) {
      showToast("Erro ao enviar feedback.");
    }
  });
