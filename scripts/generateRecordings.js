function categoryToSlug(category) {
    return category.trim().toLowerCase().replace(/\s+/g, '-');
}

function composerToSlug(composer) {
    return composer.trim().toLowerCase();
}

async function generateRecordings() {
    const response = await fetch('../data/recordings.json');
    const allRecordings = await response.json();

    const container = document.getElementById('recordings-container');

    const grouped = {};
    allRecordings.forEach(function(recording) {
        const slug = categoryToSlug(recording.category);
        if (!grouped[slug]) grouped[slug] = [];
        grouped[slug].push(recording);
    });

    // Store for use by composer filter
    window._recordingsGrouped = grouped;

    let html = '';
    Object.keys(grouped).forEach(function(slug) {
        html += `<div class="category-section" data-category="${slug}" style="display:none"><div class="recordings-grid">`;

        grouped[slug].forEach(function(recording) {
            const year = recording.year ? ` · ${recording.year}` : '';
            const ukrLine = recording.ukr_composer
                ? `${recording.ukr_composer}: ${recording.ukr_title}`
                : recording.ukr_title;
            const movements = recording.movements.map(m => `<div>${m}</div>`).join('');
            const performers = recording.performers.map(p => `<div>${p}</div>`).join('');

            html += `
            <div class="recording-card" data-composer="${composerToSlug(recording.composer)}">
                <div class="recording-card-meta">${recording.composer}${year}</div>
                <iframe src="${recording.embedVideoUrl}" title="${recording.composer}: ${recording.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
                <div class="recording-card-body">
                    <h4 class="recording-card-title">${recording.title}</h4>
                    ${ukrLine ? `<div class="recording-card-ukr">${ukrLine}</div>` : ''}
                    ${movements ? `<div class="recording-card-detail">${movements}</div>` : ''}
                    <div class="recording-card-detail">${performers}</div>
                </div>
            </div>`;
        });

        html += `</div></div>`;
    });

    container.innerHTML = html;
    showCategory(document.getElementById('selectCategory').value);
}

function populateComposerFilter(categorySlug) {
    const recordings = (window._recordingsGrouped || {})[categorySlug] || [];
    const seen = new Set();
    const composers = [];
    recordings.forEach(function(r) {
        if (!seen.has(r.composer)) {
            seen.add(r.composer);
            composers.push(r.composer);
        }
    });

    const select = document.getElementById('selectComposer');
    select.innerHTML = '<option value="all">All Composers</option>';
    composers.forEach(function(composer) {
        const option = document.createElement('option');
        option.value = composerToSlug(composer);
        option.textContent = composer;
        select.appendChild(option);
    });
}

function showCategory(slug) {
    document.querySelectorAll('.category-section').forEach(function(el) {
        el.style.display = el.dataset.category === slug ? '' : 'none';
    });
    populateComposerFilter(slug);
    document.getElementById('selectComposer').value = 'all';
}

function showComposer(composerSlug) {
    const categorySlug = document.getElementById('selectCategory').value;
    const activeSection = document.querySelector(`.category-section[data-category="${categorySlug}"]`);
    if (!activeSection) return;
    activeSection.querySelectorAll('.recording-card').forEach(function(card) {
        card.style.display = (composerSlug === 'all' || card.dataset.composer === composerSlug) ? '' : 'none';
    });
}
