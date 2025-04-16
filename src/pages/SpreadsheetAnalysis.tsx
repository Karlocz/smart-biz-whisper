
import { useState } from "react";
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
import { Upload } from "lucide-react";

const SpreadsheetAnalysis = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [analyses, setAnalyses] = useState<any[]>([]);

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
      const { error: dbError } = await supabase
        .from('spreadsheet_analysis')
        .insert({
          file_name: file.name,
          original_file_path: filePath,
          user_id: user?.id,
        });

      if (dbError) {
        throw dbError;
      }

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

  const fetchAnalyses = async () => {
    try {
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
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Análise de Planilhas</h1>
      
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
                <TableCell>{analysis.status}</TableCell>
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
