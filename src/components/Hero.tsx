
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Seus Dados Empresariais, 
            <span className="text-brand-blue block md:inline"> Finalmente Decodificados</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Transforme suas planilhas e conversas com clientes em 
            <span className="text-brand-blue font-semibold"> insights acionáveis</span> — 
            sem necessidade de conhecimento técnico.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button className="w-full sm:w-auto bg-brand-orange hover:bg-opacity-90 text-white px-8 py-6 text-lg">
              Acesso Antecipado
            </Button>
            <Button variant="outline" className="w-full sm:w-auto border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-6 text-lg">
              Como Funciona
            </Button>
          </div>
          
          <div className="bg-gray-100 rounded-xl p-6 md:p-10 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-semibold text-brand-blue mb-4">Insights de Negócio</h3>
                <p className="text-gray-600 mb-4">
                  "Sua receita caiu 22% no último mês em comparação com a média dos três meses anteriores."
                </p>
                <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
                  Envie qualquer planilha, receba insights claros
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-semibold text-brand-blue mb-4">Análise de Atendimento</h3>
                <p className="text-gray-600 mb-4">
                  "25% das mensagens de WhatsApp de ontem não foram respondidas. O tempo de resposta é mais lento entre 13h-15h."
                </p>
                <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
                  Conecte WhatsApp ou envie histórico de conversas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
