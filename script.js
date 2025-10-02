// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Improved Form Submission
const contactForm = document.querySelector('form[name="contact"]');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
            (currentLang === 'en' ? 'Sending...' : 'Menghantar...');
        submitButton.disabled = true;
        
        try {
            // Get form data
            const formData = new FormData(this);
            
            // Send to Netlify
            const response = await fetch('/', {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                // Success message
                showNotification(
                    currentLang === 'en' 
                        ? 'Thank you! Your message has been sent successfully.' 
                        : 'Terima kasih! Mesej anda telah berjaya dihantar.',
                    'success'
                );
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error message
            showNotification(
                currentLang === 'en' 
                    ? 'Sorry, there was an error sending your message. Please try again.' 
                    : 'Maaf, terdapat ralat semasa menghantar mesej. Sila cuba lagi.',
                'error'
            );
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = 'var(--primary)';
    } else {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s;
    }
    
    .notification button:hover {
        background-color: rgba(255,255,255,0.2);
    }
    
    @media (max-width: 576px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);

// Add floating elements dynamically
function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    const colors = ['var(--primary)', 'var(--accent)', 'var(--secondary)'];
    
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        const size = Math.random() * 100 + 50;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 20 + 10;
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.top = `${top}%`;
        element.style.left = `${left}%`;
        element.style.background = color;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        floatingContainer.appendChild(element);
    }
}

createFloatingElements();

