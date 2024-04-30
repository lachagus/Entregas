//Importamos router de express
import { Router } from "express";

//Importamos el product manager porque se creó la carpeta managers
import productManager from "../managers/productManager.js";

const router = Router();

//Configuramos dos métodos
//Req = request --> la info que recibimos dentro del servidor, del cliente al servidor
//Res = response --> es la respuesta que se manda desde el servido y espera el cliente (postman en este caso), sino queda esperando por algo
//Cambiamos el prefijo "app." por router. Sacamos el "/products" porque ya no se necesita, va sólo /
router.get("/", async (req, res) => {

    try {

        //Desestructura la query que venga con el valor del límite
        const { limit } = req.query;

        //Se le pasa el límite que se recibe por query
        const products = await productManager.getProducts(limit);

        res.status(200).json(products);

    } catch (error) {
        console.log(error);
        //res.status(400).json({error: error.message});
    }

})

router.get("/:pid", async (req, res) => {

    try {

        //Lee por parámetros el pid (product id) que se recibe
        const { pid } = req.params;

        //Se determine y busca el producto id que se está recibiendo
        //Se hace de manera individual ya que se está buscando sólo un producto
        //Se tiene que parsear el pid recibido porque siempre llega como string: +pid el + transforma en nro.
        const product = await productManager.getProductsById(+pid);

        //Express por defecto devuelve 200 pero lo configuramos igual para que se sepa que se manda el 200
        res.status(200).json(product);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

//Creamos la ruta del POST (endpoint)
router.post("/", async (req, res) => {

    try {

        //Recibe dentro de la constante "produtc" todo el cuerpo del body de los productos
        const product = req.body;

        //Le pasamos el product que se recibe por body
        const newProduct = await productManager.addProduct(product);

        //Hacemos una respueta de creación de producto (201) que se acaba de crear anteriormente
        res.status(201).json(newProduct);

    } catch (error) {
        console.log(error);
    }
});

//Creamos la ruta (endpoint) del PUT. Recibe el ID del producto
router.put("/:pid", async (req, res) => {

    try {

        //Recibe el product id desde los parámetros
        const { pid } = req.params;

        //Recibe dentro de la constante "produtc" todo el cuerpo del body de lo que se va a modificar
        const product = req.body;

        //Recibe como primer parámetro el id del producto y como segundo parámetro la data del producto que se recibe por el body
        const updateProduct = await productManager.updateProduct(pid, product);

        //Hacemos una respueta de la actualización del
        res.status(201).json(updateProduct);

    } catch (error) {
        console.log(error);
    }

});

//Creamos la ruta (endpoint) del DELETE. Recibe el ID del producto
router.delete("/:pid", async (req, res) => {

    try {

        //Recibe el product id desde los parámetros
        const { pid } = req.params;

        //Se pasa el id de producto que se está recibiendo
        await productManager.deleteProduct(pid);

        //Hacemos una respueta de eliminación del producto
        res.status(201).json({message: "Producto eliminado"});

    } catch (error) {
        console.log(error);
    }

});

export default router;