document.addEventListener('DOMContentLoaded', function() {
    generateNavbar();
    generateRecordings();
});

$("#selectCategory").change(function() {
    showCategory(this.value);
});

$("#selectComposer").change(function() {
    showComposer(this.value);
});
