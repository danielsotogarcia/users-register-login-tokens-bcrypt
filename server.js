const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { appInit } = require("./appConf");
const User = require('./models/user');

const app = appInit();

const MY_SEED_AUTH = "MY_SEED_AUTH";

const auth = (req, res, next) => {

    if (req.url.includes("/login") || req.url.includes("/register") || req.url.includes(".favicon")) {
        next();
    } else {
        jwt.verify(req.cookies.token, MY_SEED_AUTH, (err, data) => {
            if (err) {
                res.sendFile(__dirname + "/public/html/login.html");
            } else {
                next();
            }
        });
    }
}

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use(express.static(__dirname + '/public'));

// Conexion con mongo
mongoose.connect('mongodb+srv://admin:admin@cluster0.zpegg.mongodb.net/BBDD?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});

// POST REGISTER
app.post("/api/users/register", (req, res) => {

    bcrypt.hash(req.body.password, 12)
        .then((hashedPassword) => {

            const user = new User({
                email: req.body.email,
                password: hashedPassword,
            });

            user.save((error) => {
                if (!error) {
                    res.status(201).send({
                        success: 'true',
                        message: 'Usuario registrado',
                    });
                } else {
                    throw error;
                }
            });
        })
});

// POST LOGIN
app.post("/api/users/login", (req, response) => {

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) return response.status(500).send("Fallo de login");

        if (!user) return response.status(403).send("Usuario incorrecto");

        if (user) {

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return response.status(500).send("Fallo de login");

                if (!result) return response.status(403).send("contraseña incorrecta");

                if (result) {

                    // creamos el token
                    const token = jwt.sign({ usuario: user },
                        MY_SEED_AUTH, { expiresIn: "24h" }
                    )

                    return response.cookie("token", token).status(200).send({
                        success: true,
                        message: "Usuario logado"
                    })
                }
            })

        }
    });
});

// POST LOGOUT
app.post("/api/users/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).send({
        succes: true,
        message: "Usuario deslogueado"
    })
})

app.use(auth, express.static(__dirname + '/public/html', { extensions: ['html'] }));


const PORT = process.env.PORT || 2002;
app.listen(PORT, () => {
    console.log(`API Users corriendo en puerto ${PORT}`);
});