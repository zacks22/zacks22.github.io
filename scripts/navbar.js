function generateNavbar() {
    var currentPage = window.location.pathname;
    fixedLocation = window.location.origin;

    var navLinks = [
        { id: 'home', text: 'Zachary Senick', href: '/' },
        { id: 'recordings', text: 'Recordings', href: '/pages/recordings.html?category=world-premieres' },
        { id: 'lessons', text: 'Lessons', href: '/pages/lessons.html' },
        { id: 'repertoire', text: 'Repertoire', href: '/assets/repertoire.pdf' },
        { id: 'resume', text: 'Resume', href: '/assets/resume.pdf' },
        { id: 'contact', text: 'Contact', href: '/pages/contact.html' },
    ];

    var navbarHtml = `
        <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
            <a class="navbar-brand" id="home" href="${fixedLocation}">Zachary Senick</a>
            <button class="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
    `;

    navLinks.slice(1).forEach(function(link) {
        navbarHtml += `
            <li class="nav-item">
                <a class="nav-link ${currentPage === link.href ? 'active' : ''}" href="${fixedLocation}${link.href}">${link.text}</a>
            </li>
        `;
    });

    navbarHtml += `
                </ul>
            </div>
        </nav>
        <hr class="hr-nav">
    `;

    document.getElementById('navbar-container').innerHTML = navbarHtml;

    // Manual toggle — Bootstrap JS may not be ready when generateNavbar() fires on DOMContentLoaded
    document.querySelector('#navbar-container .navbar-toggler').addEventListener('click', function() {
        var navCollapse = document.getElementById('navbarNav');
        navCollapse.classList.toggle('show');
        this.setAttribute('aria-expanded', navCollapse.classList.contains('show'));
    });
}
