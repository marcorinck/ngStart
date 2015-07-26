class ContactController {
    constructor(contactService, config) {
        this.author = "Marco Rinck";
        this.email = "marco.rinck@googlemail.com";
        this.homepage = "https://github.com/marcorinck/ngStart";
        this.message = contactService.message;
        this.system = config.system;
        this.contactService = contactService;
    }

    messageChanged() {
        this.sent = false;
    }

    sendMessage() {
        this.contactService.sendMessage();
        this.sent = true;
    }
}

ContactController.$inject = ['ContactService', 'config'];

export default ContactController;

