/* ==========================================================================
   premium portfolio logic engine - ritik yadav
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Theme Toggle System & Header Scroll States
  const themeBtn = document.getElementById('theme-btn');
  const mainHeader = document.querySelector('.main-header');
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Toggle scrolled state on navbar for shadow/blur adjustments
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      mainHeader?.classList.add('scrolled');
    } else {
      mainHeader?.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, stop observing this specific element to keep DOM performant
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly for better flow
  });

  revealElements.forEach(el => {
    if (!window.IntersectionObserver) {
      el.classList.add('revealed');
    } else {
      revealObserver.observe(el);
    }
  });

  // Failsafe: Automatically reveal all sections after 1 second if observer has not triggered them yet
  setTimeout(() => {
    document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => {
      el.classList.add('revealed');
    });
  }, 1000);

  // 3. Navigation Scroll Spy & Active Links Indicators
  const sections = document.querySelectorAll('section');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const bottomNavItems = document.querySelectorAll('.bottom-sheet-nav .bottom-nav-item');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        // Sync Desktop Nav Links
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Sync Mobile Bottom Sheet Items
        bottomNavItems.forEach(item => {
          if (item.getAttribute('data-sec') === activeId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.35, // Trigger when 35% of the section is centered
    rootMargin: '-72px 0px -20% 0px' // Align with sticky header height offset
  });

  sections.forEach(sec => spyObserver.observe(sec));

  // 4. Case Studies Data & Template Engine
  const caseStudiesData = {
    okjobs: {
      category: 'Full-Stack Data Platform',
      title: 'OKJobs — AI-Powered Job Intelligence Board',
      tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Claude API', 'n8n', 'Resend'],
      img: 'assets/okjobs.svg',
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { val: '10,000+', lbl: 'Listings Processed' },
        { val: '95%', lbl: 'Match Relevance' },
        { val: '100%', lbl: 'Google Sheets Sync' }
      ],
      problem: 'Job seekers spend 2+ hours daily filtering irrelevant listings across fragmented platforms, with no intelligent recommendation engine or centralized tracking system to prioritize opportunities.',
      solution: 'Engineered an end-to-end AI job intelligence platform featuring real-time multi-source scraping, Claude API semantic matching, automated Google Sheets syncing, and a smart follow-up email pipeline.',
      approach: [
        'Architected daily n8n workflow triggers executing Python scraper modules across LinkedIn, Internshala, Wellfound, and startup career portals.',
        'Built a FastAPI backend orchestrating semantic relevance checks via Anthropic Claude API — scoring jobs against user skill vectors.',
        'Designed an optimized PostgreSQL schema with composite indexes for sub-50ms query response on 10K+ listing datasets.',
        'Developed a Next.js dashboard rendering recommendation rationale cards with 1-click Google Sheets sync for centralized application tracking.',
        'Integrated Resend API for automated follow-up email sequences triggered by application status changes.'
      ],
      results: [
        'Processed 10,000+ real job listings with production-grade reliability across 5 concurrent data sources.',
        'Achieved 95%+ precision in AI match accuracy validated through manual user feedback sampling.',
        'Eliminated 2 hours of daily manual filtering — users reported 0 minutes of manual job search after setup.'
      ]
    },
    sales: {
      category: 'Business Intelligence',
      title: 'Enterprise Sales Performance Analytics Dashboard',
      tech: ['Power BI', 'SQL Server', 'DAX', 'Data Modeling', 'Excel'],
      img: 'assets/sales.svg',
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { val: '100K+', lbl: 'Invoices Modeled' },
        { val: '15%', lbl: 'Decision Lag Reduction' },
        { val: '98%', lbl: 'Forecasting Accuracy' }
      ],
      problem: 'C-suite executives operated on rigid monthly spreadsheet exports, preventing real-time identification of pipeline bottlenecks, conversion rate dips, and regional revenue deviations.',
      solution: 'Architected a multi-tiered corporate Sales Analytics dashboard delivering real-time pipeline visibility, interactive conversion funnels, product cohort trackers, and predictive revenue forecasting.',
      approach: [
        'Wrote complex SQL transformation scripts to clean, normalize, and aggregate 100K+ raw sales ledger records from 3 regional databases.',
        'Designed a star-schema data model in Power BI with optimized relationship cardinalities and row-level security (RLS) for department-based access.',
        'Developed 20+ DAX measures including YoY growth rates, rolling 90-day averages, customer lifetime value (CLV) segments, and dynamic territory rankings.',
        'Configured automated daily gateway refreshes with email-triggered executive summary digests at 8AM.'
      ],
      results: [
        'Modeled and processed a historical database containing 100K+ transactional billing records.',
        'Reduced corporate decision-making latency by 15% — shifting sales teams from reactive to proactive pipeline management.',
        'Delivered predictive revenue forecasting scoring 98% accuracy against subsequent quarterly billing results.'
      ]
    },
    hr: {
      category: 'Data Analytics',
      title: 'HR Retention Intelligence & Recruitment Analytics',
      tech: ['SQL', 'Power BI', 'Python (Pandas)', 'Excel'],
      img: 'assets/hr.svg',
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { val: '50+', lbl: 'KPIs Evaluated' },
        { val: '30%', lbl: 'Attrition Risk Drop' },
        { val: '100%', lbl: 'Funnel Automation' }
      ],
      problem: 'HR departments lacked quantitative dashboards tracking recruitment pipeline velocity, department-level tenure distributions, and predictive early-warning indicators for employee attrition.',
      solution: 'Designed a comprehensive HR intelligence platform surfacing attrition risk scores, recruitment funnel analytics, cost-per-hire metrics, and department health benchmarks.',
      approach: [
        'Cleaned and normalized sparse HR spreadsheet datasets using Python Pandas — resolving null fields, duplicate entries, and inconsistent date formats.',
        'Structured SQL aggregation queries to compile hiring velocity matrices, average tenure distributions, and salary band correlations.',
        'Built interactive attrition risk indicators analyzing variables: commute distance, salary percentile, manager ratings, overtime frequency, and tenure age.',
        'Created visual recruitment funnel trackers mapping candidates from initial outreach → screening → interview → offer → signed contract.'
      ],
      results: [
        'Analyzed 50+ employee attributes across 1,400 records — identifying the top 5 churn prediction variables.',
        'Proposed data-backed workforce policy updates that triggered a 30% reduction in high-risk employee attrition within 2 quarters.',
        'Enabled HR managers to identify applicant bottleneck stages instantly — reducing average hiring cycles by 8 business days.'
      ]
    },
    resume: {
      category: 'AI Tools',
      title: 'AI Resume Compatibility Analyzer & ATS Optimizer',
      tech: ['Claude API', 'LangChain', 'Next.js', 'Python', 'PDF-Parser'],
      img: 'assets/resume.svg',
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { val: '100+', lbl: 'Analysis Runs' },
        { val: '65 → 90+', lbl: 'Score Boost' },
        { val: 'Keyword', lbl: 'Suggestions' }
      ],
      problem: 'Job applications are silently rejected by Applicant Tracking Systems due to poor keyword density, formatting issues, and mismatched skill phrasing — candidates have no visibility into why.',
      solution: 'Built an intelligent resume analyzer that parses PDF uploads, performs semantic comparison against job descriptions, generates ATS compatibility scores, and writes actionable improvement recommendations.',
      approach: [
        'Created a Node.js backend service parsing uploaded PDF resumes into normalized markdown text using pdf-parse library.',
        'Engineered LangChain prompt chains instructing Claude API to perform semantic keyword extraction, structural formatting audits, and skill-gap analysis.',
        'Developed a weighted scoring algorithm based on keyword match frequency, section ordering, formatting compliance, and experience relevance.',
        'Built a React dashboard displaying live ATS gauge visualizations, bullet-level rewrite suggestions, and missing keyword highlights.'
      ],
      results: [
        'Processed 100+ resume analysis runs with sub-4-second response times per analysis cycle.',
        'Users reported ATS compatibility score improvements from 65 → 90+ after applying recommended changes.',
        'Automated identification of formatting errors, missing keywords, and section ordering issues that manual review would miss.'
      ]
    },
    restaurant: {
      category: 'Web Dev',
      title: 'Luxury Restaurant SEO Landing Page & Booking System',
      tech: ['Next.js', 'Supabase', 'Tailwind CSS', 'Google Maps API', 'WhatsApp Business'],
      img: 'assets/restaurant.svg',
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { val: '200+', lbl: 'Monthly Visitors' },
        { val: '30%', lbl: 'Booking Growth' },
        { val: '#1 Rank', lbl: 'Local SEO Terms' }
      ],
      problem: 'A popular local dining establishment had zero digital presence — losing customers who searched online for menus, location details, operating hours, and table reservation options.',
      solution: 'Deployed a fully responsive, SEO-optimized restaurant platform showcasing gourmet menus, customer reviews, embedded Google Maps, and instant WhatsApp table reservation flows.',
      approach: [
        'Built a high-performance static site using Next.js with optimized image loading, code splitting, and lazy hydration.',
        'Implemented semantic HTML5 structures, comprehensive meta tags, Open Graph markup, and JSON-LD schema for local business SEO.',
        'Integrated a direct WhatsApp Business booking link that pre-formats customer details (party size, date, time) into a single tap-to-send message.',
        'Audited and compressed all imagery assets — achieving 95+ Lighthouse performance scores across mobile and desktop.'
      ],
      results: [
        'Captured 200+ unique monthly visitors within the first 30 days of launch.',
        'Increased online-driven table reservations by 30% through the WhatsApp booking pathway.',
        'Secured #1 Google Maps ranking for targeted local restaurant keyword searches.'
      ]
    },
    clinic: {
      category: 'Web Dev',
      title: 'ClinicPortal — Smart Healthcare Appointment Platform',
      tech: ['Next.js', 'Supabase Database', 'Stripe API', 'n8n', 'Twilio'],
      img: 'assets/clinic.svg',
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { val: '100+', lbl: 'Slots Secured' },
        { val: '40%', lbl: 'Call Volume Drop' },
        { val: '95%', lbl: 'Patient Satisfaction' }
      ],
      problem: 'Healthcare reception desks spent hours managing patient appointments via manual phone logs — resulting in double-bookings, missed appointments, and frustrated patients.',
      solution: 'Built ClinicPortal, a full-stack scheduling platform where patients browse available slots, book appointments, verify insurance, make payments, and receive automated SMS confirmations.',
      approach: [
        'Designed a slot-based scheduling database in Supabase with transaction-level locking to prevent double-booking race conditions.',
        'Configured Stripe checkout flows for appointment fee processing with automatic refund triggers for cancellations.',
        'Built n8n webhook automation chains linking payment confirmations → Twilio SMS appointment reminders → Google Calendar sync.',
        'Engineered an admin dashboard for medical staff to manage schedules, view patient histories, and adjust availability in real-time.'
      ],
      results: [
        'Secured 100+ online patient bookings in the initial 30-day deployment phase.',
        'Reduced incoming administrative call traffic by 40% — freeing reception staff for core clinical duties.',
        'Achieved a 95% patient satisfaction rating on post-appointment feedback surveys.'
      ]
    },
    seo: {
      category: 'Performance',
      title: 'SEO Audit Dashboard & Performance Reporting Suite',
      tech: ['Next.js', 'Lighthouse API', 'Python', 'Google Search Console API', 'PostgreSQL'],
      img: 'assets/seo.svg',
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { val: '10+', lbl: 'Sites Monitored' },
        { val: '100+', lbl: 'Issues Fixed' },
        { val: '40%', lbl: 'Avg Speed Boost' }
      ],
      problem: 'Website owners lack a single-pane-of-glass view aggregating Core Web Vitals, accessibility scores, broken SEO schema, and indexing health — forcing manual Lighthouse runs across multiple properties.',
      solution: 'Created an automated audit dashboard that periodically queries target sites via Lighthouse and Search Console APIs, tracks performance trends over time, and highlights critical optimization opportunities.',
      approach: [
        'Built a Python cron scheduler executing daily Lighthouse API audits across 10+ customer domains.',
        'Stored audit results in a PostgreSQL time-series schema enabling week-over-week trend analysis and regression detection.',
        'Designed React dashboard views with interactive speed gauge charts, accessibility compliance trackers, and SEO health indicators.',
        'Implemented Slack/email alert notifications triggered when CLS, LCP, or FID metrics exceed defined thresholds.'
      ],
      results: [
        'Maintained continuous daily monitoring logs across 10+ production customer websites.',
        'Identified and resolved 100+ critical performance bottlenecks (uncompressed assets, render-blocking scripts, missing alt tags).',
        'Improved average page load speeds by 40% across all monitored sites — directly boosting search engine rankings.'
      ]
    }
  };

  const modal = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close-trigger');
  const modalContentInject = document.getElementById('modal-content-inject');
  const caseStudyTriggers = document.querySelectorAll('.case-study-trigger');

  const openCaseStudy = (projKey) => {
    const data = caseStudiesData[projKey];
    if (!data) return;

    // Compile Dynamic HTML
    let techChipsHTML = data.tech.map(t => `<span class="tag">${t}</span>`).join('');
    let metricsHTML = data.metrics.map(m => `
      <div class="cs-metric-box">
        <div class="cs-metric-num">${m.val}</div>
        <div class="cs-metric-lbl">${m.lbl}</div>
      </div>
    `).join('');
    
    let approachHTML = data.approach.map(a => `<li>${a}</li>`).join('');
    let resultsHTML = data.results.map(r => `<li>${r}</li>`).join('');

    let codeTemplate = `
      <div class="cs-header">
        <span class="cs-category">${data.category}</span>
        <h2 class="cs-title">${data.title}</h2>
        <div class="cs-tech-tags">${techChipsHTML}</div>
      </div>

      <div class="cs-hero-img-box">
        <img src="${data.img}" alt="${data.title} Mockup Visual" loading="eager">
      </div>

      <div class="cs-metrics-grid">${metricsHTML}</div>

      <div class="cs-section">
        <h3>The Challenge / Problem</h3>
        <p>${data.problem}</p>
      </div>

      <div class="cs-section">
        <h3>The Architecture &amp; Solution</h3>
        <p>${data.solution}</p>
        <p><strong>Technical Implementation Details:</strong></p>
        <ul class="cs-bullets">${approachHTML}</ul>
      </div>

      <div class="cs-section">
        <h3>Measurable Results &amp; Impact</h3>
        <ul class="cs-bullets">${resultsHTML}</ul>
      </div>

      <div class="cs-footer">
        <button class="btn btn-secondary modal-close-action">Close Case Study</button>
      </div>
    `;

    modalContentInject.innerHTML = codeTemplate;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Block background page scrolling

    // Bind inside-modal close buttons
    const insideCloseBtn = modalContentInject.querySelector('.modal-close-action');
    if (insideCloseBtn) {
      insideCloseBtn.addEventListener('click', closeCaseStudy);
    }
  };

  const closeCaseStudy = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background page scrolling
    setTimeout(() => {
      modalContentInject.innerHTML = ''; // Clear DOM to preserve memory
    }, 300);
  };

  caseStudyTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      openCaseStudy(projKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseStudy);
  }

  // Close modal when clicking outside the container (backdrop overlay)
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCaseStudy();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeCaseStudy();
    }
  });

  // 5. Contact Form Handler & Client-side Validation
  const contactForm = document.getElementById('portfolio-contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('form-submit-btn');
    const successAlert = document.getElementById('form-success-alert');
    const errorAlert = document.getElementById('form-error-alert');

    // Simple Email Regex validation helper
    const validateEmail = (email) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    };

    const validateField = (input, errorEl, checkFn) => {
      const isValid = checkFn ? checkFn(input.value.trim()) : input.value.trim() !== '';
      const formGroup = input.closest('.form-group');
      if (isValid) {
        formGroup.classList.remove('invalid');
      } else {
        formGroup.classList.add('invalid');
      }
      return isValid;
    };

    // Live validation check triggers on input blur
    nameInput.addEventListener('blur', () => validateField(nameInput));
    emailInput.addEventListener('blur', () => validateField(emailInput, null, validateEmail));
    messageInput.addEventListener('blur', () => validateField(messageInput));

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Trigger full validation
      const isNameValid = validateField(nameInput);
      const isEmailValid = validateField(emailInput, null, validateEmail);
      const isMsgValid = validateField(messageInput);

      if (!isNameValid || !isEmailValid || !isMsgValid) {
        return; // Halt if any fields are invalid
      }

      // Transition to loading submission state
      const btnText = submitBtn.querySelector('.btn-text');
      const spinner = submitBtn.querySelector('.spinner');
      
      btnText.textContent = 'Sending Message...';
      spinner.classList.remove('hide');
      submitBtn.setAttribute('disabled', 'true');
      
      successAlert.classList.add('hide');
      errorAlert.classList.add('hide');

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const msgVal = messageInput.value.trim();

      // Submit via FormSubmit API
      fetch("https://formsubmit.co/ajax/yadavritik2027@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          message: msgVal,
          _subject: `New Portfolio message from ${nameVal}`
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('API server responded with error');
        }
        return response.json();
      })
      .then(data => {
        // Reset button states
        btnText.textContent = 'Submit Message';
        spinner.classList.add('hide');
        submitBtn.removeAttribute('disabled');

        // Form Success flow
        successAlert.classList.remove('hide');
        contactForm.reset();
        
        // Remove active state borders
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('invalid');
        });

        // Hide success alert automatically after 8 seconds
        setTimeout(() => {
          successAlert.classList.add('hide');
        }, 8000);
      })
      .catch(error => {
        console.warn('FormSubmit failed, falling back to mailto:', error);
        
        // Reset button states
        btnText.textContent = 'Submit Message';
        spinner.classList.add('hide');
        submitBtn.removeAttribute('disabled');

        // Fallback to pre-filled email client link
        const mailtoUrl = `mailto:yadavritik2027@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(nameVal)}&body=${encodeURIComponent(msgVal)}%0A%0A---%0ASender Contact: ${encodeURIComponent(nameVal)} (${encodeURIComponent(emailVal)})`;
        window.location.href = mailtoUrl;

        // Show fallback alert info
        errorAlert.textContent = "Opening your system mail application to send message...";
        errorAlert.classList.remove('hide');

        setTimeout(() => {
          errorAlert.classList.add('hide');
        }, 6000);
      });
    });
  }

  // 6. Print Optimizations & Resume tracking log triggers
  const resumeDownloadBtn = document.querySelector('[download]');
  if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', () => {
      console.log('Resume download triggered by visitor.');
    });
  }

  // 7. Mobile Navigation Hamburger Menu Overlay
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileMenuOverlay) {
    const toggleMenu = () => {
      const isOpen = mobileMenuOverlay.classList.toggle('open');
      menuToggle.classList.toggle('open');
      mobileMenuOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
      mobileMenuOverlay.classList.remove('open');
      menuToggle.classList.remove('open');
      mobileMenuOverlay.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when resizing beyond mobile breakpoints
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && mobileMenuOverlay.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('open')) {
        closeMenu();
      }
    });
  }
});

/* ==========================================================================
   Interactive Data Lab — SQL Sandbox & Pipeline Clicker
   ========================================================================== */

