if (typeof init === 'undefined') {
    const inject = () => { 
        var modal = document.createElement('iframe');
        modal.src =  chrome.runtime.getURL('sample.html');
        modal.id = 'gelcr23';
        document.body.appendChild(modal);
    }
    inject();
}