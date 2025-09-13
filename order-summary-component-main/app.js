const cancelButton = document.querySelector('button[type="button"]');
const paymentButton = document.querySelector('button[type="submit"]');
const changePlan = document.querySelector('.change-link');

const planPrice = document.querySelector('.plan-price');
const originalPlanPrice = planPrice.textContent;

const orderSummaryPara = document.querySelector('article:first-of-type p');
const originalSummaryText = orderSummaryPara.textContent;

// Change to Monthly Plan
changePlan.addEventListener('click', () => {
    if (planPrice.textContent !== "$9.99/month") {
        planPrice.textContent = "$9.99/month";
    }
});

// Cancel Order = Reset
cancelButton.addEventListener('click', () => {
    planPrice.textContent = originalPlanPrice;
    orderSummaryPara.textContent = originalSummaryText;
});

// Payment Confirmation
paymentButton.addEventListener('click', () => {
    orderSummaryPara.textContent = "Get grooving!";
});
