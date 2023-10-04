module.exports = (app) => {

    // Home Application - Anjos da Guarda - Segurança Escolar 
    app.get("/", (req, res) => {
        res.render("index.ejs"); 
    });

    // Home Application - Anjos da Guarda - Secretaria da Mulher
    app.get("/secmulher", (req, res) => {
        res.render("indexmulher.ejs"); 
    });

    // Termos de Política de Privacidade - Anjos da Guarda
    app.get("/termos" , (req,res) => {
        res.render("termosepol.ejs");
    });

}