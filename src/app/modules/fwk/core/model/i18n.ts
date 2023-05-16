import { Entity } from './entity';

export class I18n {
    name: string;
    lang: string;
    words: any;
    // Deprecado use words
    dictionary?: any;

    clone?(i18n: I18n){
        this.name = i18n.name;
        this.lang = i18n.lang;
        this.dictionary = i18n.dictionary;
        this.words = i18n.words;
    }
    
    translate?(key: string){
        if (key === undefined){
            return key;
        }
        const keyUp = key.toUpperCase();
        // Deprecated use words
        let list;
        if (this.dictionary){
            list = this.dictionary;
        }
        // New Implementation
        if (this.words){
            list = this.words;
        }

        if (list){
            const keyName = Object.getOwnPropertyNames(list).find(name => name.toUpperCase() === keyUp);
            if (keyName === undefined){
                return key;
            }
            return list[keyName];
        }
        return key;
    }
}
