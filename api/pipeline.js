// api/pipeline.js
// Unified pipeline: Reddit research → Groq filter → Groq slide writer
// All 4 categories supported with category-specific prompts

const CATEGORY_CONFIG = {
  roadmap: {
    redditSubs: ['learnprogramming', 'cscareerquestions', 'webdev', 'artificial'],
    tavilyQuery: 'coding roadmap programming learning path 2026 trending',
    agent1Prompt: (reddit, web) => `You are a tech content strategist for Instagram in 2026.

Here are REAL trending discussions from Reddit right now:
${reddit}

And current web trends:
${web}

Based on this REAL data, generate exactly 15 specific trending topic ideas for Instagram carousel posts in the ROADMAP category. These are step-by-step learning paths for coding, AI, or tech skills.

For each topic give:
- Topic name
- Why it's trending RIGHT NOW based on the data above
- Who it's for (beginner/intermediate/advanced)

Number them 1-15. Be specific. Use insights from the actual Reddit posts above.`,

    agent2Prompt: (topics) => `From this list of 15 roadmap topics, select the TOP 5 best for Instagram carousel posts targeting CS students, working developers, and freshers in India and globally.

Each must work as a structured multi-phase roadmap with phases, months, goals, and milestones.

Topics:
${topics}

Output format:
Rank 1: [topic name] | Score: X/10 | Reason: [one line]
Rank 2: ...
(continue for all 5)`,

    agent3Prompt: (top5, selectedRank = 1) => `Write complete slide-by-slide Instagram carousel content using this EXACT Roadmap Canva template structure:

SLIDE 1 — COVER:
[Punchy hook question with a highlighted keyword in quotes]
Swipe through to see the timeline.
📌 Save this for when you're ready to start.

SLIDES 2 onwards — PHASE SLIDES (max 2 months per slide, create as many phases as needed):
Phase [N] – The "[Nickname]" ([Topic Area])
[One punchy tagline]

Month [X]: [Title]
1. Focus: [3-4 specific bullet points]
2. Goal: [concrete project to build]
3. Milestone: [what you'll achieve/understand]

Month [X+1]: [Title]
1. Focus: [bullets]
2. Goal: [project]
3. Milestone: [achievement]

LAST SLIDE — CLOSING:
YOUR TURN NOW
[3 short punchy action lines]
🔖 Save this roadmap
📌 Follow for resources

═══════════════════════
INSTAGRAM CAPTION:
[150-200 words: punchy hook + what they'll learn + phases summary + CTA to comment which phase they're in]

HASHTAGS:
[25 relevant hashtags on one line]
═══════════════════════

Top 5 topics to choose from:
${top5}

Write ALL slide content for the RANK ${selectedRank} topic ONLY. Be specific and actionable. Target: CS students, freshers, working developers.`
  },

  ai: {
    redditSubs: ['artificial', 'ChatGPT', 'MachineLearning', 'technology'],
    tavilyQuery: 'AI technology explained simply trending concepts 2026',
    agent1Prompt: (reddit, web) => `You are a tech content strategist for Instagram in 2026.

Here are REAL trending AI discussions from Reddit right now:
${reddit}

And current web trends:
${web}

Based on this REAL data, generate exactly 15 trending topic ideas for Instagram carousel posts in the AI TECH EXPLAIN category. These explain complex AI or tech concepts simply for non-experts.

For each topic give:
- Topic as a curiosity question (e.g. "How does ChatGPT actually work?")
- Why people are confused/curious about it RIGHT NOW based on the data
- 3-4 key concepts that make it explainable in slides

Number them 1-15. Use insights from the actual discussions above.`,

    agent2Prompt: (topics) => `From this list, select TOP 5 best AI/tech explanation topics for Instagram carousel posts targeting CS students, tech enthusiasts, and curious non-experts.

Each must be explainable with simple analogies in 5-7 slides with clear numbered concepts.

Topics:
${topics}

Output format:
Rank 1: [topic] | Score: X/10 | Reason: [one line]
Rank 2: ...
(continue for all 5)`,

    agent3Prompt: (top5, selectedRank = 1) => `Write complete slide-by-slide Instagram carousel content using this EXACT AI Tech Explain Canva template:

SLIDE 1 — COVER:
TECH EXPLAINED | Digital Deep Dive: Part 1
[Big curiosity-hook title — "What Happens Behind the Search Bar" style]
"Let's discuss technology!"

SLIDE 2 — HOOK:
[Italic curiosity question as heading]
[3-4 sentences of relatable setup — why this feels magical/confusing]
Swipe to see the [N]-step secret... →

SLIDES 3+ — CONCEPT SLIDES (one per key concept):
[N]. The [Metaphor Name] ([Technical Term])
[2-3 sentence plain-language explanation]
• [detail bullet]
• [detail bullet]
• [detail bullet]
Simple view: [real-world analogy, no jargon]

LAST SLIDE — BEFORE YOU GO:
"Before you go..."
[2-sentence summary of what they learned]
🔖 Save this for later
➡ Follow for Part 2: [next related topic]
💬 What should I explain next?

═══════════════════════
INSTAGRAM CAPTION:
[150-200 words: curiosity hook + what they'll understand + CTA]

HASHTAGS:
[25 relevant hashtags on one line]
═══════════════════════

Top 5 topics:
${top5}

Write for the RANK ${selectedRank} topic ONLY. Use analogies. Simple language. No jargon. Explain like to a curious friend.`
  },

  interview: {
    redditSubs: ['cscareerquestions', 'leetcode', 'csMajors', 'developersIndia'],
    tavilyQuery: 'tech interview questions FAANG hiring 2026 coding interview preparation',
    agent1Prompt: (reddit, web) => `You are a tech hiring expert for 2026.

Here are REAL discussions about tech interviews from Reddit right now:
${reddit}

And current web trends:
${web}

Based on this REAL data, generate exactly 15 specific interview question ideas for Instagram posts targeting CS students and job seekers.

For each give:
- The exact interview question
- Difficulty: Beginner / Intermediate / Advanced
- What concept/skill it tests
- Frequency: Very Common / Common / Occasionally

Cover DSA, system design, OOP, CS fundamentals based on what people are actually asking about above.
Number them 1-15.`,

    agent2Prompt: (topics) => `From this list, select TOP 5 best interview questions for Instagram carousel posts targeting CS students and freshers. Each must have depth: what interviewers check, ideal answer, real-life example, skill challenge.

Questions:
${topics}

Output format:
Rank 1: [question] | Score: X/10 | Reason: [one line]
Rank 2: ...
(continue for all 5)`,

    agent3Prompt: (top5, selectedRank = 1) => `Write complete slide-by-slide Instagram carousel content using this EXACT Interview Question Canva template:

SLIDE 1 — COVER:
Interview Question
[THE QUESTION IN BOLD]
[Difficulty level] | [Frequency e.g. "Asked often"]
What's inside:
✅ What Interviewers Check
🧠 Ideal Interview Answer
💻 Real-life Example
👤 Skill Check
"[Witty bottom quote about candidates getting this wrong]"

SLIDE 2 — CONTENT:
What Interviewers Check
[intro sentence about what this tests]
• [concept 1]
• [concept 2]
• [concept 3]

Ideal Interview Answer
• [key point with bold term]
• [key point with bold term]
• [key point]

Real-life Example
• [everyday analogy 1]
• [everyday analogy 2]

SLIDE 3 — SKILL CHECK:
SKILL CHECK
"Explain [concept] in ONE sentence (no jargon)."
Your turn.
Comment your one-sentence answer below.
Save this post for interview revision.
Follow for daily interview questions.

═══════════════════════
INSTAGRAM CAPTION:
[150-200 words: question hook + why candidates fail it + what they'll learn + CTA to comment answer]

HASHTAGS:
[25 relevant hashtags on one line]
═══════════════════════

Top 5 questions:
${top5}

Write for the RANK ${selectedRank} question ONLY. Be technically accurate. Target: freshers and CS students.`
  },

  news: {
    redditSubs: ['technology', 'programming', 'cscareerquestions', 'artificial'],
    tavilyQuery: 'tech industry news layoffs AI companies developers 2026',
    agent1Prompt: (reddit, web) => `You are a tech journalist covering the industry in 2026.

Here are REAL trending tech news discussions from Reddit right now:
${reddit}

And current web trends:
${web}

Based on this REAL data, generate exactly 15 specific tech industry news story ideas for Instagram posts.

For each give:
- Punchy ALL CAPS headline
- What happened (2 sentences based on real trends above)
- Why it matters to developers/students
- The debate angle (two sides)

Number them 1-15. Base these on REAL discussions happening above.`,

    agent2Prompt: (topics) => `From this list, select TOP 5 most engaging tech news stories for Instagram carousel posts targeting CS students, developers, and tech enthusiasts. Must spark debate and impact tech careers.

Stories:
${topics}

Output format:
Rank 1: [headline] | Score: X/10 | Reason: [one line]
Rank 2: ...
(continue for all 5)`,

    agent3Prompt: (top5, selectedRank = 1) => `Write complete slide-by-slide Instagram carousel content using this EXACT Tech Industry News Canva template:

SLIDE 1 — COVER:
[BOLD ALL CAPS HEADLINE ONLY — newspaper front page style. Nothing else on this slide.]

SLIDES 2-4 — WHY IT MATTERS (one insight per slide):
WHY IT MATTERS
[numbered badge: 01 / 02 / 03]
[Bold Label]: [2-3 sentence opinionated explanation of this specific angle]

SLIDE — MY OPINION:
MY OPINION
[next number]
[Bold opinionated 2-sentence opening statement]
• The Verdict: [2 sentences on impact for devs/students]
• [One more implication bullet]

LAST SLIDE — WHAT DO YOU THINK?:
WHAT DO YOU THINK?
[DEBATE QUESTION IN CAPS — "IS THIS X — OR Y?"]
🔖 ❤️ 💬

═══════════════════════
INSTAGRAM CAPTION:
[150-200 words: shocking hook with the news + 3 key insights + your opinion + debate question CTA]

HASHTAGS:
[25 relevant hashtags on one line]
═══════════════════════

Top 5 stories:
${top5}

Write for the RANK ${selectedRank} story ONLY. Be direct, opinionated. Speak to CS students and developers.`
  }
};

