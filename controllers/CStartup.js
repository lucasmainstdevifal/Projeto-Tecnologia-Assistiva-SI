module.exports = (app) => {

    // Home Application  
    app.get("/", (req, res) => {
        res.render("index.ejs"); 
    });

    // Home Application  
    app.get("/login", (req, res) => {
        res.render("auth.ejs"); 
    });

    // List Products
    app.get("/listproducts", (req, res) => {
        res.render("listproducts.ejs"); 
    });


}