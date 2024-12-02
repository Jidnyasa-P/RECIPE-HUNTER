// JavaScript to toggle FAQ answers
document.querySelectorAll('.faq-item h3').forEach(item => {
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    parent.classList.toggle('active');
  });
});
