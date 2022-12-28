if (typeof init === 'undefined') {
    const inject = () => { 
        var modal = document.createElement('iframe');
        modal.src =  chrome.runtime.getURL('modal/modal.html');
        modal.id = 'gelcr23';
        modal.setAttribute("allowtransparency", "true");
        modal.setAttribute("style", "color-scheme: light dark;");
        document.body.appendChild(modal);
        window.addEventListener("message", function(event) {
            if (event.source != window)
                return;
            if (event.data.type && (event.data.type == "STATUS_CHANGE")) {
                this.alert(event.data.text);
            }
        });
    }
    inject();
      
}