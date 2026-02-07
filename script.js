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
      <button class="unlock">Unlock HD</button>
    `;
  } else {
    result.innerHTML = "Error";
  }
}