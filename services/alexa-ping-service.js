exports.doPromise = function (inputString) {
    let reversedString = "Doing a solid something...";

    (() => new Promise((resolve, reject) => {
        if (!inputString) {
            reversedString = "Pong";
        } else {
            reversedString = inputString.split('').reverse().join('') + "!";
        }

        return resolve(reversedString);
    }))();

    return reversedString;
};