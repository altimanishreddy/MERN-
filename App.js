    import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en'); // Default source language: English
  const [targetLang, setTargetLang] = useState('es'); // Default target language: Spanish
  const [languages, setLanguages] = useState([]); // Store available languages

  React.useEffect(() => {
    // Fetch available languages from the backend on component mount
    axios.get('/api/languages')
      .then(response => {
        setLanguages(response.data);
      })
      .catch(error => {
        console.error('Error fetching languages:', error);
      });
  }, []);

  const handleTranslate = () => {
    axios.post('/api/translate', {
      text: inputText,
      sourceLang: sourceLang,
      targetLang: targetLang,
    })
      .then(response => {
        setTranslatedText(response.data.translatedText);
      })
      .catch(error => {
        console.error('Error translating:', error);
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Web Text Translator</h1>

      <div>
        <label>Source Language:</label>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Target Language:</label>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
        style={{ width: '100%', minHeight: '100px', marginTop: '10px' }}
      />

      <button onClick={handleTranslate} style={{ marginTop: '10px' }}>Translate</button>

      {translatedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;