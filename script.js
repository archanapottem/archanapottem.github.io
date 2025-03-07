// Responsive Navigation Toggle (If You Add a Menu in Future)
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            document.getElementById("nav-links").classList.toggle("show");
        });
    }
});