// Language Toggle
const translations = {
    en: {
        page: {
            title: " AMR | Web Developer"
        },
        nav: {
            logo: "WebDev.",
            home: "Home",
            about: "About",
            projects: "Projects",
            skills: "Skills",
            contact: "Contact"
        },
        hero: {
            title: "Web Developer & IoT Specialist",
            description: "Freelance developer with 3 years of experience in web app development, systems, and IoT solutions. Based in Malaysia.",
            viewProjects: "View My Projects",
            contactMe: "Contact Me"
        },
        about: {
            title: "About Me",
            subtitle: "Computer Science Student and Freelancer with experience in web and system development",
            content: {
                title: "Computer Science Student & Freelance Developer",
                paragraph1: "I am a Computer Science student with a deep interest in web development, applications, and IoT systems. With 3 years of experience, I have successfully completed various projects for clients and academic requirements.",
                paragraph2: "I have skills in various technologies including HTML, CSS, JavaScript, PHP, Java, Flutter, and many more. I always strive to produce high-quality solutions that meet client requirements.",
                paragraph3: "As a dedicated and disciplined individual, I am always looking for opportunities to improve my skills and knowledge in the ever-evolving field of technology."
            }
        },
        projects: {
            title: "My Projects",
            subtitle: "Some of my successfully completed projects",
            project1: {
                title: "School Prefects Council Static Website",
                description: "Static website for school prefects council with responsive and modern design."
            },
            project2: {
                title: "Student Late Attendance System",
                description: "Digital system to manage and monitor late student attendance at school."
            },
            project3: {
                title: "Android Application - National Level",
                description: "Android application that won a competition at the national level."
            },
            project4: {
                title: "Restaurant Food Reservation System",
                description: "Online system for food reservations at restaurants with menu and order management."
            },
            project5: {
                title: "Smart Parking System",
                description: "Built a web-based smart parking system with features such as user registration, booking, slot availability track."
            },
            project6: {
                title: "IoT Automatic Water Pump System",
                description: "Automatic water pump system using IoT technology for remote control and monitoring."
            },
            tags: {
                html: "HTML/CSS",
                js: "JavaScript",
                static: "Static Web",
                php: "PHP",
                mysql: "MySQL",
                webapp: "Web App",
                flutter: "Flutter",
                android: "Android",
                mobile: "Mobile App",
                fullstack: "Full Stack",
                iot: "IoT",
                arduino: "Arduino",
                automation: "Automation"
            }
        },
        skills: {
            title: "Technical Skills",
            subtitle: "Technologies and skills I have mastered",
            frontend: "Frontend Development",
            backend: "Backend Development",
            database: "Database",
            mobile: "Mobile & IoT"
        },
        contact: {
            title: "Contact Me",
            subtitle: "Feel free to contact me for any projects or inquiries",
            email: "Email",
            location: "Location",
            career: "Career",
            form: {
                name: "Name",
                email: "Email",
                subject: "Subject",
                message: "Message",
                send: "Send Message"
            }
        },
        footer: {
            logo: "AMR|SHB",
            copyright: "© 2025 AMR|SHB. All rights reserved."
        }
    },
    ms: {
        page: {
            title: "AMR | Pembangun Web "
        },
        nav: {
            logo: "WebDev.",
            home: "Utama",
            about: "Tentang",
            projects: "Projek",
            skills: "Kemahiran",
            contact: "Hubungi"
        },
        hero: {
            title: "Pembangun Web & Pakar IoT",
            description: "Pembangun bebas dengan pengalaman 3 tahun dalam pembangunan aplikasi web, sistem, dan penyelesaian IoT. Berpangkalan di Malaysia.",
            viewProjects: "Lihat Projek Saya",
            contactMe: "Hubungi Saya"
        },
        about: {
            title: "Tentang Saya",
            subtitle: "Pelajar Sains Komputer dan Freelancer dengan pengalaman dalam pembangunan web dan sistem",
            content: {
                title: "Pelajar Sains Komputer & Pembangun Bebas",
                paragraph1: "Saya adalah seorang pelajar Sains Komputer yang mempunyai minat yang mendalam dalam pembangunan web, aplikasi, dan sistem IoT. Dengan pengalaman 3 tahun, saya telah berjaya menyelesaikan pelbagai projek untuk klien dan keperluan akademik.",
                paragraph2: "Saya mempunyai kemahiran dalam pelbagai teknologi termasuk HTML, CSS, JavaScript, PHP, Java, Flutter, dan banyak lagi. Saya sentiasa berusaha untuk menghasilkan penyelesaian berkualiti tinggi yang memenuhi keperluan klien.",
                paragraph3: "Sebagai individu yang berdedikasi dan berdisiplin, saya sentiasa mencari peluang untuk meningkatkan kemahiran dan pengetahuan saya dalam bidang teknologi yang sentiasa berkembang."
            }
        },
        projects: {
            title: "Projek Saya",
            subtitle: "Beberapa projek yang telah saya siapkan dengan jayanya",
            project1: {
                title: "Laman Web Statik Majlis Pengawas Sekolah",
                description: "Laman web statik untuk majlis pengawas sekolah dengan reka bentuk responsif dan moden."
            },
            project2: {
                title: "Sistem Kehadiran Lewat Pelajar",
                description: "Sistem digital untuk mengurus dan memantau kehadiran lewat pelajar di sekolah."
            },
            project3: {
                title: "Aplikasi Android - Peringkat Kebangsaan",
                description: "Aplikasi Android yang memenangi pertandingan di peringkat kebangsaan."
            },
            project4: {
                title: "Sistem Tempahan Makanan di Restoran",
                description: "Sistem dalam talian untuk tempahan makanan di restoran dengan pengurusan menu dan pesanan."
            },
            project5: {
                title: "Sistem Parking Pintar ",
                description: "Membina sistem tempat letak kereta pintar berasaskan web dengan ciri seperti pendaftaran pengguna, tempahan, trek ketersediaan slot."
            },
            project6: {
                title: "Sistem Pam Air Automatik IoT",
                description: "Sistem pam air automatik menggunakan teknologi IoT untuk kawalan dan pemantauan jarak jauh."
            },
            tags: {
                html: "HTML/CSS",
                js: "JavaScript",
                static: "Web Statik",
                php: "PHP",
                mysql: "MySQL",
                webapp: "Aplikasi Web",
                flutter: "Flutter",
                android: "Android",
                mobile: "Aplikasi Mudah Alih",
                fullstack: "Full Stack",
                iot: "IoT",
                arduino: "Arduino",
                automation: "Automasi"
            }
        },
        skills: {
            title: "Kemahiran Teknikal",
            subtitle: "Teknologi dan kemahiran yang saya kuasai",
            frontend: "Pembangunan Frontend",
            backend: "Pembangunan Backend",
            database: "Pangkalan Data",
            mobile: "Mudah Alih & IoT"
        },
        contact: {
            title: "Hubungi Saya",
            subtitle: "Jangan segan untuk menghubungi saya untuk sebarang projek atau pertanyaan",
            email: "E-mel",
            location: "Lokasi",
            career: "Kerjaya",
            form: {
                name: "Nama",
                email: "E-mel",
                subject: "Subjek",
                message: "Mesej",
                send: "Hantar Mesej"
            }
        },
        footer: {
            logo: "AMR|SHB",
            copyright: "© 2025 AMR|SHB. Hak cipta terpelihara."
        }
    }
};

let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ms' : 'en';
    document.getElementById('langIndicator').textContent = currentLang.toUpperCase();
    document.documentElement.lang = currentLang;
    updateContent();
    localStorage.setItem('preferredLanguage', currentLang);
}

function updateContent() {
    // Update page title
    document.title = translations[currentLang].page.title;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let translation = translations[currentLang];
        
        // Navigate through the translation object
        for (let i = 0; i < keys.length; i++) {
            translation = translation[keys[i]];
            if (translation === undefined) break;
        }
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update form placeholders
    const formElements = document.querySelectorAll('.form-control');
    formElements.forEach(element => {
        const id = element.id;
        if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            if (label && label.hasAttribute('data-translate')) {
                const key = label.getAttribute('data-translate');
                const keys = key.split('.');
                let translation = translations[currentLang];
                
                for (let i = 0; i < keys.length; i++) {
                    translation = translation[keys[i]];
                    if (translation === undefined) break;
                }
                
                if (translation) {
                    element.placeholder = translation;
                }
            }
        }
    });
}

// Initialize language based on stored preference
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
        currentLang = storedLang;
        document.getElementById('langIndicator').textContent = currentLang.toUpperCase();
        document.documentElement.lang = currentLang;
        updateContent();
    }
});