const state = {
  deck: null,
  currentIndex: 0,
  audienceMode: false,
  notesVisible: true
};

const elements = {
  body: document.body,
  deckTitle: document.getElementById("deckTitle"),
  deckSubtitle: document.getElementById("deckSubtitle"),
  clientName: document.getElementById("clientName"),
  deckMeta: document.getElementById("deckMeta"),
  slideList: document.getElementById("slideList"),
  slideKicker: document.getElementById("slideKicker"),
  slideIndex: document.getElementById("slideIndex"),
  slideTitle: document.getElementById("slideTitle"),
  slideTag: document.getElementById("slideTag"),
  slideSummary: document.getElementById("slideSummary"),
  slideBullets: document.getElementById("slideBullets"),
  slideEvidence: document.getElementById("slideEvidence"),
  slideSources: document.getElementById("slideSources"),
  slideCta: document.getElementById("slideCta"),
  speakerNotes: document.getElementById("speakerNotes"),
  notesPanel: document.getElementById("notesPanel"),
  progressBar: document.getElementById("progressBar"),
  prevButton: document.getElementById("prevButton"),
  nextButton: document.getElementById("nextButton"),
  modeToggle: document.getElementById("modeToggle"),
  notesToggle: document.getElementById("notesToggle"),
  fullscreenToggle: document.getElementById("fullscreenToggle")
};

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (typeof textContent === "string") {
    element.textContent = textContent;
  }
  return element;
}

function renderSlideList() {
  elements.slideList.innerHTML = "";

  state.deck.slides.forEach((slide, index) => {
    const button = createElement("button", "slide-list__button", "");
    button.type = "button";
    button.classList.toggle("is-active", index === state.currentIndex);
    button.addEventListener("click", () => {
      state.currentIndex = index;
      render();
    });

    button.appendChild(createElement("span", "slide-list__index", String(index + 1)));
    button.appendChild(createElement("p", "slide-list__title", slide.title));
    button.appendChild(createElement("p", "slide-list__summary", slide.summary || ""));
    elements.slideList.appendChild(button);
  });
}

function renderCollection(container, items, className, renderItem) {
  container.innerHTML = "";
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  items.forEach((item) => {
    container.appendChild(renderItem(item, className));
  });
}

function render() {
  const slide = state.deck.slides[state.currentIndex];
  const totalSlides = state.deck.slides.length;

  elements.deckTitle.textContent = state.deck.deck.title;
  elements.deckSubtitle.textContent = state.deck.deck.subtitle || "";
  elements.clientName.textContent = state.deck.deck.clientName || "";
  elements.deckMeta.textContent = [
    state.deck.deck.lastUpdated ? `Updated ${state.deck.deck.lastUpdated}` : "",
    state.deck.deck.presenter ? `Presenter: ${state.deck.deck.presenter}` : ""
  ]
    .filter(Boolean)
    .join(" | ");

  elements.slideKicker.textContent = slide.kicker || "";
  elements.slideIndex.textContent = `Slide ${state.currentIndex + 1} / ${totalSlides}`;
  elements.slideTitle.textContent = slide.title;
  elements.slideTag.textContent = slide.tag || "";
  elements.slideSummary.textContent = slide.summary || "";
  elements.slideCta.textContent = slide.cta || "Lead the room to the next decision.";
  elements.speakerNotes.textContent = slide.speakerNotes || "Add speaker notes for this slide.";

  renderCollection(elements.slideBullets, slide.bullets, "chip", (item, cssClass) =>
    createElement("div", cssClass, item)
  );

  renderCollection(elements.slideEvidence, slide.evidence, "evidence-card", (item, cssClass) => {
    const card = createElement("article", cssClass, "");
    card.appendChild(createElement("h3", "", item.heading || "Evidence"));
    card.appendChild(createElement("p", "", item.detail || ""));
    return card;
  });

  renderCollection(elements.slideSources, slide.sources, "source-pill", (item, cssClass) =>
    createElement("span", cssClass, item)
  );

  elements.progressBar.style.width = `${((state.currentIndex + 1) / totalSlides) * 100}%`;
  elements.notesPanel.style.display = state.notesVisible && !state.audienceMode ? "block" : "none";
  elements.body.classList.toggle("is-audience-mode", state.audienceMode);

  renderSlideList();
}

function moveSlide(direction) {
  const nextIndex = state.currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= state.deck.slides.length) {
    return;
  }

  state.currentIndex = nextIndex;
  render();
}

async function loadDeck() {
  const response = await fetch("./content/slides.json");
  state.deck = await response.json();
  document.title = state.deck.deck.title || "Strategy Presentation";
  render();
}

elements.prevButton.addEventListener("click", () => moveSlide(-1));
elements.nextButton.addEventListener("click", () => moveSlide(1));
elements.notesToggle.addEventListener("click", () => {
  state.notesVisible = !state.notesVisible;
  render();
});
elements.modeToggle.addEventListener("click", () => {
  state.audienceMode = !state.audienceMode;
  elements.modeToggle.textContent = state.audienceMode ? "Presenter mode" : "Audience mode";
  render();
});
elements.fullscreenToggle.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    moveSlide(1);
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    moveSlide(-1);
  }

  if (event.key.toLowerCase() === "f") {
    elements.fullscreenToggle.click();
  }
});

loadDeck().catch((error) => {
  console.error(error);
  elements.slideTitle.textContent = "Unable to load presentation deck";
  elements.slideSummary.textContent = "Check apps/presentation/content/slides.json";
});
