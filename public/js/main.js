window.addEventListener('load', function (e) {
    /* PASSWORD HIDE SHOW JARAYONI */
    const inpType = document.querySelector('input[type="password"]');
    const hide_password = document.querySelector('.hide_password');
    const ion_icon = document.querySelector('.show');

    hide_password.addEventListener('click', function (e) {
        const type = inpType.getAttribute('type')
        if (type === "password") {
            inpType.setAttribute('type', 'text')
            ion_icon.innerHTML = "hide"
        } else {
            inpType.setAttribute('type', 'password')
            ion_icon.innerHTML = "show"
        }
    });
});

