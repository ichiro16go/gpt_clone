import { useMemo } from 'react';

const GPT_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const useCompleteText = () => {
  return useMemo(() => {
    const completeText = async (prompt: string): Promise<string> => {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GPT_API_KEY}`, 
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo', 
              messages: [{ role: 'user', content: prompt }], 
              max_tokens: 200,
            }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.log(GPT_API_KEY)
            throw new Error(`Error: ${response.status} - ${errorData.error.message}`);
          }
      
          const data = await response.json();
          const choice = 0;
          const isContinue = data.choices[choice].finish_reason === 'length';
          const text = data.choices[choice].message.content || ''; 
          if (isContinue) {
            return completeText(prompt + text);
          } else {
            return prompt + text;
          }
        } catch (error) {
          console.error('APIリクエスト中にエラーが発生しました:', error);
          throw error;
        }
      };

    return completeText;
  }, []);
};