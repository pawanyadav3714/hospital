// ===============================
// DUMMY USERS (FOR TESTING)
// ===============================

const dummyUsers = [
  {
    role: "patient",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    password: "rahul123",
  },
  {
    role: "patient",
    name: "Priya Verma",
    email: "priya@gmail.com",
    password: "priya123",
  },
  {
    role: "doctor",
    name: "Dr. Amit Mehta",
    email: "amit@hospital.com",
    password: "amit123",
    specialty: "Cardiology",
  },
  {
    role: "doctor",
    name: "Dr. Sneha Kapoor",
    email: "sneha@hospital.com",
    password: "sneha123",
    specialty: "Neurology",
  },
];

// Load dummy users only if localStorage is empty
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(dummyUsers));
}

// ===== ABSOLUTE FILTER-GUARANTEED DATABASE =====

const cities = [
  "Mumbai, Maharashtra",
  "Delhi, India",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Gurgaon, Haryana",
  "Pune, Maharashtra",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Jaipur, Rajasthan",
  "Ahmedabad, Gujarat",
  "Lucknow, Uttar Pradesh",
  "Indore, Madhya Pradesh",
];

const specialtiesList = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Pediatrics",
  "Dentistry",
  "Oncology",
];

const availabilityOptions = ["24hours", "morning", "afternoon", "evening"];

// Rating tiers
const ratingTiers = [4.2, 4.4, 4.6, 4.8];

// Budget tiers
const budgetTiers = [1200, 1500, 1800, 2200];

const hospitalsData = [];
let idCounter = 1;

cities.forEach((city) => {
  for (let i = 0; i < 4; i++) {
    hospitalsData.push({
      id: idCounter++,

      name: `${city.split(",")[0]} SuperCare Hospital ${i + 1}`,

      location: city,

      // GUARANTEED rating coverage
      rating: ratingTiers[i],

      reviews: 200 + i * 75,

      // GUARANTEED availability coverage
      availability: availabilityOptions[i],

      // GUARANTEED budget coverage
      costPerVisit: budgetTiers[i],

      // EVERY hospital has ALL specialties
      specialties: [...specialtiesList],

      // EVERY specialty has a doctor
      doctors: specialtiesList.map((spec, index) => ({
        name: `Dr. ${spec} Expert ${i + 1}${index}`,
        specialty: spec,
        available: true,
      })),
    });
  }
});

let filteredHospitals = [...hospitalsData];
let selectedHospital = null;

// ===== DOM ELEMENTS =====
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
const locationInput = document.getElementById("location-input");
const specialtyInput = document.getElementById("specialty-input");
const ratingInput = document.getElementById("rating-input");
const budgetInput = document.getElementById("budget-input");
const availabilityInput = document.getElementById("availability-input");
const hospitalsGrid = document.getElementById("hospitals-grid");
const hospitalCount = document.getElementById("hospital-count");
const emptyState = document.getElementById("empty-state");
const bookingModal = document.getElementById("booking-modal");
const successMessage = document.getElementById("success-message");

// ===== EVENT LISTENERS =====
searchBtn.addEventListener("click", performSearch);
clearBtn.addEventListener("click", resetFilters);
ratingInput.addEventListener("input", updateRatingValue);
budgetInput.addEventListener("input", updateBudgetValue);
bookingModal.addEventListener("click", (e) => {
  if (e.target.id === "booking-modal") closeBookingModal();
});

// Keyboard Enter to Search
locationInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") performSearch();
});

// ===== UPDATE SLIDER VALUES =====
function updateRatingValue() {
  const value = parseFloat(ratingInput.value);
  const display = value === 0 ? "Any" : `${value} ⭐`;
  document.getElementById("rating-value").textContent = display;
}

function updateBudgetValue() {
  const value = parseInt(budgetInput.value);
  document.getElementById("budget-value").textContent =
    `₹${value.toLocaleString()}`;
}

