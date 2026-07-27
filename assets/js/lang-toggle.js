(function () {
  'use strict';

  var STORAGE_KEY = 'preferred-lang';
  var root = document.documentElement;

  /**
   * Apply a language to the page:
   *  1. Set data-lang on <html> → CSS shows/hides .lang-en / .lang-zh blocks
   *  2. Swap text of every [data-en][data-zh] element
   *  3. Update the button label to show the OTHER language (tap to switch)
   */
  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // --- swap data-en / data-zh inline text nodes ---
    var nodes = document.querySelectorAll('[data-en][data-zh]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = lang === 'zh' ? nodes[i].getAttribute('data-zh')
                                            : nodes[i].getAttribute('data-en');
    }

    // --- update button appearance ---
    var btn = document.getElementById('lang-toggle-button');
    if (btn) {
      var label = btn.querySelector('.lang-label');
      if (label) {
        // Button shows the language you can SWITCH TO
        label.textContent = lang === 'en' ? '中文' : 'English';
      }
      btn.setAttribute('title', lang === 'en' ? '切换到中文' : 'Switch to English');
      btn.setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
    }
  }

  function toggleLang() {
    var current = root.getAttribute('data-lang') || 'en';
    setLang(current === 'en' ? 'zh' : 'en');
  }

  // --- bind click ---
  var btn = document.getElementById('lang-toggle-button');
  if (btn) {
    btn.addEventListener('click', toggleLang);
  }

  // --- initialise: saved pref → browser language → default English ---
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'zh' || saved === 'en') {
    setLang(saved);
  } else {
    var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    setLang(browserLang.indexOf('zh') === 0 ? 'zh' : 'en');
  }
})();
