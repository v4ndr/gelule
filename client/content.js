if (typeof init === 'undefined') {
    const inject = () => { 
        const logo = chrome.runtime.getURL('./modal/assets/logo.png');
        const yes = chrome.runtime.getURL('./modal/assets/yes.png');
        const no = chrome.runtime.getURL('./modal/assets/no.png');
        const lock = chrome.runtime.getURL('./modal/assets/lock.png');
        var modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.bottom = '50px';
        modal.style.right = '50px';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'row';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 1000000;
        modal.className = 'gelule-modal';
        modal.innerHTML = `
        <div class="gelCR23-container">
            <div class="gelCR23-modal-container gelCR23-locked gelCR23-fixed">
                <img class="gelCR23-logo" src="${lock}" alt="logo" height="30px">
                <div class="gelCR23-lock-text">
                    <p class="gelCR23-title" >Entrez votre code</p>
                    <p class="gelCR23-title" >de sécurité :</p>
                </div>
                <form class="gelCR23-form">
                    <input class="gelCR23-input" type="number" maxlength="1"/>
                    <input class="gelCR23-input" type="number" maxlength="1"/>
                    <input class="gelCR23-input" type="number" maxlength="1"/>
                    <input class="gelCR23-input" type="number" maxlength="1"/>
                </form>
                <div class="gelCR23-unlock-text">
                    <p class="gelCR23-title" >Authentification réussie !</p>
                </div>
                <div class="gelCR23-hidden-text gelCR23-disabled-text">
                    <p class="gelCR23-title" >Je fais une recherche !</p>
                </div>
                <div class="gelCR23-hidden-text gelCR23-enabled-text">
                    <p class="gelCR23-title" >Enregistrement en cours ...</p>
                    <p class="gelCR23-subtitle">Cliquer pour arrêter l'enregistrement.</p>
                </div>
                <div class="gelCR23-ask-text">
                    <p class="gelCR23-title" >Êtes-vous satisfait de votre recherche ?</p>
                </div>
                <div class="gelCR23-success-text">
                    <p class="gelCR23-title" >Recherche terminée.</p>
                </div>
            </div>
            <div class="gelCR23-button gelCR23-ask">
                <img class="gelCR23-img" src="${yes}" alt="logo" height="30px">
            </div>
            <div class="gelCR23-button gelCR23-ask">
                <img class="gelCR23-img" src="${no}" alt="logo" height="30px">
            </div>
        </div>
        `;
        document.body.appendChild(modal);
        /*
            SCRIPT START
        */
            /* eslint-disable no-undef */
            $(() => {
                // ----------
                $('.gelCR23-error > .gelCR23-logo').attr('src', no);
                $('.gelCR23-error > .gelCR23-form > .gelCR23-input').css('border', '1px solid red');
                // ----------
                $('.gelCR23-container').on('mouseenter', '.gelCR23-modal-container:not(.gelCR23-fixed)', () => {
                $('.gelCR23-modal-container').addClass('gelCR23-hover');
                });
                $('.gelCR23-container').on('mouseleave', '.gelCR23-modal-container:not(.gelCR23-fixed)', () => {
                $('.gelCR23-modal-container').removeClass('gelCR23-hover');
                });
                $('body').on('click', '.gelCR23-inactive', () => {
                $('.gelCR23-modal-container').addClass('gelCR23-active');
                $('.gelCR23-modal-container').removeClass('gelCR23-inactive');
                $('.gelCR23-logo').addClass('gelCR23-spinning');
                $('.gelCR23-disabled-text').hide();
                $('.gelCR23-enabled-text').show();
                $('.gelCR23-modal-container').removeClass('gelCR23-hover');
                });
                $('body').on('click', '.gelCR23-active', () => {
                $('.gelCR23-modal-container').addClass('gelCR23-ask gelCR23-fixed');
                $('.gelCR23-modal-container').removeClass('gelCR23-active gelCR23-hover');
                $('.gelCR23-logo').removeClass('gelCR23-spinning');
                $('.gelCR23-enabled-text').hide();
                $('.gelCR23-ask-text').show();
                $('.gelCR23-button.gelCR23-ask').css('display', 'flex');
                });
                $('body').on('click', '.gelCR23-button.gelCR23-ask', () => {
                $('.gelCR23-modal-container').removeClass('gelCR23-ask');
                $('.gelCR23-modal-container').addClass('gelCR23-success gelCR23-fixed');
                $('.gelCR23-ask-text').hide();
                $('.gelCR23-success-text').show();
                $('.gelCR23-button.gelCR23-ask').hide();
                $('.gelCR23-logo').attr('src', yes);
                setTimeout(() => {
                    $('.gelCR23-modal-container').removeClass('gelCR23-success gelCR23-fixed');
                    $('.gelCR23-modal-container').addClass('gelCR23-inactive');
                    $('.gelCR23-success-text').hide();
                    $('.gelCR23-disabled-text').show();
                    $('.gelCR23-logo').attr('src', logo);
                }, 4000);
                });
                const inputs = document.querySelectorAll('.gelCR23-input');
                inputs.forEach((input, key) => {
                input.addEventListener('keyup', (e) => {
                    if (input.value) {
                    if (key === 3) {
                        if (e.code !== 'ShiftRight' && e.code !== 'ShiftLeft' && e.code !== 'CapsLock') {
                        const pinCode = [...inputs].map((pin) => pin.value).join('');
                        // eslint-disable-next-line no-console
                        console.log(pinCode);
                        $('.gelCR23-logo').attr('src', yes);
                        $('.gelCR23-form').hide();
                        $('.gelCR23-lock-text').hide();
                        $('.gelCR23-unlock-text').show();
                        $('.gelCR23-modal-container').removeClass('gelCR23-locked');
                        $('.gelCR23-modal-container').addClass('gelCR23-unlocked');
                        setTimeout(() => {
                            $('.gelCR23-modal-container').removeClass('gelCR23-unlocked gelCR23-fixed');
                            $('.gelCR23-modal-container').addClass('gelCR23-inactive');
                            $('.gelCR23-unlock-text').hide();
                            $('.gelCR23-disabled-text').show();
                            $('.gelCR23-logo').attr('src', logo);
                        }, 4000);
                        }
                    } else {
                        inputs[key + 1].focus();
                    }
                    }
                });
                });
            });
        /*
            SCRIPT END
        */
    }
    inject();
}