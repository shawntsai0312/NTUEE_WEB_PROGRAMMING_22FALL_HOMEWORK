/*------------------------define person class------------------------*/
class person {
    constructor(_name, _fixed_state, _info, _join) {
        this.name = _name;
        this.fixed_state = _fixed_state;
        this.info = _info;
        this.join = _join;
    }
}

/*------------------------declare 6 person------------------------*/
var you = new person("你", 1, document.getElementById("你"), 1);
var wang = new person("王世堅", 0, document.getElementById("王世堅"), 1);
var lin = new person("林智堅", 0, document.getElementById("林智堅"), 1);
var ke = new person("柯文哲", 0, document.getElementById("柯文哲"), 1);
var han = new person("韓國瑜", 0, document.getElementById("韓國瑜"), 1);
var su = new person("蘇貞昌", 0, document.getElementById("蘇貞昌"), 1);

/*------------------------declare person array------------------------*/
var person_arr = [you, wang, lin, ke, han, su];

/*------------------------define function for fixed check------------------------*/
function join_count(arr) {
    var temp = 0;
    for (var i = 0; i < arr.length; i++) {
        temp += arr[i].join;
    }
    return temp;
}

/*------------------------define function for deleting------------------------*/
function hide_participator(element) {
    var this_person;
    for (var i = 0; i < person_arr.length; i++) {
        if (person_arr[i].name == element.parentNode.id) {
            this_person = person_arr[i];
            break;
        }
    }
    this_person.join = 0;

    if (element.parentNode.parentNode.id == "p1") {
        this_person.fixed_state = 0;
        element.parentNode.remove();
        document.getElementById("p1").style.display = "none";
    } else {
        element.parentNode.parentNode.remove();
    }

    if (join_count(person_arr) == 1) {
        console.log("the last survivor");
        var hidden_block = document.getElementById("hidden_person");
        var hidden_p = document.getElementById("hidden_name");
        if (you.fixed_state == 1) {
            you.fixed_state = 0;
            hidden_block.style.display = "block";
            hidden_block.insertBefore(you.info, hidden_p);
            hidden_p.innerHTML = you.name;
            document.getElementById("p1").style.display = "none";
        }
        hidden_block.style.width = "95%";
        hidden_block.style.height = "95%";
    }
}

/*------------------------define function for fixed check------------------------*/
function fixed_count(arr) {
    var temp = 0;
    for (var i = 0; i < arr.length; i++) {
        temp += arr[i].fixed_state;
    }
    return temp;
}

/*------------------------define function for fixing------------------------*/
function switch_pos(element) {
    if (join_count(person_arr) == 1) {
        return;
    }

    var this_person;
    for (var i = 0; i < person_arr.length; i++) {
        if (person_arr[i].name == element.parentNode.parentNode.id) {
            this_person = person_arr[i];
            break;
        }
    }
    if (fixed_count(person_arr) > 0) {
        if (this_person.fixed_state) {
            /*------------------------case 1 delete fixed person------------------------*/
            this_person.fixed_state = 0;
            var hidden_block = document.getElementById("hidden_person");
            var hidden_p = document.getElementById("hidden_name");
            hidden_block.style.display = "block";
            hidden_block.insertBefore(this_person.info, hidden_p);
            hidden_p.innerHTML = this_person.name;
            document.getElementById("p1").style.display = "none";
        } else {
            /*------------------------case 2 switch place------------------------*/
            //find the fixed_person
            var fixed_person;
            for (var i = 0; i < person_arr.length; i++) {
                if (person_arr[i].fixed_state) {
                    fixed_person = person_arr[i];
                    break;
                }
            }
            //switch fixed_state
            fixed_person.fixed_state = 0;
            this_person.fixed_state = 1;
            // switch info
            var temp_info = fixed_person.info;
            fixed_person.info = this_person.info;
            this_person.info = temp_info;
            // switch info's innerHTML
            var temp_info = fixed_person.info.innerHTML;
            fixed_person.info.innerHTML = this_person.info.innerHTML;
            this_person.info.innerHTML = temp_info;
            //switch id
            var temp_name = fixed_person.info.id;
            fixed_person.info.id = this_person.info.id;
            this_person.info.id = temp_name;
            //switch displayed name           
            document.getElementById("p1_info").lastElementChild.innerHTML = this_person.name;
            fixed_person.info.parentNode.lastElementChild.innerHTML = fixed_person.name;
        }
    } else {
        /*------------------------case 3 add fixed person------------------------*/
        this_person.fixed_state = 1;
        document.getElementById("p1").style.display = "block";
        this_person.info.parentNode.style.display = "none";
        document.getElementById("p1").insertBefore(this_person.info, document.getElementById("p1_info"));
        document.getElementById("p1_info").lastElementChild.innerHTML = this_person.name;
    }
}