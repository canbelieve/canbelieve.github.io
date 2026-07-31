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
  const setupLinks = document.querySelectorAll('[data-jotta-download="setup"]');
  const portableLinks = document.querySelectorAll('[data-jotta-download="portable"]');
  if (!releaseInfo.length && !setupLinks.length && !portableLinks.length) return;

  const repository = 'canbelieve/canbelieve.github.io';
  const apiUrl = `https://api.github.com/repos/${repository}/releases/latest`;
  const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
      return response.json();
    })
    .then((release) => {
      const version = release.tag_name.replace(/^v/i, '');
      const setupName = `JottaExplorer-${version}-Windows-x64-Setup.exe`;
      const portableName = `JottaExplorer-${version}-Windows-x64-Portable.zip`;
      const setupAsset = release.assets.find(({ name }) => name === setupName);
      const portableAsset = release.assets.find(({ name }) => name === portableName);
      if (!setupAsset) throw new Error(`${setupName} non trovato nella release`);

      setupLinks.forEach((link) => { link.href = setupAsset.browser_download_url; });
      if (portableAsset) {
        portableLinks.forEach((link) => { link.href = portableAsset.browser_download_url; });
      }

      const text = `Version ${version} • Windows x64 • ${formatSize(setupAsset.size)} • Beta`;
      releaseInfo.forEach((element) => { element.textContent = text; });
    })
    .catch(() => {
      // Il testo statico nella pagina rimane disponibile se GitHub non risponde.
    });
})();
