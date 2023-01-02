if (typeof init === 'undefined') {
    const inject = () => { 
        const lock = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/lock.png'
        const no = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/no.png'
        const yes = 'chrome-extension://mamgocnnbmopjdogbmdipfnenankpoce/modal/assets/yes.png'

        //Jquery injection
        var script = document.createElement('script');
        const url = chrome.runtime.getURL('./modal/vendor/jquery-3.6.1.min.js')
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);

        //html injection
        var modal = document.createElement('div');
        modal.className = 'container';
        modal.innerHTML = `
            <div class="modal-container locked fixed">
                <img class="logo" src=${lock} alt="logo" height="30px">
                <div class="lock-text">
                    <p class="title" >Entrez votre code</p>
                    <p class="title" >de sécurité :</p>
                </div>
                <form class="form">
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                    <input class="input" type="number" maxlength="1"/>
                </form>
                <div class="unlock-text">
                    <p class="title" >Authentification réussie !</p>
                </div>
                <div class="hidden-text disabled-text">
                    <p class="title" >Je fais une recherche !</p>
                </div>
                <div class="hidden-text enabled-text">
                    <p class="title" >Enregistrement en cours ...</p>
                    <p class="subtitle">Cliquer pour arrêter l'enregistrement.</p>
                </div>
                <div class="ask-text">
                    <p class="title" >Êtes-vous satisfait de votre recherche ?</p>
                </div>
                <div class="success-text">
                    <p class="title" >Recherche terminée !</p>
                </div>
            </div>
            <div class="button ask">
                <img class="img" src=${yes} alt="logo" height="30px">
            </div>
            <div class="button ask">
                <img class="img" src=${no} alt="logo" height="30px">
            </div>
        `
        document.body.appendChild(modal);

        //JS injection
        var modalJs = document.createElement('script');
        modalJs.src = chrome.runtime.getURL('./modal/script.js')
        document.body.appendChild(modalJs);
    }
    inject();
      
}