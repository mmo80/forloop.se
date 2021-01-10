import '../sass/app.scss';

import { getService, IFormData } from './apiService';

let button = <HTMLElement>document.getElementById("sendbutton");
button.addEventListener("click", () => {
    let _service = getService();
    if (_service != null) {
        let data:IFormData = {
            email: (<HTMLInputElement>document.getElementById("email")).value,
            message: (<HTMLInputElement>document.getElementById("msg")).value
        };
        _service.Send(data).then(response => {
            alert('Your message has been sent. Thank you!');
        });
    }
});