
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Upload, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SpreadsheetAnalysis = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAnalyses();
    }
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Por favor, envie apenas arquivos Excel (.xlsx, .xls) ou CSV (.csv)",
        });
        return;
      }

      setUploading(true);

      // Upload file to Supabase Storage
      const filePath = `${user?.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('spreadsheets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Create analysis record
      const { data: newAnalysis, error: dbError } = await supabase
        .from('spreadsheet_analysis')
        .insert({
          file_name: file.name,
          original_file_path: filePath,
          user_id: user?.id,
        })
        .select()
        .single();

      if (dbError) {
        throw dbError;
      }

      // Trigger the analysis function
      await triggerAnalysis(newAnalysis.id);

      toast({
        title: "Sucesso",
        description: "Planilha enviada com sucesso! A análise começará em breve.",
      });

      // Refresh analyses list
      fetchAnalyses();

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no upload",
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const triggerAnalysis = async (spreadsheetId: string) => {
    try {
      const response = await supabase.functions.invoke('analyze-spreadsheet', {
        body: { spreadsheetId },
      });

      if (response.error) {
        console.error('Error triggering analysis:', response.error);
      }
    } catch (error) {
      console.error('Error calling analysis function:', error);
    }
  };

  const fetchAnalyses = async () => {
    try {
      setRefreshing(true);
      const { data, error } = await supabase
        .from('spreadsheet_analysis')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setAnalyses(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar análises",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const refreshAnalyses = () => {
    fetchAnalyses();
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">Pendente</span>
          </div>
        );
      case 'processing':
        return (
          <div className="flex flex-col space-y-2">
            <span className="text-blue-600">Processando</span>
            <Progress value={60} className="h-2 w-24" />
          </div>
        );
      case 'completed':
        return <span className="text-green-600">Concluída</span>;
      case 'failed':
        return <span className="text-red-600">Falha</span>;
      default:
        return <span>{status}</span>;
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Análise de Planilhas</h1>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={refreshAnalyses}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <div className="mb-8">
        <Button disabled={uploading} className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".xlsx,.xls,.csv"
          />
          <Upload className="mr-2" size={20} />
          {uploading ? "Enviando..." : "Enviar Planilha"}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arquivo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Upload</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyses.map((analysis) => (
              <TableRow key={analysis.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell>{analysis.file_name}</TableCell>
                <TableCell>{getStatusDisplay(analysis.status)}</TableCell>
                <TableCell>
                  {new Date(analysis.created_at).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate(`/analise-planilhas/${analysis.id}`)}
                  >
                    Ver Análise
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {analyses.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  Nenhuma análise encontrada. Envie sua primeira planilha!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SpreadsheetAnalysis;
