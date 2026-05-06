document.addEventListener('DOMContentLoaded', function () {
  const wrap = document.querySelector('.wrap');

  if (wrap) {
    requestAnimationFrame(() => {
      wrap.classList.add('show');
    });
  } else {
    console.warn('No .wrap element found');
  }

  const preloader = document.getElementById('preloader');
  if (preloader) preloader.style.display = 'none';

  console.log('main.js executed');

  // Tabs (pill) behavior
  const tabButtons = document.querySelectorAll('.tab-pill');
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        const panels = document.querySelectorAll('.tab-panel');
        panels.forEach(p =>
          p.classList.toggle('active', p.id === `${target}-panel`)
        );
      });
    });
  }

  // Typing Animation for Tagline
  const p1Text = "Qualitative Insights";
  const p2Text = "Meets";
  const p3Text = "Quantitative Evidence";
  const totalLength = p1Text.length + p2Text.length + p3Text.length;

  const p1El = document.getElementById('tagline-p1');
  const p2El = document.getElementById('tagline-p2');
  const p3El = document.getElementById('tagline-p3');

  if (p1El && p2El && p3El) {
    let charIndex = 0;
    
    // Wait for the main wrap animation to finish (1500ms transition in CSS)
    setTimeout(() => {
      function typeNextChar() {
        if (charIndex < totalLength) {
          charIndex++;
          
          const p1Len = Math.min(charIndex, p1Text.length);
          p1El.textContent = p1Text.slice(0, p1Len);
          
          const p2Len = Math.max(0, Math.min(charIndex - p1Text.length, p2Text.length));
          p2El.textContent = p2Text.slice(0, p2Len);
          
          const p3Len = Math.max(0, charIndex - p1Text.length - p2Text.length);
          p3El.textContent = p3Text.slice(0, p3Len);

          // Calculate an ease-in-out typing speed
          const x = (charIndex / totalLength) * 2 - 1;
          const ease = x * x * x * x; // quartic easing for more pronounced smooth ends
          const nextDelay = 30 + (ease * 120); // 30ms at fastest, 150ms at slowest

          setTimeout(typeNextChar, nextDelay);
        } else {
          // Add blinking cursor
          p3El.innerHTML = p3Text + '<span class="cursor">|</span>';
        }
      }
      
      typeNextChar();
    }, 1500);
  }
});