// ===== PERFORM SEARCH =====
function performSearch() {
  const location = locationInput.value.trim().toLowerCase();
  const specialty = specialtyInput.value.toLowerCase();
  const minRating = parseFloat(ratingInput.value) || 0;
  const maxBudget = parseInt(budgetInput.value) || 10000;
  const availability = availabilityInput.value;

  filteredHospitals = hospitalsData.filter((hospital) => {
    const hospitalLocationLower = hospital.location.toLowerCase();
    let matchLocation = false;

    if (location === "") {
      matchLocation = true;
    } else {
      if (hospitalLocationLower.includes(location)) {
        matchLocation = true;
      } else {
        const searchParts = location.split(",").map((p) => p.trim());
        const locationParts = hospital.location
          .split(",")
          .map((p) => p.trim().toLowerCase());
        matchLocation = searchParts.some((searchPart) =>
          locationParts.some((locPart) => locPart.includes(searchPart)),
        );
      }
    }

    const matchSpecialty =
      specialty === "" ||
      hospital.specialties.some((s) => s.toLowerCase().includes(specialty));
    const matchRating = minRating === 0 || hospital.rating >= minRating;
    const matchBudget = hospital.costPerVisit <= maxBudget;
    const matchAvailability =
      availability === "" ||
      hospital.availability === availability ||
      hospital.availability === "24hours";

    return (
      matchLocation &&
      matchSpecialty &&
      matchRating &&
      matchBudget &&
      matchAvailability
    );
  });

  displayActiveFilters();
  displayHospitals();
}

// ===== DISPLAY ACTIVE FILTERS =====
function displayActiveFilters() {
  const location = locationInput.value.trim();
  const specialty = specialtyInput.value;
  const minRating = parseFloat(ratingInput.value);
  const maxBudget = parseInt(budgetInput.value);
  const availability = availabilityInput.value;

  let activeFilters = [];
  if (location) activeFilters.push(`📍 ${location}`);
  if (specialty) activeFilters.push(`🏥 ${specialty}`);
  if (minRating > 0) activeFilters.push(`⭐ ${minRating}+ stars`);
  if (maxBudget < 10000) activeFilters.push(`💰 ₹${maxBudget}`);
  if (availability) activeFilters.push(`🕐 ${availability}`);

  const activeFiltersDiv = document.getElementById("active-filters");
  if (activeFilters.length > 0) {
    activeFiltersDiv.style.display = "block";
    document.getElementById("filters-text").textContent =
      activeFilters.join(" • ");
  } else {
    activeFiltersDiv.style.display = "none";
  }
}

