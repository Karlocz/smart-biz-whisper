
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

export async function analyzeWithOpenAI(content: string) {
  if (!openAIApiKey) {
    console.error('OpenAI API key not configured');
    throw new Error('OpenAI API key not configured. Please add the OPENAI_API_KEY to your Supabase Edge Function secrets');
  }

  console.log(`Making OpenAI API request with API key`);
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a financial data analyst. Analyze the spreadsheet data provided and return a JSON response with the following structure:
            {
              "summary": "Brief summary of the spreadsheet content",
              "metrics": {
                "metric1": "value1",
                "metric2": "value2",
                "metric3": "value3",
                "metric4": "value4"
              },
              "insights": [
                "Insight 1",
                "Insight 2",
                "Insight 3",
                "Insight 4"
              ],
              "data": [
                { "name": "Category 1", "value": 123 },
                { "name": "Category 2", "value": 456 },
                { "name": "Category 3", "value": 789 },
                { "name": "Category 4", "value": 321 }
              ]
            }`
        },
        { role: 'user', content: content }
      ],
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('OpenAI API error:', JSON.stringify(errorData));
    throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
  }

  const aiData = await response.json();
  console.log('OpenAI API response status:', response.status);
  console.log('OpenAI API response data received. Processing results...');
  
  const analysisText = aiData.choices?.[0]?.message?.content;
  if (!analysisText) {
    console.error('No analysis text received from OpenAI');
    throw new Error('Failed to get analysis from AI');
  }

  try {
    const jsonText = analysisText.replace(/```json\n?|\n?```/g, '');
    return JSON.parse(jsonText);
  } catch (parseError) {
    console.error('Error parsing AI response:', parseError);
    console.log('AI response raw text:', analysisText);
    throw new Error('Failed to parse AI analysis results');
  }
}
