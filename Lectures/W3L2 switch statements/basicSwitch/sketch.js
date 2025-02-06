/**
 * Try changing the value of input to see how the switch works.
 * Try removing one or more of the break statements;
 */
let input = 2;
switch (input) {
    case 1:
        console.log("This is the first case");
        break;
    case 2:
        console.log("This is the second case");
        break;
    case 3:
        console.log("This is the third case");
        break;
    case 4:
    case 5:
    case 6:
        console.log("This is the fourth, fifth, or sixth case");
        break
    default:
        console.log("This is the default");
}