const fs = require('fs');

class DataBase {
    constructor(bd, pathToBD) {
        this.bd = bd;
        this.pathToBD = pathToBD
    }

    makeUser(sender, chatId, mesText) {
        return {
            sender: sender,
            recipient: { chat_id: chatId },
            message: {
                text: mesText,
            }
        }
    }



    addUser(sender, chatId, mesText) {
        this.bd.users.push(this.makeUser(sender, chatId, mesText));
        fs.writeFileSync(this.pathToBD, JSON.stringify(this.bd));
    }
}

module.exports = DataBase;