/* =========================================================
   ÁLBUM SECRETO — script.js
   Edite a lista DIAS abaixo com as datas, frases e músicas.
   ========================================================= */

/* Deixe "true" enquanto estiver testando/mexendo no site —
   assim todos os dias aparecem desbloqueados, não importa a
   data de hoje. Antes de publicar para a pessoa, volte para
   "false" para o desbloqueio real por data entrar em ação. */
const MODO_TESTE = false;

/* Cada dia recebe uma "cor de assinatura" em rodízio — quente (petal),
   azul pastel (sky) ou vermelha (berry) — só pra dar mais vida e
   diferenciar visualmente os cartões. Não precisa mexer aqui. */
const ACCENTS = ["petal", "sky", "berry"];
function corDoDia(numeroDoDia){
  return ACCENTS[(numeroDoDia - 1) % ACCENTS.length];
}

/* Cada dia da viagem é um item aqui.
   date        -> data em que o dia libera, formato "AAAA-MM-DD"
   phrase      -> a frase do dia
   song.cover  -> link de uma imagem (pode usar a própria capa do Spotify:
                  clique com o botão direito na capa da música no Spotify
                  Web e "copiar endereço da imagem")
   song.spotifyUrl -> link da música no Spotify (abrir música > compartilhar > copiar link) */
const DIAS = [
  {
    day: 1,
    date: "2026-07-19",
    phrase: "o primeiro dia longe também é o primeiro passo de volta.",
    song: {
      title: "EDITE — nome da música 1",
      artist: "EDITE — artista 1",
      cover: "https://placehold.co/200x200/DCCCB4/8A5033?text=capa+1",
      spotifyUrl: "https://open.spotify.com/"
    }
  },
  {
    day: 2,
    date: "2026-07-20",
    phrase: "em algum lugar daí, essa música toca e eu tô pertinho.",
    song: {
      title: "EDITE — nome da música 2",
      artist: "EDITE — artista 2",
      cover: "https://placehold.co/200x200/DCCCB4/8A5033?text=capa+2",
      spotifyUrl: "https://open.spotify.com/"
    }
  },
  {
    day: 3,
    date: "2026-07-21",
    phrase: "mais um dia riscado no calendário da saudade.",
    song: {
      title: "EDITE — nome da música 3",
      artist: "EDITE — artista 3",
      cover: "https://placehold.co/200x200/DCCCB4/8A5033?text=capa+3",
      spotifyUrl: "https://open.spotify.com/"
    }
  },
  {
    day: 4,
    date: "2026-07-22",
    phrase: "essa aqui eu escolhi pensando exatamente em você.",
    song: {
      title: "EDITE — nome da música 4",
      artist: "EDITE — artista 4",
      cover: "https://placehold.co/200x200/DCCCB4/8A5033?text=capa+4",
      spotifyUrl: "https://open.spotify.com/"
    }
  },
  {
    day: 5,
    date: "2026-07-23",
    phrase: "e no último dia fora, a única coisa que cresce é a vontade de te ver.",
    song: {
      title: "EDITE — nome da música 5",
      artist: "EDITE — artista 5",
      cover: "https://placehold.co/200x200/DCCCB4/8A5033?text=capa+5",
      spotifyUrl: "https://open.spotify.com/"
    }
  }
];

/* =========================================================
   ícones (svg simples, sem dependências externas)
   ========================================================= */
const ICONE_CADEADO = `
  <svg viewBox="0 0 24 24" fill="none" stroke="#F1E7D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2"></rect>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
  </svg>`;

const ICONE_FLOR = `
  <svg viewBox="0 0 24 24" fill="#F1E7D8">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 2c1.7 0 3 2 3 4s-1.3 3-3 3-3-1-3-3 1.3-4 3-4zM12 22c1.7 0 3-2 3-4s-1.3-3-3-3-3 1-3 3 1.3 4 3 4zM2 12c0-1.7 2-3 4-3s3 1.3 3 3-1 3-3 3-4-1.3-4-3zM22 12c0-1.7-2-3-4-3s-3 1.3-3 3 1 3 3 3 4-1.3 4-3z"></path>
  </svg>`;

/* =========================================================
   o "charm" pendurado no selo: varia conforme a cor do dia.
   enquanto trancado, é sempre o laço cinza neutro.
   ========================================================= */
function montarCharm(accent, desbloqueado){
  if (!desbloqueado){
    return `<div class="charm-mini"><div class="bow"><span class="knot"></span></div></div>`;
  }
  if (accent === "sky"){
    return `<div class="charm-mini"><div class="bow bow--sky"><span class="knot"></span></div></div>`;
  }
  if (accent === "berry"){
    return `<div class="charm-mini"><div class="heart"></div></div>`;
  }
  return `<div class="charm-mini"><div class="flower">
      <span class="petal"></span><span class="petal"></span><span class="petal"></span>
      <span class="petal"></span><span class="petal"></span><span class="center"></span>
    </div></div>`;
}

/* =========================================================
   utilidades de data
   ========================================================= */