async function getRedditTrends(subs) {
  let posts = [];
  for (const sub of subs) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/hot.json?limit=8`,
        { headers: { 'User-Agent': 'InstagramPipelineBot/1.0' } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const titles = data.data.children
        .map(p => `[r/${sub}] ${p.data.title} (${p.data.score} upvotes)`)
        .filter(t => t.length > 10);
      posts.push(...titles);
    } catch (err) {
      console.log(`Reddit r/${sub} error:`, err.message);
    }
  }
  return posts.length > 0
    ? posts.join('\n')
    : 'Reddit data unavailable — use your knowledge of current trends.';
}

async function tavilySearch(query, tavilyKey) {
  if (!tavilyKey) return 'No Tavily key provided — skip web search.';
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: tavilyKey,
        query,
        search_depth: 'basic',
        max_results: 5
      })
    });
    const data = await response.json();
    return data.results?.map(r => `${r.title}: ${r.content?.slice(0, 200)}`).join('\n\n') || 'No results.';
  } catch (err) {
    console.log('Tavily error:', err.message);
    return 'Web search unavailable.';
  }
}

async function callGroq(prompt, groqKey) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${groqKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt.slice(0, 6000) }],
      temperature: 0.8,
      max_tokens: 2048
    })
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); }
  catch (e) { throw new Error('Groq returned invalid JSON: ' + text.slice(0, 200)); }

  if (!response.ok) throw new Error(data.error?.message || `Groq error ${response.status}`);

  const result = data.choices?.[0]?.message?.content;
  if (!result) throw new Error('Empty response from Groq');
  return result;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { category, groqKey, tavilyKey, topicRank, bestTopics: cachedTopics } = req.body;

  if (!category) return res.status(400).json({ error: 'Missing category' });
  if (!groqKey) return res.status(400).json({ error: 'Missing Groq API key' });

  const config = CATEGORY_CONFIG[category];
  if (!config) return res.status(400).json({ error: `Unknown category: ${category}` });

  // SLIDE-ONLY mode: regenerate slides for a chosen topic rank using cached bestTopics
  if (topicRank && cachedTopics) {
    const rank = parseInt(topicRank, 10) || 1;
    try {
      console.log(`Slide-only mode: category=${category}, rank=${rank}`);
      const carousel = await callGroq(
        config.agent3Prompt(cachedTopics, rank),
        groqKey
      );
      return res.status(200).json({ carousel });
    } catch (err) {
      console.error('Slide generation error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  try {
    console.log(`Pipeline started: category=${category}`);

    // Step 1: Research
    const [redditData, webData] = await Promise.all([
      getRedditTrends(config.redditSubs),
      tavilySearch(config.tavilyQuery, tavilyKey)
    ]);
    console.log('Research done');

    // Agent 1: Generate topic ideas from real data
    const trendAnalysis = await callGroq(
      config.agent1Prompt(redditData, webData),
      groqKey
    );
    console.log('Agent 1 done');

    // Agent 2: Filter top 5
    const bestTopics = await callGroq(
      config.agent2Prompt(trendAnalysis),
      groqKey
    );
    console.log('Agent 2 done');

    // Agent 3: Write slides (default rank 1)
    const selectedRank = parseInt(topicRank, 10) || 1;
    const carousel = await callGroq(
      config.agent3Prompt(bestTopics, selectedRank),
      groqKey
    );
    console.log('Agent 3 done');

    return res.status(200).json({
      trendAnalysis,
      bestTopics,
      carousel,
      redditPostCount: redditData.split('\n').length
    });

  } catch (err) {
    console.error('Pipeline error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
