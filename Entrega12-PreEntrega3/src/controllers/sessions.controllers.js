//Capa Controlador de sessions
import { userResponseDto } from "../dto/user-response.dto.js";
import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
    try {
        //Se elimina toda la creación del usuario porque de esto ya se encarga passport
        //La única responsabilidad que tiene el endpoint es dar una respuesta al cliente     
        res.status(201).json({ status: "success", msg: "Usuario creado." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error." });
    };
};

const login = async (req, res) => {
    try {
        const user = req.user;
        const token = createToken(user);
        // Guardamos el token en una cookie
        res.cookie("token", token, { httpOnly: true });
        const userDto = userResponseDto(user);
        return res.status(200).json({ status: "success", payload: userDto, token });//Recibe el email y pwd para hacer el login del user

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error." });
    };
};

const current = (req, res) => {
    try {
        //Filtra toda la info del  y lo envía filtrado
        const user = userResponseDto(req.user);
        return res.status(200).json({ status: "success", payload: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error." });
    }
};

const loginGoogle = async (req, res) => {
    try {
        //Se elimina todo el login del usuario porque de esto ya se encarga passport
        //La única responsabilidad que tiene el endpoint es dar una respuesta al cliente  
        return res.status(200).json({ status: "success", payload: req.user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error." });
    };
};

const logout = async (req, res) => {
    try {
        //Se destruye la sesión
        req.session.destroy();
        res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error." });
    }
};

export default {
    register,
    login,
    current,
    loginGoogle,
    logout
};