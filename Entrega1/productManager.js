
//Array de Productos donde se irán almacenando los mismos
let products = [];

//Fn. que recibe todos los datos, las propiedades de los productos
const addProduct = (title, description, price, thumbnail, code, stock) => {

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

    //Se debe validar que todos los campos contengan datos
    //if(title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
    //    console.log("Todos los campos son obligatorios.");
    //    return;
    //}

    //Muestra las propiedades del Array
    //console.log(Object.values(newProduct));

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

};

//Fn. que muestra los productos
const getProducts = () => {
    console.log(products);
    return products;
};

//Fn. que muestra los productos por ID
const getProductsById = (id) => {
    const product = products.find( product => product.id === id);
    if (!product) {
        console.log(`No se encontró el producto con el ID ${id}.`);
        return;
    }

    console.log(product);
    return product;
};


//Test

addProduct("P1", "Producto 1", 299, "http\\www.google.com", "ASM1985", 10);
addProduct("P2", "Producto 2", 852, "http\\www.google.com", "FNM1987", 7);
addProduct("P3", "Producto 3", 457, "http\\www.google.com", "FNM1987", 12);
addProduct("P4", "Producto 4", 651, "http\\www.google.com", "DRP2016", 25);
addProduct("P5", "Producto 5", 183, "http\\www.google.com", "DRP2016");

//getProducts();

//getProductsById(1);
getProductsById(8);