const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

async function consultarIA() {
  const msg = input.value.trim();
  if (!msg) return;

  addMsg("my", msg);
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();

if (data.choices && data.choices.length > 0) {
  const reply = data.choices[0].message.content;
  addMsg("ia", reply);
    } else if (data.error) {
      addMsg("ia", `⚠️ Error: ${data.error.message || data.error}`);
    } else {
      addMsg("ia", "⚠️ Respuesta inesperada del servidor.");
      console.error("Respuesta inesperada:", data);
    }

  } catch (e) {
    console.error(e);
    addMsg("ia", "❌ No se pudo conectar con la IA.");
  }
}

function addMsg(cls, text) {
  const div = document.createElement("div");
  div.className = `message ${cls}`;
  div.innerText = text || "⚠️ (mensaje vacío)";
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
