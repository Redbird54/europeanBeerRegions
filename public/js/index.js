let tableData = [];
let secretToken = null;
let currentSort = { column: 'Country', direction: 'asc' };

function init() {
    fetchToken().then(() => {
        formListener();
        initializeTable();
        addMessageListener();
    });
}

function fetchToken() {
    return fetch('http://localhost:8080/get-token')
      .then(response => response.json())
      .then(data => {
        secretToken = data.token;
      })
      .catch(error => console.error('Error fetching token:', error));
}

function formListener() {
    const addNewForm = document.getElementById('addForm');
    addNewForm.reset();
    addNewForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the form from reloading the page

        // Collect form data
        const myName = document.getElementById("myName").value;
        const regionName = document.getElementById("regionName").value;
        const firstHad = document.getElementById("firstHad").value; // Optional field

        // Create JSON object
        const requestData = {
            myName,
            regionName,
            firstHad: firstHad || null // Set to null if the field is empty
        };

        if (requestData) {
            await postFormData(requestData);
            addNewForm.reset();
        }
    });
}

async function postFormData(data) {
    try {
        // Make the POST request
        const response = await fetch(`http://localhost:8080/regions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convert to JSON string
        });

        if (response.ok) {
            const result = await response.json();
            // Fetch data from the Express API and populate the table
            fetch(`http://localhost:8080/api/data`, { method: 'GET', headers: { 'Authorization': `Bearer ${secretToken}` } })
                .then(response => response.json())
                .then(data => {
                    tableData = data; // Store the data
                    renderTable(tableData); // Render the initial table
                    sortTable(currentSort.column)
                    sendDataToMap(tableData);
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            const error = await response.text();
            // alert("Error adding data: " + error);
        }
    } catch (err) {
        console.error("Request failed:", err);
        // alert("An error occurred while sending the request.");
    }
}

function initializeTable() {
    // Fetch data from the Express API and populate the table
    fetch(`http://localhost:8080/api/data`, { method: 'GET', headers: { 'Authorization': `Bearer ${secretToken}` } })
        .then(response => response.json())
        .then(data => {
            tableData = data; // Store the data
            renderTable(tableData); // Render the initial table                
            sendDataToMap(tableData);

            // Populate dropdown
            const dropdown = document.getElementById('regionName');
            const uniqueNames = new Set(); // To store unique names

            // Populate the Set with unique FullName values
            tableData.forEach(item => {
                uniqueNames.add(item.FullName); // Only unique names will be added
            });

            // Convert the Set to an array and sort it alphabetically
            const sortedNames = [...uniqueNames].sort();

            // Create options in sorted order and append them to the dropdown
            sortedNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function addMessageListener() {
    // Listen for messages from map.html
    window.addEventListener('message', (event) => {
        if (event.data.type === 'RENDER_TABLE') {
            fetch(`http://localhost:8080/api/data`, { method: 'GET', headers: { 'Authorization': `Bearer ${secretToken}` } })
                .then(response => response.json())
                .then(data => {
                    tableData = data; // Store the data
                    renderTable(tableData);  // This will re-render the table in index.html
                    sortTable(currentSort.column)
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    });
}

// Function to render the table
function renderTable(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Clear the container

    // Create a table and append it to the container
    const table = document.createElement('table');

    // Create the table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Define headers and their sortable properties
    const headers = [
        { label: 'Country', key: 'Country' },
        { label: 'Name', key: 'FullName' },
        { label: 'MyName', key: 'MyName' },
        { label: 'Date', key: 'FirstHad' },
    ];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.label;

        // Add click event to sort the table
        th.addEventListener('click', () => sortTable(header.key));

        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement('tbody');
    data.forEach((item, index) => {
        const row = document.createElement('tr');

        const countryCell = document.createElement('td');
        countryCell.textContent = item.Country;
        row.appendChild(countryCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.FullName;
        row.appendChild(nameCell);

        const myNameCell = document.createElement('td');
        myNameCell.textContent = item.MyName;
        row.appendChild(myNameCell);

        const dateCell = document.createElement('td');
        if (item.FirstHad) {
            dateCell.textContent = item.FirstHad;
        } else {
            dateCell.textContent = 'N/A';
        }
        row.appendChild(dateCell);

        if (item.MyName || item.FirstHad) {
            const actionCell = document.createElement('td');
            actionCell.className = "action-cell"; // Assign a class for styling
            const deleteButton = document.createElement('button');
            deleteButton.className = "delete-btn";
            deleteButton.setAttribute('data-id', item.idRegion);
            deleteButton.textContent = "🗑️";
            deleteButton.addEventListener('click', () => {
                deleteData(item.idRegion); // Call the function with the item's ID
            });
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            myNameCell.addEventListener('click', () => {
                editCell(index, 'MyName', item.idRegion);
            });
            dateCell.addEventListener('click', () => {
                editCell(index, 'FirstHad', item.idRegion);
            });
        }


        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
}

// Edit cell logic
function editCell(index, field, id) {
    const row = tableData[index];
    const oldValue = row[field];
    let inputElement;


    inputElement = document.createElement('input');
    if (field === 'FirstHad') {
        inputElement.type = 'date'; // If the field is 'FirstHad' (Date), show the date picker
    } else {
        inputElement.type = 'text'; // For other fields like 'MyRegion', use the text input
    }
    inputElement.value = oldValue || '';  // Set the old value if available

    // Clear the cell and append the input element
    const cell = event.target;
    cell.innerHTML = ''; // Clear the cell content
    cell.appendChild(inputElement);

    // Focus on the input field to allow immediate editing
    inputElement.focus();

    // When the input loses focus (or when the user presses Enter), save the new value
    inputElement.addEventListener('blur', () => {
        const newValue = inputElement.value;

        // If the new value is different from the old value, proceed with the update
        if (newValue !== oldValue) {
            if ((field === 'FirstHad' || field === 'MyName') && (row.FirstHad || row.Name)) {
                // Only update Name if Date exists
                row[field] = newValue;
            }

            // Ask for confirmation before updating
            const confirmUpdate = confirm(`Are you sure you want to update the ${field} value?`);
            if (confirmUpdate) {
                // Update the table data and re-render the table
                // updateData(id, field, newValue);
                handleUpdate(index, field, id, oldValue, newValue);
            } else {
                // If canceled, restore the old value and re-render
                row[field] = oldValue;
                renderTable(tableData);
            }
        } else {
            // If no change, just re-render the table
            renderTable(tableData);
        }
    });

    // If the user presses Enter, trigger the same logic as blur (save the value)
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            inputElement.blur(); // Trigger blur event
        }
    });
}

async function handleUpdate(index, field, id, oldValue, newValue) {
    const row = tableData[index];

    if (field === 'MyName') {
        // Check if the new value matches the FullName (Step A)
        if (newValue.toLowerCase() === row.FullName.toLowerCase()) {
            // Check if another row exists with the same Name and MyName (Step B)
            const matchingRow = tableData.find(
                (item) => item.FullName.toLowerCase() === newValue.toLowerCase() && item.MyName === newValue && item.idRegion !== id
            );

            if (matchingRow) {
                // Update the RealRegion array of the matching row and delete the current row (Step C)
                await updateRealRegionAndDelete(matchingRow.idRegion, row.RealRegion, id, row.FirstHad < matchingRow.FirstHad ? row.FirstHad : matchingRow.FirstHad);
                return;
            }
        }
    }
    // If no special case, update the current row as usual (Step D)
    updateData(id, field, newValue);
    // fetchUpdatedTable(); // Refresh table
}

async function updateRealRegionAndDelete(matchingRowId, realRegionArray, currentRowId, date) {
    try {
        const response = await fetch(`http://localhost:8080/regions/merge-and-delete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                matchingRowId,
                realRegionArray,
                currentRowId,
                date
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to merge and delete rows');
        }

        fetch(`http://localhost:8080/api/data`, { method: 'GET', headers: { 'Authorization': `Bearer ${secretToken}` } })
            .then(response => response.json())
            .then(data => {
                tableData = data; // Store the data
                renderTable(tableData); // Render the initial table
            })
            .catch(error => console.error('Error fetching data:', error));

        // fetchUpdatedTable(); // Refresh the table
    } catch (error) {
        console.error('Error merging and deleting rows:', error);
    }
}

// Function to sort the table
function sortTable(key) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

    // Sort tableData based on the key
    tableData.sort((a, b) => {
        const valueA = a[key] || '';
        const valueB = b[key] || '';

        if (key === 'FirstHad') {
            // Parse dates for comparison, falling back to a default date for invalid or missing values
            const dateA = valueA ? new Date(valueA) : null;
            const dateB = valueB ? new Date(valueB) : null;

            // Step 1: If one has a date and the other does not, place the one with the date first
            if (dateA && !dateB) return -1;  // a has date, b does not
            if (!dateA && dateB) return 1;   // b has date, a does not

            // Step 2: Both have dates, so compare them
            if (dateA && dateB) return dateA - dateB;

            // Step 3: If neither has a date, compare MyName
            const myNameA = a.MyName || '';
            const myNameB = b.MyName || '';

            // Sort by MyName if there are no dates
            if (myNameA && !myNameB) return -1; // a has MyName, b does not
            if (!myNameA && myNameB) return 1;  // b has MyName, a does not

            return 0; // If both are missing MyName, leave as is
        } else if (key === 'MyName') {
            // First sort alphabetically by MyName
            const myNameA = a.MyName || '';
            const myNameB = b.MyName || '';

            if (myNameA && !myNameB) return -1; // a has MyName, b does not
            if (!myNameA && myNameB) return 1;  // b has MyName, a does not
            if (!myNameA && !myNameB) {
                // If neither has MyName, sort by FirstHad date
                const dateA = a.FirstHad ? new Date(a.FirstHad) : null;
                const dateB = b.FirstHad ? new Date(b.FirstHad) : null;
                
                if (dateA && !dateB) return -1;  // a has date, b does not
                if (!dateA && dateB) return 1;   // b has date, a does not
                return dateA - dateB;  // Compare dates if both have them
            } // both have no MyName

            return myNameA.localeCompare(myNameB); // Alphanumeric sorting for MyName
        } else {
            if (!valueA) return 1; // Move missing values (empty strings) to the bottom
            if (!valueB) return -1;
            // Alphanumeric sorting for other keys
            return valueA.localeCompare(valueB);
        }
    });
    currentSort.column = key;
    // Re-render the table with the sorted data
    renderTable(tableData);
}

//Function to delete data from a row
async function deleteData(id) {
    // Make the DELETE request
    if (id) {
        try {
            const response = await fetch(`http://localhost:8080/regions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the row from the database');
            }
            // const data = await response.json();
            fetch(`http://localhost:8080/api/data`, { method: 'GET', headers: { 'Authorization': `Bearer ${secretToken}` } })
                .then(response => response.json())
                .then(data => {
                    tableData = data; // Store the data
                    renderTable(tableData); // Render the initial table
                    sendDataToMap(tableData);
                    sortTable(currentSort.column)
                })
                .catch(error => console.error('Error fetching data:', error));
        } catch (error) {
            console.error('Error:', error);
            // alert('Failed to delete the row. Please try again.');
        }
    }
}

async function updateData(id, field, newValue) {
    if (field === 'MyName') {
        field = 'Name';
    }
    // Make the PATCH request
    if (id) {
        try {
            const response = await fetch(`http://localhost:8080/regions/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: newValue })
            });
            if (!response.ok) {
                throw new Error('Failed to update the row from the database');
            }
            // const data = await response.json();
            fetch(`http://localhost:8080/api/data`, { method: 'GET', headers: { 'Authorization': `Bearer ${secretToken}` } })
                .then(response => response.json())
                .then(data => {
                    tableData = data; // Store the data
                    renderTable(tableData); // Render the initial table
                    sortTable(currentSort.column)
                })
                .catch(error => console.error('Error fetching data:', error));
        } catch (error) {
            console.error('Error:', error);
            // alert('Failed to update the row. Please try again.');
        }
    }
}

function sendDataToMap(tableData) {
    // Ensure the iframe is ready and send the data
    const iframe = document.getElementById('mapIframe');

    // Function to send tableData to the iframe
    function sendTableDataToIframe() {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({ tableData }, 'http://localhost:3000');
        } else {
            console.error("Iframe contentWindow is not available.");
        }
    }

    // If the iframe has already loaded, send the data
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        sendTableDataToIframe();
    } else {
        // Otherwise, wait for the load event
        iframe.addEventListener('load', () => {
            sendTableDataToIframe();
        });
    }
}

init();