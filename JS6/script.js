const dotList = [];

class Dot {
    constructor(event) {
        this.dot = document.createElement("div");
        this.dot.className = "dot";
        this.dot.style.left = (event.pageX - 4) + "px";
        this.dot.style.top = (event.pageY - 4) + "px";
        document.body.appendChild(this.dot);
    }
}

document.addEventListener("mousemove", function(event) {
    if (dotList.length >= 8) {
        dotList[0].dot.remove();
        dotList.shift();
    }

    let dot = new Dot(event);
    dotList.push(dot);
});
