<script>
    
    // ---- Navbar scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ---- Hamburger ----
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // ---- Toggle password visibility ----
    const toggleBtn  = document.getElementById('togglePassword');
    const pwdInput   = document.getElementById('password');
    const eyeIcon    = document.getElementById('eyeIcon');

    const eyeOpen = `<path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"/><circle cx="10" cy="10" r="2.5"/>`;
    const eyeOff  = `<path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" opacity=".3"/><path d="M3 3l14 14" stroke-linecap="round"/><circle cx="10" cy="10" r="2.5" opacity=".3"/>`;

    toggleBtn.addEventListener('click', () => {
      const isHidden = pwdInput.type === 'password';
      pwdInput.type  = isHidden ? 'text' : 'password';
      eyeIcon.innerHTML = isHidden ? eyeOff : eyeOpen;
    });

    // ---- Form validation & submit ----
    const loginForm    = document.getElementById('loginForm');
    const alertError   = document.getElementById('alertError');
    const alertSuccess = document.getElementById('alertSuccess');
    const alertMsg     = document.getElementById('alertErrorMsg');
    const btnSubmit    = document.getElementById('btnSubmit');

    function showError(msg) {
      alertSuccess.classList.remove('show');
      alertMsg.textContent = msg;
      alertError.classList.add('show');
      loginForm.classList.add('shake');
      setTimeout(() => loginForm.classList.remove('shake'), 500);
    }

    function showSuccess() {
      alertError.classList.remove('show');
      alertSuccess.classList.add('show');
    }

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email    = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      // Basic validation
      if (!email) { showError('Harap masukkan alamat email Anda.'); return; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) { showError('Format email tidak valid.'); return; }
      if (!password) { showError('Harap masukkan kata sandi Anda.'); return; }
      if (password.length < 6) { showError('Kata sandi minimal 6 karakter.'); return; }

      // Simulate login (demo only — replace with real auth)
      btnSubmit.textContent = 'Memproses...';
      btnSubmit.disabled = true;

      setTimeout(() => {
        // Demo: any email/password combo succeeds
        showSuccess();
        setTimeout(() => {
          // Redirect to beranda after "login"
          window.location.href = 'beranda.html';
        }, 1200);
      }, 1000);
    });
  </script>
<script>
const openingScreen = document.getElementById('openingScreen');
const openButton = document.getElementById('openButton');

openButton.addEventListener('click', () => {
  openingScreen.classList.add('open');

  setTimeout(() => {
    openingScreen.style.display = 'none';
  }, 1600);
});
</script>
