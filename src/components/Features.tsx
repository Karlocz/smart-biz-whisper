
import { ArrowRight, FileSpreadsheet, MessageSquare, ChartBar, Clock, AlertTriangle, Lightbulb } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <FileSpreadsheet className="h-8 w-8 text-brand-blue" />,
      title: "Análise de Planilhas",
      description: "Envie seus relatórios financeiros, dados de vendas ou planilhas de estoque em formato XLSX ou CSV.",
      delay: "0.1s"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-brand-blue" />,
      title: "Análise de Conversas",
      description: "Conecte-se à API do WhatsApp Business ou envie logs de chat para analisar conversas com clientes.",
      delay: "0.2s"
    },
    {
      icon: <ChartBar className="h-8 w-8 text-brand-blue" />,
      title: "Relatórios Visuais",
      description: "Visualize relatórios simples e fáceis de entender sobre o desempenho do seu negócio.",
      delay: "0.3s"
    },
    {
      icon: <Clock className="h-8 w-8 text-brand-blue" />,
      title: "Métricas de Resposta",
      description: "Acompanhe tempos médios de resposta, horários de pico e qualidade das conversas com clientes.",
      delay: "0.4s"
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-brand-blue" />,
      title: "Detecção de Alertas",
      description: "Receba notificações sobre tendências importantes, anomalias ou questões que precisam de sua atenção.",
      delay: "0.5s"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-brand-blue" />,
      title: "Sugestões Inteligentes",
      description: "Receba recomendações acionáveis para melhorar seu negócio e atendimento ao cliente.",
      delay: "0.6s"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como o SmartBiz Whisper Funciona</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma transforma dados complexos em insights claros e acionáveis sem exigir habilidades técnicas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in" 
              style={{ animationDelay: feature.delay }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <a href="#" className="text-brand-blue font-medium flex items-center hover:underline group">
                Saiba mais <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-gradient-to-r from-brand-blue to-brand-teal rounded-lg text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Chega de Confusão com Planilhas</h3>
            <p className="text-lg mb-6">
              Nossa IA analisa seus dados e traduz informações complexas em insights simples que qualquer um pode entender.
            </p>
            <div className="bg-white/10 p-6 rounded-md backdrop-blur-sm">
              <p className="text-xl italic">
                "O Cliente X representa 38% da sua receita, um aumento de 12% em relação ao último trimestre. Isso cria um potencial risco para o negócio."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
