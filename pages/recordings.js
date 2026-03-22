window.onload = function() {
    generateNavbar();
    generateRecordings();
}

$("#selectCategory").change(function() {
    showCategory(this.value);
});
