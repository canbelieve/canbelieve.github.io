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
  const links = [...document.querySelectorAll('[data-ablvst-download]')];
  const releaseInfo = document.querySelectorAll('[data-ablvst-release-info]');
  const releaseStatus = document.querySelectorAll('[data-ablvst-release-status]');
  if (!links.length && !releaseInfo.length && !releaseStatus.length) return;

  const repository = 'canbelieve/ablvst-studio';
  const apiUrl = `https://api.github.com/repos/${repository}/releases/latest`;
  const fallback = {
    'windows-setup': 'downloads/ablvst-studio/AblVST-Studio-1.0.1-Windows-x64-Setup.exe',
    'windows-portable': 'downloads/ablvst-studio/AblVST-Studio-1.0.1-Windows-x64-Portable.zip',
    'macos-dmg': 'https://github.com/canbelieve/ablvst-studio/releases/download/v1.0.1/AblVST-Studio-1.0.1-macOS-arm64.dmg',
    checksums: 'downloads/ablvst-studio/SHA256SUMS-windows.txt',
    report: 'downloads/ablvst-studio/BUILD-REPORT-windows.txt',
    release: `https://github.com/${repository}/releases/latest`,
  };

  const setLinks = (kind, href) => {
    links.filter((link) => link.dataset.ablvstDownload === kind).forEach((link) => {
      link.href = href;
    });
  };

  Object.entries(fallback).forEach(([kind, href]) => setLinks(kind, href));

  const setStatus = (it, en) => {
    releaseStatus.forEach((element) => {
      element.textContent = element.dataset.lang === 'it' ? it : en;
    });
  };

  const findAsset = (assets, patterns) => assets.find(({ name }) => patterns.some((pattern) => pattern.test(name)));

  fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
      return response.json();
    })
    .then((release) => {
      const version = String(release.tag_name || release.name || '1.0.1').replace(/^v/i, '');
      const assets = Array.isArray(release.assets) ? release.assets : [];
      const setup = findAsset(assets, [/windows.*setup.*\.exe$/i, /setup.*windows.*\.exe$/i]);
      const portable = findAsset(assets, [/windows.*portable.*\.zip$/i, /portable.*windows.*\.zip$/i]);
      const macos = findAsset(assets, [/macos.*\.dmg$/i, /mac.*os.*\.dmg$/i]);
      const checksums = findAsset(assets, [/sha256/i]);
      const report = findAsset(assets, [/build-report.*\.txt$/i]);

      if (setup) setLinks('windows-setup', setup.browser_download_url);
      if (portable) setLinks('windows-portable', portable.browser_download_url);
      if (macos) setLinks('macos-dmg', macos.browser_download_url);
      if (checksums) setLinks('checksums', checksums.browser_download_url);
      if (report) setLinks('report', report.browser_download_url);
      setLinks('release', release.html_url || fallback.release);

      releaseInfo.forEach((element) => {
        element.textContent = `Version ${version} · Windows x64 · macOS · Free`;
      });
      setStatus(
        `Release GitHub aggiornata: v${version} · ${assets.length} ${assets.length === 1 ? 'asset disponibile' : 'asset disponibili'}.`,
        `GitHub release updated: v${version} · ${assets.length} ${assets.length === 1 ? 'asset available' : 'assets available'}.`,
      );
    })
    .catch(() => {
      setStatus(
        'Release GitHub non raggiungibile: sono disponibili i collegamenti di fallback.',
        'GitHub release unavailable: fallback download links remain available.',
      );
    });
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
