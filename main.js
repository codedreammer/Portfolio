document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");
    const navButtons = document.querySelectorAll("[data-nav-target]");
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");

    const normalizeValue = (value) =>
        value.toLowerCase().trim().replace(/\s+/g, "-");

    const goToPage = (targetPage) => {
        const normalizedTarget = normalizeValue(targetPage);

        navLinks.forEach((link) => {
            const linkTarget = normalizeValue(link.dataset.navTarget || link.textContent);
            link.classList.toggle("active", linkTarget === normalizedTarget);
        });

        pages.forEach((page) => {
            page.classList.toggle("active", normalizeValue(page.dataset.page) === normalizedTarget);
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            goToPage(link.dataset.navTarget || link.textContent);
        });
    });

    navButtons.forEach((button) => {
        if (button.hasAttribute("data-nav-link")) {
            return;
        }

        button.addEventListener("click", () => {
            goToPage(button.dataset.navTarget);
        });
    });

    if (sidebar && sidebarBtn) {
        sidebarBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }

    const filterButtons = document.querySelectorAll("[data-filter-btn]");
    const filterSelect = document.querySelector("[data-select]");
    const filterSelectValue = document.querySelector("[data-select-value]");
    const filterSelectItems = document.querySelectorAll("[data-select-item]");
    const projectItems = document.querySelectorAll("[data-filter-item]");

    const setActiveFilterButton = (value) => {
        const normalizedValue = normalizeValue(value);

        filterButtons.forEach((button) => {
            button.classList.toggle("active", normalizeValue(button.textContent) === normalizedValue);
        });
    };

    const applyProjectFilter = (value) => {
        const normalizedValue = normalizeValue(value);

        projectItems.forEach((item) => {
            const category = normalizeValue(item.dataset.category || "");
            const shouldShow = normalizedValue === "all" || category === normalizedValue;
            item.classList.toggle("active", shouldShow);
        });

        setActiveFilterButton(value);

        if (filterSelectValue) {
            filterSelectValue.textContent = value;
        }

        if (filterSelect) {
            filterSelect.classList.remove("active");
        }
    };

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            applyProjectFilter(button.textContent);
        });
    });

    if (filterSelect) {
        filterSelect.addEventListener("click", () => {
            filterSelect.classList.toggle("active");
        });
    }

    filterSelectItems.forEach((item) => {
        item.addEventListener("click", () => {
            applyProjectFilter(item.textContent);
        });
    });

    const form = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formButton = document.querySelector("[data-form-btn]");

    const updateFormButtonState = () => {
        if (!form || !formButton) {
            return;
        }

        formButton.disabled = !form.checkValidity();
    };

    formInputs.forEach((input) => {
        input.addEventListener("input", updateFormButtonState);
    });

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = form.querySelector("[name='fullname']").value.trim();
            const email = form.querySelector("[name='email']").value.trim();
            const message = form.querySelector("[name='message']").value.trim();

            const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            window.location.href = `mailto:nkanal38@gmail.com?subject=${subject}&body=${body}`;
        });

        updateFormButtonState();
    }

    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll(".carousel-slide");
        const dots = carousel.parentElement.querySelectorAll(".carousel-dot");

        if (slides.length <= 1) {
            return;
        }

        let currentIndex = 0;

        const showSlide = (nextIndex) => {
            slides.forEach((slide, index) => {
                slide.classList.toggle("active", index === nextIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === nextIndex);
            });

            currentIndex = nextIndex;
        };

        setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }, 2500);
    });

    goToPage("about");
    applyProjectFilter("All");
});
