(function () {
  var S = window.SITE || {};

  // Google tag (gtag.js): GA4 + optional Google Ads
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  var isLinePage = /\/line-thanks(\.html)?\/?$/.test(location.pathname);
  var firstId = S.gaId || S.googleAdsId;
  if (firstId) {
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(firstId);
    document.head.appendChild(g);
    gtag('js', new Date());
    // On /line-thanks the page view is sent by hand below, so it is recorded before leaving for LINE
    if (S.gaId) gtag('config', S.gaId, isLinePage ? { send_page_view: false } : {});
    if (S.googleAdsId) gtag('config', S.googleAdsId);
  }

  // Opening a page (e.g. from the footer links) always starts at the top,
  // unless the link points to a section like #faq
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function toTop() {
    if (location.hash) return;
    window.scrollTo(0, 0);
    // also scrolls any outer frame (e.g. an in-app preview) back to the page top
    try { document.body.scrollIntoView({ block: 'start' }); } catch (e) {}
  }
  window.addEventListener('load', toTop);
  window.addEventListener('pageshow', toTop);

  document.addEventListener('DOMContentLoaded', function () {
    toTop();
    // Mobile menu
    var btn = document.querySelector('.menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
      });
      menu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      });
    }

    // Header shrinks to a slim bar once the page is scrolled
    var hdr = document.querySelector('.site-header');
    if (hdr) {
      var onScroll = function () { hdr.classList.toggle('is-compact', window.scrollY > 40); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Gentle reveal: photos and cards rise in once as they scroll into view
    window.__reveal = true;
    var targets = document.querySelectorAll('.feature > *, .item, .guide article, .boxes figure, .guide-card');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      targets.forEach(function (el) {
        // small stagger between neighbours in the same grid row
        var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = (sibs % 4) * 90 + 'ms';
        io.observe(el);
      });
    } else {
      targets.forEach(function (el) { el.classList.add('in'); });
    }

    // 文定準備清單: remember ticks on this device
    var boxes = document.querySelectorAll('.checklist input[type=checkbox]');
    if (boxes.length) {
      var KEY = 'wtm-checklist';
      var saved = {};
      try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
      var count = document.getElementById('check-count');
      var update = function () {
        var done = 0, state = {};
        boxes.forEach(function (b) { if (b.checked) { done++; state[b.dataset.key] = 1; } });
        if (count) count.textContent = '已完成 ' + done + ' / ' + boxes.length + ' 項';
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      };
      boxes.forEach(function (b) { b.checked = !!saved[b.dataset.key]; b.addEventListener('change', update); });
      var reset = document.getElementById('check-reset');
      if (reset) reset.addEventListener('click', function () { boxes.forEach(function (b) { b.checked = false; }); update(); });
      update();
    }

    // Gold gallery thumbnails
    document.querySelectorAll('.gallery').forEach(function (gal) {
      var main = gal.querySelector('.main');
      gal.querySelectorAll('.thumbs button').forEach(function (b) {
        b.addEventListener('click', function () {
          main.src = b.dataset.src;
          gal.querySelectorAll('.thumbs button').forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        });
      });
    });

    // LINE redirect page: report conversion, then go to LINE
    var go = document.getElementById('line-go');
    if (go) {
      var url = S.lineUrl || 'https://lin.ee/QhKamjT';
      go.href = url;
      var done = false;
      var leave = function () { if (!done) { done = true; window.location.replace(url); } };
      var waits = 0;
      var report = function () { if (waits === 0) setTimeout(leave, 400); };
      if (S.gaId) {
        // GA4 page view of /line-thanks = the 「聯絡人」 conversion in Google Ads
        waits++;
        gtag('event', 'page_view', { send_to: S.gaId, event_callback: leave });
      }
      if (S.googleAdsId && S.lineConversionLabel) {
        waits++;
        gtag('event', 'conversion', { send_to: S.googleAdsId + '/' + S.lineConversionLabel, event_callback: leave });
      }
      if (waits) setTimeout(leave, 1500); else report();
    }
  });
})();
