(function () {
    let FPS = 150;
    const HEIGHT = 300;
    const WIDTH = 1024;
    const PROB_NUVEM = 1;
    const PROB_PTERO = 0.3;
    const PROB_CACTO = 1;

    let gameLoop;
    let dayLoop;
    let hora;
    let start = false;
    let nuvens = [];
    let ptero = [];
    let cacto = []
    let frame = 0;
    let gameOverText;
    let gameOver = false;
    let restartButton;
    let pausa = 0;

    class Pontuacao{
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "score";
            this.element.textContent = "0"
            this.score = 0;
            deserto.element.appendChild(this.element);
        }
        pontuar(){
            this.score += 1
            this.element.textContent = `${this.score}`
        }
    }

    class Dino {
        #status;
        constructor() {
            this.backgroundPositionsX = {
                correndo1: "-1391px",
                correndo2: "-1457px",
                pulando: "-1259px",
                agachado1: "-1655px",
                agachado2: "-1743px"
            };
            this.fallSpeed = 1;
            this.#status = 0; // 0-correndo; 1-subindo; 2-descendo
            this.alturaMinima = 3;
            this.alturaMaxima = 150;
            this.element = document.createElement("div");
            this.element.className = "dino";
            this.element.style.backgroundPositionX =
                this.backgroundPositionsX.correndo1;
            this.element.style.backgroundPositionY = "-2px";
            this.element.style.width = "66px"
            this.element.style.height = "70px"
            this.element.style.bottom = `${this.alturaMinima}px`;
            deserto.element.appendChild(this.element);
        }
        set status(value) {
            if (value >= 0 && value <= 3) this.#status = value;
        }
        get status() {
            return this.#status;
        }
        correr() {
            if (this.#status === 0 && frame % 20 === 0){
                this.element.style.backgroundPositionY = "-2px";
                this.element.style.width = "66px"
                this.element.style.height = "70px"
                this.element.style.backgroundPositionX =
                    this.element.style.backgroundPositionX ===
                    this.backgroundPositionsX.correndo1
                        ? this.backgroundPositionsX.correndo2
                        : this.backgroundPositionsX.correndo1;
            }
            else if (this.#status === 1 ) { //pulando
                this.element.style.width = "66px"
                this.element.style.height = "70px"
                this.element.style.backgroundPositionY = "-2px";
                this.element.style.backgroundPositionX =
                    this.backgroundPositionsX.pulando;
                this.element.style.bottom = `${
                    parseInt(this.element.style.bottom) + 4
                }px`;
                if (parseInt(this.element.style.bottom) >= this.alturaMaxima){
                    this.fallSpeed = 1
                    this.status = 2;
                }
            } else if (this.#status === 2) {
                this.element.style.bottom = `${
                    parseInt(this.element.style.bottom) - this.fallSpeed
                }px`;
                if (parseInt(this.element.style.bottom) <= this.alturaMinima)
                    this.status = 0;
            }
            else if(this.#status === 3 && frame % 20 === 0){
                this.element.style.width = "87px"
                this.element.style.height = "40px"
                this.element.style.backgroundPositionX =
                    this.element.style.backgroundPositionX ===
                    this.backgroundPositionsX.agachado1
                        ? this.backgroundPositionsX.agachado2
                        : this.backgroundPositionsX.agachado1;
                this.element.style.backgroundPositionY = "-28px"
            }
        }

        colisao() {
            ptero.forEach(pteroObj => {
                const dinoRect = this.element.getBoundingClientRect();
                const pteroRect = pteroObj.element.getBoundingClientRect();
                if (
                    (dinoRect.right > pteroRect.left + 15 &&
                    dinoRect.left < pteroRect.right - 15 &&
                    dinoRect.bottom > pteroRect.top + 15 &&
                    dinoRect.top < pteroRect.bottom - 15)
                ) {
                    gameOver = true; 
                }
            });

            cacto.forEach(cactoObj => {
                const dinoRect = this.element.getBoundingClientRect();
                const cactoRect = cactoObj.element.getBoundingClientRect();
                if (
                    (dinoRect.right > cactoRect.left + 15 &&
                    dinoRect.left < cactoRect.right - 15 &&
                    dinoRect.bottom > cactoRect.top + 15 &&
                    dinoRect.top < cactoRect.bottom - 15)
                ) {
                    gameOver = true; 
                }
            });
        }
    }

    class Deserto {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "deserto";
            this.element.style.width = `${WIDTH}px`;
            this.element.style.height = `${HEIGHT}px`;
            document.getElementById("game").appendChild(this.element);

            this.chao = document.createElement("div");
            this.chao.className = "chao";
            this.chao.style.backgroundPositionX = 0;
            this.element.appendChild(this.chao);
        }

        mover() {
            this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 2}px`;
            if (parseInt(this.element.style.right) > WIDTH) {
                this.element.remove();
            }
        }
    }

    let deserto = new Deserto();
    let dino = new Dino();
    dino.element.style.backgroundPositionX = dino.backgroundPositionsX.pulando
    let score = new Pontuacao()

    function init() {
        FPS = 150
        hora = -1;
        gameOver = false;
        gameLoop = setInterval(run, 1000 / FPS);
        dayLoop = setInterval(turno, 1000 * 60);
    }

    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            if(!start){
                start = true;
                init()
            }
            else if (dino.status === 0) dino.status = 1
        }
        else if(e.code === "ArrowDown"){
            if (dino.status === 0){
                dino.status = 3
            }
            else if (dino.status === 1 || dino.status === 2){
                dino.status = 2
                dino.fallSpeed = 2
            }
        }
        else if (e.key === "Enter") {
            if(gameOver){
                restartGame();
            }
        }
        else if(e.key == "p" && !gameOver){
            if(pausa === 0){
                clearInterval(gameLoop);
                clearInterval(dayLoop)
                pausa = 1
            }
            else{
                gameLoop = setInterval(run, 1000 / FPS)
                dayLoop = setInterval(turno, 1000 * 60)
                pausa = 0
            }
            
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.code === "ArrowDown") {
            dino.fallSpeed = 1;
            if (dino.status === 3) dino.status = 0
        }
        if (e.code === "Space") {
            dino.status = 2
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("restart")) {
            restartGame();
        }
    });

    

    class Nuvem {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "nuvem";
            this.element.style.right = 0;
            this.element.style.top = `${parseInt(Math.random() * 200)}px`;
            deserto.element.appendChild(this.element);
        }
        mover() {
            this.element.style.right = `${
                parseInt(this.element.style.right) + 1
            }px`;
            if (parseInt(this.element.style.right) > WIDTH) {
                this.element.remove();
                const index = nuvens.indexOf(this);
                if (index !== -1) {
                    nuvens.splice(index, 1);
                }
            }
        }
    }

    class Ptero {
        constructor() {
            this.backgroundPositionsX = {
                asaCima: "-198px",
                asaBaixo: "-265px",
            };
            this.element = document.createElement("div");
            this.element.className = "ptero";

            this.element.style.backgroundPositionX =
                this.backgroundPositionsX.asaCima;
            this.element.style.backgroundPositionY = "-12px";

            
            this.element.style.right = 0;
            this.element.style.bottom = `${30 + parseInt(Math.random() * 50)}px`;

            deserto.element.appendChild(this.element);
        }
        mover() {
            this.element.style.right = `${
                parseInt(this.element.style.right) + 3
            }px`;
            if (parseInt(this.element.style.right) > WIDTH - 20) {
                this.element.remove();
                const index = ptero.indexOf(this);
                if (index !== -1) {
                    ptero.splice(index, 1);
                }
            }
        }

        voar() {
            if (frame % 30 === 0)
                this.element.style.backgroundPositionX =
                    this.element.style.backgroundPositionX ===
                    this.backgroundPositionsX.asaCima
                        ? this.backgroundPositionsX.asaBaixo
                        : this.backgroundPositionsX.asaCima;
            if (parseInt(this.element.style.right) > WIDTH) {
                this.element.remove();
            }
        }
    }


    class Cacto {
        constructor() {
            this.backgroundPositionsX = {
                pequenos: [
                    "-337px",
                    "-362px",
                    "-412px",
                ],
                grandes: [
                    "-490px",
                    "-527px",
                    "-601px",
                ]
            };

            this.element = document.createElement("div");

            let tamanho = parseInt(Math.random()*2);

            let index = parseInt(Math.random() * 3)

            if (tamanho === 0){
                this.element.style.backgroundPositionX = this.backgroundPositionsX.pequenos[index]
                if(index === 0){
                    this.element.style.width = "25px";
                }
                else if(index === 1){
                    this.element.style.width = "50px";
                }
                else if(index === 2){
                    this.element.style.width = "75px";
                }
                this.element.className = "cactoPequeno";
            }
            else{
                this.element.style.backgroundPositionX = this.backgroundPositionsX.grandes[index]
                
                if(index === 0){
                    this.element.style.width = "37px";
                }
                else if(index === 1){
                    this.element.style.width = "74px";
                }
                else if(index === 2){
                    this.element.style.width = "111px";
                }
                this.element.className = "cactoGrande";
            }


            this.element.style.right = "0px";
            this.element.style.bottom = "3px";

            deserto.element.appendChild(this.element);
        }
        mover() {
            this.element.style.right = `${
                parseInt(this.element.style.right) + 2
            }px`;
            if (parseInt(this.element.style.right) > WIDTH - 20) {
                this.element.remove();
                const index = cacto.indexOf(this);
                if (index !== -1) {
                    cacto.splice(index, 1);
                }
            }
        }
    }

    function turno(){
        hora === -1 ? deserto.element.style.backgroundColor = "black" : deserto.element.style.backgroundColor = "white" 
        hora === -1 ? deserto.element.style.color = "white" : deserto.element.style.color = "black" 
        hora *= -1
        FPS += 50
    }

    function run() {
        if (gameOver === false) {
            frame = frame + 1;
            if (frame === FPS) frame = 0;
            deserto.mover();
            dino.correr();

            if (frame % 30 == 0){
                score.pontuar()
            }
            
            if (frame % 2 == 0 && Math.random() * 100 <= PROB_NUVEM){
                nuvens.push(new Nuvem());
            }
            nuvens.forEach((nuvem) => nuvem.mover());

            ptero.forEach((ptero) => ptero.voar());
            if (frame % 9 == 0 && Math.random() * 100 <= PROB_PTERO)
                ptero.push(new Ptero());
            ptero.forEach((ptero) => ptero.mover());

            if (frame % 10 == 0 && Math.random() * 100 <= PROB_CACTO){
                cacto.push(new Cacto());
            }
            cacto.forEach((cacto) => cacto.mover());
            
            dino.colisao();
            if (frame % 20 == 0) requestAnimationFrame(run); // Chama a próxima atualização
        } 
        else {
            clearInterval(gameLoop);
            over = new gameOver_();
        }
    }


    class gameOver_ {
        constructor() {
            // Adicione um botão de reinicialização
            dino.element.style.backgroundPositionX = "-1523px"
            restartButton = document.createElement("div");
            restartButton.className = "restart";
            restartButton.addEventListener("click", restartGame); // Adicione um ouvinte de clique
            deserto.element.appendChild(restartButton);

            // Adicione um texto de game over
            gameOverText = document.createElement("div");
            gameOverText.className = "gameOver";
            deserto.element.appendChild(gameOverText);
        }
    }

    function restartGame() {
        clearInterval(gameLoop);
        clearInterval(dayLoop)

        nuvens.forEach((nuvem) => nuvem.element.remove());
        ptero.forEach((pteroObj) => pteroObj.element.remove());
        cacto.forEach((cactoObj) => cactoObj.element.remove());

        if (restartButton) {
            restartButton.remove();
            gameOverText.remove();
        }

        FPS = 150
        hora = -1
        nuvens = [];
        ptero = [];
        cacto = []
        frame = 0;
        score.score = 0;



        gameLoop = setInterval(run, 1000 / FPS);
        dayLoop = setInterval(turno, 1000 * 60);

        gameOver = false;

        deserto.remove(gameOver)
    }

})();