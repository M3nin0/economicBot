module.exports = {
    verifyNumber : function(number){
        if (number >= 0 && number <= 100){
            return number;
        } else {
            return -1;
        }
    }
};