(() => {
  const button = document.querySelector('[data-language-toggle]');
  const initial = localStorage.getItem('kapps-language') || 'it';
  const apply = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach((node) => {
      node.hidden = node.dataset.lang !== lang;
    });
    if (button) button.textContent = lang === 'it' ? 'EN' : 'IT';
    localStorage.setItem('kapps-language', lang);
  };
  apply(initial);
  if (button) button.addEventListener('click', () => apply(document.documentElement.lang === 'it' ? 'en' : 'it'));
})();

(() => {
  const releaseInfo = document.querySelectorAll('[data-jotta-release-info]');
  if (!releaseInfo.length) return;

  const repository = 'canbelieve/canbelieve.github.io';
  const assetName = 'JottaExplorer.zip';
  const apiUrl = `https://api.github.com/repos/${repository}/releases/latest`;
  const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
      return response.json();
    })
    .then((release) => {
      const asset = release.assets.find(({ name }) => name === assetName);
      if (!asset) throw new Error(`${assetName} non trovato nella release`);

      const version = release.tag_name.replace(/^v/i, '');
      const text = `Version ${version} • Windows x64 • ${formatSize(asset.size)}`;
      releaseInfo.forEach((element) => { element.textContent = text; });
    })
    .catch(() => {
      // Il testo statico nella pagina rimane disponibile se GitHub non risponde.
    });
})();
