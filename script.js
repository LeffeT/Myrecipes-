console.log("Mina Recept landing page loaded.");

const aboutSlider = document.getElementById("aboutSlider");
const aboutDots = document.querySelectorAll(".about-dot");

if (aboutSlider && aboutDots.length) {
  const slides = document.querySelectorAll(".about-slide");
  let currentIndex = 0;
  let autoSlide = null;
  let isInteracting = false;

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let dragMoved = false;

  function updateDots(index) {
    aboutDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function getGap() {
    const styles = window.getComputedStyle(aboutSlider);
    return parseInt(styles.gap || styles.columnGap || 0, 10);
  }

  function getSlideWidth() {
    return slides[0].offsetWidth + getGap();
  }

  function goToSlide(index) {
    const slideWidth = getSlideWidth();

    aboutSlider.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });

    currentIndex = index;
    updateDots(currentIndex);
  }

  function snapToNearestSlide() {
    const slideWidth = getSlideWidth();
    const index = Math.round(aboutSlider.scrollLeft / slideWidth);
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    goToSlide(currentIndex);
  }

  function updateCurrentSlideFromScroll() {
    const slideWidth = getSlideWidth();
    const index = Math.round(aboutSlider.scrollLeft / slideWidth);

    if (index >= 0 && index < slides.length) {
      currentIndex = index;
      updateDots(currentIndex);
    }
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(() => {
      if (isInteracting || isDragging) return;

      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, 3500);
  }

  aboutDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      isInteracting = true;
      stopAutoSlide();
      goToSlide(index);

      setTimeout(() => {
        isInteracting = false;
        startAutoSlide();
      }, 4000);
    });
  });

  aboutSlider.addEventListener("touchstart", () => {
    isInteracting = true;
    stopAutoSlide();
  }, { passive: true });

  aboutSlider.addEventListener("touchend", () => {
    snapToNearestSlide();

    setTimeout(() => {
      isInteracting = false;
      startAutoSlide();
    }, 4000);
  });

  aboutSlider.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragMoved = false;
    isInteracting = true;
    stopAutoSlide();

    aboutSlider.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = aboutSlider.scrollLeft;
  });

  aboutSlider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    e.preventDefault();
    dragMoved = true;

    const x = e.pageX;
    const walk = x - startX;
    aboutSlider.scrollLeft = startScrollLeft - walk;
  });

  aboutSlider.addEventListener("mouseleave", () => {
    if (!isDragging) return;

    isDragging = false;
    aboutSlider.classList.remove("dragging");
    snapToNearestSlide();

    setTimeout(() => {
      isInteracting = false;
      startAutoSlide();
    }, 4000);
  });

  aboutSlider.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    aboutSlider.classList.remove("dragging");
    snapToNearestSlide();

    setTimeout(() => {
      isInteracting = false;
      startAutoSlide();
    }, 4000);
  });

  aboutSlider.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  aboutSlider.addEventListener("scroll", () => {
    updateCurrentSlideFromScroll();
  });

  window.addEventListener("resize", () => {
    goToSlide(currentIndex);
  });

  updateDots(currentIndex);
  startAutoSlide();
}
