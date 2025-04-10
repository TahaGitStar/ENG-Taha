/**
 * Web Fundamentals Lab Project
 * Author: Taha AL kohlani
 * JavaScript for Bilingual Website
 */

// Language translations
const translations = {
  english: {
    // Header
    projectTitle: "Web Fundamentals Lab Project",
    toggleLanguage: "العربية",
    
    // Registration Page
    registrationTitle: "User Registration",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    registerBtn: "Register",
    loginBtn: "Login",
    
    // Validation Messages
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    passwordLength: "Password must be at least 8 characters",
    passwordMismatch: "Passwords do not match",
    
    // Subject Selection Page
    subjectsTitle: "Choose Your Subjects",
    selectAll: "Select All",
    continueBtn: "Continue",
    backBtn: "Back",
    
    // Subjects
    webDevelopment: "Web Development",
    programming: "Programming",
    dataScience: "Data Science",
    artificialIntelligence: "Artificial Intelligence",
    cybersecurity: "Cybersecurity",
    networking: "Networking",
    databaseManagement: "Database Management",
    mobileAppDevelopment: "Mobile App Development",
    
    // About Me Page
    aboutMeTitle: "About Me",
    personalInfo: "Personal Information",
    academicInfo: "Academic Information",
    skills: "Skills",
    languages: "Languages",
    contact: "Contact Information",
    
    // Personal Info
    name: "Name",
    academicField: "Academic Field",
    university: "University",
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
    careerGoal: "Career Goal",
    languagesSpoken: "Languages",
    contactInfo: "Contact"
  },
  arabic: {
    // Header
    projectTitle: "مشروع مختبر أساسيات الويب",
    toggleLanguage: "English",
    
    // Registration Page
    registrationTitle: "تسجيل المستخدم",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    registerBtn: "تسجيل",
    loginBtn: "تسجيل الدخول",
    
    // Validation Messages
    requiredField: "هذا الحقل مطلوب",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح",
    invalidPhone: "يرجى إدخال رقم هاتف صالح",
    passwordLength: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
    passwordMismatch: "كلمات المرور غير متطابقة",
    
    // Subject Selection Page
    subjectsTitle: "اختر المواد الدراسية",
    selectAll: "اختر الكل",
    continueBtn: "استمرار",
    backBtn: "رجوع",
    
    // Subjects
    webDevelopment: "تطوير الويب",
    programming: "البرمجة",
    dataScience: "علم البيانات",
    artificialIntelligence: "الذكاء الاصطناعي",
    cybersecurity: "الأمن السيبراني",
    networking: "الشبكات",
    databaseManagement: "إدارة قواعد البيانات",
    mobileAppDevelopment: "تطوير تطبيقات الجوال",
    
    // About Me Page
    aboutMeTitle: "نبذة عني",
    personalInfo: "المعلومات الشخصية",
    academicInfo: "المعلومات الأكاديمية",
    skills: "المهارات",
    languages: "اللغات",
    contact: "معلومات الاتصال",
    
    // Personal Info
    name: "الاسم",
    academicField: "المجال الأكاديمي",
    university: "الجامعة",
    technicalSkills: "المهارات التقنية",
    softSkills: "المهارات الشخصية",
    careerGoal: "الهدف المهني",
    languagesSpoken: "اللغات",
    contactInfo: "التواصل"
  }
};

// Personal information for About Me page
const personalInfo = {
  name: "Taha AL kohlani",
  academicField: "Computer Science / Information Technology",
  university: "Al Rasheed",
  technicalSkills: "Python, CSS, JavaScript, ERPNext, Networking, IT Support",
  softSkills: "Leadership, Teamwork, Communication, Problem-Solving",
  careerGoal: "Becoming a professional software engineer and digital entrepreneur",
  languages: "Arabic (native), English (fluent), Turkish",
  contact: "taha.kohlani@gmail.com"
};

// Current language (default: english)
let currentLanguage = 'english';

// Current active page
let currentPage = 'registration-page';

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the application
  initApp();
  
  // Set up event listeners
  setupEventListeners();
});

// Initialize the application
function initApp() {
  // Show the registration page by default
  document.getElementById('registration-page').classList.add('active-page');
  
  // Update the UI with the default language
  updateLanguage();
}

// Set up event listeners
function setupEventListeners() {
  // Language toggle
  document.getElementById('language-toggle').addEventListener('click', toggleLanguage);
  
  // Form validation
  const registrationForm = document.getElementById('registration-form');
  const formInputs = registrationForm.querySelectorAll('input');
  
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      validateInput(this);
      updateLoginButton();
    });
    
    // Arrow key navigation
    input.addEventListener('keydown', handleArrowKeyNavigation);
  });
  
  // Register button
  document.getElementById('register-btn').addEventListener('click', function(e) {
    e.preventDefault();
    if (validateForm()) {
      navigateToPage('subjects-page');
    }
  });
  
  // Login button (initially disabled)
  document.getElementById('login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    if (validateForm()) {
      navigateToPage('subjects-page');
    }
  });
  
  // Select All button for checkboxes
  document.getElementById('select-all-btn').addEventListener('click', selectAllSubjects);
  
  // Continue button on subjects page
  document.getElementById('continue-btn').addEventListener('click', function() {
    navigateToPage('about-me-page');
  });
  
  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-target');
      navigateToPage(targetPage);
    });
  });
}

