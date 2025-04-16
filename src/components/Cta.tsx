
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-teal text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pare de se Afogar em Dados, Comece a Tomar Decisões Mais Inteligentes
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Entre para a lista de espera hoje e seja um dos primeiros a experimentar como o SmartBiz Whisper pode transformar seus dados empresariais em insights acionáveis.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input 
                type="email" 
                placeholder="Digite seu email" 
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-brand-orange hover:bg-opacity-90 text-white px-6 py-3">
                Entrar na Lista
              </Button>
            </div>
            <p className="text-sm text-white/70">
              Ao se inscrever, você receberá atualizações sobre nosso lançamento e ofertas exclusivas de acesso antecipado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
