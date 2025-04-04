// Menu show and hidden
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// MENU SHOW
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// MENU HIDDEN
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Remove Menu Mobile
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Change background header
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 80) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});


document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact__form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      if (!validateForm()) {
        return;
      }

      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = "Sending...";
      submitButton.disabled = true;

      // Get form data
      const formData = new FormData(this);

      // Replace this with your actual endpoint
      fetch("your-server-endpoint.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          showNotification("Message sent successfully!", "success");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          showNotification(
            "There was a problem sending your message. Please try again.",
            "error"
          );
        })
        .finally(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }

  // Close notification buttons
  document.querySelectorAll(".notification__close").forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.classList.remove("show");
    });
  });

  function validateForm() {
    const name = document.querySelector('[name="name"]').value.trim();
    const email = document.querySelector('[name="email"]').value.trim();
    const message = document.querySelector('[name="message"]').value.trim();
    let isValid = true;

    // Reset error states
    document.querySelectorAll(".contact__form-input").forEach((input) => {
      input.classList.remove("error");
    });

    if (!name) {
      document.querySelector('[name="name"]').classList.add("error");
      showNotification("Please enter your name", "error");
      isValid = false;
    }

    if (!email) {
      document.querySelector('[name="email"]').classList.add("error");
      showNotification("Please enter your email", "error");
      isValid = false;
    } else if (!validateEmail(email)) {
      document.querySelector('[name="email"]').classList.add("error");
      showNotification("Please enter a valid email", "error");
      isValid = false;
    }

    if (!message) {
      document.querySelector('[name="message"]').classList.add("error");
      showNotification("Please enter your message", "error");
      isValid = false;
    }

    return isValid;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showNotification(message, type) {
    const notification = document.querySelector(`.notification--${type}`);
    const messageElement = notification.querySelector(".notification__message");

    messageElement.textContent = message;
    notification.classList.add("show");

    // Auto-hide after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);
  }
});