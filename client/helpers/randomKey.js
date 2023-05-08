export default function generateRandomKey (length) { 
    const characters = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_`abcdefghijklmnopqrstuvwxyz{|}'
    let generatedKey = '';

    for(let i = 0; i < length; i++) { 
        let characterRandomIndex = Math.floor(Math.random () * characters.length);
        generatedKey += characters[characterRandomIndex];
    }
    
    return generatedKey; 
}