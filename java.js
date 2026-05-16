

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
// LOGIN
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const btnBukaLogin = document.getElementById("btnBukaLogin");
    const modalLogin = document.getElementById("modalLogin");
    const modalRegistrasi = document.getElementById("modalRegistrasi");
    const linkKeDaftar = document.getElementById("linkKeDaftar");

    // Tombol Masuk di navbar
    if (btnBukaLogin) {
        btnBukaLogin.addEventListener("click", function (e) {
            e.preventDefault();
            modalLogin.style.display = "flex";
            document.body.classList.add("modal-open");
        });
    }

    // Link "Registrasi di sini"
    if (linkKeDaftar) {
        linkKeDaftar.addEventListener("click", function (e) {
            e.preventDefault();
            modalLogin.style.display = "none";
            modalRegistrasi.style.display = "flex";
        });
    }

    // Klik area luar modal untuk menutup
    window.addEventListener("click", function (e) {
        if (e.target === modalLogin) {
            modalLogin.style.display = "none";
            document.body.classList.remove("modal-open");
        }

        if (e.target === modalRegistrasi) {
            modalRegistrasi.style.display = "none";
            document.body.classList.remove("modal-open");
            const linkKeLogin = document.getElementById('linkKeLogin');

if (linkKeLogin) {
    linkKeLogin.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('modalRegistrasi').style.display = 'none';
        document.getElementById('modalLogin').style.display = 'flex';
        
    });
}
        }
    });
});
function showPage(pageId) {
  // sembunyikan semua page
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.remove("active"));

  // tampilkan page yang dipilih
  document.getElementById(pageId).classList.add("active");
}
