# álbum secreto — como editar e publicar

Site 100% em HTML, CSS e JS puro (sem build, sem dependências) —
é só abrir o `index.html` no navegador pra testar, e subir a pasta
inteira no Netlify ou GitHub Pages quando estiver pronto.

## 1. o que editar

Abra o arquivo **`script.js`**. Lá em cima tem a lista `DIAS`, com um
objeto pra cada dia da viagem. Edite:

- `date` → a data em que aquele dia libera (formato `"AAAA-MM-DD"`)
- `phrase` → a frase do dia
- `song.title` / `song.artist` → nome da música e artista
- `song.cover` → link de uma imagem (veja abaixo como pegar a do Spotify)
- `song.spotifyUrl` → o link da música no Spotify

Se a viagem tiver mais ou menos de 5 dias, é só adicionar ou remover
blocos `{ day: ..., date: ..., phrase: ..., song: {...} }` da lista,
seguindo o mesmo formato (o `day` é só o número que aparece no cartão,
pode ir 1, 2, 3...).

### como pegar o link e a capa de uma música no Spotify

1. Abra o Spotify Web ou o app, ache a música.
2. Clique nos "..." (ou botão direito) → **Compartilhar → Copiar link
   da música** → cole em `spotifyUrl`.
3. Pra capa: no Spotify Web, clique com o botão direito em cima da
   capa do álbum → **Copiar endereço da imagem** → cole em `cover`.
   Se não conseguir, pode subir a imagem em qualquer serviço (ou
   colocar na mesma pasta do site e usar só o nome do arquivo, tipo
   `"cover": "capa-dia-1.jpg"`).

## 2. testando antes de publicar

No topo do `script.js` tem:

```js
const MODO_TESTE = false;
```

Troque pra `true` enquanto estiver mexendo — assim todos os dias
aparecem desbloqueados na hora, não importa a data real. **Lembre de
voltar pra `false` antes de publicar**, senão ela vai ver tudo
liberado de uma vez.

Pra abrir localmente: só dar duplo clique no `index.html`, ou clicar
com o botão direito → abrir com o navegador.

## 3. publicando

**Netlify (mais rápido):**
1. Entre em [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta inteira (`index.html`, `style.css`, `script.js`) pra lá
3. Pronto, já gera um link — dá pra trocar o nome do site nas
   configurações do Netlify

**GitHub Pages:**
1. Crie um repositório novo no GitHub e suba esses 3 arquivos
2. Vá em Settings → Pages → escolha a branch `main` e pasta `/root`
3. O link fica algo como `seuusuario.github.io/nome-do-repo`

## 4. detalhes do que já vem pronto

- O desbloqueio é automático por data (compara com a data de hoje no
  aparelho de quem acessa)
- O dia atual ganha um destaquezinho "✦ hoje"
- Cada dia aberto fica salvo (localStorage) — se ela fechar e abrir de
  novo, os dias já abertos continuam abertos
- Clicar no cartão de música abre o Spotify em outra aba
- Cartões bloqueados "tremem" de leve se ela tentar abrir antes da hora
- Totalmente responsivo, testado em telas pequenas de celular
