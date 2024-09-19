import password_tools from "../../utils/password_tools.js";

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



try {
    const userInputPassword = '123'; // User's input
    const encryptedPassword = '$2a$10$C2KorW2J/jWsHWsXWOhQKet7lO.xQAUA6d7ICWYpwDuXEeOqIbED.'; // Password stored in the database

    const isMatch = await password_tools.verifyPassword(userInputPassword, encryptedPassword);
    
    if (isMatch) {
        console.log('Password matches!');
    } else {
        console.log('Incorrect password.');
    }
} catch (error) {
    console.error(error.message);
}


// console.log(newRole);