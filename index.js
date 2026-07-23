document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');

  if (nav) {
    nav.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    const handleScroll = () => {
      // Hide nav at top (<= 20px), show when scrolled down
      if (window.scrollY <= 20) {
        nav.style.opacity = '0';
        nav.style.transform = 'translateY(-100%)';
        nav.style.pointerEvents = 'none';
      } else {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
        nav.style.pointerEvents = 'auto';
      }
    };

    handleScroll();
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
  }

  // Function to handle scrolling to a target element or position
  const scrollToSection = (targetSelector) => {
    if (targetSelector === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Map button text content to corresponding element IDs
  const sectionMap = {
    about: '#about',
    lessons: '#lessons',
    contact: '#contact',
  };

  // Find all navigation/footer buttons and attach scroll events
  const allButtons = document.querySelectorAll('button');

  allButtons.forEach((button) => {
    const text = button.textContent.trim().toLowerCase();

    // Check for navigation links (About, Lessons, Contact)
    if (sectionMap[text]) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(sectionMap[text]);
      });
    }

    // Check for Logo/Brand button at top (Scrolls to top)
    if (button.querySelector('span')?.textContent.trim() === 'Eric Ho') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('top');
      });
    }

    // Check for Hero "Scroll down" button
    if (button.getAttribute('aria-label') === 'Scroll down') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('#about');
      });
    }
  });
});
