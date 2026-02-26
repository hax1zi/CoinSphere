## CoinSphere

### Rastreador de Portfólio de Criptomoedas

Projeto de portfólio desenvolvido com foco em UI moderna, responsiva e boas práticas de front‑end.  
Os dados de mercado são consumidos a partir da API pública do [`CoinGecko`](https://www.coingecko.com/).

---

### Tecnologias utilizadas

- **Vite + React + TypeScript**
- **React Router** para roteamento
- **Tailwind CSS** (com design system customizado)
- **Lucide Icons** para ícones
- **CoinGecko API** para dados de mercado de criptomoedas

---

### Funcionalidades principais

- **Home**
  - Hero responsivo apresentando o CoinSphere.
  - CTAs para explorar criptomoedas.

- **Página de Criptomoedas**
  - Visão geral do mercado (market cap global, volume 24h, dominância do BTC).
  - Tabela de criptomoedas com:
    - Nome, símbolo, preço, variação, volume e market cap.
    - Controle de densidade das linhas (visualizações mais compactas ou espaçosas).

---

### Execução do projeto

- **Instalar dependências**

```bash
npm install
```

- **Rodar em ambiente de desenvolvimento**

```bash
npm dev
```

O projeto sobe, por padrão, em `http://localhost:5173`.

---

### Decisões técnicas 

- **Cache de requisições com `localStorage`**  
  Para evitar limites de rate da CoinGecko e melhorar a UX, as respostas são cacheadas com timestamp e um tempo de expiração (ex.: 5 minutos).

---

### Observações

Este projeto não é um produto final, e sim um **laboratório visual** e de boas práticas de código para portfólio.  
Quebras de layout e features em construção podem aparecer à medida que novas ideias forem sendo testadas. :)
