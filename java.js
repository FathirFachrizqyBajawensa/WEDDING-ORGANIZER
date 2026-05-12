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
            alert("Akun berhasil dibuat!");
            window.location.href = 'login.html';
        }, 1000);
    });

    function showError(message) {
        alertMsg.textContent = message;
        alertError.classList.add('show');
    }
});


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
