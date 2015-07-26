class ContactService {
    constructor() {
        this.message = {
            senderName: "",
            senderMail: "",
            text: ""
        };
    }
    sendMessage() {
        console.log("SendMessage called! Message: " + message.text);
    }
}

export default ContactService;