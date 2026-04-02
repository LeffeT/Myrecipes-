console.log("Mina Recept landing page loaded.");

const aboutSlider = document.getElementById("aboutSlider");
const aboutDots = document.querySelectorAll(".about-dot");

if (aboutSlider && aboutDots.length) {
  const slides = document.querySelectorAll(".about-slide");

  let currentIndex = 0;
  let autoSlide = null;
  let restartTimer = null;

  let isMouseDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let hasDragged = false;

  function getGap() {
    const styles = window.getComputedStyle(aboutSlider);
    return parseInt(styles.gap || styles.columnGap || 0, 10);
  }

  function getSlideWidth() {
    return slides[0].offsetWidth + getGap();
  }

  function updateDots(index) {
    aboutDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function goToSlide(index, behavior = "smooth") {
    const slideWidth = getSlideWidth();
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));

    aboutSlider.scrollTo({
      left: currentIndex * slideWidth,
      behavior
    });

    updateDots(currentIndex);
  }

  function getNearestIndex() {
    const slideWidth = getSlideWidth();
    return Math.round(aboutSlider.scrollLeft / slideWidth);
  }

  function syncIndexFromScroll() {
    const index = Math.max(0, Math.min(getNearestIndex(), slides.length - 1));
    if (index !== currentIndex) {
      currentIndex = index;
      updateDots(currentIndex);
    }
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
  }

  function scheduleAutoRestart() {
    if (restartTimer) {
      clearTimeout(restartTimer);
    }

    restartTimer = setTimeout(() => {
      startAutoSlide();
    }, 4000);
  }

  function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      goToSlide(nextIndex, "smooth");
    }, 3500);
  }

  aboutDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index, "smooth");
      scheduleAutoRestart();
    });
  });

  aboutSlider.addEventListener(
    "touchstart",
    () => {
      stopAutoSlide();
    },
    { passive: true }
  );

  aboutSlider.addEventListener(
    "touchend",
    () => {
      syncIndexFromScroll();
      scheduleAutoRestart();
    },
    { passive: true }
  );

  aboutSlider.addEventListener("scroll", () => {
    syncIndexFromScroll();
  });

  aboutSlider.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    hasDragged = false;
    startX = e.pageX;
    startScrollLeft = aboutSlider.scrollLeft;
    aboutSlider.classList.add("dragging");
    stopAutoSlide();
  });

  aboutSlider.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;

    const moveX = e.pageX - startX;
    if (Math.abs(moveX) > 5) {
      hasDragged = true;
    }

    aboutSlider.scrollLeft = startScrollLeft - moveX;
  });

  function endMouseDrag() {
    if (!isMouseDown) return;

    isMouseDown = false;
    aboutSlider.classList.remove("dragging");

    const nearest = Math.max(0, Math.min(getNearestIndex(), slides.length - 1));
    goToSlide(nearest, "smooth");
    scheduleAutoRestart();
  }

  aboutSlider.addEventListener("mouseup", endMouseDrag);
  aboutSlider.addEventListener("mouseleave", endMouseDrag);

  aboutSlider.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  window.addEventListener("resize", () => {
    goToSlide(currentIndex, "auto");
  });

  updateDots(currentIndex);
  goToSlide(0, "auto");
  startAutoSlide();
}
