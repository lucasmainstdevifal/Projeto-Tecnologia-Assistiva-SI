module.exports = (app) => {

    // Home Application  
    app.get("/", (req, res) => {
        res.render("index.ejs"); 
    });

    // List Products
    app.get("/listproducts", (req, res) => {
        res.render("listproducts.ejs"); 
    });


}