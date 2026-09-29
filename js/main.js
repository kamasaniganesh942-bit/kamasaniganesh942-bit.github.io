/**
 * ==============================================================================
 * PERSONAL PORTFOLIO JAVASCRIPT - K GANESH
 * ==============================================================================
 * Clean, modular, and beginner-friendly vanilla JavaScript logic.
 * Handles:
 *  - Theme switching (Light / Dark mode) with persistence
 *  - Dynamic typewriter effect in Hero
 *  - Interactive Terminal tabs & simulated code execution
 *  - Mobile navigation drawer toggle
 *  - Header styling on scroll & Scrollspy active links
 *  - IntersectionObserver scroll reveal animations
 *  - Interactive Skills & Projects category filtering
 *  - In-Page Project Details Modal preview
 *  - Contact form real-time validation, loading spinner & toast alerts
 *  - Quick 1-click email copy to clipboard
 *  - Floating back-to-top button
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all portfolio modules
  initTheme();
  initTypewriter();
  initInteractiveTerminal();
  initMobileNav();
  initHeaderAndScrollspy();
  initScrollReveal();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  updateCopyrightYear();
});

/* ==============================================================================
   1. THEME SWITCHER (Light / Dark Mode)
   ============================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

/* ==============================================================================
   2. DYNAMIC TYPEWRITER EFFECT
   ============================================================================== */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const roles = [
    'First-Year B.Tech Student',
    'AI & Emerging Tech Enthusiast',
    'Python & Web Developer',
    'Aspiring Technology Builder',
    'Curious Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseAfterComplete = 1800;
  const pauseBeforeDelete = 400;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      typewriterElement.textContent = currentRole.substring(0, charIndex);
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      currentSpeed = pauseAfterComplete;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = pauseBeforeDelete;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* ==============================================================================
   3. INTERACTIVE TERMINAL (Tabs & Code Execution)
   ============================================================================== */
function initInteractiveTerminal() {
  const tabButtons = document.querySelectorAll('.terminal-tab');
  const panes = {
    profile: document.getElementById('term-pane-profile'),
    skills: document.getElementById('term-pane-skills'),
    goals: document.getElementById('term-pane-goals')
  };
  const runBtn = document.getElementById('terminal-run-btn');
  const consoleOutput = document.getElementById('terminal-console-output');

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-term-tab');
      Object.keys(panes).forEach(tab => {
        if (panes[tab]) {
          panes[tab].style.display = tab === targetTab ? 'block' : 'none';
        }
      });
    });
  });

  // Simulated code execution
  if (runBtn && consoleOutput) {
    runBtn.addEventListener('click', () => {
      runBtn.innerHTML = '<span>⏳ Executing...</span>';
      runBtn.disabled = true;
      consoleOutput.classList.remove('show');
      consoleOutput.innerHTML = '';

      setTimeout(() => {
        consoleOutput.classList.add('show');
        consoleOutput.innerHTML = `
          <div><span style="color:#38bdf8;">[1/3]</span> Checking dependencies... Python 3.12, Scikit-learn, Web APIs ✓</div>
          <div><span style="color:#38bdf8;">[2/3]</span> Profile verified: <strong>K Ganesh</strong> (Yenepoya Deemed to be University • 1st Year B.Tech) ✓</div>
          <div><span style="color:#38bdf8;">[3/3]</span> Status: <strong>Open to Hackathon Teams &amp; Tech Projects! 🚀</strong></div>
        `;
        runBtn.innerHTML = '<span>✔ Done</span>';

        setTimeout(() => {
          runBtn.innerHTML = '<span>▶ Run</span>';
          runBtn.disabled = false;
        }, 3000);
      }, 600);
    });
  }
}

/* ==============================================================================
   4. MOBILE NAVIGATION DRAWER
   ============================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', shouldOpen);
    mobileToggle.classList.toggle('active', shouldOpen);
    mobileToggle.setAttribute('aria-expanded', String(shouldOpen));
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  mobileToggle.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ==============================================================================
   5. HEADER SCROLL EFFECT & SCROLLSPY
   ============================================================================== */
