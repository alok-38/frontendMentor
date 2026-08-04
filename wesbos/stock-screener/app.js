let stocks = [
  { name: "TCS", pe: 28, roe: 40, debt: 0, growth: 12 },
  { name: "Infosys", pe: 25, roe: 32, debt: 0, growth: 10 },
  { name: "HDFC Bank", pe: 22, roe: 17, debt: 60, growth: 14 },
  { name: "ABC Tech", pe: 35, roe: 25, debt: 5, growth: 20 },
  { name: "XYZ Infra", pe: 18, roe: 10, debt: 80, growth: 6 },
];

// Screener function
function screenStocks(stocks, criteriaFn) {
  return stocks.filter(criteriaFn);
}

// Define your investing style
let qualityGrowth = (stock) =>
  stock.roe > 20 && stock.debt < 20 && stock.growth > 10;

// Run screener
let reult = screenStocks(stocks, qualityGrowth).map((stock) => stock.name);
console.log(reult);