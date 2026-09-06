(() => {
    // MODIFICA SOLO QUESTA LISTA PER CAMBIARE I PRODOTTI.
    // video: usa un URL diretto a un file MP4/WebM, oppure un percorso come "videos/prodotto-1.mp4".
    // quanti: ogni voce è { peso, prezzo } mostrata come pulsante per l'ordine.
    // Link Signal fornito dal titolare del sito.
    const SIGNAL_URL = 'https://signal.me/#eu/8zUS3htBXdn_l-QMUGhhFZjSHWkHoz52jyGFJ-bwTZL4w7iubolAB4wsyO3eqNm0';
    const CONTACT_MESSAGE = 'Ciao, vorrei ricevere maggiori informazioni.';

    const cleanProductName = (title) => title
      .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '')
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
      .replace(/★|⭐/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const buildOrderMessage = (product, qty) =>
      `Ciao, vorrei ${String(qty.peso).toLowerCase()} ${cleanProductName(product.title)}`;

    const products = [
      { video: 'media/p1.mp4', title: 'Crumble Americano 🇺🇸⭐⭐⭐⭐⭐', description: '1G 20\n5G 85\n10G 150\n+ QUANTITÀ IN PRIVATO', online: true, quanti: [{ peso: '1G', prezzo: '20' }, { peso: '5G', prezzo: '85' }, { peso: '10G', prezzo: '150' }] },
      { video: 'media/p2.mp4', title: 'Cali USA 🇺🇸⭐⭐⭐⭐', description: 'STRAIN: ZKITTLEZ\n70/30% • INDICA/SATIVA\n5G 40\n10G 70\n20G 140\nPER QUANTITÀ MAGGIORI: CONTATTO PRIVATO', online: true, quanti: [{ peso: '5G', prezzo: '40' }, { peso: '10G', prezzo: '70' }, { peso: '20G', prezzo: '140' }] },
      { video: 'media/p3.mp4', title: 'Dry Mountain Giants ⭐⭐⭐⭐⭐', description: 'QUANTITÀ LIMITATA\nPIÙ STRAIN DISPONIBILI\nBanana 🍌 & Pear 🍐\nLemon 🍋 • Cherry 🍒 • Gelato 🍦\nPermanent Marker 🖊️⛽️\n5G 35\n10G 60\n25G 140\n+ QUANTITÀ IN PRIVATO', online: true, quanti: [{ peso: '5G', prezzo: '35' }, { peso: '10G', prezzo: '60' }, { peso: '25G', prezzo: '140' }] },
      { video: 'media/p5.mp4', title: 'Frozen 90U Levelup 🍄', description: 'STRAIN: PERMANENT MARKER\n5G 50\n10G 90\n25G 210\n50G 400\n100G 700\n500G 3350\n1/2/5KG: PREZZO 💣\n+ QUANTITÀ IN PRIVATO 🔥🚀', online: true, quanti: [{ peso: '5G', prezzo: '50' }, { peso: '10G', prezzo: '90' }, { peso: '25G', prezzo: '210' }, { peso: '50G', prezzo: '400' }, { peso: '100G', prezzo: '700' }, { peso: '500G', prezzo: '3350' }] },
      { video: 'media/p4.mp4', title: 'Frozen Panucci Farm 🍉🍭', description: 'Strain Watermelon Zkittlez\n5G 60\n10G 110\n20G 200\n50G 450 • PLACCA INTERA\n+ QUANTITÀ IN PRIVATO\nQUANTITÀ LIMITATA 🪫\nPANUCCI FARM 🔥💫', online: true, quanti: [{ peso: '5G', prezzo: '60' }, { peso: '10G', prezzo: '110' }, { peso: '20G', prezzo: '200' }, { peso: '50G', prezzo: '450' }] },
      { video: 'media/p6.mp4', title: 'Top Indoor Quality 🇮🇹🍕🍝', description: '5G 35\n10G 60\n25G 135\n50G 250\n+ QUANTITÀ IN PRIVATO', online: true, quanti: [{ peso: '5G', prezzo: '35' }, { peso: '10G', prezzo: '60' }, { peso: '25G', prezzo: '135' }, { peso: '50G', prezzo: '250' }] },
      { video: 'media/p7.mp4', title: 'Amnesia Haze 🐰🇳🇱', description: '5G 35\n10G 65\n25G 150\n50G 275\n+ QUANTITÀ IN PRIVATO', online: true, quanti: [{ peso: '5G', prezzo: '35' }, { peso: '10G', prezzo: '65' }, { peso: '25G', prezzo: '150' }, { peso: '50G', prezzo: '275' }] },
      { video: 'media/p8.mp4', title: 'Frozen 90U Mountain Brotherz Farm 🏔️', description: 'STRAIN: BISCOTTI 🍪 • GARLIC COOKIE 🧅🍪\n5G 40\n10G 70\nUN PO OVERCURED MA RIMANE SEMPRE UN PRODOTTO TOP E SAPORITO.\nPREZZO REGALO 🎁🎁🎁', online: true, quanti: [{ peso: '5G', prezzo: '40' }, { peso: '10G', prezzo: '70' }] },
      { video: 'media/p9.mp4', title: 'Vape al THC 💨', description: 'ISTRUZIONI D\'USO VAPE AL THC\n⚠️PREMERE 5 VOLTE X ACCENDERE E SPEGNERE ⚠️\n⚠️FARE TIRI PIANO X EVITARE DI FAR USCIRE FUORI IL LIQUIDO ⚠️\n⚠️IL TAPPINO IN SILICONE SOPRA RIMANETELO SEMPRE X EVITARE LA FUORI USCITA DI LIQUIDO⚠️\n⚠️FATTA CON CRUMBLE CON OLTRE IL 60% DI THC QUINDI SERVONO POCHI TIRI X L\'EFFETTO⚠️\n1PZ 50€\n5PZ 200€\nPREZZO RICARICA LIQUIDO 🎁30€🎁', online: true, quanti: [{ peso: '1PZ', prezzo: '50€' }, { peso: '5PZ', prezzo: '200€' }] }
    ];

    const root = document.getElementById('aurum-webhash');
    if (!root || root.dataset.ready) return;
    root.dataset.ready = 'true';
    const grid = root.querySelector('.aw-grid');

    const icon = (name) => {
      const icons = {
        maximize: '<svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/><path d="m3 8 5-5m13 5-5-5M3 16l5 5m13-5-5 5"/></svg>',
        copy: '<svg viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
        mute: '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m22 9-6 6m0-6 6 6"/></svg>',
        play: '<svg viewBox="0 0 24 24"><path d="m7 4 13 8-13 8V4Z"/></svg>',
        pause: '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
        chevron: '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
        bag: '<svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
        message: '<svg viewBox="0 0 24 24"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-5.5A7 7 0 0 1 3 12V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v7Z"/><path d="M8 10h8M8 13h5"/></svg>'
      };
      return icons[name];
    };

    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);

    products.forEach((product, index) => {
      const card = document.createElement('article');
      card.className = 'aw-card';
      card.dataset.id = String(index + 1);
      const hasVideo = Boolean(product.video);
      const hasCopy = Boolean(product.title || product.description);
      const poster = hasVideo
        ? product.video.replace(/^media\//, 'posters/').replace(/\.[^.]+$/, '.jpg')
        : '';
      const media = hasVideo
        ? `<div class="aw-video-wrap" data-revealed="false" data-loaded="false" data-loading="false">
            <img class="aw-video-poster" src="${escapeHtml(poster)}" alt="" aria-hidden="true" width="480" height="360" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async"${index === 0 ? ' fetchpriority="high"' : ''}>
            <video class="aw-video" playsinline webkit-playsinline preload="none" controlslist="nodownload noplaybackrate noremoteplayback" disablepictureinpicture disableremoteplayback data-src="${escapeHtml(product.video)}" aria-label="${escapeHtml(product.title || `Video prodotto ${index + 1}`)}"></video>
            <button class="aw-video-reveal" type="button" aria-label="Riproduci video">${icon('play')}</button>
            <button class="aw-video-pause" type="button" aria-label="Metti in pausa">${icon('pause')}</button>
            <div class="aw-video-timeline">
              <input class="aw-video-seek" type="range" min="0" max="0" step="0.1" value="0" aria-label="Posizione del video">
              <span class="aw-video-time" aria-hidden="true">0:00 / 0:00</span>
            </div>
            <span class="aw-video-status" role="status" aria-live="polite"></span>
          </div>`
        : `<div class="aw-screen-actions">
            <button aria-label="Espandi">${icon('maximize')}</button>
            <button aria-label="Duplica">${icon('copy')}</button>
            <button class="aw-mute" aria-label="Disattiva audio">${icon('mute')}</button>
          </div>
          <button class="aw-play" data-playing="false" aria-label="Riproduci">${icon('play')}</button>
          <div class="aw-screen-signal"></div>`;
      const detailLines = product.description
        ? String(product.description).split('\n').filter(Boolean).map((line) => {
            const price = line.match(/^(\d+\s*(?:G|PZ))\s*[.:]?\s*(.+)$/i);
            return price
              ? `<span class="aw-detail-row"><strong>${escapeHtml(price[1])}</strong><span>${escapeHtml(price[2])}</span></span>`
              : `<span class="aw-detail-note">${escapeHtml(line)}</span>`;
          }).join('')
        : '';
      const rawTitle = String(product.title || `Prodotto ${index + 1}`);
      const ratingMatch = rawTitle.match(/^(.*?)(⭐+)$/u);
      const productName = ratingMatch ? ratingMatch[1].trim() : rawTitle;
      const productRating = ratingMatch ? ratingMatch[2] : '';
      const titleMarkup = `
        <span class="aw-title-copy">
          <span class="aw-title-kicker">Seleziona prodotto</span>
          <span class="aw-product-name">${escapeHtml(productName)}</span>
          ${productRating ? `<span class="aw-product-rating" aria-label="Valutazione ${Array.from(productRating).length} su 5">${escapeHtml(productRating)}</span>` : ''}
        </span>
        <span class="aw-title-chevron" aria-hidden="true">${icon('chevron')}</span>`;
      const copy = hasCopy
        ? `<div class="aw-product-copy"><span class="aw-detail-label">Dettagli prodotto</span><div class="aw-detail-list">${detailLines}</div></div>`
        : '<button class="aw-empty-action" aria-label="Dettagli prodotto"></button>';

      card.innerHTML = `
        <div class="aw-screen" data-playing="false">
          ${media}
        </div>
        <div class="aw-small-line" aria-hidden="true"></div>
        <button class="aw-gold-action" type="button" data-selected="false" aria-label="Seleziona ${escapeHtml(productName)}">${titleMarkup}</button>
        ${copy}
        <button class="aw-card-order" type="button" aria-label="ORDINA ORA su ${escapeHtml(productName)}">
          <span class="aw-order-icon" aria-hidden="true">${icon('bag')}</span>
          <span class="aw-order-copy"><strong>ORDINA ORA</strong><small>Contatto privato su Signal</small></span>
          <span class="aw-order-arrow" aria-hidden="true">→</span>
        </button>`;

      grid.appendChild(card);

      const screen = card.querySelector('.aw-screen');
      const play = card.querySelector('.aw-play');
      if (play) {
        play.addEventListener('click', () => {
          const next = play.dataset.playing !== 'true';
          play.dataset.playing = String(next);
          screen.dataset.playing = String(next);
          play.setAttribute('aria-label', next ? 'Pausa' : 'Riproduci');
        });
      }

      const videoWrap = card.querySelector('.aw-video-wrap');
      const video = card.querySelector('.aw-video');
      if (videoWrap && video) {
        const revealButton = videoWrap.querySelector('.aw-video-reveal');
        const pauseButton = videoWrap.querySelector('.aw-video-pause');
        const seek = videoWrap.querySelector('.aw-video-seek');
        const time = videoWrap.querySelector('.aw-video-time');
        const videoStatus = videoWrap.querySelector('.aw-video-status');
        video.disablePictureInPicture = true;
        video.disableRemotePlayback = true;
        const formatTime = (seconds) => {
          if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
          return `${minutes}:${remainingSeconds}`;
        };
        const updateTimeline = () => {
          const duration = Number.isFinite(video.duration) ? video.duration : 0;
          const currentTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
          seek.max = String(duration);
          seek.value = String(Math.min(currentTime, duration || 0));
          time.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        };
        const releaseVideo = (targetVideo) => {
          const targetWrap = targetVideo.closest('.aw-video-wrap');
          if (!targetVideo.paused) targetVideo.pause();
          targetVideo.removeAttribute('src');
          targetVideo.load();
          if (targetWrap) {
            targetWrap.dataset.revealed = 'false';
            targetWrap.dataset.loaded = 'false';
            targetWrap.dataset.loading = 'false';
            const targetStatus = targetWrap.querySelector('.aw-video-status');
            if (targetStatus) targetStatus.textContent = '';
            const targetSeek = targetWrap.querySelector('.aw-video-seek');
            const targetTime = targetWrap.querySelector('.aw-video-time');
            if (targetSeek) {
              targetSeek.max = '0';
              targetSeek.value = '0';
            }
            if (targetTime) targetTime.textContent = '0:00 / 0:00';
          }
        };
        revealButton.addEventListener('click', (event) => {
          if (videoWrap.dataset.loading === 'true') return;
          event.preventDefault();
          event.stopPropagation();
          root.querySelectorAll('.aw-video').forEach((otherVideo) => {
            if (otherVideo !== video && otherVideo.hasAttribute('src')) releaseVideo(otherVideo);
          });
          videoWrap.dataset.loading = 'true';
          videoStatus.textContent = 'Caricamento…';
          if (!video.hasAttribute('src')) {
            video.src = video.dataset.src;
          }
          video.play().catch(() => {
            videoWrap.dataset.loading = 'false';
            videoWrap.dataset.revealed = 'false';
            videoStatus.textContent = 'Tocca per riprovare';
          });
        });

        pauseButton.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!video.paused) video.pause();
        });

        video.addEventListener('click', () => {
          if (!video.paused) video.pause();
        });

        seek.addEventListener('input', (event) => {
          event.stopPropagation();
          if (Number.isFinite(video.duration)) video.currentTime = Number(seek.value);
          updateTimeline();
        });

        ['pointerdown', 'touchstart', 'click'].forEach((eventName) => {
          seek.addEventListener(eventName, (event) => event.stopPropagation());
        });

        video.addEventListener('loadedmetadata', updateTimeline);
        video.addEventListener('durationchange', updateTimeline);
        video.addEventListener('timeupdate', updateTimeline);

        video.addEventListener('play', () => {
          videoWrap.dataset.loading = 'false';
          videoWrap.dataset.loaded = 'true';
          videoWrap.dataset.revealed = 'true';
          videoStatus.textContent = '';
          root.classList.add('aw-video-active');
          updateTimeline();
        });

        video.addEventListener('error', () => {
          videoWrap.dataset.loading = 'false';
          videoWrap.dataset.loaded = 'false';
          videoWrap.dataset.revealed = 'false';
          videoStatus.textContent = 'Video non disponibile · riprova';
          root.classList.remove('aw-video-active');
          video.removeAttribute('src');
        });

        const blurPausedFrame = () => {
          videoWrap.dataset.revealed = 'false';
          root.classList.remove('aw-video-active');
        };
        video.addEventListener('pause', blurPausedFrame);
        video.addEventListener('ended', blurPausedFrame);
      }

      const action = card.querySelector('.aw-gold-action');
      action.addEventListener('click', () => {
        openOrder(product);
      });
      const cardOrder = card.querySelector('.aw-card-order');
      cardOrder.addEventListener('click', () => {
        openOrder(product);
      });
    });

    const cards = root.querySelectorAll('.aw-card');
    if ('IntersectionObserver' in window) {
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('aw-in-view', entry.isIntersecting);
          if (!entry.isIntersecting) {
            const video = entry.target.querySelector('.aw-video');
            const wrap = entry.target.querySelector('.aw-video-wrap');
            if (video && wrap && video.paused && video.hasAttribute('src')) {
              video.removeAttribute('src');
              video.load();
              wrap.dataset.loaded = 'false';
              wrap.dataset.loading = 'false';
              wrap.dataset.revealed = 'false';
            }
          }
        });
      }, { rootMargin: '120px 0px', threshold: .01 });
      cards.forEach((card) => cardObserver.observe(card));
    } else {
      cards.forEach((card) => card.classList.add('aw-in-view'));
    }

    const navLinks = root.querySelectorAll('.aw-nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const target = link.dataset.page;
        navLinks.forEach((l) => {
          const active = l === link;
          l.dataset.active = String(active);
          if (active) l.setAttribute('aria-current', 'page');
          else l.removeAttribute('aria-current');
        });
        root.querySelectorAll('.aw-page').forEach((page) => page.dataset.active = String(page.dataset.page === target));
        if (target !== 'vetrina') lockVideos(false);
      });
    });

    const lockVideos = (release = false) => {
      root.querySelectorAll('.aw-video').forEach((video) => {
        if (!video.paused) video.pause();
        if (release && video.hasAttribute('src')) {
          video.removeAttribute('controls');
          video.removeAttribute('src');
          video.load();
        }
      });
      root.querySelectorAll('.aw-video-wrap').forEach((wrap) => {
        wrap.dataset.revealed = 'false';
        wrap.dataset.loading = 'false';
        if (release) wrap.dataset.loaded = 'false';
      });
    };
    const setPrivacyShield = (active) => {
      root.classList.toggle('aw-privacy-active', active);
    };
    const concealAndPause = () => {
      lockVideos(false);
      setPrivacyShield(true);
    };
    const revealWhenActive = () => {
      if (!document.hidden) setPrivacyShield(false);
    };

    document.addEventListener('visibilitychange', () => {
      const hidden = document.hidden;
      if (hidden) concealAndPause();
      setPrivacyShield(hidden);
    });
    window.addEventListener('pagehide', () => {
      lockVideos(true);
      setPrivacyShield(true);
    });
    window.addEventListener('blur', concealAndPause);
    window.addEventListener('focus', revealWhenActive);
    window.addEventListener('pageshow', revealWhenActive);
    window.addEventListener('beforeprint', concealAndPause);
    window.addEventListener('afterprint', revealWhenActive);
    document.addEventListener('freeze', concealAndPause);
    ['contextmenu', 'dragstart', 'selectstart'].forEach((eventName) => {
      root.addEventListener(eventName, (event) => event.preventDefault());
    });

    const modal = root.querySelector('.aw-modal');
    const modalBox = root.querySelector('.aw-modal-box');
    const modalTitle = root.querySelector('.aw-modal-title');
    const modalQty = root.querySelector('.aw-modal-qty');
    const modalClose = root.querySelector('.aw-modal-close');
    const modalOrder = root.querySelector('.aw-order');
    let currentProduct = null;
    let selectedQty = null;
    let lastFocusedElement = null;

    const getSignalUrl = () => {
      try {
        const url = new URL(SIGNAL_URL);
        return url.protocol === 'https:' && url.hostname === 'signal.me' ? url : null;
      } catch {
        return null;
      }
    };

    const copyContactMessage = (message) => {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(message).then(() => true, () => false);
      }
      const field = document.createElement('textarea');
      field.value = message;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      field.setSelectionRange(0, field.value.length);
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { copied = false; }
      field.remove();
      return Promise.resolve(copied);
    };

    const openSignal = ({ message = null } = {}) => {
      const signalUrl = getSignalUrl();
      if (!signalUrl) {
        alert('Il contatto Signal non è disponibile.');
        return;
      }
      const navigate = () => window.location.assign(signalUrl.href);
      if (message !== null) copyContactMessage(message).then(() => alert('Messaggio copiato negli appunti')).finally(navigate);
      else navigate();
    };

    const openOrder = (product) => {
      lastFocusedElement = document.activeElement;
      currentProduct = product;
      selectedQty = null;
      modalTitle.textContent = product.title;
      modalQty.innerHTML = '';
      modalOrder.disabled = true;
      modalOrder.textContent = 'Seleziona un’opzione';
      product.quanti.forEach((qty) => {
        const btn = document.createElement('button');
        btn.className = 'aw-qty';
        btn.type = 'button';
        btn.innerHTML = `<span class="aw-qty-peso">${escapeHtml(qty.peso)}</span><span class="aw-qty-prezzo">${escapeHtml(qty.prezzo)}€</span>`;
        btn.addEventListener('click', () => {
          selectedQty = qty;
          modalQty.querySelectorAll('.aw-qty').forEach((b) => b.dataset.selected = 'false');
          btn.dataset.selected = 'true';
          modalOrder.disabled = false;
          modalOrder.textContent = 'Continua su Signal';
        });
        modalQty.appendChild(btn);
      });
      modal.dataset.active = 'true';
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('aw-modal-open');
      modalClose.focus();
    };

    const closeModal = () => {
      modal.dataset.active = 'false';
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('aw-modal-open');
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
    };

    modalClose.addEventListener('click', closeModal);
    root.querySelector('.aw-modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.dataset.active === 'true') closeModal();
    });

    modalOrder.addEventListener('click', () => {
      if (!currentProduct || !selectedQty) {
        alert('Seleziona prima una quantità.');
        return;
      }
      openSignal({ message: buildOrderMessage(currentProduct, selectedQty) });
    });

    const signalContact = root.querySelector('#aw-signal-contact');
    if (signalContact) signalContact.addEventListener('click', () => openSignal());
  })();
