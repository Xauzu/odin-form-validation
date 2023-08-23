function setup() {
    const inputs = document.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if (input.type !== 'submit') {
            // Setup
            input.setAttribute('data-focus', '0');
            
            input.onchange = () => {
                input.setCustomValidity('');
            }
            input.onfocus = () => {
                if (input.getAttribute('data-focus') === '0') input.setAttribute('data-focus', '1');
            }
        }
    }
}

setup();