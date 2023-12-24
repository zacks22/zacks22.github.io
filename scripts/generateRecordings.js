// Function to replace hyphens with spaces and uppercase words
function formatCategoryParam(param) {
    return param
        .replace(/-/g, ' ') // Replace hyphens with spaces globally
        .replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        }); // Uppercase the first character of each word
}

async function generateRecordings() {

    // Get the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const paramCategory = urlParams.get('category');
    const formattedCategory = formatCategoryParam(paramCategory);

    // Fetch project data from JSON file and filter for selected category
    const response = await fetch('../data/recordings.json');
    const allRecordings = await response.json();
    const recordings = allRecordings.filter(record => record.category.trim() === formattedCategory);

    // get recordings container and start generating html
    var recordingsContainer = document.getElementById('recordings-container');

    recordingHtml = ``;

    // Generate HTML for each recording
    recordings.forEach(function(recording) {
      recordingHtml += `
      <div class="recording-section">
          <hr class="recording-hr">
          <h4>
            ${recording.composer}: ${recording.title} ${recording.year === "" ? '' : `(${recording.year})`} <br>
            ${recording.ukr_composer === "" ? '' : `${recording.ukr_composer}:`} ${recording.ukr_title} ${recording.year === "" ? '' : `(${recording.year})`}
          </h4>
          <p>
            <!-- Movements -->
            ${recording.movements.map(movement => `<br>${movement}`).join('')}

            <br>
            <!-- Performers -->
            ${recording.performers.map(performer => `<br>${performer}`).join('')}
          </p>
          <iframe width="560" height="315" src="${recording.embedVideoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <br>
        </div>
        <br>
      `;

    });

    recordingHtml += '</div>'

    // Append the recording HTML to the container
    recordingsContainer.innerHTML = recordingHtml;
}