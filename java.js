document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const alertError = document.getElementById('alertError');
    const alertMsg = document.getElementById('alertErrorMsg');
    const btnSubmit = document.getElementById('btnSubmit');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Mengambil nilai input
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const pass = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;

        // Validasi Sederhana
        if (!fullname || !email || !whatsapp) {
            showAlert("Semua kolom wajib diisi.");
            return;
        }

        if (pass !== confirm) {
            showAlert("Konfirmasi kata sandi tidak cocok.");
            return;
        }

        if (pass.length < 6) {
            showAlert("Kata sandi minimal harus 6 karakter.");
            return;
        }

        // Jika validasi lolos
        alertError.classList.remove('show');
        btnSubmit.textContent = "Mendaftarkan...";
        btnSubmit.disabled = true;

        // Simulasi pengiriman data ke server
        setTimeout(() => {
            alert("Pendaftaran Berhasil! Selamat datang di Luminara.");
            window.location.href = 'login.html';
        }, 1500);
    });

    function showAlert(message) {
        alertMsg.textContent = message;
        alertError.classList.add('show');
        // Scroll ke atas alert agar terlihat
        alertError.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