// Tab Switching
function switchLabTab(tab) {
  document.querySelectorAll('.lab-tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.lab-tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('lab-tab-' + tab).classList.add('active');
  // highlight correct button
  document.querySelectorAll('.lab-tab-btn').forEach(btn => {
    if ((tab === 'sql' && btn.textContent.includes('SQL')) ||
        (tab === 'pipeline' && btn.textContent.includes('Pipeline'))) {
      btn.classList.add('active');
    }
  });
}

// SQL Sandbox Simulator
function runSqlSimulator() {
  const input = document.getElementById('sql-editor-input');
  const output = document.getElementById('sql-terminal-output');
  const query = (input.value || '').trim().toUpperCase();

  output.className = 'sql-output-log';

  if (!query) {
    output.textContent = '⚠ ERROR: Empty query. Write a SELECT statement.';
    output.classList.add('error');
    return;
  }

  if (!query.startsWith('SELECT')) {
    output.textContent = '⚠ ERROR 1064: Only SELECT queries allowed in sandbox mode.';
    output.classList.add('error');
    return;
  }

  // Simulate processing delay
  output.textContent = '⏳ Executing query...';
  output.classList.add('success');

  setTimeout(() => {
    if (query.includes('EXPERIENCE') || query.includes('GRAAS') || query.includes('INTERN')) {
      output.textContent =
`✅ Query OK — 1 row returned (0.023 sec)

+-------------------+-----------------------+------+-------------------+
| company           | role                  | year | stack             |
+-------------------+-----------------------+------+-------------------+
| Graas Solutions   | Data Engineer AWS     | 2026 | Glue, Lambda, RDS |
+-------------------+-----------------------+------+-------------------+`;
      output.classList.add('success');
    } else if (query.includes('PROJECT') || query.includes('DASHBOARD')) {
      output.textContent =
`✅ Query OK — 3 rows returned (0.041 sec)

+----+----------------------+--------+
| id | project              | status |
+----+----------------------+--------+
|  1 | BI Dashboard Engine  | LIVE   |
|  2 | OKJobs Platform      | LIVE   |
|  3 | HR Analytics Suite   | LIVE   |
+----+----------------------+--------+`;
      output.classList.add('success');
    } else if (query.includes('*') && query.includes('FROM')) {
      output.textContent =
`✅ Query OK — 7 rows returned (0.018 sec)

Total records in portfolio_db: 7 projects, 3 internships, 12 certifications.`;
      output.classList.add('success');
    } else {
      output.textContent = '⚠ ERROR 1146: Table not found. Try: experience, projects, skills';
      output.classList.add('error');
    }
  }, 800);
}

function resetSqlSimulator() {
  document.getElementById('sql-editor-input').value =
    "SELECT * FROM experience WHERE company = 'Graas Solutions' AND year = 2026;";
  const output = document.getElementById('sql-terminal-output');
  output.className = 'sql-output-log';
  output.textContent = "-- Click 'Run Query' to execute SQL logs...";
}

// Pipeline Clicker Game State
let clickerState = { records: 0, cpu: 10, workers: 2, budget: 500 };

function triggerEtlRecord() {
  const load = Math.floor(Math.random() * 15) + 10;
  clickerState.records += 50;
  clickerState.cpu = Math.min(100, clickerState.cpu + load - (clickerState.workers * 2));
  clickerState.budget += 20;

  updateClickerUI();

  const log = document.getElementById('clicker-status-log');
  if (clickerState.cpu >= 90) {
    log.textContent = '🔥 CRITICAL: Server overloaded! Add more Glue nodes!';
    log.style.color = '#f85149';
  } else if (clickerState.cpu >= 60) {
    log.textContent = '⚠ WARNING: CPU rising. Consider scaling Glue cluster.';
    log.style.color = '#f0ad4e';
  } else {
    log.textContent = `✅ PySpark job completed. +50K rows ingested into S3.`;
    log.style.color = '#7ee787';
  }
}

function addGlueWorker() {
  if (clickerState.budget < 100) {
    document.getElementById('clicker-status-log').textContent = '⚠ Not enough budget! Process more rows first.';
    document.getElementById('clicker-status-log').style.color = '#f0ad4e';
    return;
  }
  clickerState.workers += 1;
  clickerState.budget -= 100;
  clickerState.cpu = Math.max(5, clickerState.cpu - 20);
  updateClickerUI();
  document.getElementById('clicker-status-log').textContent =
    `✅ Glue worker added (${clickerState.workers} total). CPU cooled to ${clickerState.cpu}%.`;
  document.getElementById('clicker-status-log').style.color = '#7ee787';
}

function updateClickerUI() {
  document.getElementById('clicker-records').textContent = clickerState.records + 'k Rows';
  document.getElementById('clicker-cpu').textContent = clickerState.cpu + '%';
  document.getElementById('clicker-workers').textContent = clickerState.workers;

  const bar = document.getElementById('clicker-cpu-bar');
  bar.style.width = clickerState.cpu + '%';
  if (clickerState.cpu >= 80) {
    bar.classList.add('danger');
  } else {
    bar.classList.remove('danger');
  }
}

// AWS Trivia Challenge Game logic
const awsQuestions = [
  {
    id: 1,
    type: 'single',
    question: 'Which AWS service crawls data sources, identifies formats, and populates the Glue Data Catalog with schema definitions?',
    options: [
      { id: 'A', text: 'AWS Athena' },
      { id: 'B', text: 'AWS Glue Crawler' },
      { id: 'C', text: 'Amazon Redshift Spectrum' },
      { id: 'D', text: 'AWS Lambda' }
    ],
    answer: ['B'],
    explanation: 'AWS Glue Crawlers connect to source data streams, identify file schemas, and write database table definitions to the Glue Data Catalog.'
  },
  {
    id: 2,
    type: 'multi',
    question: 'Which services are serverless and scale automatically to process or ingest real-time streaming data? (Select all that apply)',
    options: [
      { id: 'A', text: 'Amazon EMR' },
      { id: 'B', text: 'Amazon Kinesis Data Streams' },
      { id: 'C', text: 'AWS Lambda' },
      { id: 'D', text: 'Amazon EC2' }
    ],
    answer: ['B', 'C'],
    explanation: 'Kinesis Data Streams and AWS Lambda are serverless services that automatically scale to ingest and process massive streaming data.'
  },
  {
    id: 3,
    type: 'single',
    question: 'You want to run SQL queries directly against raw files stored in S3 without loading them into database tables. Which feature fits best?',
    options: [
      { id: 'A', text: 'Redshift Spectrum' },
      { id: 'B', text: 'Redshift ML' },
      { id: 'C', text: 'Redshift Concurrency Scaling' },
      { id: 'D', text: 'AWS Glue Elastic Views' }
    ],
    answer: ['A'],
    explanation: 'Redshift Spectrum allows executing SQL queries directly on raw files (Parquet, CSV, JSON) in S3 using external schema catalogs.'
  },
  {
    id: 4,
    type: 'multi',
    question: 'Ritik needs to secure raw S3 buckets containing sensitive financial data. Which methods provide encryption at rest? (Select all that apply)',
    options: [
      { id: 'A', text: 'SSE-S3 (S3-Managed Keys)' },
      { id: 'B', text: 'SSE-KMS (AWS KMS Keys)' },
      { id: 'C', text: 'SSL/TLS Certificates' },
      { id: 'D', text: 'HTTPS Protocol' }
    ],
    answer: ['A', 'B'],
    explanation: 'SSE-S3 and SSE-KMS provide server-side encryption at rest. SSL/TLS and HTTPS secure data in motion (in transit).'
  },
  {
    id: 5,
    type: 'single',
    question: 'Which AWS service provides a managed Hadoop and Apache Spark ecosystem for distributed big data compute processing?',
    options: [
      { id: 'A', text: 'AWS Batch' },
      { id: 'B', text: 'Amazon RDS' },
      { id: 'C', text: 'Amazon EMR' },
      { id: 'D', text: 'AWS Fargate' }
    ],
    answer: ['C'],
    explanation: 'Amazon EMR (Elastic MapReduce) is the primary AWS platform for running managed Hadoop, Spark, Hive, and Presto distributed workloads.'
  }
];

let currentQuestionIndex = 0;
const selectedAnswers = new Set();

function loadAwsQuestion() {
  const qText = document.getElementById('aws-question-text');
  const optsContainer = document.getElementById('aws-options-container');
  const badge = document.getElementById('aws-game-badge');
  const logEl = document.getElementById('quiz-status-log');
  const btnSubmit = document.getElementById('btn-submit-quiz');

  if (!qText || !optsContainer || !badge || !logEl || !btnSubmit) return;

  const currentQ = awsQuestions[currentQuestionIndex];
  badge.textContent = `QUESTION ${currentQ.id}/${awsQuestions.length}`;
  qText.innerHTML = `${currentQ.type === 'multi' ? '<span class="c-tag info" style="font-size: 8px; padding: 2px 4px; border-radius: 4px; background: rgba(58,166,255,0.1); margin-right: 6px;">[SELECT ALL]</span> ' : ''}${currentQ.question}`;
  optsContainer.innerHTML = '';
  logEl.textContent = 'Select option(s) above and click Submit.';
  logEl.style.color = '#8b949e';
  btnSubmit.textContent = 'Submit Answer';

  currentQ.options.forEach(opt => {
    const optDiv = document.createElement('div');
    optDiv.className = 'quiz-opt-item';
    optDiv.onclick = () => selectOption(opt.id, currentQ.type);
    optDiv.setAttribute('data-id', opt.id);
    optDiv.innerHTML = `
      <span class="opt-bullet">${opt.id}</span>
      <span class="opt-text">${opt.text}</span>
    `;
    optsContainer.appendChild(optDiv);
  });
}

function selectOption(optId, type) {
  const optsContainer = document.getElementById('aws-options-container');
  if (!optsContainer) return;
  const optItems = optsContainer.querySelectorAll('.quiz-opt-item');

  if (type === 'single') {
    selectedAnswers.clear();
    selectedAnswers.add(optId);
    optItems.forEach(item => {
      if (item.getAttribute('data-id') === optId) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  } else {
    if (selectedAnswers.has(optId)) {
      selectedAnswers.delete(optId);
      optItems.forEach(item => {
        if (item.getAttribute('data-id') === optId) {
          item.classList.remove('selected');
        }
      });
    } else {
      selectedAnswers.add(optId);
      optItems.forEach(item => {
        if (item.getAttribute('data-id') === optId) {
          item.classList.add('selected');
        }
      });
    }
  }
}

function submitAwsAnswer() {
  const currentQ = awsQuestions[currentQuestionIndex];
  const logEl = document.getElementById('quiz-status-log');
  const btnSubmit = document.getElementById('btn-submit-quiz');

  if (!logEl || !btnSubmit) return;

  if (btnSubmit.textContent === 'Next Question') {
    currentQuestionIndex = (currentQuestionIndex + 1) % awsQuestions.length;
    selectedAnswers.clear();
    loadAwsQuestion();
    return;
  }

  if (selectedAnswers.size === 0) {
    logEl.textContent = '⚠ Please select an answer first!';
    logEl.style.color = '#f59e0b';
    return;
  }

  const userAnswers = Array.from(selectedAnswers).sort();
  const correctAnswers = [...currentQ.answer].sort();

  const isCorrect = userAnswers.length === correctAnswers.length &&
                    userAnswers.every((val, index) => val === correctAnswers[index]);

  if (isCorrect) {
    logEl.innerHTML = `🎉 <strong>CORRECT!</strong> ${currentQ.explanation}`;
    logEl.style.color = '#10b981';
    btnSubmit.textContent = 'Next Question';
  } else {
    logEl.innerHTML = `❌ <strong>INCORRECT.</strong> Try again! Hint: Look at ${correctAnswers.join(', ')}.`;
    logEl.style.color = '#ef4444';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadAwsQuestion();
});
