document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target.search.value.trim();

  if (query) {
    // redireciona para a página de resultados com ?q=texto
    window.location.href = `../../resultados/?q=${encodeURIComponent(query)}`;
  }
});
