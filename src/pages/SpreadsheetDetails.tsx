
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";

const SpreadsheetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: analysis, isLoading } = useQuery({
    queryKey: ["spreadsheet", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("spreadsheet_analysis")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">
          Análise não encontrada
        </h1>
      </div>
    );
  }

  // Convert analysis results to chart data if available
  const chartData = analysis.analysis_results?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Análise da Planilha: {analysis.file_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-semibold">Status:</span> {analysis.status}</p>
              <p><span className="font-semibold">Data de Upload:</span> {new Date(analysis.created_at).toLocaleDateString('pt-BR')}</p>
              {analysis.analysis_results?.summary && (
                <p><span className="font-semibold">Resumo:</span> {analysis.analysis_results.summary}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {analysis.analysis_results?.metrics && (
          <Card>
            <CardHeader>
              <CardTitle>Métricas Principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(analysis.analysis_results.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{key}</p>
                    <p className="text-2xl font-bold text-brand-blue">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {chartData.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Visualização dos Dados</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {analysis.analysis_results?.insights && (
        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.analysis_results.insights.map((insight: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 mt-2 mr-2 bg-brand-blue rounded-full" />
                  {insight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpreadsheetDetails;
