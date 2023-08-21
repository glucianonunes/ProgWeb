document.write("<div class=\"tabuada\">")
for(let i = 1; i <= 10; i++){
    document.write("<table border=\"1\"> <th colspan=\"3\"> Produto de " + i + "</th>");
    for (let j = 1; j <= 10; j++){
        document.write("<tr>")
        document.write("<td>" + i + "x" + j + "</td>")
        document.write("<td>" + i*j + "</td>")
        document.write("</tr>")
    }
    document.write("</table>");
}
document.write("</div>")
