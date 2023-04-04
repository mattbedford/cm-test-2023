
/**
* Function to reverse a binary number and provide also its corresponding integer value.
*/

// Vars
let input, result, message;

input = prompt("enter binary string", "101010");
if(input) {
    // Call main function
    result = reverseBinary(input.toString());

    // Expect result to be an object with two props else an error string
    if (typeof result === 'string') {
        message = result;
    } else {
        message = `Reversed binary is ${result.reversedBinary} (integer value: ${result.integerValue})`;
    }
    console.log(message);
} 


function reverseBinary(input) {
    // Validate input exists
    if(!input) return 'Error. You need to submit a value for this to work. Please try again.';

    // Remove whitespace
    input = input.replace(/\s/g, '');
    
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
    // Thanks ECMAScript 6 for new 0b binary literal
    let testBinary = `0b${input}`;
    if(isNaN(testBinary)) return false;
    return true;
}

function flipBinary(input) {
    // Spread operator > array > flip > join
    return [...input].reverse().join('');
}

function getInteger(input) {
    return parseInt(input, 2);
}
