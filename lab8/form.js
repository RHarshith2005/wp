/**
 * Lab 8: User Information Capture
 * Form Validation and Inter-Page Transmission via JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('userRegistrationForm');
    const nameInput = document.getElementById('fullName');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const mobileInput = document.getElementById('mobile');
    const emailInput = document.getElementById('email');
    const cityInput = document.getElementById('city');
    const stateSelect = document.getElementById('state');
    const countrySelect = document.getElementById('country');
    const btnFillSample = document.getElementById('btnFillSample');
    const btnReset = document.getElementById('btnReset');
    const editModeBanner = document.getElementById('editModeBanner');
    const formHeaderTitle = document.getElementById('formHeaderTitle');
    const btnSubmitText = document.getElementById('btnSubmitText');

    // Feedback elements
    const nameFeedback = document.getElementById('nameFeedback');
    const genderFeedback = document.getElementById('genderFeedback');
    const mobileFeedback = document.getElementById('mobileFeedback');
    const emailFeedback = document.getElementById('emailFeedback');
    const cityFeedback = document.getElementById('cityFeedback');
    const stateFeedback = document.getElementById('stateFeedback');
    const countryFeedback = document.getElementById('countryFeedback');

    // Radio card active styling
    function updateRadioStyles() {
        genderRadios.forEach(radio => {
            const card = radio.closest('.radio-card');
            if (radio.checked) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    genderRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateRadioStyles();
            setValid(radio, genderFeedback);
        });
    });

    // =========================================================================
    // 1. Live Validation Helpers
    // =========================================================================
    function setInvalid(element, feedbackElement, message) {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        feedbackElement.className = 'field-feedback error';
        feedbackElement.textContent = message;
    }

    function setValid(element, feedbackElement, message = '') {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        feedbackElement.className = 'field-feedback success';
        feedbackElement.textContent = message;
    }

    function clearValidation(element, feedbackElement) {
        element.classList.remove('is-valid', 'is-invalid');
        feedbackElement.className = 'field-feedback';
        feedbackElement.textContent = '';
    }

    // Validation Functions
    function validateName() {
        const val = nameInput.value.trim();
        if (val.length < 2) {
            setInvalid(nameInput, nameFeedback, 'Please enter a valid full name (at least 2 letters).');
            return false;
        }
        setValid(nameInput, nameFeedback, '✓ Valid name');
        return true;
    }

    function validateGender() {
        const selected = Array.from(genderRadios).some(r => r.checked);
        if (!selected) {
            genderFeedback.className = 'field-feedback error';
            genderFeedback.textContent = 'Please select a gender option.';
            return false;
        }
        genderFeedback.className = 'field-feedback success';
        genderFeedback.textContent = '';
        return true;
    }

    function validateMobile() {
        const val = mobileInput.value.trim();
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(val)) {
            setInvalid(mobileInput, mobileFeedback, 'Please enter a valid 10-digit mobile number.');
            return false;
        }
        setValid(mobileInput, mobileFeedback, '✓ Valid 10-digit mobile number');
        return true;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
            setInvalid(emailInput, emailFeedback, 'Please enter a valid email address (e.g., user@domain.com).');
            return false;
        }
        setValid(emailInput, emailFeedback, '✓ Valid email address');
        return true;
    }

    function validateCity() {
        const val = cityInput.value.trim();
        if (val.length < 2) {
            setInvalid(cityInput, cityFeedback, 'Please enter a valid city name.');
            return false;
        }
        setValid(cityInput, cityFeedback, '✓ City entered');
        return true;
    }

    function validateState() {
        const val = stateSelect.value;
        if (!val) {
            setInvalid(stateSelect, stateFeedback, 'Please select your state.');
            return false;
        }
        setValid(stateSelect, stateFeedback, '✓ State selected');
        return true;
    }

    function validateCountry() {
        const val = countrySelect.value;
        if (!val) {
            setInvalid(countrySelect, countryFeedback, 'Please select your country.');
            return false;
        }
        setValid(countrySelect, countryFeedback, '✓ Country selected');
        return true;
    }

    // Attach Input Event Listeners for Real-time Feedback
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);

    // Filter non-numeric characters from mobile input
    mobileInput.addEventListener('input', () => {
        mobileInput.value = mobileInput.value.replace(/[^0-9]/g, '');
        validateMobile();
    });
    mobileInput.addEventListener('blur', validateMobile);

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    cityInput.addEventListener('input', validateCity);
    cityInput.addEventListener('blur', validateCity);

    stateSelect.addEventListener('change', validateState);
    countrySelect.addEventListener('change', validateCountry);

    // =========================================================================
    // 2. Sample Data Auto-Fill (For Instant Testing / Grading)
    // =========================================================================
    btnFillSample.addEventListener('click', () => {
        nameInput.value = 'Harshith R';
        const maleRadio = document.getElementById('genderMale');
        maleRadio.checked = true;
        updateRadioStyles();

        mobileInput.value = '9876543210';
        emailInput.value = 'harshith.r@example.com';
        cityInput.value = 'Bengaluru';
        stateSelect.value = 'Karnataka';
        countrySelect.value = 'India';

        // Run validation to show green checkmarks
        validateName();
        validateGender();
        validateMobile();
        validateEmail();
        validateCity();
        validateState();
        validateCountry();
    });

    // Reset handler
    btnReset.addEventListener('click', () => {
        setTimeout(() => {
            updateRadioStyles();
            [nameInput, mobileInput, emailInput, cityInput, stateSelect, countrySelect].forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            [nameFeedback, genderFeedback, mobileFeedback, emailFeedback, cityFeedback, stateFeedback, countryFeedback].forEach(fb => {
                fb.className = 'field-feedback';
                fb.textContent = '';
            });
            editModeBanner.classList.add('hidden');
            formHeaderTitle.textContent = 'User Registration Form';
            btnSubmitText.textContent = 'Submit & Display on Next Page';
        }, 10);
    });

    // =========================================================================
    // 3. Edit Mode Pre-population (Checking ?edit=1 or saved session)
    // =========================================================================
    function checkEditMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const isEdit = urlParams.get('edit') === '1' || urlParams.get('edit') === 'true';

        let savedData = null;
        try {
            const rawSession = sessionStorage.getItem('lab8_user');
            if (rawSession) savedData = JSON.parse(rawSession);
            else {
                const rawLocal = localStorage.getItem('lab8_user');
                if (rawLocal) savedData = JSON.parse(rawLocal);
            }
        } catch (e) {
            console.warn('Error reading stored user data', e);
        }

        if (isEdit && savedData) {
            editModeBanner.classList.remove('hidden');
            formHeaderTitle.textContent = 'Update User Information';
            btnSubmitText.textContent = 'Save Changes & Update Profile';

            // Populate fields
            nameInput.value = savedData.name || '';
            mobileInput.value = savedData.mobile || '';
            emailInput.value = savedData.email || '';
            cityInput.value = savedData.city || '';
            stateSelect.value = savedData.state || '';
            countrySelect.value = savedData.country || '';

            if (savedData.gender) {
                const r = document.querySelector(`input[name="gender"][value="${savedData.gender}"]`);
                if (r) r.checked = true;
            }
            updateRadioStyles();

            // Validate pre-filled
            validateName();
            validateGender();
            validateMobile();
            validateEmail();
            validateCity();
            validateState();
            validateCountry();
        }
    }

    checkEditMode();

    // =========================================================================
    // 4. Form Submission & Inter-Page Transmission
    // =========================================================================
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Run full validation across all fields
        const isNameValid = validateName();
        const isGenderValid = validateGender();
        const isMobileValid = validateMobile();
        const isEmailValid = validateEmail();
        const isCityValid = validateCity();
        const isStateValid = validateState();
        const isCountryValid = validateCountry();

        if (!isNameValid || !isGenderValid || !isMobileValid || !isEmailValid || !isCityValid || !isStateValid || !isCountryValid) {
            // Focus on first invalid field
            if (!isNameValid) nameInput.focus();
            else if (!isGenderValid) genderRadios[0].focus();
            else if (!isMobileValid) mobileInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isCityValid) cityInput.focus();
            else if (!isStateValid) stateSelect.focus();
            else if (!isCountryValid) countrySelect.focus();
            return;
        }

        // Get selected gender
        let selectedGender = '';
        genderRadios.forEach(r => {
            if (r.checked) selectedGender = r.value;
        });

        // Generate unique registration ID & timestamp
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const now = new Date();
        const formattedTimestamp = now.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });

        // Assemble user data payload
        const userData = {
            id: `REG-2026-${randomId}`,
            name: nameInput.value.trim(),
            gender: selectedGender,
            mobile: mobileInput.value.trim(),
            email: emailInput.value.trim(),
            city: cityInput.value.trim(),
            state: stateSelect.value,
            country: countrySelect.value,
            timestamp: formattedTimestamp
        };

        // 1. Store via Web Storage API (sessionStorage for current session, localStorage for persistence)
        try {
            sessionStorage.setItem('lab8_user', JSON.stringify(userData));
            localStorage.setItem('lab8_user', JSON.stringify(userData));
        } catch (err) {
            console.error('Storage error:', err);
        }

        // 2. Also construct URLSearchParams to showcase classic query-string data transmission
        const queryParams = new URLSearchParams({
            id: userData.id,
            name: userData.name,
            gender: userData.gender,
            mobile: userData.mobile,
            email: userData.email,
            city: userData.city,
            state: userData.state,
            country: userData.country,
            timestamp: userData.timestamp
        });

        // 3. Redirect to the destination display page using JavaScript
        window.location.href = `display.html?${queryParams.toString()}`;
    });
});
