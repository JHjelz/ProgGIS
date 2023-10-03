// Her farges alle lagene i kartet

var count = 0;

var colors = [
"blue",
"red",
"yellow",
"green",
"purple",
"orange",
];

function getStyle() {
    var myStyle = {
        "color": colors[count]
    };

    count++;
    if (count == colors.length) {
        count = 0;
    }

    return myStyle
}
