const tips = [
  "Use fresh herbs to add a burst of flavor to your dishes.",
  "Save pasta water to make sauces creamier.",
  "Roast spices before using them to enhance their aroma.",
  "To peel ginger easily, use a spoon instead of a knife.",
  "Preheat your pans before adding ingredients for better cooking.",
  "Use room temperature ingredients when baking for the best results.",
  "Always rest cooked meat for a few minutes to retain its juices.",
  "Salt your pasta water like the sea for optimal flavor.",
];

function getDailyTip() {
  const randomIndex = Math.floor(Math.random() * tips.length);
  document.getElementById("daily-tip").innerText = tips[randomIndex];
}

window.onload = getDailyTip;
