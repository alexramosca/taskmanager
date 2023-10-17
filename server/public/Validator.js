class Validator {
    static isEmpty(id) {


        if ($.trim($(id).val()).length == 0) {
            return true;
        }
        return false;
    }
    static checkDate(date) {
        let today = new Date();
        date = new Date(date);
        console.log(date);
        today.setUTCHours(0, 0, 0, 0);
        date.setUTCHours(1, 1, 1, 1);
        if (date < today) {
            return false;
        }
        else {
            return true;
        }

    }
    static checkLength(id, min, max) {
        let input = $(`#${id}`).val();
        if (input.length < min || input.length > max)
            return false;
        return true;
    }
}


export default Validator
