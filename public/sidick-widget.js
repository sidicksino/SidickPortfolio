/*
 * Sidick chat widget: a floating chat bubble for the portfolio.
 * Usage (e.g. in index.html, before </body>):
 *   <script src="/sidick-widget.js" data-api="https://sidick-bot.duckdns.org" defer></script>
 * Optional attributes:
 *   data-title     header text (overrides the built-in English/French title)
 *   data-color     accent color, any CSS value, e.g. "#e748c8" or "var(--accent)"
 *   data-position  "right" (default) or "left"
 *   data-theme     "page" = use the site's --surface/--bg/--text/--text-muted/--border variables
 *                  (follows the site's own light/dark toggle); default follows the OS setting
 *   data-lang      "en" or "fr" to force a language; by default it follows <html lang="...">
 *                  and switches live when the site changes language.
 */
(function () {
  "use strict";
  var script = document.currentScript;
  var API = ((script && script.dataset.api) || "http://localhost:8000").replace(/\/+$/, "");
  var CUSTOM_TITLE = script && script.dataset.title;
  var FORCED_LANG = script && script.dataset.lang;
  var ACCENT = (script && script.dataset.color) || "#7c3aed";
  // Text/icon colour on accent fills. White suits dark accents; a light accent
  // (lime, aqua) needs dark text, so the host page can pass data-on-color.
  var ON_ACCENT = (script && script.dataset.onColor) || "#fff";
  var LEFT = script && script.dataset.position === "left";
  var PAGE_THEME = script && script.dataset.theme === "page";

  var TEXTS = {
    en: {
      title: "Chat with Sidick",
      status: "Usually replies in a few seconds",
      thinking: "Thinking…",
      waking: "Waking up…",
      greeting: "Hi! I'm Sidick's assistant. Ask me about my skills, projects or background.",
      suggestions: ["Who are you?", "What projects have you built?", "How can I contact you?"],
      placeholder: "Ask me anything…",
      send: "Send",
      open: "Open chat",
      close: "Close chat",
      tooFast: "You're sending messages too fast. Please wait a minute.",
      dailyLimit: "You've reached today's message limit. Please come back tomorrow.",
      resting: "The assistant is resting for today. Please use the contact form.",
      tooLong: "That message is too long. Please keep it under 500 characters.",
      generic: "Something went wrong. Please try again.",
      offline: "I can't reach my server right now. Please try again later, or use the contact form.",
    },
    fr: {
      title: "Discuter avec Sidick",
      status: "Répond généralement en quelques secondes",
      thinking: "Réflexion…",
      waking: "Démarrage…",
      greeting: "Salut ! Je suis l'assistant de Sidick. Pose-moi des questions sur mes compétences, mes projets ou mon parcours.",
      suggestions: ["Qui es-tu ?", "Quels projets as-tu réalisés ?", "Comment te contacter ?"],
      placeholder: "Pose-moi une question…",
      send: "Envoyer",
      open: "Ouvrir le chat",
      close: "Fermer le chat",
      tooFast: "Tu envoies des messages trop vite. Attends une minute, s'il te plaît.",
      dailyLimit: "Tu as atteint la limite de messages pour aujourd'hui. Reviens demain !",
      resting: "L'assistant se repose pour aujourd'hui. Utilise le formulaire de contact.",
      tooLong: "Ce message est trop long. Garde-le sous 500 caractères.",
      generic: "Une erreur s'est produite. Réessaie, s'il te plaît.",
      offline: "Je n'arrive pas à joindre mon serveur pour le moment. Réessaie plus tard ou utilise le formulaire de contact.",
    },
  };

  function lang() {
    var l = (FORCED_LANG || document.documentElement.lang || navigator.language || "en").toLowerCase();
    return l.indexOf("fr") === 0 ? "fr" : "en";
  }
  function T() { return TEXTS[lang()]; }

  var history = [];
  var busy = false;
  var woke = false;

  var css = [
    ".sw-root{--sw-accent:" + ACCENT + ";--sw-on-accent:" + ON_ACCENT + ";--sw-bg:#fff;--sw-fg:#1f2330;--sw-muted:#6b7080;--sw-bot:#f1f2f6;--sw-border:#e3e5ec;",
    "position:fixed;right:20px;bottom:20px;z-index:2147483000;font:15px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}",
    "@media (prefers-color-scheme:dark){.sw-root{--sw-bg:#17181d;--sw-fg:#ececf1;--sw-muted:#9a9db0;--sw-bot:#24262e;--sw-border:#30323c}}",
    ".sw-root.sw-page{--sw-bg:var(--surface,#fff);--sw-fg:var(--text,#1f2330);--sw-muted:var(--text-muted,#6b7080);",
    "--sw-bot:var(--bg,#f1f2f6);--sw-border:var(--border,#e3e5ec)}",
    ".sw-root.sw-left{right:auto;left:20px}",
    ".sw-left .sw-btn{margin-left:0}",
    ".sw-btn{width:58px;height:58px;border-radius:50%;border:0;background:var(--sw-accent);color:var(--sw-on-accent);cursor:pointer;",
    "box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;margin-left:auto}",
    ".sw-btn svg{width:28px;height:28px}",
    ".sw-panel{display:none;flex-direction:column;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100vh - 110px));",
    "background:var(--sw-bg);color:var(--sw-fg);border:1px solid var(--sw-border);border-radius:16px;overflow:hidden;",
    "box-shadow:0 12px 40px rgba(0,0,0,.25);margin-bottom:12px}",
    ".sw-open .sw-panel{display:flex}",
    ".sw-head{background:var(--sw-accent);color:var(--sw-on-accent);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;font-weight:600}",
    ".sw-head small{display:block;font-weight:400;opacity:.85;font-size:12px}",
    ".sw-x{background:none;border:0;color:var(--sw-on-accent);font-size:22px;cursor:pointer;line-height:1}",
    ".sw-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}",
    ".sw-m{max-width:85%;padding:9px 12px;border-radius:14px;overflow-wrap:anywhere}",
    ".sw-m a{color:inherit;text-decoration:underline}",
    ".sw-m p{margin:0 0 8px}.sw-m p:last-child{margin-bottom:0}",
    // list-style is set explicitly: host sites (like the portfolio) often reset it to none.
    ".sw-m ul,.sw-m ol{margin:0 0 8px;padding-left:20px}.sw-m ul:last-child,.sw-m ol:last-child{margin-bottom:0}",
    ".sw-m ul{list-style:disc outside}.sw-m ol{list-style:decimal outside}",
    ".sw-m li{display:list-item;margin:6px 0}.sw-m li::marker{color:var(--sw-accent)}",
    ".sw-m .sw-h{font-weight:700;margin-top:4px}",
    ".sw-m code{font:0.9em ui-monospace,SFMono-Regular,Menlo,monospace;background:rgba(127,127,127,.15);padding:1px 4px;border-radius:4px}",
    ".sw-m strong{font-weight:700}",
    ".sw-bot{background:var(--sw-bot);align-self:flex-start;border-bottom-left-radius:4px}",
    ".sw-user{background:var(--sw-accent);color:var(--sw-on-accent);align-self:flex-end;border-bottom-right-radius:4px}",
    ".sw-err{color:#c2410c}",
    ".sw-sugs{display:flex;flex-wrap:wrap;gap:6px}",
    ".sw-sug{border:1px solid var(--sw-border);background:none;color:var(--sw-fg);border-radius:999px;padding:5px 10px;font-size:13px;cursor:pointer}",
    ".sw-form{display:flex;gap:8px;padding:10px;border-top:1px solid var(--sw-border)}",
    ".sw-in{flex:1;min-width:0;border:1px solid var(--sw-border);background:var(--sw-bg);color:var(--sw-fg);border-radius:10px;padding:9px 11px;font:inherit;outline:none}",
    ".sw-in:focus{border-color:var(--sw-accent)}",
    ".sw-send{border:0;background:var(--sw-accent);color:var(--sw-on-accent);border-radius:10px;padding:0 14px;font:inherit;cursor:pointer}",
    ".sw-send:disabled{opacity:.5;cursor:default}",
    ".sw-dots::after{content:'…';animation:sw-blink 1s infinite}",
    "@keyframes sw-blink{50%{opacity:.2}}",
  ].join("");

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // Light, safe Markdown: everything is HTML-escaped first, then only these become markup:
  // paragraphs, "- "/"1." lists, "#" headings (shown as a bold line), **bold**, *italic*,
  // `code`, [text](url) and bare URLs. Re-run on every streamed chunk, so it must tolerate
  // half-finished Markdown (an unclosed ** just stays as text until it closes).
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function inline(s) {
    var A = '" target="_blank" rel="noopener noreferrer">';
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2' + A + "$1</a>");
    s = s.replace(/(^|[^"'>=])(https?:\/\/[^\s<)"]+[^\s<)".,;:!?])/g, '$1<a href="$2' + A + "$2</a>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>");
    return s;
  }

  function markdown(text) {
    var html = [];
    var para = [];
    var list = null; // "ul" | "ol"
    function flushPara() {
      if (para.length) html.push("<p>" + para.join("<br>") + "</p>");
      para = [];
    }
    function closeList() {
      if (list) html.push("</" + list + ">");
      list = null;
    }
    escapeHtml(text).split("\n").forEach(function (line) {
      var m;
      if (!line.trim()) { flushPara(); closeList(); return; }
      if ((m = line.match(/^\s*#{1,6}\s+(.*)$/))) {
        flushPara(); closeList();
        html.push('<p class="sw-h">' + inline(m[1].replace(/\*\*/g, "")) + "</p>");
      } else if ((m = line.match(/^\s*[-*•]\s+(.*)$/)) || (m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
        var type = /^\s*\d/.test(line) ? "ol" : "ul";
        flushPara();
        if (list !== type) { closeList(); html.push("<" + type + ">"); list = type; }
        html.push("<li>" + inline(m[1]) + "</li>");
      } else {
        closeList();
        para.push(inline(line.trim()));
      }
    });
    flushPara();
    closeList();
    return html.join("");
  }

  function render(node, text) {
    node.innerHTML = markdown(text);
  }

  var root = el("div", "sw-root" + (LEFT ? " sw-left" : "") + (PAGE_THEME ? " sw-page" : ""));
  var style = el("style");
  style.textContent = css;
  var panel = el("div", "sw-panel");
  var head = el("div", "sw-head");
  var titleBox = el("div");
  var titleText = document.createTextNode("");
  var status = el("small");
  titleBox.appendChild(titleText);
  titleBox.appendChild(status);
  var close = el("button", "sw-x", "×");
  head.appendChild(titleBox);
  head.appendChild(close);
  var msgs = el("div", "sw-msgs");
  var form = el("form", "sw-form");
  var input = el("input", "sw-in");
  input.maxLength = 500;
  var send = el("button", "sw-send");
  send.type = "submit";
  form.appendChild(input);
  form.appendChild(send);
  panel.appendChild(head);
  panel.appendChild(msgs);
  panel.appendChild(form);
  var btn = el("button", "sw-btn");
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  root.appendChild(style);
  root.appendChild(panel);
  root.appendChild(btn);

  function addMsg(cls, text) {
    var m = el("div", "sw-m " + cls);
    render(m, text);
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
    return m;
  }

  // Greeting + suggestion chips: shown until the first question, re-rendered on language change.
  var greeting = addMsg("sw-bot", "");
  var sugBox = el("div", "sw-sugs");
  msgs.appendChild(sugBox);

  function renderIntro() {
    var t = T();
    render(greeting, t.greeting);
    sugBox.innerHTML = "";
    t.suggestions.forEach(function (s) {
      var b = el("button", "sw-sug", s);
      b.type = "button";
      b.addEventListener("click", function () { ask(s); });
      sugBox.appendChild(b);
    });
  }

  // All visible/accessible widget text, in the current language.
  function applyLanguage() {
    var t = T();
    titleText.nodeValue = CUSTOM_TITLE || t.title;
    if (!busy) status.textContent = t.status;
    input.placeholder = t.placeholder;
    send.textContent = t.send;
    close.setAttribute("aria-label", t.close);
    btn.setAttribute("aria-label", t.open);
    if (!history.length && !busy) renderIntro(); // don't rewrite a conversation in progress
  }

  function wake() {
    if (woke) return;
    woke = true;
    fetch(API + "/health").catch(function () {});
  }

  function toggle(open) {
    root.classList.toggle("sw-open", open);
    if (open) {
      wake();
      setTimeout(function () { input.focus(); }, 50);
    }
  }

  // Server errors arrive in English; show them in the visitor's language instead.
  function errorMessage(statusCode, detail) {
    var t = T();
    detail = typeof detail === "string" ? detail : "";
    if (statusCode === 429) return /minute/i.test(detail) ? t.tooFast : t.dailyLimit;
    if (statusCode === 503) return t.resting;
    if (statusCode === 422) return t.tooLong;
    return t.generic;
  }

  async function ask(text) {
    if (busy || !text.trim()) return;
    busy = true;
    send.disabled = true;
    if (sugBox.parentNode) sugBox.remove();
    addMsg("sw-user", text);
    var bubble = addMsg("sw-bot sw-dots", "");
    status.textContent = T().thinking;
    var answer = "";
    try {
      var res = null;
      var err = null;
      for (var attempt = 0; attempt < 4; attempt++) {
        res = await fetch(API + "/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // lang only breaks ties: the bot answers in the language the visitor typed in.
          body: JSON.stringify({ message: text, history: history.slice(-6), lang: lang() }),
        });
        if (res.ok) break;
        err = await res.json().catch(function () { return {}; });
        // 503 "waking up" = server still loading its models: wait and retry.
        if (res.status !== 503 || !/waking/i.test(err.detail || "") || attempt === 3) break;
        status.textContent = T().waking;
        await new Promise(function (r) { setTimeout(r, 8000); });
      }
      if (!res.ok) {
        var e = new Error(errorMessage(res.status, err && err.detail));
        e.fromServer = true;
        throw e;
      }
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      for (;;) {
        var chunk = await reader.read();
        if (chunk.done) break;
        answer += decoder.decode(chunk.value, { stream: true });
        bubble.classList.remove("sw-dots");
        render(bubble, answer);
        msgs.scrollTop = msgs.scrollHeight;
      }
      answer += decoder.decode();
      render(bubble, answer || "…");
      history.push({ role: "user", content: text }, { role: "assistant", content: answer });
    } catch (e) {
      bubble.classList.remove("sw-dots");
      bubble.classList.add("sw-err");
      render(bubble, e && e.fromServer ? e.message : T().offline);
    } finally {
      busy = false;
      send.disabled = false;
      status.textContent = T().status;
      input.focus();
    }
  }

  btn.addEventListener("click", function () { toggle(!root.classList.contains("sw-open")); });
  btn.addEventListener("mouseenter", wake);
  close.addEventListener("click", function () { toggle(false); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value;
    input.value = "";
    ask(text);
  });

  applyLanguage();
  // Follow the site's language switch live (e.g. i18next updating <html lang>).
  if (!FORCED_LANG && window.MutationObserver) {
    new MutationObserver(applyLanguage).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  function mount() { document.body.appendChild(root); }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
