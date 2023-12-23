// Function to generate the navbar
function generateNavbar() {
    // Get the current page URL
    var currentPage = window.location.pathname;
 
    fixedLocation = window.location.origin;

    // Define the navigation links
    var navLinks = [
       { id: 'home', text: 'Zachary Senick', href: '/' },
       { id: 'recordings', text: 'Recordings', href: '/pages/recordings.html?category=world-premieres' },
       { id: 'lessons', text: 'Lessons', href: '/pages/lessons.html' },
       { id: 'repertoire', text: 'Repertoire', href: '/assets/repertoire.pdf' },
       { id: 'resume', text: 'Resume', href: '/assets/resume.pdf' },
       { id: 'contact', text: 'Contact', href: '/pages/contact.html' },
    ];
 
    // Create the navbar HTML
    var navbarHtml = '<div class="topnav">';

    // Create the buttons
    for (var i = 0; i < navLinks.length; i++) {
       var link = navLinks[i];
       navbarHtml += '<a id="' + link.id + '" href="' + fixedLocation + link.href + '">' + link.text + '</a>';
    }
    navbarHtml += '</div>';

    // Generate bottom hr line
    navbarHtml += '<hr class="hr-nav">';
 
    // Set the generated navbar in the container
    document.getElementById('navbar-container').innerHTML = navbarHtml;
 
    // Set the active class on the current page link
    var currentPageLink = document.querySelector('a[href="' + currentPage + '"]');
    if (currentPageLink) {
       currentPageLink.classList.add('active');
    }
 }
