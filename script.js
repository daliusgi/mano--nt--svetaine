const motivationPhrases = [
  "„Kiekvienas namas turi sielą, o tavo – jau tavęs laukia.“",
  "„Namai – tai vieta, kur rytais kvepia kava ir ramybe.“",
  "„Didžiausios svajonės prasideda nuo savo kampelio.“",
  "„Investicija į namus – investicija į save.“",
  "„Gerus sprendimus paprastai atpažįsti iš jausmo: čia – mano vieta.“",
];

const avatarIntros = {
  available:
    "Sveiki! Aš Benas. Šis objektas dar laisvas! Pažiūrėkime kartu:"
  sold:"Sveiki, čia Benas. Šis objektas jau parduotas, bet turiu jums panašių pasiūlymų:",
};

document.addEventListener("DOMContentLoaded", () => {
  const scrollToListingsBtn = document.getElementById("scrollToListings");
  const listingsSection = document.getElementById("listings");
  const randomMotivationBtn = document.getElementById("randomMotivation");
  const motivationBubble = document.getElementById("motivationBubble");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const propertyCards = document.querySelectorAll(".property-card");
  const avatarText = document.getElementById("avatarText");
  const moodToggle = document.getElementById("moodToggle");
  const hero = document.querySelector(".hero-content");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (scrollToListingsBtn && listingsSection) {
    scrollToListingsBtn.addEventListener("click", () => {
      listingsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (randomMotivationBtn && motivationBubble) {
    randomMotivationBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
      motivationBubble.classList.add("fade-out");
      setTimeout(() => {
        motivationBubble.textContent = motivationPhrases[randomIndex];
        motivationBubble.classList.remove("fade-out");
      }, 180);
    });
  }

  if (filterButtons.length && propertyCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        propertyCards.forEach((card) => {
          const status = card.dataset.status;
          if (filter === "all") {
            card.style.display = "";
          } else if (filter === "available") {
            card.style.display = status === "available" ? "" : "none";
          } else if (filter === "sold") {
            card.style.display = status === "sold" ? "" : "none";
          }
        });
      });
    });
  }

  let currentActiveCard = null;

  const updateAvatarForCard = (card) => {
    if (!card || !avatarText) return;

    // Pridedame video valdymą
    const video = document.querySelector('video');
    if (video) {
        video.currentTime = 0; // Kiekvieną kartą atsukame į pradžią
        video.play();          // Paleidžiame Beną kalbėti iš naujo
    }

    const title = card.dataset.title || "NT objektas";
    const price = card.dataset.price || "";
    const desc = card.dataset.description || "";
    const status = card.dataset.status;

    const intro = avatarIntros[status] || "Štai ką turiu tau parodyti:";

    avatarText.textContent = `${intro} ${title} už ${price}. ${desc}`;
};

  if (propertyCards.length) {
    propertyCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (currentActiveCard) {
          currentActiveCard.classList.remove("active");
        }
        currentActiveCard = card;
        card.classList.add("active");
        updateAvatarForCard(card);

        propertyCards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.add("dimmed");
          } else {
            otherCard.classList.remove("dimmed");
          }
        });
      });

      card.addEventListener("mouseenter", () => {
        if (!currentActiveCard) {
          updateAvatarForCard(card);
        }
      });

      if (index === 0) {
        currentActiveCard = card;
        card.classList.add("active");
        updateAvatarForCard(card);
      }
    });
  }

  if (moodToggle && hero) {
    let isSunny = true;
    moodToggle.addEventListener("click", () => {
      isSunny = !isSunny;
      if (isSunny) {
        moodToggle.textContent = "☀️";
        document.body.style.background =
          "radial-gradient(circle at top left, #1f2937 0, #020617 48%, #000 100%)";
        hero.classList.remove("hero-mood-bright");
      } else {
        moodToggle.textContent = "🌙";
        document.body.style.background =
          "radial-gradient(circle at top left, #0b1120 0, #020617 40%, #020617 100%)";
        hero.classList.add("hero-mood-bright");
      }
    });
  }
});

