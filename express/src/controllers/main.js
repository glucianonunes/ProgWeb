// Arquivo src/controllers/main.js
const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo,
    });
};

const profs = (req, res) =>{
    const professores =[
        {nome: "David Fernandes", sala: 1238},
        {nome: "Horácio Fernandes", sala: 1333},
        {nome: "Tayana Conte", sala: 1234},
        {nome: "Leandro Galvão", sala: 1111}
    ]
    res.render('main/profs', {
        professores
    })
}

const sobre = (req, res) => {
    const conteudo = 'Página sobre a aplicação';
    res.render('main/sobre', {
        conteudo,
    });
};

const ui = (req, res) =>{
    res.render("main/ui", {

    })
}

module.exports = { index, sobre, profs, ui }
