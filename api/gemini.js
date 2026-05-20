module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, apiKey } = req.body;

    if (!prompt || !apiKey) {
      return res.status(400).json({ error: 'Missing prompt or apiKey' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 4096 }
      })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); }
    catch (e) { return res.status(500).json({ error: 'Invalid JSON from Gemini: ' + text.slice(0,300) }); }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Gemini error ' + response.status });
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!result) return res.status(500).json({ error: 'Empty response from Gemini' });

    return res.status(200).json({ result });

  } catch (err) {
    return res.status(500).json({ error: 'Handler error: ' + err.message });
  }
};