function initHeaderAndScrollspy() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    const scrollPosition = scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==============================================================================
   6. SCROLL REVEAL ANIMATIONS
   ============================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ==============================================================================
   7. SKILLS CATEGORY FILTER
   ============================================================================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.skills-filter [data-filter]');
  const skillCards = document.querySelectorAll('#skills-grid .skill-card');

  if (!filterButtons.length || !skillCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==============================================================================
   8. PROJECTS CATEGORY FILTER
   ============================================================================== */
function initProjectsFilter() {
  const projectFilterBtns = document.querySelectorAll('#project-filter-controls [data-pfilter]');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  if (!projectFilterBtns.length || !projectCards.length) return;

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==============================================================================
   9. IN-PAGE PROJECT DETAILS MODAL
   ============================================================================== */
function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-close-action-btn');
  const titleEl = document.getElementById('modal-title');
  const badgeEl = document.getElementById('modal-badge');
  const descEl = document.getElementById('modal-desc');
  const featuresList = document.getElementById('modal-features');
  const tagsContainer = document.getElementById('modal-tags');
  const repoLink = document.getElementById('modal-repo-link');
  const demoButtons = document.querySelectorAll('.demo-link[data-project]');

  if (!modalBackdrop) return;

  // Project details registry
  const projectsData = {
    'project-1': {
      title: 'AI Predictive Classifier',
      badge: 'Artificial Intelligence & Machine Learning',
      desc: 'A hands-on machine learning practice project exploring dataset preprocessing, feature engineering, and binary classification using Python and Scikit-Learn.',
      features: [
        'Data cleaning, missing value imputation, and feature scaling with Pandas and NumPy.',
        'Model training using Logistic Regression and Decision Tree classifiers.',
        'Evaluation using accuracy, confusion matrix, precision, and recall metrics.',
        'Modular Python code structure designed for experiment reproduction.'
      ],
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Machine Learning'],
      repo: 'https://github.com/kamasaniganesh942-bit'
    },
    'project-2': {
      title: 'Responsive Web Application',
      badge: 'Web Development & UI Architecture',
      desc: 'A responsive web application demonstrating modern layout composition, semantic HTML5, CSS Grid/Flexbox, and dynamic vanilla JavaScript interactivity.',
      features: [
        'Fully responsive mobile-first architecture adapting cleanly across all screens.',
        'Vanilla JavaScript DOM state handling with zero external runtime dependencies.',
        'Accessible color contrast, semantic landmarks, and keyboard navigation support.',
        'Sleek glassmorphic visual aesthetics with theme switcher support.'
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript ES6', 'Responsive Design', 'Glassmorphism'],
      repo: 'https://github.com/kamasaniganesh942-bit'
    },
    'project-3': {
      title: 'Python Task & Automation Script',
      badge: 'Python Scripting & Utilities',
      desc: 'An automated utility script built to eliminate repetitive manual processes such as file organization, structured data parsing, and automated logging.',
      features: [
        'Automated directory inspection and batch file categorization.',
        'Structured logging and error handling for robust command-line execution.',
        'Configurable parameter settings via command-line arguments.',
        'Built with Python standard libraries for cross-platform portability.'
      ],
      tags: ['Python 3', 'Automation', 'CLI Scripting', 'File I/O', 'Task Automation'],
      repo: 'https://github.com/kamasaniganesh942-bit'
    },
    'project-4': {
      title: '[Add your project title]',
      badge: 'Upcoming Hackathon / Personal Project',
      desc: 'This project slot is reserved for your upcoming hackathon submission, AI experiment, or engineering coursework project.',
      features: [
        'Step 1: Replace this card with your project name in index.html.',
        'Step 2: Add your key project highlights, problem statement, and solution.',
        'Step 3: Link your live GitHub repository and deployment URL.',
        'Step 4: Showcase your growth as an AI and technology builder!'
      ],
      tags: ['[Add Technology 1]', '[Add Technology 2]', 'In Progress'],
      repo: 'https://github.com/kamasaniganesh942-bit'
    }
  };

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    badgeEl.textContent = data.badge;
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;

    // Populate features
    featuresList.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featuresList.appendChild(li);
    });

    // Populate tags
    tagsContainer.innerHTML = '';
    data.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag-pill';
      span.textContent = t;
      tagsContainer.appendChild(span);
    });

    repoLink.href = data.repo;
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==============================================================================
   10. CONTACT FORM REAL-TIME VALIDATION & SUBMISSION
   ============================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  if (!contactForm) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');

  function validateField(input, condition, errorGroupSelector) {
    const group = document.querySelector(errorGroupSelector);
    if (!input) return false;

    if (condition) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (group) group.classList.remove('has-error');
      return true;
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      if (group) group.classList.add('has-error');
      return false;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time input listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameInput.value.trim().length > 0, '#group-name');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateField(emailInput, emailRegex.test(emailInput.value.trim()), '#group-email');
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', () => {
      validateField(subjectInput, subjectInput.value.trim().length > 0, '#group-subject');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10, '#group-message');
    });
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameInput.value.trim().length > 0, '#group-name');
    const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), '#group-email');
    const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length > 0, '#group-subject');
    const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10, '#group-message');

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showFormFeedback('Please fill out all fields correctly before sending.', 'error');
      return;
    }

    const formEndpoint = contactForm.getAttribute('action') || '';

    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="btn-spinner"></span> Sending...';
    showFormFeedback('', '');

    // Fallback if Formspree ID is still the placeholder
    if (!formEndpoint || formEndpoint.includes('YOUR_FORMSPREE_ID')) {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      showFormFeedback('Formspree endpoint not connected yet. Opening your email app...', 'error');
      showToast('Opening your email app as fallback...');
      const fallbackSubject = encodeURIComponent(subjectInput.value.trim());
      const fallbackBody = encodeURIComponent(`Hi Ganesh,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);
      window.location.href = `mailto:kamasaniganesh942@gmail.com?subject=${fallbackSubject}&body=${fallbackBody}`;
      return;
    }

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim()
        })
      });

      if (response.ok) {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        const senderName = nameInput.value.trim();
        contactForm.reset();

        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
          inp.classList.remove('is-valid', 'is-invalid');
        });
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
        showFormFeedback('✓ Message sent successfully! I will get back to you soon.', 'success');
        showToast(`Thank you, ${senderName}! Your message was delivered to Ganesh.`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        let errorMsg = 'Submission failed.';
        if (errorData && errorData.errors) {
          errorMsg = errorData.errors.map(err => err.message).join(', ');
        }
        throw new Error(errorMsg);
      }
    } catch (err) {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      showFormFeedback('Could not send message via Formspree: ' + err.message, 'error');
      showToast('Error sending message. You can reach out directly via email.');
    }
  });

  function showFormFeedback(msg, type) {
    if (!formFeedback) return;
    if (!msg) {
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';
      return;
    }
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.textContent = msg;
  }
}

/* ==============================================================================
   11. QUICK COPY EMAIL TO CLIPBOARD
   ============================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-address-text');

  if (!copyBtn || !emailTextEl) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailTextEl.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      copyBtn.textContent = 'Copied! ✓';
      if (email.includes('[Add')) {
        showToast('Copied! Remember to update with your real email in index.html.');
      } else {
        showToast('Email address copied to clipboard!');
      }

      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2500);
    } catch (err) {
      showToast('Could not copy email automatically.');
    }
  });
}

/* ==============================================================================
   12. FLOATING TOAST NOTIFICATION
   ============================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==============================================================================
   13. BACK TO TOP BUTTON
   ============================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==============================================================================
   14. AUTO-UPDATE COPYRIGHT YEAR
   ============================================================================== */
function updateCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
