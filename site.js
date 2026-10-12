/* ─────────────────────────────────────────────
   Jackson D. Puzey — site behavior
   Each block is isolated so one failure can't
   take down the rest of the page.
   ───────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── 1. scroll reveal ──────────────────── */
  try {
    var items = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add('is-in'); });
    }
  } catch (err) {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── 2. language toggle ────────────────── */
  try {
    var lang = 'en';
    var btn = document.getElementById('langBtn');

    function apply(next) {
      lang = next;
      document.documentElement.lang = next;
      var attr = next === 'it' ? 'data-it' : 'data-en';
      document.querySelectorAll('[data-en][data-it]').forEach(function (el) {
        var v = el.getAttribute(attr);
        if (v !== null) el.innerHTML = v;
      });
      if (btn) {
        btn.textContent = next === 'en' ? 'IT' : 'EN';
        btn.setAttribute('aria-label',
          next === 'en' ? 'Switch language to Italian' : 'Cambia lingua in inglese');
      }
      DECK_LABEL = next === 'it' ? DECK_IT : DECK_EN;
    }

    if (btn) btn.addEventListener('click', function () { apply(lang === 'en' ? 'it' : 'en'); });
  } catch (err) { /* page stays in English */ }

  /* ── 3. deck lightbox ──────────────────── */
  var DECKS = {
    luxury: { count: 27, prefix: 'deck-luxury-' },
    report: { count: 21, prefix: 'deck-report-' },
    costa:  { count: 20, prefix: 'deck-costa-'  },
    levis:  { count: 11, prefix: 'deck-levis-'  }
  };
  var DECK_EN = {
    luxury: 'Luxury Goods Distribution — Presentation',
    report: 'Luxury Goods Distribution — Full Report',
    costa:  'Costa Crociere — Digital Strategy',
    levis:  "Levi's — Brand & Competitor Analysis"
  };
  var DECK_IT = {
    luxury: 'Distribuzione dei Beni di Lusso — Presentazione',
    report: 'Distribuzione dei Beni di Lusso — Report',
    costa:  'Costa Crociere — Strategia Digitale',
    levis:  "Levi's — Analisi di Brand e Concorrenza"
  };
  var DECK_LABEL = DECK_EN;

  try {
    var lb      = document.getElementById('lb');
    var lbImg   = document.getElementById('lbImg');
    var lbTitle = document.getElementById('lbTitle');
    var lbCount = document.getElementById('lbCount');
    var lbFilm  = document.getElementById('lbFilm');
    var prevBtn = document.getElementById('lbPrev');
    var nextBtn = document.getElementById('lbNext');
    var closeBtn= document.getElementById('lbClose');

    var cur = null, idx = 0, lastFocus = null;

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function src(key, n) { return DECKS[key].prefix + pad(n) + '.jpg'; }

    function show(i) {
      var d = DECKS[cur];
      idx = Math.max(0, Math.min(i, d.count - 1));
      lbImg.src = src(cur, idx + 1);
      lbImg.alt = DECK_LABEL[cur] + ' — slide ' + (idx + 1) + ' of ' + d.count;
      lbCount.textContent = (idx + 1) + ' / ' + d.count;
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === d.count - 1;
      var thumbs = lbFilm.children;
      for (var t = 0; t < thumbs.length; t++) {
        thumbs[t].classList.toggle('is-on', t === idx);
      }
      try {
        if (thumbs[idx] && thumbs[idx].scrollIntoView) {
          thumbs[idx].scrollIntoView({ block: 'nearest', inline: 'center' });
        }
      } catch (e) { /* non-critical */ }
      try {
        if (idx + 1 < d.count) { new Image().src = src(cur, idx + 2); }
      } catch (e) { /* non-critical */ }
    }

    function open(key) {
      if (!DECKS[key]) return;
      cur = key;
      lastFocus = document.activeElement;
      lbTitle.textContent = DECK_LABEL[key];

      lbFilm.innerHTML = '';
      for (var i = 1; i <= DECKS[key].count; i++) {
        var t = document.createElement('img');
        t.src = src(key, i);
        t.alt = 'Go to slide ' + i;
        t.loading = 'lazy';
        t.dataset.i = i - 1;
        t.addEventListener('click', function () { show(+this.dataset.i); });
        lbFilm.appendChild(t);
      }

      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      show(0);
      closeBtn.focus();
    }

    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
      lbFilm.innerHTML = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.querySelectorAll('[data-deck]').forEach(function (el) {
      el.addEventListener('click', function () { open(el.dataset.deck); });
    });

    prevBtn.addEventListener('click', function () { show(idx - 1); });
    nextBtn.addEventListener('click', function () { show(idx + 1); });
    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape')     { close(); }
      if (e.key === 'ArrowRight') { show(idx + 1); }
      if (e.key === 'ArrowLeft')  { show(idx - 1); }
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        var f = lb.querySelectorAll('button:not(:disabled), img[data-i]');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // swipe on touch
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) { show(dx < 0 ? idx + 1 : idx - 1); }
      x0 = null;
    }, { passive: true });

  } catch (err) { /* decks unavailable; rest of page still works */ }
})();
