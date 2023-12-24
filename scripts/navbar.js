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
    var navbarHtml = `
         <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
               <a class="navbar-brand" id="home" href="${fixedLocation}">Zachary Senick</a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarNav">
                   <ul class="navbar-nav">
       `;
 
    // Create the buttons using navLinks
    navLinks.slice(1).forEach(function(link) {
        navbarHtml += `
             <li class="nav-item">
                 <a class="nav-link ${currentPage === link.href ? 'active' : ''}" href="${fixedLocation}${link.href}">${link.text}</a>
             </li>
        `;
    });
 
    // Close the navbar HTML
    navbarHtml += `
                 </ul>
             </div>
         </nav>
         <hr class="hr-nav">
    `;
 
    // Set the generated navbar in the container
    document.getElementById('navbar-container').innerHTML = navbarHtml;
 }
 
