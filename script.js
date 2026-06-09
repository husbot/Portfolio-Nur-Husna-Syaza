/**
 * Nur Husna Syaza — Portfolio Script
 * HCI Principles: visibility of status, user control & freedom,
 * consistency, error prevention, recognition over recall
 */
document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. STICKY NAV — Visibility of system status
  // =============================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // =============================================
  // 2. MOBILE HAMBURGER — User control & freedom
  // =============================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger?.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks?.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // =============================================
  // 3. ACTIVE NAV LINK — Recognition over recall
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  const activateNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinkEls.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', activateNav, { passive: true });
  activateNav();

  // =============================================
  // 4. SKILLS PROGRESS BARS
  // =============================================
  const skillsContainer = document.querySelector('.skills-container');
  if (skillsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillsContainer.querySelectorAll('.progress').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    observer.observe(skillsContainer);
  }

  // =============================================
  // 5. PROJECT DATA — complete data repository
  // =============================================
  const projectData = {
    'proj-1': {
      title: 'Fitness Club Membership System',
      tag: 'Database Management · SQL · Oracle · ERD',
      desc: 'Developed a database system to streamline fitness club operations by managing member details, class schedules, trainer assignments, payments, and equipment maintenance. The system consolidates data into a single platform, enabling real-time tracking of class attendance, payment history, and facility usage — enhancing operational efficiency and improving member satisfaction by automating processes and reducing administrative workload.',
      bullets: [
        'Built 20-table normalized relational schema covering members, trainers, classes, payments, equipment, facilities, subscriptions, and more.',
        'Wrote 13+ advanced SQL queries using JOINs, aggregate functions (SUM, COUNT), subqueries, and set operations (UNION).',
        'Enhanced data security through role-based access control and compliance with privacy laws.',
        'Automated attendance tracking, class scheduling, and payment management to reduce administrative workload.',
        'Implemented UPDATE/DELETE workflows with cascading constraints for referential integrity.'
      ],
      resources: [
        { icon: 'fas fa-file-pdf', label: 'Project Report (PDF)', href: 'database project.pdf', color: '#e53e3e' },
        { icon: 'fas fa-link', label: 'Oracle Live SQL', href: 'https://livesql.oracle.com/ords/livesql/s/cl6driti7n5w6jxes9jcqg63n', color: '#c9a96e' }
      ]
    },
    'proj-2': {
      title: 'TechPresto — Electronic Device Pre-Order System',
      tag: 'C++ · File Handling · Input Validation',
      desc: 'Developed a C++ program to facilitate pre-orders for electronic devices, allowing users to browse devices by category and price range. The system provides detailed product specifications for informed purchasing decisions, validates user inputs, stores order details in a file for tracking, and simulates a simple order management system — simplifying the preorder process and offering a smooth, efficient user experience.',
      bullets: [
        'Built price-range filtering across 5 product categories: laptops, phones, tablets, accessories, and peripherals.',
        'Implemented persistent data storage via file handling for maintaining order history across sessions.',
        'Simplified preorder process with a menu-driven interface for user-friendly terminal experience.',
        'Applied comprehensive input validation to handle all edge cases; all test cases passed successfully.',
        'Designed with modular programming for maintainability and separation of concerns.'
      ],
      resources: [
        { icon: 'fas fa-code', label: 'View Source Code (.cpp)', href: 'electronic device pre-order system.cpp', color: '#3182ce' },
        { icon: 'fab fa-github', label: 'GitHub Repository', href: 'https://github.com/husbot/TechPresto-Electronic-Device-Pre-Order-System', color: '#24292e' }
      ]
    },
    'proj-3': {
      title: 'OMC 2024 — CampuSwap Mobile App',
      tag: 'VBA · VB.NET · Microsoft Access',
      desc: 'Developed a mobile application, CampuSwap, aimed at facilitating the exchange, buying, and selling of secondhand items and services among students. The project addressed inefficiencies in current informal trading platforms like social media groups by offering a user-friendly, centralized platform with features like easy listing, secure transactions, and search filters.',
      bullets: [
        'Assisted project director in creating project timelines, milestones, and deliverables.',
        'Reviewed code for accuracy, efficiency, and compliance with project requirements.',
        'Conducted initial testing to ensure functional and non-functional requirements are met.',
        'Delivered easy listing, secure transactions, and advanced search filters for the campus student community.',
        'Acted as point of contact for team queries and escalated critical issues to project director.'
      ],
      resources: [
        
      ]
    },
    'proj-4': {
      title: 'FEXES 4.0 — Foundation Entrepreneurship Day',
      tag: 'IoT · Digital Marketing · Business Operations',
      desc: 'FEXES 4.0, organized by UTP, is a hands-on entrepreneurial initiative aimed at developing business management skills among foundation students. In the January 2024 semester, 329 students from Computer Science, IT, Information Systems, and Business Management participated, launching 34 pop-up shops with support from internal and external sponsors — embracing digital innovation through cashless payments, IoT, and social media integration.',
      bullets: [
        'Served as Chief Technology Officer for the 9headnachos team, establishing structured data storage and relational layouts.',
        'Integrated cashless payment systems and IoT hardware tracking logs for the event booth.',
        'Executed digital marketing strategy via social media, contributing to strong booth engagement among 329 participants.',
        'Collaborated across 34 competing pop-up shop teams with internal and external sponsor support.',
        'Led cross-functional collaboration for end-to-end event execution from mock pitching to D-day.'
      ],
      resources: [
        { icon: 'fab fa-instagram', label: 'FEXES Instagram', href: 'https://www.instagram.com/9headnachos/', color: '#e1306c' }
      ]
    },
    'proj-5': {
      title: 'Microsoft ASEAN AI for Accessibility Hackathon',
      tag: 'AI Engineering · Azure AI · Accessibility · WCAG',
      desc: 'Competitive AI submission by team inteLexis — an AI-powered reading assistant for dyslexia using Azure AI Vision, Language, and Speech services to provide adaptive reading support for individuals with special communication dependencies.',
      bullets: [
        'Built "Lexi Help" — a Snap-to-Text tool using Azure AI Vision to extract text from images, with Azure AI Language for summarization and tone conversion (formal/informal).',
        'Integrated Azure AI Speech for Text-to-Speech with pronunciation aid, reading text aloud in dyslexia-friendly font.',
        'Implemented Voice Command Navigation via Azure Bot Service for hands-free control.',
        'Architected accessible user journeys conforming to WCAG global accessibility mandates.',
        'Designed go-to-market strategy: piloting in 50 Malaysian PPKI schools with NGO collaboration (NOD Malaysia, Kementerian Pendidikan).'
      ],
      images: [
        { src: 'Hackaton 1.jpg', alt: 'inteLexis Team at Hackathon' },
        { src: 'Hackaton 2.jpg', alt: 'Lexi Help App Demo — Snap to Text' },
        { src: 'Hackaton 3.jpg', alt: 'Lexi Help — Text to Speech Interface' },
        
      ],
      resources: [
        { icon: 'fas fa-file-pdf', label: 'Pitch Deck (PDF)', href: 'pitch deck.pdf', color: '#e53e3e' },
        { icon: 'fas fa-newspaper', label: 'UTP Feature Article', href: 'https://www.utp.edu.my/pages/students/student%20development%20and%20services/stories/utp-students-shine-at-microsoft-asean-ai-for-accessibility-hackathon-2025.aspx', color: '#0078d4' }
      ]
    },
    'proj-6': {
      title: 'TRIBAGUS Hotel Booking System',
      tag: 'Figma · UI/UX · HCI · Front-End · Prototyping',
      desc: 'Developed an integrated web application, TRIBAGUS, aimed at streamlining the hotel search, comparison, and reservation process for travelers. The project addressed inefficiencies in existing single-platform aggregators by providing a centralized dashboard that cross-references pricing and availability across multiple booking sites simultaneously — integrating a smart itinerary generator, AI assistant with text and voice commands, and historical search tracking.',
      bullets: [
        'Designed a centralized comparison dashboard cross-referencing pricing and availability across multiple booking sites simultaneously.',
        'Built a smart itinerary generator allowing users to plan multi-destination trips within custom budgets.',
        'Integrated interactive comparison tools, historical search tracking, and a built-in AI assistant supporting text and voice commands.',
        'Applied 7 HCI principles and UI/UX best practices across high-fidelity Figma prototypes with smooth screen transitions.',
        'Simplified vacation planning and automated budget tracking, reducing time spent navigating disparate travel websites.'
      ],
      figma: {
        embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/wz81YiC6ntM3ykJBn6KN36/TRIBAGUS?node-id=0-1&t=nTaUQadhr7Aw6Chw-1',
        linkUrl: 'https://www.figma.com/design/wz81YiC6ntM3ykJBn6KN36/TRIBAGUS?node-id=0-1&t=nTaUQadhr7Aw6Chw-1'
      },
      resources: [
        
      ]
    },
    'proj-7': {
      title: 'TapauTime — UTP Cafeteria & Food Ordering System',
      tag: 'HTML · CSS · JavaScript · PHP · MySQL · Testing',
      desc: 'Developed an online food ordering and pre-order management system to streamline cafeteria operations and enhance the campus dining experience at UTP. The project addressed inefficiencies in manual systems — such as long wait times and communication errors — by offering a user-friendly, centralized platform with menu browsing, shopping carts, secure online payments, and a pre-order mechanism for scheduled pickup during peak hours.',
      bullets: [
        'Built a multi-page web app: student menu browsing, cart, checkout, order tracking, and a scheduled pre-order mechanism to avoid peak-hour queues.',
        'Implemented role-based access control — separate login flows for students and admin staff managing order queues and fulfillment statuses.',
        'Defined a comprehensive testing strategy: unit, integration, system, and load testing with documented test cases.',
        'Provided cafeteria staff a structured framework to update fulfillment statuses in real-time and monitor customer feedback.',
        'Collaborated in a team of 5, managing project timelines, code reviews, and functional test execution.'
      ],
      images: [
        { src: 'web 1.jpg', alt: 'TapauTime — Student Menu Page' },
        { src: 'web 2.jpg', alt: 'TapauTime — Cart & Checkout' }
      ],
      resources: [
        { icon: 'fab fa-github', label: 'GitHub Repository', href: 'https://github.com/husbot/UTP-Cafeteria-Food-Ordering-System', color: '#24292e' },
        { icon: 'fas fa-globe', label: 'Live Website', href: 'http://waipfoodordering.atwebpages.com/index.php', color: '#3182ce' }
      ]
    },
    'proj-8': {
      title: 'Perak AirWatch — IoT Aircraft Monitoring System',
      tag: 'IoT · Python · Flask · Flask-SocketIO · Leaflet.js · Chart.js',
      desc: 'Developed an end-to-end IoT data collection and web visualization application to track regional aircraft movements and altitudinal variations across Perak airspace over 7 consecutive days. The project engineers a centralized microservice pipeline using the OpenSky Network REST API with a multi-layered architecture: automated data acquisition with fail-safe error handling, a flat-file CSV database schema, and an asynchronous Flask/WebSocket web-serving layer — at zero financial cost.',
      bullets: [
        'Built a layered IoT architecture: OpenSky API → Python data_collector.py (every 120s) → CSV storage → Flask REST API → WebSocket (Flask-SocketIO) → Leaflet.js live map.',
        'Executed spatial filtering constraints to dynamically isolate flight vectors within Perak coordinate boundaries, recording GPS position, ground velocity, and climb rates.',
        'Rendered a live geospatial dashboard with colour-coded aircraft markers (low/medium/high altitude), custom flight paths, telemetry tables, and trend charts.',
        'Analysed 7 days of data (10–16 Mar 2026): dominant carriers AirAsia (AXM) and Malaysia Airlines (MAS), cruising altitude 9,000–11,000 m, peak traffic 18:00 MYT (38 flights/hr).',
        'Implemented GPS-inferred airport detection by clustering ground-level aircraft positions; total implementation cost: RM 0 / $0.'
      ],
      resources: [
        { icon: 'fab fa-github', label: 'GitHub Repository', href: 'https://github.com/husbot/Perak-AirWatch-IoT-based-Aircraft-Monitoring-System', color: '#24292e' },
        { icon: 'fas fa-file-pdf', label: 'IoT Project Report (PDF)', href: 'IOT Group Project.pdf', color: '#e53e3e' },
        { icon: 'fas fa-video', label: 'Watch Demo Video', href: 'https://go.screenpal.com/watch/cO1QFlnuZ1u', color: '#c9a96e' }
      ]
    },
    'proj-9': {
      title: 'Predictive Banking Customer Analytics via k-NN',
      tag: 'R · Machine Learning · k-NN · Predictive Analytics',
      desc: 'Developed a data-driven predictive analytics model within R to optimize customer acquisition strategies for a rapidly growing commercial bank. The project addressed inefficiencies in traditional, untargeted marketing campaigns — building a centralized k-Nearest Neighbors (k-NN) classification pipeline to identify potential borrowers among existing depositors, enhancing operational decision-making and improving resource allocation.',
      bullets: [
        'Built a comprehensive k-NN classification pipeline featuring automated data cleaning, min-max normalization, dummy coding for categorical variables, and exploratory feature selection.',
        'Implemented a cross-validation strategy alongside a systematic grid search to isolate the optimal hyperparameter value for "k", preventing overfitting.',
        'Validated model performance using multi-metric evaluation: classification confusion matrices, accuracy rates, and distance metrics for neighbor proximity assessment.',
        'Focused marketing investments on high-probability loan applicants, reducing overhead costs and increasing conversion rates.',
        'Simplifies consumer targeting, enhances operational decision-making, and improves resource allocation.'
      ],
      resources: [
        { icon: 'fab fa-github', label: 'GitHub Repository', href: 'https://github.com/husbot/Loan-Prediction-Model', color: '#24292e' },
        { icon: 'fas fa-code', label: 'View Source Code (.R)', href: 'LoanPredictionModel.R', color: '#276DC3' }
      ]
    },
    'proj-10': {
      title: 'Multi-Department Enterprise Security & Network Design',
      tag: 'Cisco Packet Tracer · VLAN · OSPF · SSHv2 · Network Security',
      desc: 'Designed and simulated a secure, scalable multi-site enterprise network within Cisco Packet Tracer to support a 38-employee organization across four core departments. The project addressed critical vulnerabilities in legacy infrastructures — implementing distinct topologies per sector, IPv4 subnetting, VLANs, SSHv2, and OSPF dynamic routing to maximize security and performance.',
      bullets: [
        'Implemented distinct structural topologies per department: Centralized Star (IT), wireless-enabled Tree (Customer Service), hierarchical Tree (HR), and redundant Ring-Mesh hybrid (Information Security).',
        'Achieved logical traffic isolation using structured IPv4 subnetting and VLANs to protect the core server room from unauthorized lateral movement.',
        'Hardened all routing interfaces with global password encryption, SSHv2 (replacing Telnet), and SNMP communities for centralized administrative auditing.',
        'Automated dynamic multi-area routing via OSPF; deployed centralized web applications and local DNS mapping for reliable cross-departmental access.',
        'Maximizes uptime through structural redundancy and establishes a robust information assurance baseline mitigating data leaks and unauthorized entry.'
      ],
      resources: [
        { icon: 'fab fa-github', label: 'GitHub Repository', href: 'https://github.com/husbot/Secure-Enterprise-Network-Design-and-Implementation-Using-Cisco-Packet-Tracer', color: '#24292e' },
        { icon: 'fas fa-network-wired', label: 'Packet Tracer File (.pkt)', href: 'Enterprise_Network_Insfrastructure_Design.pkt', color: '#1ba0d7' }
      ]
    },
    'proj-11': {
      title: 'Three-Department Enterprise Network Design',
      tag: 'Huawei eNSP · OSPF · VLAN · DHCP · WAN',
      desc: 'Designed and simulated a robust multi-site enterprise network within the Huawei eNSP environment to support the fictional expansion of XYZ Corporation — connecting Beijing headquarters with branch offices in Kuala Lumpur, Shanghai, and Chengdu via a Full Mesh WAN framework with local Star topologies for internal branch LANs.',
      bullets: [
        'Implemented a Full Mesh WAN framework ensuring continuous, redundant connectivity across Beijing HQ and three international branch offices.',
        'Utilized structured IPv4 subnetting and VLANs to logically isolate HR, Finance, and IT departments — reducing broadcast traffic and securing data transfers.',
        'Automated dynamic routing via OSPF alongside DHCP services for centralized IP address management.',
        'Deployed centralized core network services including local DNS and HTTP web servers ensuring secure cross-branch access to web applications.',
        'Optimized inter-office communication, guaranteed low-latency path convergence, and established a scalable network framework for corporate growth.'
      ],
      resources: [
        { icon: 'fab fa-github', label: 'GitHub Repository', href: 'https://github.com/husbot/Three-Department-Enterprise-Network-Design', color: '#24292e' },
        { icon: 'fas fa-file-pdf', label: 'Group Project Report (PDF)', href: 'Group Project Y.pdf', color: '#e53e3e' },
        { icon: 'fas fa-network-wired', label: 'Topology File (.topo)', href: '8pdcn.topo', color: '#3182ce' }
      ]
    }
  };

  // =============================================
  // 6. PROJECT MODAL — User control & freedom
  // =============================================
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalDesc = document.getElementById('modal-desc');
  const modalList = document.getElementById('modal-list');
  const modalSliderGallery = document.getElementById('modal-slider-gallery');

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalList.innerHTML = '';
    data.bullets.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      modalList.appendChild(li);
    });

    modalSliderGallery.innerHTML = '';
    if (data.images && data.images.length > 0) {
      data.images.forEach((imgData, idx) => {
        if (imgData.src && imgData.src.toLowerCase().endsWith('.mp4')) {
          // Render a native video player for .mp4 files
          const video = document.createElement('video');
          video.src = imgData.src;
          video.controls = true;
          video.setAttribute('aria-label', imgData.alt || `${data.title} video ${idx + 1}`);
          video.setAttribute('role', 'listitem');
          video.style.flexShrink = '0';
          video.style.width = '100%';
          video.style.maxWidth = '560px';
          video.style.borderRadius = '10px';
          video.style.background = '#000';
          video.style.outline = 'none';
          modalSliderGallery.appendChild(video);
        } else {
          const img = document.createElement('img');
          img.src = imgData.src;
          img.alt = imgData.alt || `${data.title} proof image ${idx + 1}`;
          img.setAttribute('role', 'listitem');
          modalSliderGallery.appendChild(img);
        }
      });
    }

    // Figma embed — show only if project has figma data
    const figmaWrap = document.getElementById('modal-figma-wrap');
    const figmaIframe = document.getElementById('modal-figma-iframe');
    const figmaLink = document.getElementById('modal-figma-link');
    if (data.figma) {
      figmaIframe.src = data.figma.embedUrl;
      figmaLink.href = data.figma.linkUrl;
      figmaWrap.style.display = 'block';
    } else {
      figmaIframe.src = '';
      figmaWrap.style.display = 'none';
    }

    // Resource links — GitHub, PDF, source code, Instagram, etc.
    const resourcesWrap = document.getElementById('modal-resources');
    const resourceLinksEl = document.getElementById('modal-resource-links');
    if (data.resources && data.resources.length > 0) {
      resourceLinksEl.innerHTML = '';
      data.resources.forEach(res => {
        const a = document.createElement('a');
        a.href = res.href;
        a.className = 'resource-link-btn';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', res.label);
        a.style.setProperty('--res-color', res.color || 'var(--navy)');
        a.innerHTML = `<i class="${res.icon}" aria-hidden="true"></i><span>${res.label}</span>`;
        resourceLinksEl.appendChild(a);
      });
      resourcesWrap.style.display = 'block';
    } else {
      resourcesWrap.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Focus management for accessibility
    setTimeout(() => {
      closeModalBtn?.focus();
      // Re-bind lightbox to any newly injected modal images
      document.dispatchEvent(new Event('portfolioModalOpen'));
    }, 50);
  };

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card').forEach(card => {
    const btn = card.querySelector('.open-modal-btn');
    if (btn) {
      btn.addEventListener('click', () => openModal(card.getAttribute('data-project')));
    }
  });

  closeModalBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.style.display === 'block') closeModal();
  });

  // =============================================
  // 7. TIMELINE ACCORDION — Expandable details
  // =============================================
  document.querySelectorAll('.clickable-timeline-card').forEach(card => {
    const toggle = () => {
      const isOpen = card.classList.toggle('active-card');
      card.setAttribute('aria-expanded', String(isOpen));
    };

    card.addEventListener('click', (e) => {
      // Don't close when interacting with inner interactive elements
      if (
        e.target.closest('.xp-gallery-slider') ||
        e.target.closest('ul') ||
        e.target.closest('a') ||
        e.target.tagName === 'IMG'
      ) return;
      toggle();
    });

    // Keyboard activation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // =============================================
  // 8. AWARDS PROOF TRAY — Vertical scroll toggle
  // =============================================
  document.querySelectorAll('.btn-view-proof').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const container = btn.closest('.sub-item-row-container');
      const tray = container?.querySelector('.proof-gallery-tray');
      if (!tray) return;

      const isOpen = tray.classList.toggle('open');
      tray.setAttribute('aria-hidden', String(!isOpen));
      btn.setAttribute('aria-expanded', String(isOpen));

      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
      }
    });
  });

  // Prevent parent closing when scrolling inside trays
  document.querySelectorAll('.proof-gallery-tray, .xp-gallery-slider, .modal-inline-slider').forEach(el => {
    el.addEventListener('click', e => e.stopPropagation());
  });

  // =============================================
  // 9. GLOBAL LIGHTBOX — Full-image viewer
  // =============================================
  const lightbox = document.getElementById('global-lightbox');
  const lightboxImg = document.getElementById('lightbox-target-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  const openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = (modal?.style.display === 'block') ? 'hidden' : '';
  };

  // Attach direct click listener to every img on the page except the lightbox img itself.
  // Using direct listeners bypasses any stopPropagation() on parent containers.
  const bindAllImages = () => {
    document.querySelectorAll('img:not(#lightbox-target-img)').forEach(img => {
      if (img.dataset.lightboxBound) return; // avoid double-binding
      img.dataset.lightboxBound = '1';
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation(); // stop accordion toggle, not lightbox
        openLightbox(img.src);
      });
    });
  };

  // Bind on load
  bindAllImages();

  // Re-bind after modal opens (JS-injected slider images)
  const _origOpenModal = window._portfolioOpenModal;
  document.addEventListener('portfolioModalOpen', bindAllImages);

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.style.display === 'flex') closeLightbox();
  });

  // =============================================
  // 10. SCROLL FADE-UP ANIMATIONS
  // =============================================
  const fadeEls = document.querySelectorAll(
    '.section-title, .about-grid, .stat-card, .project-card, .award-item, .timeline-item, .contact-card'
  );
  fadeEls.forEach(el => el.classList.add('fade-up'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

});