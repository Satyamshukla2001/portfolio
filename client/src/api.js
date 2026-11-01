const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Request failed. Try again.');
  return body;
}

export const getProjects = () => request('/projects');
export const getRepos = () => request('/github/repos');
export const sendMessage = (payload) =>
  request('/contact', { method: 'POST', body: JSON.stringify(payload) });
