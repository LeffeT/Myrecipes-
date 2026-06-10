console.log("Min Receptsamling — redesign loaded.");

let showcaseGallery = null;

document.addEventListener("DOMContentLoaded", () => {
  showcaseGallery = setupShowcaseGallery();
  setupLanguage();
  setupHeaderScroll();
  setupReveal();
});

/* ============================================================
   Header — solid border on scroll
   ============================================================ */
function setupHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ============================================================
   Reveal on scroll
   ============================================================ */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return; // leave everything visible
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  // Only hide + animate elements that start below the fold; everything
  // already on screen stays visible (safe for screenshots / print).
  const foldLine = window.innerHeight * 0.9;
  items.forEach((el) => {
    if (el.getBoundingClientRect().top > foldLine) {
      el.classList.add("pending");
      io.observe(el);
    }
  });
}

/* ============================================================
   Language
   ============================================================ */
function setupLanguage() {
  const translations = {
    sv: {
      htmlLang: "sv",
      brandName: "Min Receptsamling",
      pageTitle: "Min Receptsamling — Din personliga receptsamling",
      metaDescription:
        "Min Receptsamling är din personliga receptsamling — helt privat. Ingen inloggning, och ingen reklam. Alla recept sparas lokalt på din enhet.",
      navFeatures: "Fördelar",
      navAbout: "Om appen",
      navDownload: "Hämta appen",
      badgeSmall: "Ladda ned på",

      heroKicker: "Helt privat · Inget konto · Ingen reklam",
      heroTitle: "Din egen <em>receptsamling</em>",
      heroText:
        "Skriv, spara och laga dina favoriter direkt i mobilen. Allt stannar på din enhet och synkas privat via iCloud — utan konto, ingen reklam.",
      heroCtaSub: "Gratis · Köp inuti app",
      heroTagline: "Spara och organisera recept",
      bannerMeta: "Gratis · Köp inuti app",
      heroImageAlt: "Fem iPhones med appen Min Receptsamling i olika färgteman",

      promise1Title: "Ingen inloggning",
      promise1Text: "Öppna appen och börja laga direkt. Inga konton, inga lösenord.",
      promise2Title: "Ingen spårning",
      promise2Text: "Inga mätverktyg följer dig. Vad du lagar är din ensak.",
      promise3Title: "Ingen reklam",
      promise3Text: "Inga banners, inga popups. Bara dina recept, rena och tydliga.",

      featuresLabel: "Det som gör skillnad",
      featuresTitle: "Full kontroll över <em>dina</em> recept",
      featuresIntro:
        "Din data stannar hos dig. Recepten sparas på din enhet och kan synkas säkert med iCloud mellan dina enheter.",
      feature1Title: "Spara dina recept",
      feature1Point1: "Bygg upp din egen personliga receptsamling",
      feature1Point2: "Samla allt från vardagsmat till festmåltider",
      feature2Title: "Inga konton",
      feature2Point1: "Börja direkt – ingen registrering",
      feature2Point2: "Inget lösenord att hålla reda på",
      feature3Title: "Ingen reklam",
      feature3Point1: "Inga banners, inga popups",
      feature3Point2: "Fokus på matlagning, inte annonser",
      feature4Title: "Enkelt att dela recept",
      feature4Point1: "Dela recept med familj och vänner",
      feature4Point2: "Dela med sms eller mail",
      feature5Title: "Ingen datainsamling",
      feature5Point1: "Appen samlar inte in personlig data",
      feature5Point2: "Ingen information delas vidare till tredje part",
      feature6Title: "Synkas mellan dina enheter",
      feature6Point1: "Anpassad för iPhone och iPad",
      feature6Point2: "synkas via ditt eget iCloud-konto",

      aboutLabel: "Se appen",
      aboutTitle: "En titt i <em>köket</em>",
      aboutText:
        "Bläddra igenom några vyer och få en känsla för hur Min Receptsamling håller recepten tydliga, inspirerande och nära till hands.",

      showcaseTrackLabel: "Skärmbilder från appen Min Receptsamling",
      showcasePrev: "Föregående skärmbild",
      showcaseNext: "Nästa skärmbild",
      showcaseClose: "Stäng bild",
      showcaseOpen: "Öppna skärmbild",

      downloadLabel: "Redo att börja?",
      downloadTitle: "Ladda ner Min Receptsamling",
      downloadText:
        "Hämta appen och kom igång direkt — utan konto.",
      downloadBtn: "Öppna App Store",
      downloadBtnAria: "Ladda ner Min Receptsamling på App Store",
      downloadQrAria: "Öppna Min Receptsamling i App Store",
      downloadQrAlt: "QR-kod till Min Receptsamling på App Store",
      downloadQrTitle: "Skanna QR-koden",
      downloadQrText: "Öppna kameran för att gå direkt till appen.",

      footerText: "© 2026 Min Receptsamling. Alla rättigheter förbehållna."
    },

    en: {
      htmlLang: "en",
      brandName: "My Recipe Collection App",
      pageTitle: "My Recipe Collection App — Your personal recipe collection",
      metaDescription:
        "My Recipe Collection App is your personal recipe collection — completely private. No login and no ads. All recipes are stored locally on your device.",
      navFeatures: "Benefits",
      navAbout: "About the app",
      navDownload: "Get the app",
      badgeSmall: "Download on the",

      heroKicker: "Completely private · No account · No ads",
      heroTitle: "Your own <em>recipe collection</em>",
      heroText:
        "Write, save, and cook your favorites right on your phone. Everything stays on your device and syncs privately through iCloud — no account and no ads.",
      heroCtaSub: "Free · In-app purchases",
      heroTagline: "Save and organise recipes",
      bannerMeta: "Free · In-app purchases",
      heroImageAlt: "Five iPhones showing My Recipe Collection App in different color themes",

      promise1Title: "No login",
      promise1Text: "Open the app and start cooking. No accounts, no passwords.",
      promise2Title: "No tracking",
      promise2Text: "No analytics follow you around. What you cook is your business.",
      promise3Title: "No ads",
      promise3Text: "No banners, no pop-ups. Just your recipes, clean and clear.",

      featuresLabel: "What stands out",
      featuresTitle: "Full control over <em>your</em> recipes",
      featuresIntro:
        "Your data stays with you. Recipes are stored on your device and can be securely synced with iCloud across your devices.",
      feature1Title: "Save your recipes",
      feature1Point1: "Build your own personal recipe collection",
      feature1Point2: "Gather everything from everyday meals to feasts",
      feature2Title: "No accounts",
      feature2Point1: "Get started right away – no sign-up required",
      feature2Point2: "No password to remember",
      feature3Title: "No ads",
      feature3Point1: "No banners, no pop-ups",
      feature3Point2: "Focus on cooking, not advertising",
      feature4Title: "Easy to share recipes",
      feature4Point1: "Share recipes with family and friends",
      feature4Point2: "Share by text message or email",
      feature5Title: "No data collection",
      feature5Point1: "The app does not collect personal data",
      feature5Point2: "No information is shared with third parties",
      feature6Title: "Sync across your devices",
      feature6Point1: "Designed for iPhone and iPad",
      feature6Point2: "Synced through your own iCloud account",

      aboutLabel: "See the app",
      aboutTitle: "A look <em>inside</em>",
      aboutText:
        "Browse a few views and get a feel for how My Recipe Collection App keeps your recipes clear, inspiring, and close at hand.",

      showcaseTrackLabel: "Screenshots from My Recipe Collection App",
      showcasePrev: "Previous screenshot",
      showcaseNext: "Next screenshot",
      showcaseClose: "Close image",
      showcaseOpen: "Open screenshot",

      downloadLabel: "Ready to start?",
      downloadTitle: "Download My Recipe Collection App",
      downloadText:
        "Get the app and start right away — without an account.",
      downloadBtn: "Open App Store",
      downloadBtnAria: "Download My Recipe Collection App on the App Store",
      downloadQrAria: "Open My Recipe Collection App on the App Store",
      downloadQrAlt: "QR code for My Recipe Collection App on the App Store",
      downloadQrTitle: "Scan the QR code",
      downloadQrText: "Open your phone camera to go straight to the app.",

      footerText: "© 2026 My Recipe Collection App. All rights reserved."
    }
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  const savedLanguage = localStorage.getItem("preferredLanguage");
  const browserLanguage = (navigator.language || "sv").toLowerCase();
  const initialLanguage =
    savedLanguage || (browserLanguage.startsWith("sv") ? "sv" : "en");

  function setLanguage(lang) {
    const selected = translations[lang] ? lang : "sv";
    const content = translations[selected];

    document.documentElement.lang = content.htmlLang;
    document.title = content.pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", content.metaDescription);

    // Plain text nodes (skip ones rendered as HTML)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (el.hasAttribute("data-i18n-html")) return;
      const key = el.getAttribute("data-i18n");
      if (content[key] != null) el.textContent = content[key];
    });

    // Rich text nodes (may contain <em>)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (content[key] != null) el.innerHTML = content[key];
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (content[key]) el.setAttribute("aria-label", content[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (content[key]) el.setAttribute("alt", content[key]);
    });

    document.querySelectorAll("img[data-img-sv][data-img-en]").forEach((img) => {
      const newSrc = selected === "en" ? img.dataset.imgEn : img.dataset.imgSv;
      if (newSrc && img.getAttribute("src") !== newSrc) img.setAttribute("src", newSrc);
    });

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === selected;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    showcaseGallery?.updateLanguage(selected, content);
    localStorage.setItem("preferredLanguage", selected);
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  setLanguage(initialLanguage);
}

