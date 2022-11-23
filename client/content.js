if (typeof init === 'undefined') {
    const inject = () => { 
        var modal = document.createElement('iframe');
        modal.src =  chrome.runtime.getURL('sample.html');
        modal.style.width = '100%';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.margin = 0;
        modal.style.padding = 0;
        modal.style.zIndex = 10000;
        modal.style.backgroundColor = 'white';
        modal.style.border = 'none';
        document.body.appendChild(modal);
    }
    inject();
}