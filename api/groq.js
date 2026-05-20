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

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 2048
      })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); }
    catch (e) { return res.status(500).json({ error: 'Invalid JSON from Groq: ' + text.slice(0,300) }); }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Groq error ' + response.status });
    }

    const result = data.choices?.[0]?.message?.content;
    if (!result) return res.status(500).json({ error: 'Empty response from Groq' });

    return res.status(200).json({ result });

  } catch (err) {
    return res.status(500).json({ error: 'Handler error: ' + err.message });
  }
};
