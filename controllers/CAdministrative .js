module.exports = (app) => {

    // Área Administrativa - Mercado
    app.get("/page/administrative", (req, res) => {
        res.render("/admin/index.ejs"); 
    });

    // Autenticação
    app.get("/page/auth/admin", (req, res) => {
        res.render("/admin/index.ejs"); 
    });


}