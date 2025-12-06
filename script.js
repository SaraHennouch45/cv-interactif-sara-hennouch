
document.addEventListener('DOMContentLoaded', function() {
    
   
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                   
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                   
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });

    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Retour en haut';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    
    function ajouterBarresProgression() {
        const competencesTech = document.querySelector('#competences .col-md-6:first-child ul');
        const competencesSoft = document.querySelector('#competences .col-md-6:last-child ul');
        
        if (competencesTech && competencesSoft) {
           
            const skillsTech = [
                { nom: 'Microsoft Office', niveau: 70 },
                { nom: 'Programmation & BDD', niveau: 80 },
                { nom: 'Développement web', niveau: 80 },
                { nom: 'Outils informatiques', niveau: 90 }
            ];
            
            
            const skillsSoft = [
                { nom: 'Communication', niveau: 100 },
                { nom: 'Écoute active', niveau: 85 },
                { nom: 'Travail d\'équipe', niveau: 88 }
            ];

            competencesTech.innerHTML = '';
            skillsTech.forEach(skill => {
                const li = document.createElement('li');
                li.className = 'mb-3';
                li.innerHTML = `
                    ${skill.nom}
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="${skill.niveau}"></div>
                    </div>
                `;
                competencesTech.appendChild(li);
            });

            competencesSoft.innerHTML = '';
            skillsSoft.forEach(skill => {
                const li = document.createElement('li');
                li.className = 'mb-3';
                li.innerHTML = `
                    ${skill.nom}
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="${skill.niveau}"></div>
                    </div>
                `;
                competencesSoft.appendChild(li);
            });
        }

        const languesUl = document.querySelector('#competences h5.text-primary.mt-4 + ul');
        if (languesUl) {
            const langues = [
                { nom: 'Arabe', niveau: 100, description: 'Natif' },
                { nom: 'Français', niveau: 89, description: 'Courant' },
                { nom: 'Anglais', niveau: 90, description: 'Courant' }
            ];

            languesUl.innerHTML = '';
            langues.forEach(langue => {
                const li = document.createElement('li');
                li.className = 'mb-3';
                li.innerHTML = `
                    ${langue.nom} : ${langue.description}
                    <div class="skill-bar">
                        <div class="skill-progress" data-progress="${langue.niveau}"></div>
                    </div>
                `;
                languesUl.appendChild(li);
            });
        }
    }

    ajouterBarresProgression();

    // === 5. ANIMATION DES BARRES AU SCROLL ===
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const competencesSection = document.querySelector('#competences');
    if (competencesSection) {
        observer.observe(competencesSection);
    }

    // === 6. EFFET DE TYPING SUR LE TITRE ===
    const titre = document.querySelector('#infos h1');
    if (titre) {
        const texteOriginal = titre.textContent;
        titre.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < texteOriginal.length) {
                titre.textContent += texteOriginal.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // === 7. AJOUT D'EFFETS HOVER DYNAMIQUES ===
    const experienceItems = document.querySelectorAll('#experience > div, #formation li');
    experienceItems.forEach(item => {
        item.classList.add('card-hover');
    });

    // === 8. ANIMATION D'APPARITION DES ÉLÉMENTS AU SCROLL ===
    const fadeElements = document.querySelectorAll('section');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // === 9. MESSAGE DE BIENVENUE DANS LA CONSOLE ===
    console.log('%c🎓 Bienvenue sur mon CV interactif !', 'color: #4a90e2; font-size: 20px; font-weight: bold;');
    console.log('%c✨ Développé avec HTML, CSS, Bootstrap & JavaScript', 'color: #2c3e50; font-size: 14px;');

});

// === 10. EASTER EGG - CLIC SUR LA PHOTO ===
document.addEventListener('DOMContentLoaded', function() {
    const photo = document.querySelector('.photo');
    let clicCount = 0;
    
    if (photo) {
        photo.addEventListener('click', function() {
            clicCount++;
            this.classList.add('pulse');
            
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
            
            if (clicCount === 5) {
                alert('🎉 Merci d\'avoir exploré mon CV interactif !');
                clicCount = 0;
            }
        });
    }
});