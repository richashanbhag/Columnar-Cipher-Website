function decryptMessage(cipher, key, keepSpaces, keepPunctuation) {
    let msg = "";

    // Remove spaces and punctuation if not needed
    if (!keepSpaces) {
        cipher = cipher.replace(/\s+/g, '');
    }
    if (!keepPunctuation) {
        cipher = cipher.replace(/[^\w]/g, '');
    }

    // track key indices
    let k_indx = 0;

    // track msg indices
    let msg_indx = 0;
    const msg_len = cipher.length;
    const msg_lst = Array.from(cipher);

    // calculate column of the matrix
    const col = key.length;

    // calculate maximum row of the matrix
    const row = Math.ceil(msg_len / col);

    // convert key into list and sort 
    // alphabetically so we can access 
    // each character by its alphabetical position.
    const key_lst = Array.from(key).sort();

    // create an empty matrix to 
    // store deciphered message
    const dec_cipher = [];
    for (let i = 0; i < row; i++) {
        dec_cipher.push(Array(col).fill(null));
    }

    // Arrange the matrix column wise according 
    // to permutation order by adding into a new matrix
    for (let _ = 0; _ < col; _++) {
        const curr_idx = key.indexOf(key_lst[k_indx]);

        for (let j = 0; j < row; j++) {
            dec_cipher[j][curr_idx] = msg_lst[msg_indx];
            msg_indx++;
        }
        k_indx++;
    }

    // convert decrypted msg matrix into a string
    try {
        msg = dec_cipher.flat().join('');
    } catch (err) {
        throw new Error("This program cannot handle repeating words.");
    }

    const null_count = (msg.match(/_/g) || []).length;

    if (null_count > 0) {
        return msg.slice(0, -null_count);
    }

    return msg;
}

function decipherMessage() {
    const cipherText = document.getElementById('cipherText').value;
    const key = document.getElementById('key').value;
    const keepSpaces = document.getElementById('keepSpaces').checked;
    const keepPunctuation = document.getElementById('keepPunctuation').checked;

    if (key.length === 0) {
        alert("Please enter a key.");
        return;
    }

    const decipheredText = decryptMessage(cipherText, key, keepSpaces, keepPunctuation);
    document.getElementById('decipheredText').value = decipheredText;
}
