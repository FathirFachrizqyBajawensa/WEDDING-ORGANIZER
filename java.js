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
// ================================================
// LOGIN — Bagian [nama kamu]
// ================================================

(function () {
  const loginForm    = document.getElementById('loginForm');
  if (!loginForm) return; // Biar aman kalau elemen belum ada

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

  // Tombol "Daftar Sekarang" di dalam login → tampilkan modal registrasi
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
  if (savedEmail) { emailInput.value = savedEmail; rememberMe.checked = true; }

  // Toggle tampilkan/sembunyikan sandi
  togglePass?.addEventListener('click', () => {
    const show = passInput.type === 'password';
    passInput.type = show ? 'text' : 'password';
    togglePass.querySelector('.eye-icon').style.display    = show ? 'none'   : 'inline';
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
      return showError('Mohon isi email dan kata sandi terlebih dahulu.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return showError('Format email tidak valid.');
    }
    if (pass.length < 6) {
      return showError('Kata sandi minimal 6 karakter.');
    }

    // Loading
    btnText.style.display    = 'none';
    btnSpinner.style.display = 'inline-flex';
    btnSubmit.disabled = true;

    if (rememberMe.checked) {
      localStorage.setItem('luminara_remember_email', email);
    } else {
      localStorage.removeItem('luminara_remember_email');
    }

    setTimeout(() => {
      btnText.style.display    = 'inline';
      btnSpinner.style.display = 'none';
      btnSubmit.disabled = false;

      // ✅ Simulasi berhasil — nanti ganti dengan validasi backend
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

  [emailInput, passInput].forEach(inp => {
    inp.addEventListener('input', () => alertError.classList.remove('show'));
  });

  function showError(msg) {
    alertErrMsg.textContent = msg;
    alertError.classList.add('show');
  }
})();
