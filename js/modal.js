function showModal(message, withCancel = false) {
  return new Promise((resolve) => {
    const modal = document.getElementById("modal-aviso");
    const msg = document.getElementById("modal-message");
    const okBtn = document.getElementById("modal-ok");
    const cancelBtn = document.getElementById("modal-cancel");

    msg.textContent = message;

    if (withCancel) {
      cancelBtn.style.display = "inline-block";
    } else {
      cancelBtn.style.display = "none";
    }

    modal.style.display = "flex";

    okBtn.onclick = () => {
      modal.style.display = "none";
      resolve("ok");
    };

    cancelBtn.onclick = () => {
      modal.style.display = "none";
      resolve("cancel");
    };
  });
}
