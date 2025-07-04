function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

function showDashboard() {
  document.getElementById('contentBox').innerHTML = `
    <h1>Welcome, Admin!</h1>
  `;
}

function addStationMaster() {
  document.getElementById('contentBox').innerHTML = `
    <h1 class="mb-4">Add Station Master</h1>
    <form id="addStationMasterForm" class="text-start">
      <div class="mb-3">
        <label class="form-label">Name:</label>
        <input type="text" id="name" class="form-control" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input type="email" id="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Station Name:</label>
        <input type="text" id="station" class="form-control" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password:</label>
        <input type="password" id="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Add Station Master</button>
    </form>
  `;

  const form = document.getElementById('addStationMasterForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const station = document.getElementById('station').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8081/api/admin/add-station-master', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stationMasterName: name,
        email: email,
        stationName: station,
        password: password
      })
    })
      .then(response => {
        if (response.ok) {
          alert('✅ Station Master added successfully!');
          viewStationMasters();
        } else {
          alert('❌ Failed to add Station Master.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('❌ Server error.');
      });
  });
}

function viewStationMasters() {
  document.getElementById('contentBox').innerHTML = `<p>Loading...</p>`;

  fetch('http://localhost:8081/api/admin/view-station-masters')
    .then(response => response.json())
    .then(data => {
      let html = `
        <h1 class="mb-4">Station Masters List</h1>
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Station</th>
              </tr>
            </thead>
            <tbody>
      `;
      data.forEach(master => {
        html += `
          <tr>
            <td>${master.id}</td>
            <td>${master.stationMasterName}</td>
            <td>${master.email}</td>
            <td>${master.stationName}</td>
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
      console.error('Error:', error);
      document.getElementById('contentBox').innerHTML = `<p>Error loading Station Masters.</p>`;
    });
}

function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = 'index.html';
}
