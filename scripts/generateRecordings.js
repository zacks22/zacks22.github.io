function formatCategoryParam(param) {
    return param
        .replace(/-/g, ' ')
        .replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        });
}

function categoryToSlug(category) {
    return category.trim().toLowerCase().replace(/\s+/g, '-');
}

async function generateRecordings() {
    const response = await fetch('../data/recordings.json');
    const allRecordings = await response.json();

    const container = document.getElementById('recordings-container');

    // Group recordings by category slug
    const grouped = {};
    allRecordings.forEach(function(recording) {
        const slug = categoryToSlug(recording.category);
        if (!grouped[slug]) grouped[slug] = [];
        grouped[slug].push(recording);
    });

    let html = '';
    Object.keys(grouped).forEach(function(slug) {
        html += `<div class="category-section" data-category="${slug}" style="display:none">`;
        grouped[slug].forEach(function(recording) {
            html += `
            <div class="recording-section">
                <hr class="recording-hr">
                <h4>
                    ${recording.composer}: ${recording.title} ${recording.year === "" ? '' : `(${recording.year})`} <br>
                    ${recording.ukr_composer === "" ? '' : `${recording.ukr_composer}:`} ${recording.ukr_title} ${recording.year === "" ? '' : `(${recording.year})`}
                </h4>
                <p>
                    ${recording.movements.map(movement => `<br>${movement}`).join('')}
                    <br>
                    ${recording.performers.map(performer => `<br>${performer}`).join('')}
                </p>
                <div class="video-container">
                    <iframe src="${recording.embedVideoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <br>
            </div>`;
        });
        html += `</div>`;
    });

    container.innerHTML = html;
    showCategory(document.getElementById('selectCategory').value);
}

function showCategory(slug) {
    document.querySelectorAll('.category-section').forEach(function(el) {
        el.style.display = el.dataset.category === slug ? '' : 'none';
    });
}
