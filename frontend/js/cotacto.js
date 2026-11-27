const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// Modales usados en las tarjetas de ayuda de contacto.
const modal = $('#info-modal');
function openModal(title, message) {
  if (!modal) return;
  $('#modal-title').textContent = title || 'Más información';
  $('#modal-text').textContent = message || '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
}
$$('[data-modal-title]').forEach(el => el.addEventListener('click', () =>
  openModal(el.dataset.modalTitle, el.dataset.modalText)));
$('#modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Chatbot de contacto y apertura desde la página de contacto.
const chat = $('#chat-widget');
const launcher = $('#chat-launcher');
const messages = $('#chat-messages');
function setChat(open) {
  if (!chat) return;
  chat.classList.toggle('open', open);
  chat.setAttribute('aria-hidden', String(!open));
  if (open) $('#chat-text')?.focus();
}
launcher?.addEventListener('click', () => setChat(!chat.classList.contains('open')));
$('#chat-close')?.addEventListener('click', () => setChat(false));
$('#open-chat-page')?.addEventListener('click', () => setChat(true));
function addMessage(text, who = 'bot') {
  const bubble = document.createElement('div');
  bubble.className = who === 'user' ? 'user-message' : 'bot-message';
  bubble.textContent = text;
  messages?.appendChild(bubble);
  if (messages) messages.scrollTop = messages.scrollHeight;
}
function replyFor(message) {
  const t = message.toLowerCase();
  if (/soluci|servicio|portafolio/.test(t)) return 'Nuestro portafolio incluye networking, ciberseguridad, cableado estructurado, CCTV y control de acceso, Data Center, equipo y servidores, telefonía/Contact Center y desarrollo de software e IA. ¿Cuál te interesa?';
  if (/cotiz|precio|presupuesto/.test(t)) return '¡Claro! Para orientar tu cotización, dime qué servicio necesitas y cuéntame brevemente qué proyecto tienes en mente. También puedes escribir a francisco.lucio@netalive.net o llamar al +52 55 6560 2345.';
  if (/asesor|persona|humano|contact/.test(t)) return 'Puedes continuar con nuestro equipo llamando al +52 55 6560 2345 o escribiendo a francisco.lucio@netalive.net. Este asistente brinda orientación inicial.';
  if (/tel[eé]fono|correo|email/.test(t)) return 'Teléfono: +52 55 6560 2345. Correo: francisco.lucio@netalive.net.';
  if (/horario/.test(t)) return 'No tengo un horario confirmado. Puedes llamar o escribir al correo para coordinar la atención.';
  if (/hola|buenos/.test(t)) return '¡Hola! Gracias por visitar NET ALIVE. ¿Buscas infraestructura, ciberseguridad, Data Center, telefonía o desarrollo de software e IA?';
  return 'Gracias por compartir tu consulta. Puedo orientarte sobre networking, ciberseguridad, infraestructura, Data Center, telefonía y software/IA. Si necesitas atención del equipo, llama al +52 55 6560 2345 o escribe a francisco.lucio@netalive.net.';
}
async function sendChat(value) {
  const clean = String(value || '').trim().slice(0, 500);
  if (!clean) return;
  addMessage(clean, 'user');
  addMessage(replyFor(clean));
  try {
    await fetch(`${window.NETALIVE_API_URL || '/api'}/chat/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: clean })
    });
  } catch (_) { /* La orientación local permanece disponible si no hay API configurada. */ }
}
$('#chat-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('#chat-text');
  const value = input.value;
  input.value = '';
  sendChat(value);
});
$$('[data-chat]').forEach(button => button.addEventListener('click', () => sendChat(button.dataset.chat)));