// Toggle between English and Arabic
function toggleLanguage() {
  currentLanguage = currentLanguage === 'english' ? 'arabic' : 'english';
  
  // Toggle RTL for Arabic
  if (currentLanguage === 'arabic') {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }
  
  // Update the UI with the new language
  updateLanguage();
}

// Update the UI with the current language
function updateLanguage() {
  const elements = document.querySelectorAll('[data-translate]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLanguage][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[currentLanguage][key];
      } else {
        element.textContent = translations[currentLanguage][key];
      }
    }
  });
  
  // Update language toggle button
  document.getElementById('language-toggle').textContent = translations[currentLanguage].toggleLanguage;
}

// Validate a single input field
function validateInput(input) {
  const errorElement = input.nextElementSibling;
  let isValid = true;
  let errorMessage = '';
  
  // Check if the field is required and empty
  if (input.required && input.value.trim() === '') {
    isValid = false;
    errorMessage = translations[currentLanguage].requiredField;
  } else {
    // Specific validation based on input type
    switch (input.id) {
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value) && input.value.trim() !== '') {
          isValid = false;
          errorMessage = translations[currentLanguage].invalidEmail;
        }
        break;
        
      case 'phone':
        const phonePattern = /^\d{10,}$/;
        if (!phonePattern.test(input.value) && input.value.trim() !== '') {
          isValid = false;
          errorMessage = translations[currentLanguage].invalidPhone;
        }
        break;
        
      case 'password':
        if (input.value.length < 8 && input.value.trim() !== '') {
          isValid = false;
          errorMessage = translations[currentLanguage].passwordLength;
        }
        
        // Also check confirm password if it has a value
        const confirmPassword = document.getElementById('confirm-password');
        if (confirmPassword.value && confirmPassword.value !== input.value) {
          document.getElementById('confirm-password').nextElementSibling.textContent = 
            translations[currentLanguage].passwordMismatch;
          document.getElementById('confirm-password').nextElementSibling.style.display = 'block';
        } else if (confirmPassword.value) {
          document.getElementById('confirm-password').nextElementSibling.style.display = 'none';
        }
        break;
        
      case 'confirm-password':
        const password = document.getElementById('password');
        if (input.value !== password.value && input.value.trim() !== '') {
          isValid = false;
          errorMessage = translations[currentLanguage].passwordMismatch;
        }
        break;
    }
  }
  
  // Display or hide error message
  if (!isValid) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
  } else {
    errorElement.style.display = 'none';
  }
  
  return isValid;
}

// Validate the entire form
function validateForm() {
  const inputs = document.querySelectorAll('#registration-form input');
  let isFormValid = true;
  
  inputs.forEach(input => {
    const inputIsValid = validateInput(input);
    if (!inputIsValid) {
      isFormValid = false;
    }
  });
  
  return isFormValid;
}

// Update the login button state based on form validation
function updateLoginButton() {
  const loginBtn = document.getElementById('login-btn');
  const isFormValid = validateForm();
  
  loginBtn.disabled = !isFormValid;
}

// Handle arrow key navigation in form
function handleArrowKeyNavigation(e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    
    const inputs = Array.from(document.querySelectorAll('#registration-form input'));
    const currentIndex = inputs.indexOf(this);
    let nextIndex;
    
    if (e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % inputs.length;
    } else { // ArrowUp
      nextIndex = (currentIndex - 1 + inputs.length) % inputs.length;
    }
    
    inputs[nextIndex].focus();
  }
}

// Select all subjects
function selectAllSubjects() {
  const checkboxes = document.querySelectorAll('#subjects-form input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = true;
  });
}

// Navigate to a specific page
function navigateToPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active-page');
  });
  
  // Show the target page
  document.getElementById(pageId).classList.add('active-page');
  
  // Update current page
  currentPage = pageId;
  
  // If navigating to about-me page, populate the data
  if (pageId === 'about-me-page') {
    populateAboutMeData();
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Populate About Me data
function populateAboutMeData() {
  const lang = currentLanguage;
  const t = translations[lang];
  
  // Personal Information
  document.getElementById('info-name').textContent = personalInfo.name;
  document.getElementById('info-academic-field').textContent = personalInfo.academicField;
  document.getElementById('info-university').textContent = personalInfo.university;
  document.getElementById('info-technical-skills').textContent = personalInfo.technicalSkills;
  document.getElementById('info-soft-skills').textContent = personalInfo.softSkills;
  document.getElementById('info-career-goal').textContent = personalInfo.careerGoal;
  document.getElementById('info-languages').textContent = personalInfo.languages;
  document.getElementById('info-contact').textContent = personalInfo.contact;
}
