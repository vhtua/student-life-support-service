const studentRoleName = ["Student"];
const staffRoleName = ["Student Affairs", "Dorm staff"];
const adminRoleName = ["Admin"];


const newRole = studentRoleName.concat(staffRoleName);


// array.forEach(function(currentValue, index, arr), thisValue)

const allowedRole = [studentRoleName, staffRoleName]
console.log(allowedRole);

allowedRole.some((role) => {
    console.log(role);
    if (studentRoleName === role) { console.log("True Student"); return true; }
    else if (staffRoleName === role) { console.log("True Staff"); }
    else if ( adminRoleName === role) { console.log("True Admin") } 
    else { console.log("Not good!") }
});

// console.log(newRole);