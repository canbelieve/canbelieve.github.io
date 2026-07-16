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
