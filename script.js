// APTEKA
    const timeInput = document.getElementById('alarm-time');
    const btnTaken = document.getElementById('btn-taken');
    const btnResetLeki = document.getElementById('btn-reset-leki');
    const alertTitle = document.querySelector('.alert-title');
    let alarmTriggered = false; 

    if (timeInput && btnTaken) {
        function setLekiPrzyjete() {
            btnTaken.classList.remove('btn-gray');
            btnTaken.classList.add('btn-success');
            btnTaken.innerText = "PRZYJĘTE! ✓";
            if (alertTitle) alertTitle.innerText = "LEKI PRZYJĘTE";
            if (btnResetLeki) btnResetLeki.classList.remove('hidden'); 
        }

        function resetLekiState() {
            btnTaken.classList.remove('btn-success');
            btnTaken.classList.add('btn-gray');
            btnTaken.innerText = "PRZYJĘTE!";
            if (alertTitle) alertTitle.innerText = "CZAS NA LEKI";
            if (btnResetLeki) btnResetLeki.classList.add('hidden'); 
            alarmTriggered = false; 
        }

        if (localStorage.getItem('lekiPrzyjeteDzis') === 'true') {
            setLekiPrzyjete();
        } else {
            btnTaken.classList.add('btn-gray');
        }

        setInterval(() => {
            if (localStorage.getItem('lekiPrzyjeteDzis') === 'true') return;
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;
            const targetTime = timeInput.value;
            if (currentTime === targetTime && !alarmTriggered) {
                alarmTriggered = true;
                btnTaken.classList.remove('btn-gray');
                alert('E-WNUCZEK PRZYPOMINA:\n\nCzas na Twoje leki! 💊');
            } 
            else if (currentTime !== targetTime) {
                alarmTriggered = false; 
            }
        }, 1000);
        btnTaken.addEventListener('click', () => {
            if (btnTaken.classList.contains('btn-gray')) return;

            if (btnTaken.classList.contains('btn-success')) {
                window.location.href = 'menu.html';
                return; 
            }

            localStorage.setItem('lekiPrzyjeteDzis', 'true');
            setLekiPrzyjete();
            alert('Wspaniale! Dane zostały zapisane.\nJeśli zapomnisz, czy leki zostały wzięte, możesz sprawdzić to tutaj. \n\nWracamy do menu głównego 🌞');
            window.location.href = 'menu.html';
        });
        if (btnResetLeki) {
            btnResetLeki.addEventListener('click', () => {
                localStorage.removeItem('lekiPrzyjeteDzis');
                resetLekiState();
                alert('Zaznaczenie zostało cofnięte!\n\n Ponownie ustaw godzine przyjęcia leków');
            });
        }
    }
// PORADNIKI
    const guideBox = document.getElementById('guide-box');

    if (guideBox) {
        const lupa = document.createElement('div');
        lupa.classList.add('lupa-cursor');
        document.body.appendChild(lupa);

        guideBox.addEventListener('mouseenter', () => {
            lupa.style.display = 'block';
        });

        guideBox.addEventListener('mouseleave', () => {
            lupa.style.display = 'none';
        });

        guideBox.addEventListener('mousemove', (e) => {
            lupa.style.left = e.clientX + 'px';
            lupa.style.top = e.clientY + 'px';
        });
    }
    //OPIEKUN
   const opiekunForm = document.getElementById('opiekun-form');
    
    if (opiekunForm) {
        const nameInput = document.getElementById('opiekun-name');
        const phoneInput = document.getElementById('opiekun-phone');
        const relationInput = document.getElementById('opiekun-relation');
        const photoContainer = document.getElementById('opiekun-photo-container');
        const btnClear = document.getElementById('btn-clear'); 


        if (localStorage.getItem('opiekunName')) {
            nameInput.value = localStorage.getItem('opiekunName');
        }
        if (localStorage.getItem('opiekunPhone')) {
            phoneInput.value = localStorage.getItem('opiekunPhone');
        }
        if (localStorage.getItem('opiekunRelation')) {
            relationInput.value = localStorage.getItem('opiekunRelation');
        }

        if (localStorage.getItem('opiekunPhotoActivated') === 'true') {
            photoContainer.classList.remove('photo-container-hidden');
            photoContainer.classList.add('photo-container-visible');
        }


        opiekunForm.addEventListener('submit', (e) => {
            e.preventDefault();

            localStorage.setItem('opiekunName', nameInput.value);
            localStorage.setItem('opiekunPhone', phoneInput.value);
            localStorage.setItem('opiekunRelation', relationInput.value);
            localStorage.setItem('opiekunPhotoActivated', 'true');

            photoContainer.classList.remove('photo-container-hidden');
            photoContainer.classList.add('photo-container-visible');

            alert('Dane Twojego opiekuna zostały pomyślnie zapisane 💛');
        });

   
        if (btnClear) {
            btnClear.addEventListener('click', () => {
                localStorage.removeItem('opiekunName');
                localStorage.removeItem('opiekunPhone');
                localStorage.removeItem('opiekunRelation');
                localStorage.removeItem('opiekunPhotoActivated');

                nameInput.value = '';
                phoneInput.value = '';
                relationInput.value = 'Wnuczek / Wnuczka'; 

                photoContainer.classList.remove('photo-container-visible');
                photoContainer.classList.add('photo-container-hidden');

                alert('Gotowe! Dane opiekuna zostały usunięte z urządzenia. 🗑️');
            });
        }
    }
    