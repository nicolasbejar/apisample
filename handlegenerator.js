let jwt = require('jsonwebtoken');
let config = require('./config');

let auth = require("./controllers/auth")
let crypto = require("crypto");
const { func } = require('joi');

// Clase encargada de la creación del token
class HandlerGenerator {

    login(req, res) {

        // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username = req.body.username;
        let password = req.body.password;

        let mockedUsername = "";
        let mockedPassword = "";

        //Hash de la contraseña
        let algorithm = "sha256"
        let key = config.secret

        password = crypto.createHash(algorithm).update(password).digest("hex")

        console.log("Password: " + password)

        // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
        auth.getUser(username).then((user) => {
            console.log("user 2: " + user.username)
            console.log("password 2: " + user.password)

            mockedUsername = user.username;
            mockedPassword = user.password;

            authenticate(username, password, mockedUsername, mockedPassword)
        });



        function authenticate(username, password, mockedUsername, mockedPassword) {
            if (username && password) {

                // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
                // de lo contrario, un mensaje de error es retornado
                if (username == mockedUsername && password == mockedPassword) {

                    // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                    let token = jwt.sign({ username: username },
                        config.secret, { expiresIn: '24h' });

                    // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });

                } else {

                    // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
                    res.send(403).json({
                        success: false,
                        message: 'Incorrect username or password'
                    });

                }

            } else {

                // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
                res.send(400).json({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });

            }
        }

        // Si se especifico un usuario y contraseña, proceda con la validación
        // de lo contrario, un mensaje de error es retornado

    }

    index(req, res) {

        // Retorna una respuesta exitosa con previa validación del token
        res.json({
            success: true,
            message: 'Index page'
        });

    }
}

//Convert from Hex to String
function convertFromHex(hex) {
    var hex = hex.toString(); //force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

module.exports = HandlerGenerator;