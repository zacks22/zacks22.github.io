// Function to generate the navbar
function generateNavbar() {
   // Get the current page URL
   var currentPage = window.location.pathname;

   fixedLocation = window.location.origin;

   // Define the navigation links
   var navLinks = [
       { id: 'home', text: 'Zachary Senick', href: '/' },
       {
           id: 'recordings',
           text: 'Recordings',
           dropdown: [
               { text: 'World Premieres', href: '/pages/recordings.html?category=world-premieres' },
               { text: 'Ukrainian Solo Rep', href: '/pages/recordings.html?category=ukrainian-solo-rep' },
               { text: 'Ukrainian Chamber Rep', href: '/pages/recordings.html?category=ukrainian-chamber-rep' },
               { text: 'Other Slavic Rep', href: '/pages/recordings.html?category=other-slavic-rep' },
               { text: 'Standard Rep', href: '/pages/recordings.html?category=standard-rep' },
           ],
       },
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
       if (link.dropdown) {
           // If it's a dropdown, create a dropdown button and options
           navbarHtml += `<div class="dropdown">`;
           navbarHtml += `<p class="dropbtn">${link.text}</p>`;
           navbarHtml += `<div class="dropdown-content">`;
           for (var j = 0; j < link.dropdown.length; j++) {
               var dropdownItem = link.dropdown[j];
               navbarHtml += `<a href="${fixedLocation}${dropdownItem.href}">${dropdownItem.text}</a>`;
           }
           navbarHtml += `</div>`;
           navbarHtml += `</div>`;
       } else {
           // If it's a regular link, create as usual
           navbarHtml += `<a id="${link.id}" href="${fixedLocation}${link.href}">${link.text}</a>`;
       }
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
