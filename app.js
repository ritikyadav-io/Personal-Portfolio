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
    youtube: {
      category: 'Cloud Data Engineering',
      title: 'AWS YouTube Data Pipeline & Analysis Engine',
      tech: ['AWS Glue', 'PySpark', 'Amazon S3', 'Amazon Athena', 'Python', 'SQL'],
      img: 'assets/okjobs.svg',
      liveUrl: '',
      githubUrl: 'https://github.com/ritikyadav-io/AWS-Youtube-DataPipeline',
      metrics: [
        { val: '100K+', lbl: 'Records Processed' },
        { val: 'AWS S3', lbl: 'Data Lake Storage' },
        { val: 'Athena', lbl: 'Serverless Querying' }
      ],
      problem: 'Processing, transforming, and analyzing high-volume YouTube video metadata and channel engagement records across multiple categories requires automated cloud data processing without server maintenance overhead.',
      solution: 'Architected a serverless cloud data lakehouse on AWS utilizing S3 storage tiers, PySpark ETL scripts on AWS Glue, Glue Data Catalog schemas, and Amazon Athena for sub-second SQL analytics querying.',
      approach: [
        'Ingested multi-region YouTube trending datasets and video metadata into raw Amazon S3 staging buckets.',
        'Wrote distributed PySpark transformation jobs on AWS Glue to clean JSON/CSV records, resolve data type mismatches, and partition storage by region and category.',
        'Structured AWS Glue Crawlers to automatically infer schemas and maintain metadata tables in AWS Glue Data Catalog.',
        'Engineered serverless SQL query models in Amazon Athena for ad-hoc business intelligence analysis on 100K+ records with zero compute idle costs.'
      ],
      results: [
        'Automated multi-source data ingestion into partitioned S3 Data Lake storage.',
        'Reduced query execution times by 60% through optimized Parquet format conversions and partition pruning in Athena.',
        'Delivered 100% serverless infrastructure with automated schema evolution.'
      ]
    },
    churn: {
      category: 'Cloud ML & Analytics',
      title: 'AWS Customer Churn Prediction & Risk Pipeline',
      tech: ['AWS S3', 'Python', 'Scikit-Learn', 'SQL', 'AWS Cloud Services'],
      img: 'assets/sales.svg',
      liveUrl: '',
      githubUrl: 'https://github.com/ritikyadav-io/AWS-Customer-Churn-Prediction-Model',
      metrics: [
        { val: 'AWS Cloud ML', lbl: 'Pipeline Architecture' },
        { val: '85%+', lbl: 'Prediction Accuracy' },
        { val: 'Cohort', lbl: 'Risk Classification' }
      ],
      problem: 'SaaS platforms experience unmonitored customer churn without real-time behavior analytics, predictive risk scoring, and early warning indicators for high-value accounts.',
      solution: 'Engineered an end-to-end customer churn prediction workflow using AWS cloud infrastructure, scikit-learn classification models, feature engineering pipelines, and risk cohort analytics.',
      approach: [
        'Extracted, cleaned, and normalized customer engagement logs, billing history, and support usage metrics stored in AWS S3.',
        'Engineered 20+ predictive feature variables including tenure length, monthly charges, contract type, payment methods, and activity frequency.',
        'Trained and evaluated machine learning classification models (Random Forest, Logistic Regression, XGBoost) to predict churn probability.',
        'Structured risk cohort tiers (High, Medium, Low Risk) enabling customer success teams to initiate proactive retention campaigns.'
      ],
      results: [
        'Achieved 85%+ predictive accuracy in identifying accounts at high risk of churning before contract expiration.',
        'Automated feature scaling and data prep pipelines on AWS cloud storage.',
        'Surfaced actionable retention insights to mitigate customer revenue loss.'
      ]
    },
    hr: {
      category: 'Data Analytics',
      title: 'HR Retention Intelligence & Recruitment Analytics',
      tech: ['SQL', 'Power BI', 'Python (Pandas)', 'Excel', 'DAX'],
      img: 'assets/hr.svg',
      liveUrl: '',
      githubUrl: 'https://github.com/ritikyadav-io/hr-analytics',
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
      category: 'AI Tools & Data NLP',
      title: 'AI Resume Compatibility Analyzer & ATS Optimizer',
      tech: ['Claude API', 'LangChain', 'Next.js', 'Python', 'PDF-Parser'],
      img: 'assets/resume.svg',
      liveUrl: 'https://elevatecvapp.vercel.app',
      githubUrl: 'https://github.com/ritikyadav-io/ElevateCv',
      metrics: [
        { val: '100+', lbl: 'Analysis Runs' },
        { val: '65 → 90+', lbl: 'Score Boost' },
        { val: 'Keyword', lbl: 'Extraction' }
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
      category: 'Interactive App',
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
    movies: {
      category: 'AI & Media Platform',
      title: 'MoviesDNA — Movie Recommendation Platform & Media Engine',
      tech: ['React', 'AI Recommendation Engine', 'Media Reels', 'TMDB Movie API', 'Tailwind CSS'],
      img: 'assets/clinic.svg',
      liveUrl: 'https://moviesdna.lovable.app',
      githubUrl: '',
      metrics: [
        { val: 'Video Reels', lbl: 'Actresses & Cast Highlights' },
        { val: 'AI Engine', lbl: 'Smart Recommendations' },
        { val: 'Rich Summaries', lbl: 'Plot & Cast Details' }
      ],
      problem: 'Movie enthusiasts lack an interactive platform to watch high-engagement short reels, explore actress and cast profiles, and receive instant personalized movie recommendations.',
      solution: 'Engineered MoviesDNA, a modern movie discovery and recommendation platform delivering curated short video reels, actress/cast bios, full plot summaries, and algorithmic movie matching.',
      approach: [
        'Built an interactive media feed supporting short video reels and actress/actor spotlight cards.',
        'Integrated movie metadata API endpoints to fetch high-res posters, cast filmographies, character roles, and plot summaries dynamically.',
        'Designed an intuitive recommendation engine surfacing trending titles, genre filters, and similar film recommendations.',
        'Optimized media asset caching and video player performance for fast playback and smooth horizontal reel scrolling across mobile and desktop devices.'
      ],
      results: [
        'Deployed full-featured movie discovery web app live at moviesdna.lovable.app.',
        'Seamlessly integrated short video reels, actress profiles, cast details, and plot summaries in one clean interface.',
        'Achieved instant client-side rendering with responsive touch-friendly navigation.'
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
        (tab === 'pipeline' && (btn.textContent.includes('Pipeline') || btn.textContent.includes('Outlier')))) {
      btn.classList.add('active');
    }
  });

  if (tab === 'pipeline') {
    generateOutlierRound();
  }
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

+-------------------+---------------------------+------+-----------------------+
| company           | role                      | year | stack                 |
+-------------------+---------------------------+------+-----------------------+
| Graas Solutions   | AWS Data Engineer Intern   | 2026 | PySpark, AWS Glue, SQL |
+-------------------+---------------------------+------+-----------------------+`;
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

// Outlier Hunter Game State
let outlierState = { score: 100, checked: 0, outlierIndex: 0, active: false };

const outlierScenarios = [
  {
    category: 'E-commerce Revenue',
    normal: () => `Revenue: $${(Math.random() * 80 + 30).toFixed(2)}`,
    outlier: () => `Revenue: -$${(Math.random() * 4000 + 1000).toFixed(2)}`,
    explanation: '🎉 Success: Dropped negative revenue row! CFO sends a high-five.',
    anomalyDesc: 'Negative transaction'
  },
  {
    category: 'User Demographics',
    normal: () => `User Age: ${Math.floor(Math.random() * 40) + 18}`,
    outlier: () => `User Age: ${Math.floor(Math.random() * 500) + 800}`,
    explanation: '🎉 Success: Filtered Dracula! Vampire cohorts excluded.',
    anomalyDesc: 'Century-old user age'
  },
  {
    category: 'Web Traffic Partitions',
    normal: () => `Hits: ${Math.floor(Math.random() * 1000) + 800}`,
    outlier: () => `Hits: ${Math.floor(Math.random() * 5000000) + 9000000}`,
    explanation: '🎉 Success: Blocked botnet DDoS spike! CPU load cooled down.',
    anomalyDesc: 'Million hits spike'
  },
  {
    category: 'App Store Ratings',
    normal: () => `Rating: ${'⭐'.repeat(Math.floor(Math.random() * 3) + 3)}`,
    outlier: () => `Rating: ⭐⭐⭐⭐⭐⭐`,
    explanation: '🎉 Success: Deleted illegal 6-star rating. Physics restored.',
    anomalyDesc: '6-star rating'
  },
  {
    category: 'SaaS Cluster Temp',
    normal: () => `Temp: ${Math.floor(Math.random() * 20) + 40}°C`,
    outlier: () => `Temp: ${Math.floor(Math.random() * 10000) + 8000}°C`,
    explanation: '🎉 Success: Meltdown averted! Calibrated sensor back to 42°C.',
    anomalyDesc: 'Meltdown temp'
  },
  {
    category: 'Compensation Audits',
    normal: () => `Wage: $${(Math.random() * 30 + 50).toFixed(2)}/hr`,
    outlier: () => `Wage: $0.01/hr`,
    explanation: '🎉 Success: Flagged minimum wage breach! Unpaid interns saved.',
    anomalyDesc: '0.01/hr wage'
  },
  {
    category: 'Conversion Analytics',
    normal: () => `Conv: ${(Math.random() * 4 + 1).toFixed(1)}%`,
    outlier: () => `Conv: ${(Math.random() * 100 + 120).toFixed(1)}%`,
    explanation: '🎉 Success: Filtered glitch! >100% conversion is impossible.',
    anomalyDesc: 'Over 100% conversion'
  },
  {
    category: 'Server Partitioning',
    normal: () => `Disk Use: ${Math.floor(Math.random() * 40) + 30}%`,
    outlier: () => `Disk Use: -99%`,
    explanation: '🎉 Success: Solved count underflow error. Disk metrics synced.',
    anomalyDesc: '-99% negative storage'
  }
];

let currentScenario = null;

function generateOutlierRound() {
  currentScenario = outlierScenarios[Math.floor(Math.random() * outlierScenarios.length)];
  outlierState.outlierIndex = Math.floor(Math.random() * 4);
  
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`outlier-opt-${i}`);
    if (!btn) continue;
    
    // Reset background and style
    btn.style.borderColor = 'var(--border-color)';
    btn.style.backgroundColor = 'var(--bg-secondary)';
    
    if (i === outlierState.outlierIndex) {
      btn.textContent = currentScenario.outlier();
    } else {
      btn.textContent = currentScenario.normal();
    }
  }
  
  outlierState.active = true;
}

function checkOutlierSelection(index) {
  if (!outlierState.active) return;
  outlierState.active = false;
  
  const log = document.getElementById('outlier-status-log');
  const scoreEl = document.getElementById('outlier-score');
  const checkedEl = document.getElementById('outlier-checked');
  
  if (!log || !scoreEl || !checkedEl) return;
  
  // Highlight options
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`outlier-opt-${i}`);
    if (!btn) continue;
    if (i === outlierState.outlierIndex) {
      btn.style.borderColor = '#10b981';
      btn.style.backgroundColor = 'rgba(16, 185, 129, 0.08)';
    } else if (i === index) {
      btn.style.borderColor = '#ef4444';
      btn.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
    }
  }

  if (index === outlierState.outlierIndex) {
    // Correct selection
    outlierState.checked += 1;
    if (outlierState.score < 100) {
      outlierState.score = Math.min(100, outlierState.score + 5);
    }
    log.innerHTML = `<span style="color: #10b981;">${currentScenario.explanation}</span>`;
  } else {
    // Incorrect selection
    outlierState.score = Math.max(0, outlierState.score - 15);
    log.innerHTML = `<span style="color: #ef4444;">❌ Deleted valid row! Cleaned: "${document.getElementById(`outlier-opt-${index}`).textContent}". [Outlier was: ${currentScenario.anomalyDesc}]</span>`;
  }
  
  checkedEl.textContent = outlierState.checked;
  scoreEl.textContent = outlierState.score + '%';
  
  // Adjust score color based on performance
  if (outlierState.score >= 80) {
    scoreEl.style.color = '#10b981';
  } else if (outlierState.score >= 50) {
    scoreEl.style.color = '#f59e0b';
  } else {
    scoreEl.style.color = '#ef4444';
  }

  // Handle pipeline breakdown reset if score drops too low
  if (outlierState.score <= 30) {
    log.innerHTML = `<span style="color: #ef4444; font-weight: 700;">🔥 CRITICAL: Poor Data Quality (${outlierState.score}%)! Re-calibrating schemas...</span>`;
    setTimeout(() => {
      outlierState.score = 100;
      scoreEl.textContent = '100%';
      scoreEl.style.color = 'var(--text-primary)';
      log.textContent = 'Pipeline calibrated! Data feed restarted.';
      generateOutlierRound();
    }, 2200);
    return;
  }
  
  // Automatically queue next round
  setTimeout(() => {
    generateOutlierRound();
  }, 1600);
}

// BI & A/B Testing Simulator Game Logic
let currentBiScenario = 'funnel';

function selectBiScenario(scenario) {
  currentBiScenario = scenario;
  
  // Update Scenario Buttons UI
  const funnelBtn = document.getElementById('scenario-funnel-btn');
  const pricingBtn = document.getElementById('scenario-pricing-btn');
  const badge = document.getElementById('bi-lab-badge');
  const labelModifier = document.getElementById('bi-label-modifier');
  const selectModifier = document.getElementById('bi-var-modifier');
  const labelMid = document.getElementById('bi-metric-label-mid');
  const labelRoi = document.getElementById('bi-metric-label-roi');

  if (funnelBtn && pricingBtn && badge) {
    if (scenario === 'funnel') {
      funnelBtn.classList.add('active');
      pricingBtn.classList.remove('active');
      badge.textContent = 'SCENARIO: FUNNEL OPTIMIZATION';
      
      // Update Select Labels
      if (labelModifier) labelModifier.textContent = 'Promo Discount:';
      if (labelMid) labelMid.textContent = 'Avg Order Value';
      if (labelRoi) labelRoi.textContent = 'Ad ROI (ROAS)';
      
      // Update Select Options
      if (selectModifier) {
        selectModifier.innerHTML = `
          <option value="none">No Promo Discount</option>
          <option value="10">10% Off Coupon</option>
          <option value="20">20% Off Coupon</option>
        `;
      }
    } else {
      funnelBtn.classList.remove('active');
      pricingBtn.classList.add('active');
      badge.textContent = 'SCENARIO: SAAS PRICING';
      
      // Update Select Labels
      if (labelModifier) labelModifier.textContent = 'Billing Contract:';
      if (labelMid) labelMid.textContent = 'Customer LTV';
      if (labelRoi) labelRoi.textContent = 'LTV/CAC Ratio';
      
      // Update Select Options
      if (selectModifier) {
        selectModifier.innerHTML = `
          <option value="none">$99/mo Base Tier</option>
          <option value="annual">Annual Billing Option</option>
          <option value="enterprise">Enterprise Custom Tier</option>
        `;
      }
    }
  }
  
  // Run simulation with initial parameters
  runBiSimulation();
}

function runBiSimulation() {
  const layoutVal = document.getElementById('bi-var-layout').value;
  const modVal = document.getElementById('bi-var-modifier').value;
  
  const convMetric = document.getElementById('bi-metric-conv');
  const midMetric = document.getElementById('bi-metric-mid');
  const roiMetric = document.getElementById('bi-metric-roi');
  const logEl = document.getElementById('bi-status-log');
  
  if (!convMetric || !midMetric || !roiMetric || !logEl) return;
  
  let conv = '3.2%';
  let mid = '$45.00';
  let roi = '2.1x';
  let logText = '';
  
  if (currentBiScenario === 'funnel') {
    // E-commerce Funnel Scenario calculations
    if (layoutVal === 'default') {
      if (modVal === 'none') {
        conv = '3.2%'; mid = '$45.00'; roi = '2.1x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'default' AND promo = 'none';\n-- A/B Test result: Control group baseline. No statistical significance.`;
      } else if (modVal === '10') {
        conv = '4.5%'; mid = '$40.50'; roi = '2.4x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'default' AND promo = '10_off';\n-- A/B Test result: p-value = 0.082 (Marginal significance). Coupon boosted sales volume.`;
      } else {
        conv = '5.0%'; mid = '$36.00'; roi = '2.0x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'default' AND promo = '20_off';\n-- A/B Test result: p-value = 0.045 (Significant), but profit margin erosion reduced ROAS.`;
      }
    } else if (layoutVal === 'minimal') {
      if (modVal === 'none') {
        conv = '4.8%'; mid = '$45.00'; roi = '3.2x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'minimal' AND promo = 'none';\n-- A/B Test result: p-value = 0.024 (Statistically Significant! Variant A wins over Control).`;
      } else if (modVal === '10') {
        conv = '5.8%'; mid = '$40.50'; roi = '3.5x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'minimal' AND promo = '10_off';\n-- A/B Test result: p-value = 0.004 (Highly Significant!). Best business ROI configuration! 🎉`;
      } else {
        conv = '6.2%'; mid = '$36.00'; roi = '2.7x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'minimal' AND promo = '20_off';\n-- A/B Test result: p-value = 0.001, but lower average order margins drags down ad ROAS.`;
      }
    } else { // social
      if (modVal === 'none') {
        conv = '4.2%'; mid = '$45.00'; roi = '2.8x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'social' AND promo = 'none';\n-- A/B Test result: p-value = 0.095 (Marginal significance). Dense proof shows positive trend.`;
      } else if (modVal === '10') {
        conv = '5.2%'; mid = '$40.50'; roi = '3.1x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'social' AND promo = '10_off';\n-- A/B Test result: p-value = 0.018 (Statistically Significant). Good conversion lift.`;
      } else {
        conv = '5.6%'; mid = '$36.00'; roi = '2.4x';
        logText = `SELECT count(*), sum(revenue) FROM orders WHERE layout = 'social' AND promo = '20_off';\n-- A/B Test result: p-value = 0.012, but high discount hurts profit margins.`;
      }
    }
  } else {
    // SaaS Pricing Scenario calculations
    if (layoutVal === 'default') {
      if (modVal === 'none') {
        conv = '1.2%'; mid = '$594.00'; roi = '1.8x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'default' AND billing = 'monthly';\n-- LTV/CAC ratio is 1.8. Recommended SaaS target ratio is > 3.0.`;
      } else if (modVal === 'annual') {
        conv = '0.8%'; mid = '$792.00'; roi = '2.2x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'default' AND billing = 'annual';\n-- Conv rate dropped by 33%, but higher cash flow and lower churn boosts LTV.`;
      } else {
        conv = '0.4%'; mid = '$1440.00'; roi = '2.5x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'default' AND billing = 'enterprise';\n-- Low conv volume, but large custom contract values increase customer LTV.`;
      }
    } else if (layoutVal === 'minimal') {
      if (modVal === 'none') {
        conv = '1.8%'; mid = '$594.00'; roi = '2.4x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'minimal' AND billing = 'monthly';\n-- A/B Test result: p-value = 0.021. Sleek UI increased monthly user acquisition.`;
      } else if (modVal === 'annual') {
        conv = '1.2%'; mid = '$792.00'; roi = '2.8x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'minimal' AND billing = 'annual';\n-- A/B Test result: p-value = 0.048. Clear annual billing benefits conversion.`;
      } else {
        conv = '0.6%'; mid = '$1440.00'; roi = '3.1x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'minimal' AND billing = 'enterprise';\n-- A/B Test p-value = 0.090 (Low sample size). LTV/CAC target > 3.0 achieved!`;
      }
    } else { // social
      if (modVal === 'none') {
        conv = '1.6%'; mid = '$594.00'; roi = '2.2x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'social' AND billing = 'monthly';\n-- A/B Test result: p-value = 0.065. Testimonials built user trust.`;
      } else if (modVal === 'annual') {
        conv = '1.4%'; mid = '$880.00'; roi = '3.4x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'social' AND billing = 'annual';\n-- A/B Test result: p-value = 0.012 (Statistically Significant!). Best LTV/CAC ratio! 🎉`;
      } else {
        conv = '0.8%'; mid = '$1600.00'; roi = '3.6x';
        logText = `SELECT avg(ltv), count(*) FROM SaaS_subs WHERE layout = 'social' AND billing = 'enterprise';\n-- A/B Test result: p-value = 0.008 (Strong Significance!). Testimonials strongly validated value.`;
      }
    }
  }
  
  // Animate change value flash
  convMetric.style.transform = 'scale(1.1)';
  midMetric.style.transform = 'scale(1.1)';
  roiMetric.style.transform = 'scale(1.1)';
  
  setTimeout(() => {
    convMetric.style.transform = 'scale(1)';
    midMetric.style.transform = 'scale(1)';
    roiMetric.style.transform = 'scale(1)';
  }, 150);
  
  convMetric.textContent = conv;
  midMetric.textContent = mid;
  roiMetric.textContent = roi;
  logEl.innerHTML = logText.replace(/\n/g, '<br>');
  
  // Adjust ROAS text color based on performance
  const numericRoi = parseFloat(roi);
  if (numericRoi >= 3.0) {
    roiMetric.style.color = '#10b981'; // Green
  } else if (numericRoi >= 2.4) {
    roiMetric.style.color = '#f59e0b'; // Amber
  } else {
    roiMetric.style.color = '#ef4444'; // Red
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bi-var-layout')) {
    selectBiScenario('funnel');
  }
  if (document.getElementById('outlier-opt-0')) {
    generateOutlierRound();
  }
});
