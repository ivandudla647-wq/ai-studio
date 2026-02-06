function enter() {
  document.getElementById("age").style.display = "none";
  document.getElementById("app").style.display = "block";
}

async function generate() {
  document.getElementById("result").innerHTML = "Generating...";

  const r = await fetch("/api/generate");
  const data = await r.json();

  document.getElementById("result").innerHTML = `
    <img src="${data.image}">
    <br><br>
    <a href="https://YOURSTORE.lemonsqueezy.com/checkout/buy/PRODUCT_ID">
      Unlock HD
    </a>
  `;
}