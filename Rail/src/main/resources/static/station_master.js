// Get station master city from localStorage
const stationMasterCity = localStorage.getItem('stationMasterCity');

if (!stationMasterCity || stationMasterCity.trim() === "") {
  alert("❌ City information not found. Please login again.");
  window.location.href = 'index.html';
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}


// Show Dashboard initially
function showDashboard() {
  document.getElementById('contentBox').innerHTML = `
    <h1>Welcome, Station Master!</h1>
    <p>Managing facilities for city: <b>${stationMasterCity}</b></p>
  `;
}

// Add Facility Form
function addFacility() {
  document.getElementById('contentBox').innerHTML = `
    <h1>Add Facility for <b>${stationMasterCity}</b></h1>
    <form id="addFacilityForm">
      <label>Facility Name:</label>
      <input type="text" id="facilityName" required>
      <label>Latitude:</label>
      <input type="number" id="latitude" step="any" required>
      <label>Longitude:</label>
      <input type="number" id="longitude" step="any" required>
      <button type="submit">Add Facility</button>
    </form>
  `;

  // Handle form submission
  document.getElementById('addFacilityForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('facilityName').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    const facilityPayload = {
      name,
      latitude,
      longitude,
      city: stationMasterCity
    };

    fetch('http://localhost:8081/api/facilities/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(facilityPayload)
    })
      .then(response => {
        if (response.ok) {
          alert('✅ Facility added successfully!');
          document.getElementById('addFacilityForm').reset();
          viewFacilities();
        } else {
          return response.text().then(err => {
            alert('❌ Failed to add facility: ' + err);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('❌ Server error while adding facility.');
      });
  });
}function viewFacilities() {
  fetch(`http://localhost:8081/api/facilities/city/${stationMasterCity}`)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch facilities");
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error("Response is not an array");

      let html = `
        <h1>Facilities in ${stationMasterCity}</h1>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
      `;

      data.forEach(facility => {
        html += `
          <tr>
            <td>${facility.id}</td>
            <td>${facility.name}</td>
            <td>${facility.latitude}</td>
            <td>${facility.longitude}</td>
            <td>
              <button onclick="deleteFacility(${facility.id})" style="color:white;background-color:#e53935;border:none;padding:6px 12px;border-radius:4px;">
                Delete
              </button>
            </td>
          </tr>
        `;
      });

      html += `
            </tbody>
          </table>
        </div>
      `;

      document.getElementById('contentBox').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading facilities:', error);
      document.getElementById('contentBox').innerHTML = `<p>❌ Error loading facilities: ${error.message}</p>`;
    });
}

// Delete facility
function deleteFacility(id) {
  if (confirm("Are you sure you want to delete this facility?")) {
    fetch(`http://localhost:8081/api/facilities/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          alert("✅ Facility deleted.");
          viewFacilities();
        } else {
          alert("❌ Failed to delete facility.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("❌ Server error while deleting facility.");
      });
  }
}

// Logout function
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = 'index.html';
}

// Load dashboard by default on page load
showDashboard();
