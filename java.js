//AWAL REGISTRASI//
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const alertError = document.getElementById('alertError');
    const alertMsg = document.getElementById('alertErrorMsg');
    const btnSubmit = document.getElementById('btnSubmit');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pass = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;

        // Validasi Sederhana
        if (!fullname || !email || !pass || !confirm) {
            showError("Mohon lengkapi semua data.");
            return;
        }

        if (pass !== confirm) {
            showError("Konfirmasi kata sandi tidak cocok.");
            return;
        }

        if (pass.length < 6) {
            showError("Kata sandi minimal 6 karakter.");
            return;
        }

        // Simulasi Sukses
        alertError.classList.remove('show');
        btnSubmit.textContent = "Memproses...";
        btnSubmit.disabled = true;

        setTimeout(() => {
            // --- TAMBAHAN: NUTUP MODAL & BUKA BERANDA ---
            document.getElementById('modalRegistrasi').style.display = 'none';
            const beranda = document.getElementById('halamanBeranda');
            beranda.style.display = 'flex';
            beranda.classList.remove('content-hidden');
            document.body.classList.remove('modal-open');
            window.scrollTo(0, 0);
            
            // window.location.href = 'login.html'; // Teks asli tetap ada tapi aku matikan biar pop-upnya jalan
        }, 1000);
    });

    function showError(message) {
        alertMsg.textContent = message;
        alertError.classList.add('show');
    }
});

//AKHIR REGISTRASI REGISTRASI//


// =============================================FOOTER HEADER========================================================= //


// Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // ===========================================//
    // Memperbaiki Navigasi Beranda agar tidak pindah file
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');

        // Kalau yang diklik adalah link internal (diawali #)
        if (target.startsWith('#')) {
            e.preventDefault(); // Stop browser biar gak pindah halaman/file

            // 1. Sembunyikan Modal/Overlay Registrasi
            const overlay = document.querySelector('.overlay-registrasi') || document.querySelector('.overlay-modal');
            if (overlay) {
                overlay.style.display = 'none';
            }

            // 2. Pastikan Halaman Beranda muncul
            const beranda = document.getElementById('halamanBeranda');
            if (beranda) {
                beranda.style.display = 'flex';
                beranda.classList.remove('content-hidden');
            }

            // 3. Aktifkan scroll lagi di body
            document.body.classList.remove('modal-open');

            // 4. Lari ke bagian (section) yang dituju
            const section = document.querySelector(target);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 80, // Biar gak kepotong navbar
                    behavior: 'smooth'
                });
            }
        }
    });
});
