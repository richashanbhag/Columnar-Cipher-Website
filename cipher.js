function handleEncrypt() {
    const msg = document.getElementById('plainText').value;
    const key = document.getElementById('key').value;
    const keepSpaces = document.getElementById('keepSpaces').checked;
    const keepPunctuation = document.getElementById('keepPunctuation').checked;

    // If necessary, modify msg based on keepSpaces and keepPunctuation
    let processedMsg = msg;
    if (!keepSpaces) {
        processedMsg = processedMsg.replace(/\s+/g, '');
    }
    if (!keepPunctuation) {
        processedMsg = processedMsg.replace(/[^\w\s]|_/g, '');
    }

    const cipheredText = encryptMessage(processedMsg, key);
    document.getElementById('cipheredText').value = cipheredText;
}

function encryptMessage(msg, key) {
    let cipher = "";

    // track key indices
    let k_indx = 0;

    const msg_len = msg.length;
    const msg_lst = Array.from(msg);
    const key_lst = Array.from(key).sort();

    // calculate column of the matrix
    const col = key.length;

    // calculate maximum row of the matrix
    const row = Math.ceil(msg_len / col);

    // add the padding character '_' in empty
    // the empty cell of the matrix
    const fill_null = (row * col) - msg_len;
    for (let i = 0; i < fill_null; i++) {
        msg_lst.push('_');
    }

    // create Matrix and insert message and
    // padding characters row-wise
    const matrix = [];
    for (let i = 0; i < msg_lst.length; i += col) {
        matrix.push(msg_lst.slice(i, i + col));
    }

    // read matrix column-wise using key
    for (let _ = 0; _ < col; _++) {
        const curr_idx = key.indexOf(key_lst[k_indx]);
        for (const row of matrix) {
            cipher += row[curr_idx];
        }
        k_indx++;
    }

    return cipher;
}
