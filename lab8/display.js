/**
 * Lab 8: User Information Display
 * Reads transmitted form parameters from sessionStorage / URL query string
 * and displays formatted profile card
 */

document.addEventListener('DOMContentLoaded', () => {
    // Containers
    const profileContainer = document.getElementById('profileContainer');
    const emptyContainer = document.getElementById('emptyContainer');

    // Profile elements
    const avatarInitials = document.getElementById('avatarInitials');
    const displayRegId = document.getElementById('displayRegId');
    const displayGenderBadge = document.getElementById('displayGenderBadge');
    const displayName = document.getElementById('displayName');
    const displayCityStateCountry = document.getElementById('displayCityStateCountry');
    const dataSourceBadge = document.getElementById('dataSourceBadge');

    // Detailed table values
    const valName = document.getElementById('valName');
    const valGender = document.getElementById('valGender');
    const valMobileLink = document.getElementById('valMobileLink');
    const valEmailLink = document.getElementById('valEmailLink');
    const valCity = document.getElementById('valCity');
    const valState = document.getElementById('valState');
    const valCountry = document.getElementById('valCountry');
    const valTimestamp = document.getElementById('valTimestamp');

    // Buttons
    const btnEditProfile = document.getElementById('btnEditProfile');
    const btnPrintProfile = document.getElementById('btnPrintProfile');
    const btnExportJson = document.getElementById('btnExportJson');
    const btnClearProfile = document.getElementById('btnClearProfile');
    const btnCopyMobile = document.getElementById('btnCopyMobile');
    const btnCopyEmail = document.getElementById('btnCopyEmail');
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');

    let currentUserData = null;

    // Toast helper
    function showToast(message) {
        toastText.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2200);
    }

    // =========================================================================
    // 1. Data Retrieval Strategy
    // =========================================================================
    function retrieveUserData() {
        let data = null;
        let source = '';

        // Priority 1: Check sessionStorage
        try {
            const sessionRaw = sessionStorage.getItem('lab8_user');
            if (sessionRaw) {
                data = JSON.parse(sessionRaw);
                source = 'sessionStorage (Web Storage API)';
            }
        } catch (e) {
            console.warn('sessionStorage parse error', e);
        }

        // Priority 2: Check URLSearchParams (query parameters)
        if (!data || !data.name) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('name') && urlParams.has('email')) {
                data = {
                    id: urlParams.get('id') || `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                    name: urlParams.get('name') || '',
                    gender: urlParams.get('gender') || '',
                    mobile: urlParams.get('mobile') || '',
                    email: urlParams.get('email') || '',
                    city: urlParams.get('city') || '',
                    state: urlParams.get('state') || '',
                    country: urlParams.get('country') || '',
                    timestamp: urlParams.get('timestamp') || new Date().toLocaleString()
                };
                source = 'URL Query Parameters (window.location.search)';
            }
        }

        // Priority 3: Check localStorage
        if (!data || !data.name) {
            try {
                const localRaw = localStorage.getItem('lab8_user');
                if (localRaw) {
                    data = JSON.parse(localRaw);
                    source = 'localStorage (Persistent Web Storage)';
                }
            } catch (e) {
                console.warn('localStorage parse error', e);
            }
        }

        return { data, source };
    }

    // =========================================================================
    // 2. Render Profile Card
    // =========================================================================
    function renderProfile(user, sourceName) {
        currentUserData = user;

        // Initials calculation (e.g. "Harshith R" -> "HR")
        const initials = user.name
            .split(' ')
            .filter(part => part.trim().length > 0)
            .map(part => part[0].toUpperCase())
            .slice(0, 2)
            .join('') || 'US';

        avatarInitials.textContent = initials;
        displayRegId.textContent = user.id || 'REG-2026-USER';

        // Gender badge
        const genderIcons = {
            'Male': '👨 Male',
            'Female': '👩 Female',
            'Other': '🧑 Other'
        };
        displayGenderBadge.textContent = genderIcons[user.gender] || user.gender || 'User';

        // Main names and location
        displayName.textContent = user.name;
        displayCityStateCountry.textContent = `${user.city}, ${user.state}, ${user.country}`;
        dataSourceBadge.textContent = `Retrieved via: ${sourceName}`;

        // Table Attributes
        valName.textContent = user.name;
        valGender.textContent = user.gender;

        // Mobile link
        valMobileLink.textContent = user.mobile;
        valMobileLink.href = `tel:${user.mobile}`;

        // Email link
        valEmailLink.textContent = user.email;
        valEmailLink.href = `mailto:${user.email}`;

        valCity.textContent = user.city;
        valState.textContent = user.state;

        // Country with flag display
        valCountry.textContent = user.country;

        valTimestamp.textContent = user.timestamp || 'N/A';

        // Show profile card, hide empty state
        profileContainer.classList.remove('hidden');
        emptyContainer.classList.add('hidden');
    }

    // Render logic
    const { data, source } = retrieveUserData();

    if (data && data.name) {
        renderProfile(data, source);
    } else {
        // Show empty state
        profileContainer.classList.add('hidden');
        emptyContainer.classList.remove('hidden');
    }

    // =========================================================================
    // 3. User Actions
    // =========================================================================

    // Edit Profile -> Return to index.html in edit mode
    btnEditProfile.addEventListener('click', () => {
        window.location.href = 'index.html?edit=1';
    });

    // Print Profile
    btnPrintProfile.addEventListener('click', () => {
        window.print();
    });

    // Copy Mobile
    btnCopyMobile.addEventListener('click', () => {
        if (currentUserData && currentUserData.mobile) {
            navigator.clipboard.writeText(currentUserData.mobile).then(() => {
                showToast('Mobile number copied to clipboard!');
            });
        }
    });

    // Copy Email
    btnCopyEmail.addEventListener('click', () => {
        if (currentUserData && currentUserData.email) {
            navigator.clipboard.writeText(currentUserData.email).then(() => {
                showToast('Email address copied to clipboard!');
            });
        }
    });

    // Export Profile as JSON file
    btnExportJson.addEventListener('click', () => {
        if (!currentUserData) return;

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentUserData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `user-profile-${currentUserData.id || 'export'}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        showToast('JSON file exported successfully!');
    });

    // Clear Profile
    btnClearProfile.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this profile record?')) {
            sessionStorage.removeItem('lab8_user');
            localStorage.removeItem('lab8_user');
            // Clean URL query parameters
            window.history.replaceState({}, document.title, window.location.pathname);
            profileContainer.classList.add('hidden');
            emptyContainer.classList.remove('hidden');
            showToast('Profile data cleared.');
        }
    });
});
