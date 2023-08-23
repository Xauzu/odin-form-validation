function passwordConfirmation() {
    return document.querySelector('#password').value === document.querySelector('#passwordc').value;
}

// Postal regex is from https://stackoverflow.com/a/19844362
function checkValue(input) {
    const constraints = {
        email: ['.+@.+',
            'Email must contain the front, the @, and the domain'],
        country: ['.{4,}',
            'Country name must be at least 4 characters.'],
        postalcode: ['^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$',
            'Postal code must be valid.'],
        password: ['.{6,}',
            'Password must contain at least 6 characters.']
    }


    if (input.id !== 'passwordc') {
        const constraint = new RegExp(constraints[input.id][0], "");

        if (constraint.test(input.value)) input.setCustomValidity('');
        else {
            input.setCustomValidity(constraints[input.id][1]);
            return false;
        }
    }
    else {
        if (input.value.length > 0) {
            input.setCustomValidity('');
            if (passwordConfirmation()) input.setCustomValidity('');
            else {
                input.setCustomValidity('Password mismatch.');
                return false;
            }
        }
        else {
            input.setCustomValidity('Password confirmation must contain at least 6 characters.');
            return false;
        }
    }

    return true;
}

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
            input.addEventListener('focusout', () => {
                checkValue(input);
            });
        }
        else 
            input.onclick = (e) => {
                e.preventDefault();
                const checkInputs = document.querySelectorAll('input');

                let valid = 0;
                for(let j = 0; j < checkInputs.length; j++) {
                    if (checkInputs[j].type !== 'submit') {
                        if (checkValue(checkInputs[j])) valid++;
                        else checkInputs[j].reportValidity();
                    }
                }

                if (valid >= 5) {
                    // Success
                    alert(`${valid} out of 5 valid inputs.`);
                }
                else {
                    console.log(`${valid} out of 5 valid inputs.`);
                }
            };
    }
}

setup();