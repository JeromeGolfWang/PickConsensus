function populateGamesFromSheet(games, headers) {
    const form = document.getElementById("picksForm");
    if (!games || games.length === 0) {
        console.error("No data found in sheet.");
        return;
    }

    games.forEach((game, index) => {
        const weekIndex = headers.indexOf("Week");
        const dayIndex = headers.indexOf("Day");
        const dateIndex = headers.indexOf("Date");
        const visTmIndex = headers.indexOf("VisTm");
        const homeTmIndex = headers.indexOf("HomeTm");
        const timeIndex = headers.indexOf("Time");

        const week = game[weekIndex];
        const day = game[dayIndex];
        const date = game[dateIndex];
        const visTm = game[visTmIndex];
        const homeTm = game[homeTmIndex];
        const time = game[timeIndex];

        // Debug to check if data is correct
        console.log(`Week: ${week}, ${visTm} @ ${homeTm} (${day}, ${date} at ${time})`);

        // Create a container div for each game
        const div = document.createElement("div");
        div.className = "game";

        // Create and set up the label
        const label = document.createElement("label");
        label.textContent = `Week ${week}: ${visTm} @ ${homeTm} (${day}, ${date} at ${time})`;

        // Create and set up the select dropdown for picking the loser
        const select = document.createElement("select");
        select.name = `game${index}`;
        select.required = true;
        select.innerHTML = `
            <option value="">Select Loser</option>
            <option value="${homeTm}">${homeTm}</option>
            <option value="${visTm}">${visTm}</option>
        `;

        // Create and set up the confidence dropdown
        const confidenceSelect = document.createElement("select");
        confidenceSelect.name = `confidence${index}`;
        confidenceSelect.required = true;
        for (let i = 1; i <= games.length; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = i;
            confidenceSelect.appendChild(option);
        }

        // Disable the selected confidence score in other dropdowns
        confidenceSelect.addEventListener('change', () => {
            const selectedValue = confidenceSelect.value;
            const allConfidenceSelects = document.querySelectorAll('select[name^="confidence"]');

            allConfidenceSelects.forEach(selectElement => {
                [...selectElement.options].forEach(option => {
                    option.disabled = option.value !== "" && option.value === selectedValue;
                });
            });
        });

        // Append elements to the container div
        div.appendChild(label);
        div.appendChild(select);
        div.appendChild(confidenceSelect);

        // Append the container div to the form
        form.appendChild(div);
    });
}
