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

        alertError.classList.remove('show');
        btnSubmit.textContent = "Memproses...";
        btnSubmit.disabled = true;

        setTimeout(() => {
            // Setelah daftar → langsung ke halaman login
            document.getElementById('modalRegistrasi').style.display = 'none';
            document.getElementById('modalLogin').style.display = 'flex';
        }, 1000);
    });

    function showError(message) {
        alertMsg.textContent = message;
        alertError.classList.add('show');
    }
});
//AKHIR REGISTRASI//


// ============================================================
// NAVBAR, HAMBURGER, SCROLL REVEAL
// Dipindah ke dalam DOMContentLoaded supaya tidak error
// (elemen navbar ada di dalam #halamanBeranda yang hidden)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Navigasi internal (href="#...") — jangan pindah file
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            if (target && target.startsWith('#') && target !== '#') {
                e.preventDefault();

                // Sembunyikan semua modal
                const overlayReg = document.getElementById('modalRegistrasi');
                const overlayLog = document.getElementById('modalLogin');
                if (overlayReg) overlayReg.style.display = 'none';
                if (overlayLog) overlayLog.style.display = 'none';

                // Tampilkan beranda
                const beranda = document.getElementById('halamanBeranda');
                if (beranda) {
                    beranda.style.display = 'flex';
                    beranda.classList.remove('content-hidden');
                }

                document.body.classList.remove('modal-open');

                // Scroll ke section yang dituju
                const section = document.querySelector(target);
                if (section) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: section.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 50);
                }
            }
        });
    });

    // Tombol Masuk di navbar → buka modal login
    const btnBukaLogin = document.getElementById('btnBukaLogin');
    if (btnBukaLogin) {
        btnBukaLogin.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('modalRegistrasi').style.display = 'none';
            document.getElementById('halamanBeranda').style.display  = 'none';
            document.getElementById('modalLogin').style.display = 'flex';
            document.body.classList.add('modal-open');
        });
    }

});


// ============================================================
// LOGIN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    const loginForm    = document.getElementById('loginForm');
    if (!loginForm) return;

    const alertError   = document.getElementById('loginAlertError');
    const alertSuccess = document.getElementById('loginAlertSuccess');
    const alertErrMsg  = document.getElementById('loginAlertErrorMsg');
    const alertSucMsg  = document.getElementById('loginAlertSuccessMsg');
    const btnSubmit    = document.getElementById('loginBtnSubmit');
    const btnText      = btnSubmit.querySelector('.login-btn-text');
    const btnSpinner   = document.getElementById('loginBtnSpinner');
    const togglePass   = document.getElementById('togglePassword');
    const passInput    = document.getElementById('loginPassword');
    const emailInput   = document.getElementById('loginEmail');
    const rememberMe   = document.getElementById('rememberMe');

    // Tombol "Daftar Sekarang" di dalam login → kembali ke registrasi
    document.getElementById('linkKeDaftar')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modalLogin').style.display = 'none';
        document.getElementById('modalRegistrasi').style.display = 'flex';
    });

    // Tombol "Lanjutkan sebagai Tamu"
    document.getElementById('btnGuest')?.addEventListener('click', () => {
        document.getElementById('modalLogin').style.display = 'none';
        const beranda = document.getElementById('halamanBeranda');
        beranda.style.display = 'flex';
        beranda.classList.remove('content-hidden');
        document.body.classList.remove('modal-open');
        window.scrollTo(0, 0);
    });

    // Remember Me — isi ulang email kalau pernah disimpan
    const savedEmail = localStorage.getItem('luminara_remember_email');
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        if (rememberMe) rememberMe.checked = true;
    }

    // Toggle tampilkan/sembunyikan sandi
    togglePass?.addEventListener('click', () => {
        const show = passInput.type === 'password';
        passInput.type = show ? 'text' : 'password';
        togglePass.querySelector('.eye-icon').style.display     = show ? 'none'   : 'inline';
        togglePass.querySelector('.eye-off-icon').style.display = show ? 'inline' : 'none';
    });

    // Submit login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const pass  = passInput.value;

        alertError.classList.remove('show');
        alertSuccess.classList.remove('show');

        if (!email || !pass) {
            return showLoginError('Mohon isi email dan kata sandi terlebih dahulu.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return showLoginError('Format email tidak valid.');
        }
        if (pass.length < 6) {
            return showLoginError('Kata sandi minimal 6 karakter.');
        }

        // Loading
        btnText.style.display    = 'none';
        btnSpinner.style.display = 'inline-flex';
        btnSubmit.disabled = true;

        if (rememberMe && rememberMe.checked) {
            localStorage.setItem('luminara_remember_email', email);
        } else {
            localStorage.removeItem('luminara_remember_email');
        }

        setTimeout(() => {
            btnText.style.display    = 'inline';
            btnSpinner.style.display = 'none';
            btnSubmit.disabled = false;

            // ✅ Simulasi berhasil — ganti dengan validasi backend nanti
            alertSucMsg.textContent = 'Login berhasil! Mengarahkan ke beranda...';
            alertSuccess.classList.add('show');

            setTimeout(() => {
                document.getElementById('modalLogin').style.display = 'none';
                const beranda = document.getElementById('halamanBeranda');
                beranda.style.display = 'flex';
                beranda.classList.remove('content-hidden');
                document.body.classList.remove('modal-open');
                window.scrollTo(0, 0);
            }, 1200);
        }, 1000);
    });

    // Hapus error saat user mulai ketik
    [emailInput, passInput].forEach(inp => {
        inp?.addEventListener('input', () => alertError.classList.remove('show'));
    });

    function showLoginError(msg) {
        alertErrMsg.textContent = msg;
        alertError.classList.add('show');
    }

});
