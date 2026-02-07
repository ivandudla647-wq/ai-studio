let used = false;

function enter() {
  document.getElementById("age").style.display = "none";
  document.getElementById("app").style.display = "block";
}

async function generate() {
  if (used) {
    alert("Free limit reached");
    return;
  }

  used = true;

  const result = document.getElementById("result");
  result.innerHTML = "<div class='loader'>Generating…</div>";

  const res = await fetch("/api/generate");
  const data = await res.json();

  if (data.image) {
    result.innerHTML = `
      <div class="blur">
        <img src="${data.image}" />
      </div>
      <button class="unlock" onclick="window.location.href='https://ivandudla.lemonsqueezy.com/checkout/buy/4a79d1e4-214a-4cd3-93ac-658a881afadc'">
  Unlock HD
</button>
    `;
  } else {
    result.innerHTML = "Error";
  }
}