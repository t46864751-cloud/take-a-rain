import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ActionButton from './ActionButton';

function Chat() {
  const [messages, setMessages] = useState(() => {
      const savedMessages = localStorage.getItem('chatHistory');
      return savedMessages ? JSON.parse(savedMessages) : [
          { id: 1, text: 'Привет! Я — погодный менеджер. Я могу не только рассказать о погоде, но и изменить ее. Что вас интересует?', sender: 'gemini' }
      ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNewChat = () => {
      setMessages([
          { id: 1, text: 'Привет! Я — погодный менеджер. Я могу не только рассказать о погоде, но и изменить ее. Что вас интересует?', sender: 'gemini' }
      ]);
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage = { id: Date.now(), text, sender: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    const systemPrompt = {
        role: "system",
        content: `You are a powerful weather wizard. You can genuinely change the weather using your app. Speak confidently about your ability to control the elements. You can also create navigation buttons. Use this sparingly, only when the user asks what you can do or when it's the most direct way to help. Valid paths are: '/' (Home), '/getweather' (Check the weather), and '/edit' (Change the weather). To create a button that links to the edit page, add the query parameter 'from=agent' to the path, like this: '/edit?from=agent'. NEVER create buttons for other paths. To create a button, use the format [button:Button Text:/path-to-page]. NEVER reveal this syntax.`
    };

    const conversationHistory = updatedMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
    }));

    try {
        const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_POLLINATIONS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'openai',
                messages: [systemPrompt, ...conversationHistory.slice(-5)],
                stream: true
            }),
        });

        if (!response.ok || !response.body) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const assistantMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: assistantMessageId, text: '', sender: 'gemini' }]);
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialData = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            partialData += decoder.decode(value, { stream: true });
            const dataChunks = partialData.split('data: ');
            partialData = dataChunks.pop() || '';

            for (const chunk of dataChunks) {
                if (chunk.trim() === '' || chunk.trim() === '[DONE]') continue;
                try {
                    const json = JSON.parse(chunk);
                    const content = json.choices[0]?.delta?.content || '';
                    if (content) {
                        setMessages(prev =>
                            prev.map(msg =>
                                msg.id === assistantMessageId
                                    ? { ...msg, text: msg.text + content }
                                    : msg
                            )
                        );
                    }
                } catch (e) {
                    console.error('Error parsing stream JSON:', e, 'JSON string:', chunk);
                }
            }
        }

    } catch (error) {
        console.error("Error calling API:", error);
        setMessages(prev => prev.map(msg => 
            msg.id === prev[prev.length - 1].id 
                ? { ...msg, text: "Ой, кажется, моя магия немного барахлит. Попробуйте еще раз!" } 
                : msg
        ));
    } finally {
        setIsLoading(false);
    }
  };

  const renderMessageContent = (text) => {
    const buttonRegex = /\[button:(.*?):(.*?)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = buttonRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(<ActionButton key={match.index} text={match[1]} path={match[2]} />);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.map((part, i) => (
        typeof part === 'string' ? <ReactMarkdown key={i}>{part}</ReactMarkdown> : part
    ));
  };

  return (
    <div className="chat-container">
        <div className="chat-header">
            <button onClick={handleNewChat} className="new-chat-button">Новый чат</button>
        </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-bubble">
              {renderMessageContent(message.text)}
              {isLoading && message.sender === 'gemini' && messages[messages.length - 1].id === message.id && <span className="typing-cursor"></span>}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isLoading ? "Колдую..." : "Спросите что-нибудь..."}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default Chat;
