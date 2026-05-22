const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiScore = document.getElementById("bmi-score");
const bmiCategory = document.getElementById("bmi-category");
const bmiRange = document.getElementById("bmi-range");

// Listen for input changes
heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

function calculateBMI() {
  const heightCm = parseFloat(heightInput.value);
  const weightKg = parseFloat(weightInput.value);

  if (!heightCm || !weightKg) return;

  // Convert cm → meters
  const heightM = heightCm / 100;

  // BMI formula
  const bmi = weightKg / (heightM * heightM);

  bmiScore.textContent = bmi.toFixed(1);

  // Category + range
  let category = "";
  let range = "";

  if (bmi < 18.5) {
    category = "underweight";
    range = "less than 18.5";
  } else if (bmi < 25) {
    category = "a healthy weight";
    range = "18.5 - 24.9";
  } else if (bmi < 30) {
    category = "overweight";
    range = "25 - 29.9";
  } else {
    category = "obese";
    range = "30 or more";
  }

  bmiCategory.textContent = category;
  bmiRange.textContent = range;
}

calculateBMI();