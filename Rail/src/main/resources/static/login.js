document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const role = document.getElementById('role').value.toLowerCase();  // normalize role

  const loginPayload = { email, password, role };

  try {
    const response = await fetch('http://localhost:8081/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
    });

    if (response.ok) {
      const data = await response.json();  // ✅ Parse response body
      console.log("Logged in Station Master:", data);

      // Show toast and play sound
      Toastify({
        text: "☕ Login Successful!",
        duration: 2000,
        gravity: "top",
        position: "right",
        className: "custom-toast"
      }).showToast();

      const sound = document.getElementById("coffeeSound");
      if (sound) {
        sound.currentTime = 0;
        sound.volume = 1.0;
        sound.play().catch(console.error);
      }

      // Save additional data if Station Master
      if (role === 'stationmaster') {
        localStorage.setItem('stationMasterCity', data.city);
      }

      // Redirect based on role
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = 'admin.html';
        } else if (role === 'stationmaster') {
          window.location.href = 'StationMaster.html';
        } else if (role === 'user') {
          window.location.href = 'User.html';
        } else {
          Toastify({
            text: "❌ Unknown role. Cannot redirect.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#e53935"
          }).showToast();
        }
      }, 1000);

    } else {
      const errorText = await response.text();
      Toastify({
        text: "❌ Login failed: " + errorText,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#e53935"
      }).showToast();
    }

  } catch (error) {
    console.error("Login error:", error);
    Toastify({
      text: "❌ Network error.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#e53935"
    }).showToast();
  }
});
