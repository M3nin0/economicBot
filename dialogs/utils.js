module.exports = {
    verifyNumber : function(number){
        if (number >= 0 && number <= 177){
            return number;
        } else {
            return -1;
        }
    }
};
