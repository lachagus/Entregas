//Agregamos el módulo de File System y hacemos un require del mismo
const fs = require("fs");

//Variable que dice en qué carpeta se ubica el archivo json donde se irán cargando todos los productos
let pathFile = "./data/products.json"

//Array de Productos donde se irán almacenando los mismos
let products = [];

//Fn. que recibe todos los datos, las propiedades de los productos
//Pasa a ser asincrónica
const addProduct = async (title, description, price, thumbnail, code, stock) => {

    //Objeto nuevo 
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }

    //Se debe validar que todos los campos contengan datos. Otra manera de hacerlo.
    if (Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios. Por favor complete.");
        return;
    }

    //Antes de agregar el producto, debemos validar que no se repita el campo CODE, lo puedo hacer con una Fn
    const productExist = products.find(product => product.code === code);
    if (productExist) {
        console.log(`El producto ${title} con el código ${code} ya existe. Ingrese uno distinto.`);
        return;
    }

    //Agrega el nuevo objeto (producto) en el array si es que no hay error con el code
    products.push(newProduct);

    //Trabajamos con el File System. Como primer parámetro la variable pathFile para escribir en cada función el mismo path o si llega a cambiar el path. Como segundo parámetro, pasamos lo que guardamos en el json, para eso lo pasamos a string.
    //Se pone el await porque es una promesa, es asíncrono
    await fs.promises.writeFile(pathFile, JSON.stringify(products));

};

//Fn. que muestra los productos
const getProducts = async () => {

    //Lee el archivo Json que se sreó con los productos
    //Primer parámetro la ruta y segundo parámetro la codificación
    const productsJson = await fs.promises.readFile(pathFile, "utf-8");
    //console.log(productsJson);    

    //Cómo hacer para que no lo traiga en archivo plano sino en array, se debe parsear
    //A la variable array products, le reasignamos el valor. en caso de que no existiese información, asgnamos un array vacío
    products = JSON.parse(productsJson) || [];

    //Acá mujestra todo lo que hay en el archivo Json
    //console.log(products);

    //Acá muestra el elemento del array que hay en la posición que pongamos. Todo lo trae desde el File System
    //console.log(products[1]);

    //Retorna los pruductos. Los asigna y los parsea
    return (products);
};

//Fn. que muestra los productos por ID. Se hace asíncrona para que lo devuelva después de que se cargó en array en el  paso anterior
const getProductsById = async (id) => {

    //Para saber cuál es el ID del producto que necesitamos. Se asignan los productos del array.
    await getProducts();
    const product = products.find(product => product.id === id);
    if (!product) {
        console.log(`No se encontró el producto con el ID ${id}.`);
        return;
    };

    //console.log(product);
    return product;
};

//Fn. para editar un producto dentro del File System. Recibe el ID y la data del producto para ser modificada
const updateProduct = async (id, dataProduct) => {

    //Para saber cuál es el ID del producto que necesitamos. Se asignan los productos del array.
    await getProducts();

    //Buscamos el valor índice dentro del array en el que se encuentra el producto, la posición índice
    //El product.id sea igual al ID que se recibe
    const index = products.findIndex( product => product.id === id );

    //Una vez que obtenemos la posición index, se puede modificar el elemento específico del array
    products[index] = {
        
        //Primero hace una copia de todo lo que existe del producto. Sobre escribe lo que se reciba por dataProduct
        ...products[index],
        ...dataProduct
    };

    //Se sobre escibe el producto completo con el producto modificado. Se pasa el pathFile y se guarda Json y pasa el producto
    await fs.promises.writeFile(pathFile, JSON.stringify(products));

};

//Fn. para eliminar un producto del array
const deleteProduct = async (id) => {

    //Para saber cuál es el ID del producto que necesitamos. Se asignan los productos del array.
    await getProducts();

    //Se reasigna el producto. Recibe el ID del producto a eliminar. Filtra todos los productos que no tengan ese ID.
    products = products.filter( product => product.id !== id);

    //Se sobre escibe el producto completo con el producto modificado. Se pasa el pathFile y se guarda Json y pasa el producto
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};


//TEST 

//Devuelve todos los productos del array que están en el archivo Json
//getProducts();

//Devuelve (busca) el producto (elemento) del array según el ID que pongamos
//getProductsById(2);

//Primero se pasa el ID del producto a modificar y la data que se va a modificar. Se hace un objeto.
//updateProduct(3, {
//    title: "P3",
//    description: "Producto 3",
//});

//Elimina le producto 2
deleteProduct(2);