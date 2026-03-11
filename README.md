# CoinSphere

Aplicacao front-end para acompanhamento de criptomoedas com foco em UI moderna, responsiva e arquitetura simples para portfólio.
Os dados de mercado sao consumidos da API publica do [`CoinGecko`](https://www.coingecko.com/).

## Stack

- Vite 7
- React 19 + TypeScript
- React Router DOM 7
- Tailwind CSS 4
- shadcn/ui (componentes base)
- Zustand (estado global, ex.: moeda principal e menu mobile)
- Axios (HTTP)
- Sonner (toasts)
- lightweight-charts (grafico da pagina de moeda)

## Rotas atuais

- `/` Home
- `/criptomoedas` Listagem e resumo de mercado
- `/moeda/:id` Detalhes da moeda
- `/entrar` Tela visual de login (sem autenticacao real)
- `/registrar` Tela visual de cadastro (sem autenticacao real)

## Funcionalidades implementadas

- Home
- Header com navegacao principal e atalho para trocar moeda base (`BRL`, `USD`, `BTC`).
- Pagina de criptomoedas com:
  - resumo de mercado global (market cap, volume 24h e dominancia de BTC);
  - busca por nome, simbolo e id;
  - controle de densidade da tabela (`small`, `medium`, `big`); 
- Pagina de moeda com:
  - grafico de 30 dias usando lightweight-charts;
  - descricao resumida e metadados (algoritmo e block time);
  - link para site oficial quando disponivel.

## Performance e cache

- Cache em `localStorage` para dados globais e lista de moedas (TTL de 10 minutos).
- Cache do grafico em `localStorage` (TTL de 10 minutos).
- Limitador de cache do grafico: mantem no maximo 3 entradas e remove as mais antigas.
- Lista de moedas salva em formato compacto (somente campos usados na UI).
- Imagens da listagem com carregamento lazy + decode async.

## Como rodar

Pre-requisito recomendado: Node.js 20+.

1. Instale as dependencias:

```bash
npm install
```

2. Rode em desenvolvimento:

```bash
npm run dev
```

3. Build de producao:

```bash
npm run build
```

4. Preview local da build:

```bash
npm run preview
```

App local padrao: `http://localhost:5173`

## Qualidade de codigo

```bash
npm run lint
```

## Observacoes

- Projeto em evolucao para estudo e portfólio.
- Algumas partes estao em modo visual (login/cadastro) e ainda nao possuem back-end/autenticacao.

## Proximos passos sugeridos

- Migrar tabela custom para Data Table do shadcn.
- Implementar autenticacao real e persistencia de carteira do usuario.
