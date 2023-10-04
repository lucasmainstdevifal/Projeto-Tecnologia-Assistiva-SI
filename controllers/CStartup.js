module.exports = (app) => {

    // Home Application  
    app.get("/", (req, res) => {
        res.render("index.ejs"); 
    });

    // Home Application  
    app.get("/login", (req, res) => {
        res.render("auth.ejs"); 
    });

    // Area Company
    app.get("/login/company", (req, res) => {
        res.render("authadmin.ejs"); 
    });

    // List Products
    app.post("/listproducts", (req, res) => {
        res.render("listproducts.ejs"); 
    });

    // List Products
    app.get("/listproductss", (req, res) => {
        res.render("listproducts.ejs"); 
    });


}