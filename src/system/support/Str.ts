import crypto from 'crypto'
import randomstring from 'randomstring';

class Str {
    hashCode(s: string): number {
        const length = s.length
        let h = 0
        let i = 0;
        if (length > 0)
            while (i < length)
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
    };

    format() {
        if (arguments.length < 1)
            return void 0

        let str = arguments[0]
        const args = [...arguments].slice(1);

        for (let i = 0; i < args.length; i++) {
            const regexp = new RegExp('\\{' + i + '\\}', 'gi');
            str = str.replace(regexp, args[i]);
        }
        return str;
    }

    random(length: number): string {
        let str = '';
        let len: number;
        while ((len = str.length) < length) {
            const size = length - len;
            const buff = crypto.randomBytes(size);

            let encodedString = buff.toString('base64');
            encodedString = encodedString.replace("[\\/\\+\\=]", "");
            encodedString = encodedString.substring(0, size);

            str = str + encodedString
        }

        return str;
    }

    randomV2(length: number): string {
        return randomstring.generate(length)
    }

    trimString(input: any, except?: string[]) {
        if (typeof input === 'string')
            return input.trim();

        if (input !== null && typeof input === 'object') {
            Object.keys(input).forEach((key) => {
                if (!except || !except.includes(key))
                    input[key] = this.trimString(input[key]);
            });
        }
        return input;
    }
}

const str = new Str();
export default str;
