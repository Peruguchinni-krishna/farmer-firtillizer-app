window.FertilizerUI = {
  renderResult(resultElement, prediction) {
    const title = document.createElement("h3");
    title.textContent = prediction.suggestion;

    const details = document.createElement("p");
    details.textContent = prediction.details;

    const extra = document.createElement("p");
    extra.textContent = prediction.note;

    resultElement.innerHTML = "";
    resultElement.appendChild(title);
    resultElement.appendChild(details);
    resultElement.appendChild(extra);
    resultElement.classList.remove("error");
  },

  renderHistory(listElement, history) {
    listElement.innerHTML = "";

    if (!history.length) {
      const placeholder = document.createElement("li");
      placeholder.textContent = "No predictions yet.";
      listElement.appendChild(placeholder);
      return;
    }

    history.forEach((entry) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${entry.suggestion}</strong>
        <span>${entry.details}</span>
        <small>${entry.timestamp}</small>
      `;
      listElement.appendChild(item);
    });
  },

  showError(resultElement, message) {
    resultElement.textContent = message;
    resultElement.classList.add("error");
  },
};
