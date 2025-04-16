
-- Create the spreadsheets storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'spreadsheets', 'spreadsheets', false
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'spreadsheets'
);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'spreadsheets' AND auth.uid() = (storage.foldername(name))[1]::uuid);

-- Allow users to view their own files
CREATE POLICY "Allow users to view their own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'spreadsheets' AND auth.uid() = (storage.foldername(name))[1]::uuid);

-- Allow users to update their own files
CREATE POLICY "Allow users to update their own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'spreadsheets' AND auth.uid() = (storage.foldername(name))[1]::uuid);

-- Allow users to delete their own files
CREATE POLICY "Allow users to delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'spreadsheets' AND auth.uid() = (storage.foldername(name))[1]::uuid);
