async function generateRecordings() {
    // Fetch project data from JSON file
    const response = await fetch('../data/recordings.json');
    const allRecordings = await response.json();

    const recordings = allRecordings.filter(record => record.category === "Other Slavic Rep");

    var recordingsContainer = document.getElementById('recordings-container');

    var recordingHtml = `<h2 class="recording-category">`+recordings[0].category+`</h2>`;

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