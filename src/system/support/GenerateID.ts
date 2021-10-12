class GenerateID {
    generate() {
        const prefix = Math.floor(Math.random() * 26) + 97;
        const postfix = Number(Math.random().toString().slice(2)) + Date.now();
        return String(prefix) + String(postfix);
    }

    generate2() {
        const prefix = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        const postfix = Math.random().toString(32).slice(2) + Date.now().toString(32).slice(2);
        return String(prefix + postfix).toLocaleLowerCase();
    }
}

const generateID = new GenerateID()
export default generateID;
