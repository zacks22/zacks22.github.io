document.addEventListener('DOMContentLoaded', function() {
    generateRecordings();

    document.getElementById('selectCategory').addEventListener('change', function() {
        showCategory(this.value);
    });

    document.getElementById('selectComposer').addEventListener('change', function() {
        showComposer(this.value);
    });
});
