(function () {
  const form = document.getElementById("fertilizerForm");
  const resultEl = document.getElementById("result");
  const historyList = document.getElementById("historyList");
  const STORAGE_KEY = "fertilizerPredictionHistory";

  function loadHistory() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn("Failed to parse history:", error);
      window.localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }

  function saveHistory(entry) {
    const history = loadHistory();
    history.unshift(entry);
    const trimmed = history.slice(0, 5);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    return trimmed;
  }

  function renderHistory() {
    const history = loadHistory();
    window.FertilizerUI.renderHistory(historyList, history);
  }

  function validateInput(input) {
    if (!input.crop) {
      throw new Error("Please enter the crop type.");
    }

    if (!input.soil) {
      throw new Error("Please enter the soil type.");
    }

    if ([input.nitrogen, input.phosphorus, input.potassium, input.temp, input.humidity]
      .some((value) => value === "" || Number.isNaN(Number(value)))) {
      throw new Error("Please provide valid numeric values for all fields.");
    }
  }

  function showMessage(message, isError = false) {
    if (isError) {
      window.FertilizerUI.showError(resultEl, message);
    } else {
      window.FertilizerUI.renderResult(resultEl, message);
    }
  }

  async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("service-worker.js");
        console.log("Service worker registered.");
      } catch (error) {
        console.warn("Service worker failed:", error);
      }
    }
  }

  async function init() {
    renderHistory();
    await registerServiceWorker();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      try {
        const input = {
          crop: document.getElementById("crop").value.trim(),
          soil: document.getElementById("soil").value.trim(),
          nitrogen: document.getElementById("nitrogen").value,
          phosphorus: document.getElementById("phosphorus").value,
          potassium: document.getElementById("potassium").value,
          temp: document.getElementById("temp").value,
          humidity: document.getElementById("humidity").value,
        };

        validateInput(input);
        const prediction = window.predictFertilizer(input);

        showMessage(prediction);
        const history = saveHistory(prediction);
        window.FertilizerUI.renderHistory(historyList, history);
      } catch (error) {
        showMessage(error.message, true);
      }
    });
  }

  window.addEventListener("load", init);
})();
