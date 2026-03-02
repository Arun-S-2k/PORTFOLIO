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
});