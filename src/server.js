import express, { json } from 'express';
import { post } from 'axios';

const app = express();
const port = 3000;

app.use(json());

app.post('/translate', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    // Replace with your actual API key and URL
    const apiKey = "YOUR_API_KEY"; // Replace with your API key
    const apiUrl = "YOUR_API_ENDPOINT"; // Replace with your API endpoint

    try {
        const response = await post(apiUrl, {
            q: text,
            source: sourceLang,
            target: targetLang,
            key: apiKey,
        });

        // Replace with the actual field from your API's response
        const translatedText = response.data.translatedText; // Example, adjust as needed

        res.json({ translatedText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});