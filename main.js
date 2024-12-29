document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navbar-link");
    const pages = document.querySelectorAll("[data-page]");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add active class to clicked link
            link.classList.add("active");

            // Get the target section from the button text or data
            const targetPage = link.textContent.trim().toLowerCase();

            // Hide all sections
            pages.forEach(page => page.style.display = "none");

            // Show the target section
            const targetSection = document.querySelector(`[data-page="${targetPage}"]`);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });

    // Optional: Show the first section by default
    if (pages.length > 0) {
        pages.forEach(page => page.style.display = "none"); // Hide all sections initially
        const firstSection = document.querySelector("[data-page='portfolio']") || pages[0];
        firstSection.style.display = "block"; // Show the portfolio section or the first section by default
    }
});
