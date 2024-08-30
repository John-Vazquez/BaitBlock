window.addEventListener('scroll', function() {
    var arrow = document.getElementById('scroll-arrow');
    if (window.scrollY > 50) {
        arrow.style.opacity = '0'; // Hide the arrow when scrolled down
    } else {
        arrow.style.opacity = '1'; // Show the arrow when at the top
    }
});
