// Arquivo /views/helpers/helpers.js
const toLower = function(value) {
    return value.toLowerCase();
    }
const toUpper = function(value) {
    return value.toUpperCase();
}

function checked(currentValue, value){
    if(currentValue === value){
        return"checked";
    }
    else{
        return "";
    }
}

    module.exports = { toLower, toUpper, checked };