// ===== DISPLAY HOSPITALS =====
function displayHospitals() {
  hospitalCount.textContent = filteredHospitals.length;

  if (filteredHospitals.length === 0) {
    hospitalsGrid.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  hospitalsGrid.style.display = "grid";
  emptyState.style.display = "none";

  hospitalsGrid.innerHTML = filteredHospitals
    .map(
      (hospital) => `
        <div class="hospital-card">
            <div class="hospital-header">
                <h3 class="hospital-name">${hospital.name}</h3>
                <div class="hospital-location">
                    <span>📍</span>
                    <span>${hospital.location}</span>
                </div>
            </div>
            <div class="hospital-content">
                <div class="info-row">
                    <span class="info-label">Rating</span>
                    <span class="info-value">
                        <span class="rating">
                            ${Array(Math.floor(hospital.rating)).fill("⭐").join("")}
                            <span class="star">☆</span>
                        </span>
                        ${hospital.rating} (${hospital.reviews})
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Cost/Visit</span>
                    <span class="info-value">₹${hospital.costPerVisit.toLocaleString()}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Availability</span>
                    <span class="info-value availability-badge available">
                        ${getAvailabilityLabel(hospital.availability)}
                    </span>
                </div>
                <div class="specialties-list">
                    ${hospital.specialties.map((s) => `<span class="specialty-tag">${s}</span>`).join("")}
                </div>
                <div class="button-group">
                    <button class="btn btn-book" onclick="openBookingModal(${hospital.id})">
                        <i class="fas fa-calendar-check"></i> Book
                    </button>
                    <button class="btn btn-details" onclick="showDetails(${hospital.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// ===== GET AVAILABILITY LABEL =====
function getAvailabilityLabel(availability) {
  const labels = {
    morning: "🌅 Morning",
    afternoon: "☀️ Afternoon",
    evening: "🌆 Evening",
    "24hours": "🌙 24 Hours",
  };
  return labels[availability] || availability;
}

// ===== RESET FILTERS =====
function resetFilters() {
  locationInput.value = "";
  specialtyInput.value = "";
  ratingInput.value = "0";
  budgetInput.value = "10000";
  availabilityInput.value = "";

  updateRatingValue();
  updateBudgetValue();

  filteredHospitals = [...hospitalsData];
  displayActiveFilters();
  displayHospitals();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== BOOKING MODAL =====
function openBookingModal(hospitalId) {
  selectedHospital = hospitalsData.find((h) => h.id === hospitalId);

  // Display hospital info
  const infoDiv = document.getElementById("modal-hospital-info");
  infoDiv.innerHTML = `
        <strong>${selectedHospital.name}</strong> - ${selectedHospital.location}
    `;

  // Populate doctors
  const doctorSelect = document.getElementById("doctor-select");
  doctorSelect.innerHTML = selectedHospital.doctors
    .map(
      (doctor, index) => `
        <div class="doctor-option" onclick="selectDoctor(${index})">
            <div class="doctor-name">${doctor.name}</div>
            <div class="doctor-specialty">${doctor.specialty}</div>
            <div class="doctor-availability">
                ${doctor.available ? "✅ Available" : "❌ Not Available"}
            </div>
        </div>
    `,
    )
    .join("");

  bookingModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeBookingModal() {
  bookingModal.classList.remove("show");
  document.getElementById("booking-form").reset();
  document.body.style.overflow = "auto";
}

function selectDoctor(index) {
  const options = document.querySelectorAll(".doctor-option");
  options.forEach((opt, i) => {
    opt.classList.toggle("selected", i === index);
  });
}

// ===== SUBMIT BOOKING =====
function submitBooking(event) {
  event.preventDefault();

  const selectedDoctor = document.querySelector(".doctor-option.selected");
  if (!selectedDoctor) {
    alert("Please select a doctor");
    return;
  }

  // Validate appointment date
  const appointmentDate = new Date(
    document.getElementById("appointment-date").value,
  );
  if (appointmentDate < new Date()) {
    alert("Please select a future date");
    return;
  }

  const formData = {
    patientName: document.getElementById("patient-name").value,
    email: document.getElementById("patient-email").value,
    phone: document.getElementById("patient-phone").value,
    age: document.getElementById("patient-age").value,
    appointmentDate: document.getElementById("appointment-date").value,
    hospital: selectedHospital.name,
    reason: document.getElementById("appointment-reason").value,
  };

  // Simulate API call
  console.log("Appointment booked:", formData);

  closeBookingModal();
  successMessage.classList.add("show");
  setTimeout(() => successMessage.classList.remove("show"), 4000);
}

// ===== SHOW DETAILS =====
function showDetails(hospitalId) {
  const hospital = hospitalsData.find((h) => h.id === hospitalId);
  const availableDoctors = hospital.doctors.filter((d) => d.available).length;

  alert(`
📋 HOSPITAL DETAILS
================
🏥 Name: ${hospital.name}
📍 Location: ${hospital.location}
⭐ Rating: ${hospital.rating}/5 (${hospital.reviews} reviews)
💰 Cost per Visit: ₹${hospital.costPerVisit}
🕐 Availability: ${getAvailabilityLabel(hospital.availability)}
👨‍⚕️ Specialties: ${hospital.specialties.join(", ")}
💼 Doctors Available: ${availableDoctors}/${hospital.doctors.length}
    `);
}

// ===== INITIAL DISPLAY =====
displayHospitals();
updateRatingValue();
updateBudgetValue();

// ===== SCROLL REVEAL ANIMATION =====
function reveal() {
  const elements = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight / 1.5) {
        element.classList.add("visible");
      }
    });
  });
}

reveal();

let currentRole = "patient";
let authMode = "register";

function openAuthModal(mode) {
  authMode = mode;
  document.getElementById("auth-title").innerText =
    mode === "login" ? "Login" : "Register";
  document.getElementById("auth-modal").classList.add("show");
}

function closeAuthModal() {
  document.getElementById("auth-modal").classList.remove("show");
}

function setRole(role) {
  currentRole = role;

  document.getElementById("patient-role").classList.remove("active");
  document.getElementById("doctor-role").classList.remove("active");
  document.getElementById(role + "-role").classList.add("active");

  document.querySelectorAll(".doctor-only").forEach((el) => {
    el.style.display = role === "doctor" ? "block" : "none";
  });
}

function toggleAuthMode() {
  authMode = authMode === "login" ? "register" : "login";
  document.getElementById("auth-title").innerText =
    authMode === "login" ? "Login" : "Register";
}

function submitAuth(e) {
  e.preventDefault();

  const name = document.getElementById("auth-name").value;
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  const specialty = document.getElementById("doctor-specialty").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (authMode === "register") {
    users.push({
      role: currentRole,
      name,
      email,
      password,
      specialty: currentRole === "doctor" ? specialty : null,
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
  } else {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      alert(`Welcome back ${user.name}!`);
    } else {
      alert("Invalid credentials");
    }
  }

  closeAuthModal();
}
