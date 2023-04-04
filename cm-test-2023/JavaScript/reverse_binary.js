
/*****
* 
* Function to reverse a binary number and provide also its corresponding integer value.
* 
*****/

// Grab binary from a prompt
var input = prompt("enter binary string");

// Remove whtespace
input = input.replace(/\s/g, '');

// Call main function. It returns either an error string or an object with reversedBinary and IntegerValue keys.
// In either case, we log the result to console.
let result = reverseBinary(input);
if (typeof result === 'string') {
    console.log(result);
} else {
    let x = `Reversed binary is ${result.reversedBinary} (integer value: ${result.integerValue})`;
    console.log(x);
}


function reverseBinary(input) {
    // Validate input exists
    if(!input) return 'Error. You need to submit a value for this to work. Please try again.';
    
    // Validate input is a valid binary string
    if(!checkIsABinary(input)) return 'Error. It seems that you didn\'t give us a legit binary string. Please try again.';

    // Reverse
    let flippedInput = flipBinary(input);
    let correspondingInteger = getInteger(flippedInput);

    // Return result or throw error
    if(flippedInput && correspondingInteger) {
        const res = {
            reversedBinary: flippedInput,
            integerValue: correspondingInteger
        };
        return res;
    }
    return 'Error. We could not convert your input. Very sorry.';
};


function checkIsABinary(input) {
    // Check for negatives, which could break our spread check, below.
    // Store out orginal string in case this is so.
    let neg = false;
    let originalInput = input;
    if(input.substring(0, 1) === '-') {
        neg = true;
        input = (input.substring(1));
    }

    // expand input with spread, then iterate over, looking for 1s and 0s only.
    [...input].forEach(c => {
        if(c !== 1 || c !== 0) return false;
    });

    // Return to negative if need be
    if(!neg) input = originalInput;

    // Check Ecmascript6 interpretation of binary is OK.
    // We could actually have just done this without the spread above but I'm keeping the above
    // as it might be useful if we needed to run this script on older browsers. 
    let testBinary = '0b' + input;
    if(isNaN(testBinary)) return false;

    // If all those tests passed, we have a confirmed binary number
    return true;
}

function flipBinary(input) {
    //Bit inversion on our binary
    //return ~ input;
    return [...input].reverse().join('');
}

function getInteger(input) {
    // Return input parsed as binary. Cuold also do "0b" trick, but I believe
    // parseInt handles negatives better.
    return parseInt(input, 2);
}
