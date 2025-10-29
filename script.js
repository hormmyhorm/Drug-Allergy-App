const FORM_KEY = "demoForm:data";
const form = document.getElementById("demoForm");
const clearBtn = document.getElementById("clearBtn");
const statusEl = document.getElementById("status");

// โหลดข้อมูลเดิมจาก LocalStorage
(function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(FORM_KEY) || "{}");
    for (const [k, v] of Object.entries(saved)) {
      const el = form.elements[k];
      if (!el) continue;
      if (el.tagName === "SELECT" || el.tagName === "TEXTAREA" || el.type === "text") {
        el.value = v;
      }
    }
    statusMsg("โหลดข้อมูลเดิม (ถ้ามี) เรียบร้อย");
  } catch(e) {}
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem(FORM_KEY, JSON.stringify(data));
  statusMsg("บันทึกแล้ว (เก็บในเครื่องนี้)");
});

clearBtn.addEventListener("click", () => {
  form.reset();
  localStorage.removeItem(FORM_KEY);
  statusMsg("ล้างข้อมูลเรียบร้อย");
});

function statusMsg(msg) {
  statusEl.textContent = `• ${msg}`;
}