function apenasData(d){
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function hojeSemHora(){
  return apenasData(new Date());
}

/* new Date("AAAA-MM-DD") é interpretado como UTC pelo navegador, o que
   pode "voltar" um dia em fusos negativos como o do Brasil. Por isso
   montamos a data manualmente, sempre no horário local. */
function parseDataLocal(iso){
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarDataCurta(isoDate){
  return parseDataLocal(isoDate)
    .toLocaleDateString("pt-BR", { day:"2-digit", month:"short" })
    .replace(".", "");
}

function diasEntre(a, b){
  const MS_DIA = 1000 * 60 * 60 * 24;
  return Math.round((b - a) / MS_DIA);
}

/* =========================================================
   pétalas ambiente
   ========================================================= */
function criarPetalas(){
  const container = document.getElementById("petals");
  if (!container) return;
  const formas = ["shape-petal", "shape-heart", "shape-star"];
  const cores  = ["c-petal", "c-sky", "c-berry"];
  const total = window.innerWidth < 480 ? 7 : 13;
  for (let i = 0; i < total; i++){
    const p = document.createElement("span");
    const forma = formas[Math.floor(Math.random() * formas.length)];
    const cor   = cores[Math.floor(Math.random() * cores.length)];
    p.className = `petal-fall ${forma} ${cor}`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${14 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 12}s`;
    p.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
    container.appendChild(p);
  }
}

/* =========================================================
   monta um cartão de dia
   ========================================================= */
function montarCartao(item){
  const dataDoDia = parseDataLocal(item.date);
  const hoje = hojeSemHora();
  const diferenca = diasEntre(hoje, dataDoDia); // > 0 = futuro, 0 = hoje, < 0 = passado

  const desbloqueado = MODO_TESTE || diferenca <= 0;
  const ehHoje = diferenca === 0;

  const article = document.createElement("article");
  article.dataset.day = item.day;

  const jaAberto = desbloqueado && localStorage.getItem(`album-secreto-dia-${item.day}`) === "aberto";

  article.className = "day-card " + (desbloqueado ? (jaAberto ? "is-open" : "is-ready") : "is-locked");
  const accent = corDoDia(item.day);
  article.classList.add(`accent-${accent}`);
  if (ehHoje) article.classList.add("is-today");

  article.setAttribute("tabindex", "0");
  if (!desbloqueado){
    article.setAttribute("role", "group");
    article.setAttribute("aria-label", `dia ${item.day}, ainda trancado, faltam ${diferenca} dia(s)`);
  } else {
    article.setAttribute("role", "button");
    article.setAttribute("aria-expanded", jaAberto ? "true" : "false");
    article.setAttribute("aria-label", `dia ${item.day}, ${jaAberto ? "aberto" : "toque para abrir"}`);
  }

  const mensagemBloqueio = diferenca === 1
    ? "falta 1 dia"
    : `faltam ${diferenca} dias`;

  article.innerHTML = `
    <span class="tape" aria-hidden="true"></span>
    <span class="ribbon-tab" aria-hidden="true"></span>
    <span class="sprig" aria-hidden="true"><i></i><i></i></span>

    <div class="day-card-head">
      <span class="day-number">dia ${String(item.day).padStart(2, "0")}</span>
      <span class="day-date">${formatarDataCurta(item.date)}</span>
    </div>

    <div class="seal-wrap" aria-hidden="true">
      <div class="seal-circle">${desbloqueado ? ICONE_FLOR : ICONE_CADEADO}</div>
      ${montarCharm(accent, desbloqueado)}
      ${desbloqueado
        ? `<p class="locked-msg">toque para abrir</p>`
        : `<p class="locked-msg">ainda não chegou esse dia<span class="countdown">${mensagemBloqueio}</span></p>`
      }
    </div>

    <div class="card-content"><div>
      <p class="phrase">${item.phrase}</p>
      <div class="music-card" tabindex="0" role="link" aria-label="ouvir ${item.song.title} de ${item.song.artist} no spotify" data-spotify="${item.song.spotifyUrl}">
        <div class="music-art">
          <div class="vinyl"></div>
          <img class="cover" src="${item.song.cover}" alt="capa de ${item.song.title}" loading="lazy">
        </div>
        <div class="music-meta">
          <span class="music-title">${item.song.title}</span>
          <span class="music-artist">${item.song.artist}</span>
        </div>
        <span class="play-hint">spotify →</span>
      </div>
    </div></div>
  `;

  return { article, desbloqueado };
}

/* =========================================================
   interações
   ========================================================= */
function abrirNoSpotify(url){
  if (!url) return;
  window.open(url, "_blank", "noopener");
}

function alternarAbertura(article, item){
  const aberto = article.classList.toggle("is-open");
  article.classList.remove("is-ready");
  if (!aberto) article.classList.add("is-ready");
  article.setAttribute("aria-expanded", aberto ? "true" : "false");
  localStorage.setItem(`album-secreto-dia-${item.day}`, aberto ? "aberto" : "fechado");
}

function tremer(article){
  article.classList.add("is-shaking");
  setTimeout(() => article.classList.remove("is-shaking"), 400);
}

function ligarEventos(article, item, desbloqueado){
  const clicar = (e) => {
    const musicCard = e.target.closest(".music-card");
    if (musicCard){
      e.stopPropagation();
      abrirNoSpotify(musicCard.dataset.spotify);
      return;
    }
    if (!desbloqueado){
      tremer(article);
      return;
    }
    alternarAbertura(article, item);
  };

  article.addEventListener("click", clicar);
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      clicar(e);
    }
  });
}

/* =========================================================
   progresso no topo
   ========================================================= */
function atualizarProgresso(qtdDesbloqueados, total){
  const el = document.getElementById("progress");
  if (!el) return;
  el.textContent = qtdDesbloqueados === 0
    ? `${total} dias à sua espera`
    : `${qtdDesbloqueados} de ${total} dias já desbloqueados`;
}

/* =========================================================
   inicialização
   ========================================================= */
function iniciar(){
  criarPetalas();

  const timeline = document.getElementById("timeline");
  let desbloqueados = 0;

  DIAS.forEach((item) => {
    const { article, desbloqueado } = montarCartao(item);
    if (desbloqueado) desbloqueados++;
    ligarEventos(article, item, desbloqueado);
    timeline.appendChild(article);
  });

  atualizarProgresso(desbloqueados, DIAS.length);
}

document.addEventListener("DOMContentLoaded", iniciar);