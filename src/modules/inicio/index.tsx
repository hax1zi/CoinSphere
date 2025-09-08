export function Inicio() {
  return (
    <div className="flex items-center h-full justify-between overflow-hidden">
      <div>
        <h2 className="font-bold text-5xl mb-4">Bem-vindo ao CoinSphere</h2>
        <span className="font-semibold text-2xl">
          Rastreador de Portfólio de Criptomoedas
        </span>
        <div className="h-1 w-40 mt-4 mb-8 bg-secondary" />
        <p className="max-w-[600px] opacity-90">
          Seu universo cripto em um só lugar. Acompanhe suas moedas, descubra
          tendências e veja seu portfólio ganhar vida em tempo real. Do Bitcoin
          às novas gemas, o CoinSphere coloca você no centro da galáxia cripto.{" "}
        </p>
      </div>
      <div className="relative">
        <div className="animate-[spin_5s_linear_infinite]">
          <img className="principais criptos" src="/mainsCripto.png" />
        </div>
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14"
          src="/logo.svg"
          alt="Logo"
        />
      </div>
    </div>
  );
}
