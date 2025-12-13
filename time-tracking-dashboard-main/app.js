const dailyBtn = document.getElementById('daily')
const weeklyBtn = document.getElementById('weekly')
const monthlyBtn = document.getElementById('monthlyBtn')

fetch('./data.json')
  .then(r => r.json())
  .then(data => console.log(data));


