const express = require('express');
const router = express.Router();

const TTL = 10 * 60 * 1000;
let cache = { at: 0, data: null };

// Public: live repositories from GitHub (cached for 10 minutes)
router.get('/repos', async (_req, res) => {
  const user = process.env.GITHUB_USER;
  if (!user) return res.status(500).json({ error: 'GITHUB_USER is not set.' });
  if (cache.data && Date.now() - cache.at < TTL) return res.json(cache.data);

  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-server' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const r = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, { headers });
    if (!r.ok) throw new Error(`GitHub responded ${r.status}`);
    const repos = (await r.json())
      .filter((x) => !x.fork && x.name.toLowerCase() !== user.toLowerCase())
      .map((x) => ({
        name: x.name,
        description: x.description,
        language: x.language,
        stars: x.stargazers_count,
        url: x.html_url,
        homepage: x.homepage || '',
        updatedAt: x.pushed_at
      }));
    cache = { at: Date.now(), data: repos };
    res.json(repos);
  } catch (err) {
    if (cache.data) return res.json(cache.data); // serve stale copy if GitHub is unreachable
    res.status(502).json({ error: 'Could not reach GitHub right now.' });
  }
});

module.exports = router;