/* ============================================================
   Showcase gallery (drag / swipe / lightbox)
   ============================================================ */
function setupShowcaseGallery() {
  const track = document.getElementById("showcaseTrack");
  const prevButton = document.querySelector("[data-showcase-prev]");
  const nextButton = document.querySelector("[data-showcase-next]");
  const lightbox = document.getElementById("showcaseLightbox");
  const lightboxImage = document.getElementById("showcaseLightboxImage");
  const closeTriggers = document.querySelectorAll("[data-showcase-close]");

  if (!track || !lightbox || !lightboxImage) return null;

  const showcaseItems = [
    { sv: "01_sv.jpg", en: "01_en.jpg" },
    { sv: "02_sv.jpg", en: "02_en.jpg" },
    { sv: "03_sv.jpg", en: "03_en.jpg" },
    { sv: "04_sv.jpg", en: "04_en.jpg" },
    { sv: "05_sv.jpg", en: "05_en.jpg" },
    { sv: "06_sv.jpg", en: "06_en.jpg" },
    { sv: "07_sv.jpg", en: "07_en.jpg" },
    { sv: "08_sv.jpg", en: "08_en.jpg" },
    { sv: "09_sv.jpg", en: "09_en.jpg" },
    { sv: "10_sv.jpg", en: "10_en.jpg" }
  ];

  const itemCount = showcaseItems.length;
  const LOOP_COPIES = 3;
  const resolvedSrcByItem = showcaseItems.map((item) => item.sv);
  let activeItem = 0;
  track.innerHTML = "";

  for (let copy = 0; copy < LOOP_COPIES; copy++) {
    showcaseItems.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "showcase-card";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "showcase-card-button";
      button.dataset.itemIndex = String(index);
      button.dataset.copy = String(copy);

      const image = document.createElement("img");
      image.className = "showcase-card-image";
      image.src = item.sv;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      image.draggable = false;
      image.addEventListener("error", () => { image.style.visibility = "hidden"; });
      image.addEventListener("load", () => { image.style.visibility = "visible"; });

      button.appendChild(image);
      card.appendChild(button);
      track.appendChild(card);
    });
  }

  const cardButtons = Array.from(track.querySelectorAll(".showcase-card-button"));

  let isTrackingPointer = false;
  let isDraggingTrack = false;
  let ignoreClickUntil = 0;
  let activeDragSource = null;
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartScrollLeft = 0;

  function getTrackGap() {
    const styles = window.getComputedStyle(track);
    return parseInt(styles.columnGap || styles.gap || "0", 10);
  }
  function getCardStep() {
    const firstCard = track.querySelector(".showcase-card");
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + getTrackGap();
  }
  function clampIndex(index) {
    return Math.max(0, Math.min(index, cardButtons.length - 1));
  }
  function updateNavButtons() {}
  function trackSetWidth() {
    return getCardStep() * itemCount;
  }
  function centeredCardIndex() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    const cards = track.children;
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i];
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    return best;
  }
  function centerOnCardEl(card, behavior) {
    if (!card) return;
    const left = card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: behavior || "auto" });
  }
  function maybeLoop() {
    const sw = trackSetWidth();
    if (!sw) return;
    const idx = centeredCardIndex();
    let shift = 0;
    if (idx < itemCount) shift = sw;
    else if (idx >= itemCount * 2) shift = -sw;
    if (shift) {
      const prev = track.style.scrollBehavior;
      track.style.scrollBehavior = "auto";
      track.scrollLeft += shift;
      track.style.scrollBehavior = prev;
      if (isTrackingPointer) dragStartScrollLeft += shift;
    }
  }
  let loopTimer = null;
  function scheduleLoop() {
    if (loopTimer) clearTimeout(loopTimer);
    loopTimer = setTimeout(maybeLoop, 90);
  }
  function finishTrackDrag() {
    if (!isTrackingPointer) return;
    const wasDragging = isDraggingTrack;
    isTrackingPointer = false;
    isDraggingTrack = false;
    activeDragSource = null;
    activePointerId = null;
    track.classList.remove("dragging");
    if (wasDragging) {
      ignoreClickUntil = Date.now() + 450;
      scheduleLoop();
    }
  }
  function cancelTrackDrag() {
    isTrackingPointer = false;
    isDraggingTrack = false;
    activeDragSource = null;
    activePointerId = null;
    track.classList.remove("dragging");
  }
  function beginTrackDrag(clientX, clientY, source, pointerId = null) {
    if (lightbox.open) return;
    isTrackingPointer = true;
    isDraggingTrack = false;
    activeDragSource = source;
    activePointerId = pointerId;
    dragStartX = clientX;
    dragStartY = clientY;
    dragStartScrollLeft = track.scrollLeft;
  }
  function moveTrackDragTo(clientX, clientY, event) {
    if (!isTrackingPointer) return;
    const diffX = clientX - dragStartX;
    const diffY = clientY - dragStartY;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    if (!isDraggingTrack) {
      if (absX < 8 && absY < 8) return;
      if (absY > absX) { cancelTrackDrag(); return; }
      isDraggingTrack = true;
      ignoreClickUntil = Date.now() + 450;
      track.classList.add("dragging");
      if (activeDragSource === "pointer" && activePointerId !== null) {
        track.setPointerCapture?.(activePointerId);
      }
    }
    if (event.cancelable) event.preventDefault();
    track.scrollLeft = dragStartScrollLeft - diffX;
    maybeLoop();
  }
  function startTrackDrag(event) {
    if (event.button !== undefined && event.button !== 0) return;
    beginTrackDrag(event.clientX, event.clientY, "pointer", event.pointerId);
  }
  function moveTrackDrag(event) {
    if (activeDragSource !== "pointer" || event.pointerId !== activePointerId) return;
    moveTrackDragTo(event.clientX, event.clientY, event);
  }
  function startTrackTouch(event) {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    beginTrackDrag(touch.clientX, touch.clientY, "touch");
  }
  function moveTrackTouch(event) {
    if (activeDragSource !== "touch" || event.touches.length !== 1) return;
    const touch = event.touches[0];
    moveTrackDragTo(touch.clientX, touch.clientY, event);
  }

  function applyItemSrc(index, src) {
    resolvedSrcByItem[index] = src;
    cardButtons.forEach((button) => {
      if (Number(button.dataset.itemIndex) !== index) return;
      const image = button.querySelector(".showcase-card-image");
      if (image) image.src = src;
    });
    if (lightbox.open && activeItem === index) lightboxImage.src = src;
  }
  function loadShowcaseImage(index, lang) {
    const item = showcaseItems[index];
    if (!item) return;
    const preferredSrc = lang === "en" ? item.en : item.sv;
    const fallbackSrc = item.sv;
    if (preferredSrc === fallbackSrc) { applyItemSrc(index, fallbackSrc); return; }
    const probe = new Image();
    probe.onload = () => applyItemSrc(index, preferredSrc);
    probe.onerror = () => applyItemSrc(index, fallbackSrc);
    probe.src = preferredSrc;
  }

  function openLightbox(index) {
    const nextIndex = Math.max(0, Math.min(index, itemCount - 1));
    activeItem = nextIndex;
    lightboxImage.src = resolvedSrcByItem[nextIndex] || showcaseItems[nextIndex].sv;
    if (!lightbox.open) {
      if (typeof lightbox.showModal === "function") lightbox.showModal();
      else lightbox.setAttribute("open", "");
    }
    document.body.classList.add("showcase-modal-open");
    lightbox.querySelector(".showcase-lightbox-close")?.focus();
  }
  function closeLightbox() {
    if (!lightbox.open) return;
    if (typeof lightbox.close === "function") lightbox.close();
    else lightbox.removeAttribute("open");
  }
  function stepLightbox(direction) {
    if (!lightbox.open) return;
    activeItem = (activeItem + direction + itemCount) % itemCount;
    lightboxImage.src = resolvedSrcByItem[activeItem] || showcaseItems[activeItem].sv;
    centerOnCardEl(track.children[activeItem + itemCount], "smooth");
  }

  prevButton?.addEventListener("click", () => {
    const step = getCardStep();
    if (step) track.scrollBy({ left: -step, behavior: "smooth" });
    scheduleLoop();
  });
  nextButton?.addEventListener("click", () => {
    const step = getCardStep();
    if (step) track.scrollBy({ left: step, behavior: "smooth" });
    scheduleLoop();
  });

  cardButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (Date.now() < ignoreClickUntil) { event.preventDefault(); return; }
      openLightbox(Number(button.dataset.itemIndex));
    });
  });

  closeTriggers.forEach((trigger) => trigger.addEventListener("click", closeLightbox));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  track.addEventListener("scroll", scheduleLoop, { passive: true });
  track.addEventListener("pointerdown", startTrackDrag);
  track.addEventListener("pointermove", moveTrackDrag);
  track.addEventListener("pointerup", finishTrackDrag);
  track.addEventListener("pointercancel", cancelTrackDrag);
  track.addEventListener("lostpointercapture", finishTrackDrag);
  track.addEventListener("touchstart", startTrackTouch, { passive: true });
  track.addEventListener("touchmove", moveTrackTouch, { passive: false });
  track.addEventListener("touchend", finishTrackDrag, { passive: true });
  track.addEventListener("touchcancel", cancelTrackDrag, { passive: true });
  window.addEventListener("resize", () => {
    centerOnCardEl(track.children[centeredCardIndex()], "instant");
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("showcase-modal-open");
    lightboxImage.removeAttribute("src");
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "Escape") closeLightbox();
    else if (event.key === "ArrowRight") stepLightbox(1);
    else if (event.key === "ArrowLeft") stepLightbox(-1);
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    centerOnCardEl(track.children[itemCount], "instant");
  }));

  return {
    updateLanguage(lang, content) {
      cardButtons.forEach((button) => {
        const index = Number(button.dataset.itemIndex);
        button.setAttribute("aria-label", `${content.showcaseOpen} ${index + 1}`);
      });
      for (let i = 0; i < itemCount; i++) loadShowcaseImage(i, lang);
      prevButton?.setAttribute("aria-label", content.showcasePrev);
      nextButton?.setAttribute("aria-label", content.showcaseNext);
      lightbox
        .querySelector(".showcase-lightbox-close")
        ?.setAttribute("aria-label", content.showcaseClose);
    }
  };
}
