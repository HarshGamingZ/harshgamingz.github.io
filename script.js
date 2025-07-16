// JavaScript functions for dark/light mode and section management

/**
 * Toggles the website to dark mode.
 * Applies the 'dark-mode' class to the body and updates the text indicator.
 * Stores the preference in local storage.
 */
function darkMode() {
    let element = document.body;
    let content = document.getElementById("DarkModetext");
    element.classList.remove("light-mode"); // Ensure light-mode is removed
    element.classList.add("dark-mode");
    content.innerText = "Dark Mode is ON";
    localStorage.setItem('theme', 'dark'); // Save preference
}

/**
 * Toggles the website to light mode.
 * Applies the 'light-mode' class to the body and updates the text indicator.
 * Stores the preference in local storage.
 */
function lightMode() {
    let element = document.body;
    let content = document.getElementById("DarkModetext");
    element.classList.remove("dark-mode"); // Ensure dark-mode is removed
    element.classList.add("light-mode");
    content.innerText = "Dark Mode is OFF";
    localStorage.setItem('theme', 'light'); // Save preference
}

// Script for managing section visibility and initial theme load
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('.content-section');
    const darkModetext = document.getElementById("DarkModetext");

    /**
     * Shows a specific content section and hides all others with a fade-in effect.
     * Also updates the active class on the corresponding navigation link.
     * @param {string} sectionId The ID of the section to show (e.g., 'homeSection').
     */
    function showSection(sectionId) {
        // Hide all sections first
        sections.forEach(section => {
            section.classList.remove('show');
            section.style.display = 'none'; // Immediately hide to reset for next display
        });

        // Show the target section and add 'show' class for fade-in
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            // Use a small timeout to allow display:block to apply before transition starts
            setTimeout(() => {
                targetSection.classList.add('show');
            }, 10); // A minimal delay
        }

        // Update active class for navigation links
        navLinks.forEach(link => {
            // Check if the link's data-section matches the target section's ID (without 'Section')
            if (link.dataset.section === sectionId.replace('Section', '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Add event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior (e.g., page reload)
            const sectionId = event.target.dataset.section + 'Section'; // Construct the section ID
            showSection(sectionId); // Call the function to show the selected section
        });
    });

    // Initial load: Check for saved theme preference, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // If a theme is saved in local storage, use that
        if (savedTheme === 'dark') {
            darkMode();
        } else {
            lightMode();
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no theme is saved, check system preference
        darkMode();
    } else {
        // Default to light mode if no saved preference and system prefers light
        lightMode();
    }

    // Show the Home section by default when the page loads
    showSection('homeSection');
});
