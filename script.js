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
function corDoDia(numeroDoDia) {
  return ACCENTS[(numeroDoDia - 1) % ACCENTS.length];
}

/* Cada dia da viagem é um item aqui.
   date        -> data em que o dia libera, formato "AAAA-MM-DD"
   phrase      -> a frase do dia
   song        -> pode ser UM objeto { title, artist, cover, spotifyUrl }
                  ou uma LISTA de objetos [{...}, {...}] se quiser mais
                  de uma música no mesmo dia — os dois formatos funcionam.
   song.cover  -> link de uma imagem (pode usar a própria capa do Spotify:
                  clique com o botão direito na capa da música no Spotify
                  Web e "copiar endereço da imagem")
   song.spotifyUrl -> link da música no Spotify (abrir música > compartilhar > copiar link) */
const DIAS = [
  {
    day: 1,
    date: "2026-07-19",
    phrase: "Hoje a viagem começa. Imagino a mistura de ansiedade, empolgação que sempre aparece antes de algo especial. Aproveite cada momento, conheça pessoas, descubra lugares e aproveite os cursos. Enquanto isso, eu começo a contar os dias para ter você de volta. Boa Viagem, Meu Bem!",
    song: {
      title: "MÚSICA — AMOR COMPLETO",
      artist: "MON LAFERTE",
      cover: "./amor.jpg",
      spotifyUrl: "https://open.spotify.com/intl-pt/track/00kIWJu9IHiQ6i0qJAU0Z9?si=6109a75853294635"
    }
  },
  {
    day: 2,
    date: "2026-07-20",
    phrase: "Agora a correria começa de verdade. Mas, como você disse, os cursos vão ser fáceis para você, e, sinceramente, nem precisava dizer, porque eu sei o quão talentosa, dedicada e capaz você é. Só não deixe a vontade de fazer tudo perfeito te sobrecarregar. Lembre-se de aproveitar tanto as pessoas à sua volta quanto a cidade, mesmo quando já estiver muito cansadinha. Boa sorte, meu mouse de maracujá com cobertura de chocolate!",
    song: [
      {
        title: "MÚSICA — VUMBORA AMAR",
        artist: "ADRIANA CALCANHOTTO, FRAN, UBUNTO",
        cover: "./vumbora.jpg",
        spotifyUrl: "https://open.spotify.com/intl-pt/track/2NVXuJjaw6TJHh0raYymLQ?si=fef0a6a1f0be4a50"
      },
      {
        title: "ÁLBUM — RAIZ",
        artist: "FRAN",
        cover: "./raiz.jpg",
        spotifyUrl: "https://open.spotify.com/intl-pt/album/0YetCaCRXkQxlnVAhWBJA5?si=EA9ZMZnLROGsCxWH8LWmLg"
      }

    ]
  },
  {
    day: 3,
    date: "2026-07-21",
    phrase: "Espero que hoje você consiga perceber aquilo que eu já vejo há muito tempo: você é extremamente capaz. Às vezes parece que você esquece disso e exige mais de si do que qualquer outra pessoa exigiria. Então respira. Confia em quem você é. O resto acontece naturalmente.",
    song: {
      title: "MÚSICA — EU & VOCÊ",
      artist: "MESTRINHO",
      cover: "./euvoce.jpg",
      spotifyUrl: "https://open.spotify.com/intl-pt/track/208OvbnQKMT7rcsP8q3BQK?si=fcfd51bba310417b"
    }
  },
  {
    day: 4,
    date: "2026-07-22",
    phrase: "Conhecendo você, já deve estar tentando fazer tudo ao mesmo tempo. Só queria te lembrar de uma coisa: você não precisa carregar o mundo inteiro nas costas. Você já é boa o suficiente, mesmo quando decide descansar um pouco. Então aproveita esse lugar, vê o pôr do sol, sente o vento da praia e deixa que alguns momentos existam só para serem vividos.",
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
    phrase: "Amanhã provavelmente vai ser o dia mais intenso da viagem. Então hoje eu só queria te pedir uma coisa: descansa quando puder. Você já tem toda a habilidade, dedicação e sensibilidade que precisa para fazer um ótimo trabalho. Não tenta compensar nada nem provar nada. Faz do seu jeito, porque o seu jeito sempre foi suficiente.",
    song: {
      title: "Álbum — Percorrer em Nós",
      artist: "ÀVUÀ",
      cover: "./Percorrer.jpg",
      spotifyUrl: "https://open.spotify.com/intl-pt/album/5yviPZsValWNPatjlMtbY4?si=b80-4QSnS1KPDUD33SffEA"
    }
  },
  {
    day: 6,
    date: "2026-07-24",
    phrase: "Hoje provavelmente vai ser o dia mais cansativo de todos. Sei que você vai dar o seu melhor, porque esse sempre foi o seu jeito. Só promete uma coisa? Não tenta carregar o mundo inteiro nas costas. Respira, confia, vai dar tudo certo. E, como eu aprendi com uma certa pessoinha, eu não vou te desejar boa sorte... mas saiba que vou estar daqui, torcendo muito por você.",
    song: {
      title: "Álbum — Percorrer em Nós",
      artist: "ÀVUÀ",
      cover: "./Percorrer.jpg",
      spotifyUrl: "https://open.spotify.com/intl-pt/album/5yviPZsValWNPatjlMtbY4?si=b80-4QSnS1KPDUD33SffEA"
    }
  },
  {
    day: 7,
    date: "2026-07-25",
    phrase: "Enquanto você estiver lendo isso, provavelmente já vai estar voltando para casa... ou talvez já tenha chegado. Espero que essa viagem tenha te lembrado de uma coisa que eu queria muito que você nunca esquecesse: você é muito talentosa. Não porque trabalha sem parar, mas porque coloca um pedaço de você em tudo o que faz. Espero que tenha aprendido bastante, descansado um pouquinho, aproveitado a praia e criado lembranças bonitas. Eu só estava esperando você voltar para poder trocar a saudade pela sua companhia de novo.",
    song: {
      title: "Álbum — Percorrer em Nós",
      artist: "ÀVUÀ",
      cover: "./Percorrer.jpg",
      spotifyUrl: "https://open.spotify.com/intl-pt/album/5yviPZsValWNPatjlMtbY4?si=b80-4QSnS1KPDUD33SffEA"
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
function montarCharm(accent, desbloqueado) {
  if (!desbloqueado) {
    return `<div class="charm-mini"><div class="bow"><span class="knot"></span></div></div>`;
  }
  if (accent === "sky") {
    return `<div class="charm-mini"><div class="bow bow--sky"><span class="knot"></span></div></div>`;
  }
  if (accent === "berry") {
    return `<div class="charm-mini"><div class="heart"></div></div>`;
  }
  return `<div class="charm-mini"><div class="flower">
      <span class="petal"></span><span class="petal"></span><span class="petal"></span>
      <span class="petal"></span><span class="petal"></span><span class="center"></span>
    </div></div>`;
}

/* =========================================================
   pega a(s) música(s) de um dia, aceitando os dois formatos:
   song: {...}  (uma música só)  ou  song: [{...}, {...}]  (várias)
   ========================================================= */
function obterMusicas(item) {
  if (Array.isArray(item.songs)) return item.songs;
  if (Array.isArray(item.song)) return item.song;
  return [item.song];
}

/* =========================================================
   utilidades de data
   ========================================================= */
function apenasData(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function hojeSemHora() {
  return apenasData(new Date());
}

/* new Date("AAAA-MM-DD") é interpretado como UTC pelo navegador, o que
   pode "voltar" um dia em fusos negativos como o do Brasil. Por isso
   montamos a data manualmente, sempre no horário local. */
function parseDataLocal(iso) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarDataCurta(isoDate) {
  return parseDataLocal(isoDate)
    .toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    .replace(".", "");
}

function diasEntre(a, b) {
  const MS_DIA = 1000 * 60 * 60 * 24;
  return Math.round((b - a) / MS_DIA);
}

/* =========================================================
   pétalas ambiente
   ========================================================= */
function criarPetalas() {
  const container = document.getElementById("petals");
  if (!container) return;
  const formas = ["shape-petal", "shape-heart", "shape-star"];
  const cores = ["c-petal", "c-sky", "c-berry"];
  const total = window.innerWidth < 480 ? 7 : 13;
  for (let i = 0; i < total; i++) {
    const p = document.createElement("span");
    const forma = formas[Math.floor(Math.random() * formas.length)];
    const cor = cores[Math.floor(Math.random() * cores.length)];
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
function montarCartao(item) {
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
  if (!desbloqueado) {
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

  const musicas = obterMusicas(item);
  const musicasHtml = musicas.map((song) => `
      <div class="music-card" tabindex="0" role="link" aria-label="ouvir ${song.title} de ${song.artist} no spotify" data-spotify="${song.spotifyUrl}">
        <div class="music-art">
          <div class="vinyl"></div>
          <img class="cover" src="${song.cover}" alt="capa de ${song.title}" loading="lazy">
        </div>
        <div class="music-meta">
          <span class="music-title">${song.title}</span>
          <span class="music-artist">${song.artist}</span>
        </div>
        <span class="play-hint">spotify →</span>
      </div>
  `).join("");

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
      ${musicas.length > 1 ? `<p class="music-list-label">álbum e música do dia</p>` : ""}
      <div class="music-list">${musicasHtml}</div>
    </div></div>
  `;

  return { article, desbloqueado };
}

/* =========================================================
   interações
   ========================================================= */
function abrirNoSpotify(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener");
}

function alternarAbertura(article, item) {
  const aberto = article.classList.toggle("is-open");
  article.classList.remove("is-ready");
  if (!aberto) article.classList.add("is-ready");
  article.setAttribute("aria-expanded", aberto ? "true" : "false");
  localStorage.setItem(`album-secreto-dia-${item.day}`, aberto ? "aberto" : "fechado");
}

function tremer(article) {
  article.classList.add("is-shaking");
  setTimeout(() => article.classList.remove("is-shaking"), 400);
}

function ligarEventos(article, item, desbloqueado) {
  const clicar = (e) => {
    const musicCard = e.target.closest(".music-card");
    if (musicCard) {
      e.stopPropagation();
      abrirNoSpotify(musicCard.dataset.spotify);
      return;
    }
    if (!desbloqueado) {
      tremer(article);
      return;
    }
    alternarAbertura(article, item);
  };

  article.addEventListener("click", clicar);
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      clicar(e);
    }
  });
}

/* =========================================================
   progresso no topo
   ========================================================= */
function atualizarProgresso(qtdDesbloqueados, total) {
  const el = document.getElementById("progress");
  if (!el) return;
  el.textContent = qtdDesbloqueados === 0
    ? `${total} dias à sua espera`
    : `${qtdDesbloqueados} de ${total} dias já desbloqueados`;
}

/* =========================================================
   inicialização
   ========================================================= */
function iniciar() {
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