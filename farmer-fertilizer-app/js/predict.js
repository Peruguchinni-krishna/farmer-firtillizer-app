window.predictFertilizer = function (input) {
  const crop = input.crop || "Unknown crop";
  const soil = input.soil || "Unknown soil";
  const nitrogen = Number(input.nitrogen);
  const phosphorus = Number(input.phosphorus);
  const potassium = Number(input.potassium);
  const temp = Number(input.temp);
  const humidity = Number(input.humidity);

  if ([nitrogen, phosphorus, potassium, temp, humidity].some((value) => Number.isNaN(value))) {
    throw new Error("Please provide valid numeric values for all fields.");
  }

  let suggestion = "Balanced NPK fertilizer";
  let reason = "N, P and K levels are within the recommended range.";

  if (nitrogen < 50) {
    suggestion = "Urea";
    reason = "Nitrogen is low, so a nitrogen-rich fertilizer is recommended.";
  } else if (phosphorus < 50) {
    suggestion = "DAP";
    reason = "Phosphorus is low, so a phosphorus-rich fertilizer is recommended.";
  } else if (potassium < 50) {
    suggestion = "MOP";
    reason = "Potassium is low, so a potassium-rich fertilizer is recommended.";
  }

  const timestamp = new Date().toLocaleString();
  const details = `${reason} Crop: ${crop}, Soil: ${soil}.`;
  const note = `Temperature: ${temp.toFixed(1)}°C, Humidity: ${humidity.toFixed(1)}%`;

  return {
    suggestion,
    details,
    note,
    timestamp,
  };
};
