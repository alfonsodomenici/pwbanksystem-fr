export const errorMessage = (msg) => {
    sendMessage(msg,'error');
}

export const infoMessage = (msg) => {
    sendMessage(msg,'info');   
}

const sendMessage = (msg, type) => {
    document.dispatchEvent(new CustomEvent('pwMessage', {
        bubbles: true,
        composed: true,
        detail: {
            type,
            msg
        }
    }));
}