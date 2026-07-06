const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.docs)) {
    return payload.docs;
  }

  if (payload.results && typeof payload.results === 'object') {
    const nestedItems = payload.results.data || payload.results.items || payload.results.docs || payload.results.results;

    if (Array.isArray(nestedItems)) {
      return nestedItems;
    }
  }

  return [];
};

const fetchCollection = async (resource) => {
  const baseUrl = getApiBaseUrl();
  const candidates = [`${baseUrl}/${resource}/`, `${baseUrl}/${resource}`];
  let lastError = null;

  for (const endpoint of candidates) {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        lastError = new Error(`Request failed with status ${response.status}`);
        continue;
      }

      const payload = await response.json();
      return normalizeItems(payload);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error(`Unable to load ${resource}`);
};

export { fetchCollection, getApiBaseUrl };
