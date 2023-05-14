import productModel from './models/product.model.js'

class ProductManagerMongo {
    constructor(model){
        this.productModel = model
    }

    async getProducts(){
        try{
            return await productModel.find({})
        }catch(err){
            return new Error(err)
        }
    }

    async getProductById(pid){
        try{
            return await productModel.findOne({_id: pid})
        }catch(err){
            return new Error(err)
        }
    }

    async addProduct(product){
        try{
            return await productModel.create(product)
        }catch(err){
            return new Error(err)
        }
    }

    async updateProduct(pid, product){
        try{
            return await productModel.updateOne({_id: pid}, product)
        }catch(err){
            return new Error(err)
        }
    }

    async deleteProduct(pid){
        try{
            return await productModel.deleteOne({_id: pid})
        }catch(err){
            return new Error(err)
        }
    }
}

const product = new ProductManagerMongo()

const fileTest = async() => {
    await product.getProducts()

    // Prueba para añadir productos -------------------------

    await product.addProduct({
        title: 'VIAJE SUBMARINO', 
        description: '¡CUIDADO! Este libro es diferente a los demás.\t Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grandes peligros y una mala decisión podría acabar en desastre... Pero no desesperes. En cualquier momento puedes retroceder y elegir otra opción, alterar el curso de tu historia y cambiar tu destino.\t Esta es tu misión: debes localizar la legendaria ciudad perdida de la Atlántida. Te esperan todo tipo de peligros, pero si lo consigues, todos tus sueños se harán realidad.',
        price: 2490, 
        thumbnail: ['img1.jpg'], 
        stock: 25, 
        code: 'a1',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'MÁS ALLÁ DEL ESPACIO', 
        description: '¡CUIDADO! Este libro es diferente a los demás. En esta serie los protagonistas y sus decisiones marcan el desarrollo de la historia.\t Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grandes peligros y una mala decisión podría acabar en desastre... Pero no desesperes. En cualquier momento puedes retroceder y elegir otra opción, alterar el curso de tu historia y cambiar tu destino.\t Esta es tu misión: siempre has vivido en una nave espacial, pero ha llegado el momento de decidir en que planeta te asentarás. Escoge rápido, porque te esperan peligros galácticos nunca vistos.',
        price: 2490, 
        thumbnail: ['img2.jpg'], 
        stock: 200,          
        code: 'b2',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'EL ABOMINABLE HOMBRE DE LAS NIEVES', 
        description: '¡CUIDADO! Este libro es diferente a los demás. Tú puedes elegir el desarrollo de la historia.\t Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grander peligros y una mala decisión podría acabar en desastre... Pero no desesperes. en cualquier momento puedes retroceder y elegri otra opción, alterar el curso de tu historia y cambiar tu destino.\t Esta es tu misión: debes encontrar a tu amigo Carlos, desaparecido en el Himalaya en busca del abominale hombre de las nieves. Tormentas de nieve,', 
        price: 2490, 
        thumbnail: ['img3.jpg'], 
        stock: 200, 
        code: 'c3',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'LAS JOYAS PERDIDAS DE NABOOTI', 
        description: '¡CUIDADO! Este libro es diferente a los demás. Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grandes peligros y una mala decisión podría acabar en desastre... Pero no desesperes. En cualquier momento puedes retroceder y elegir otra opción, alterar el curso de tu historia y cambiar tu destino. Esta es tu misión: las legendarias joyas de Nabooti han sido robadas y debes unirte a tus primos Peter y Lucy para recuperarlas. Pero deberás estar muy alerta porque hay otros que tambien las buscan y las joyas albergan un peligroso poder sobrenatural.', 
        price: 2490, 
        thumbnail: ['img4.jpg'], 
        stock: 200, 
        code: 'd4',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'EL MISTERIO DE LOS MAYAS', 
        description: '¡CUIDADO! Este libro es diferente a los demás. En esta serie los protagonistas y sus decisiones marcan el desarrollo de la historia.\t Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grandes peligros y una mala decisión podría acabar en desastre... Pero no desesperes. En cualquier momento puedes retroceder y elegir otra opción, alterar el curso de tu historia y cambiar tu destino.Esta es tu misión: debes encontrar a tu amigo Tom, desaparecido en Mexico. Para ello, \t tendrás que explorar los misterios de la civilización maya, pero recuerda, una mala decisión pude poner fin a tus aventuras...', 
        price: 2490, 
        thumbnail: ['img5.jpg'], 
        stock: 200, 
        code: 'e5',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'LA CASA DEL PELIGRO', 
        description: '¡CUIDADO! Este libro es diferente a los demás. Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grandes peligros y una mala decisión podría acabar en desastre... Pero no desesperes. En cualquier momento puedes retroceder y elegir otra opción, alterar el curso de tu historia y cambiar tu destino.\t Esta es tu misión: debes investigar una misteriosa casa que esconde peligros inimaginales, fantasmas, extraterrestres e incluso viajes en el tiempo. Será un caso que nunca olvidarás...¡si sobrevives!', 
        price: 2490, 
        thumbnail: ['img6.jpg'], 
        stock: 200, 
        code: 'f6',
        status: (true),
        category: "B"
    })

    await product.addProduct({
        title: 'PRISIONERO DE LAS HORMIGAS', 
        description: '¡CUIDADO! Este libro es diferente a los demás. Tú puedes elegir tu propia aventura.\t Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grandes peligros y una mala decisión podría acabar en desastre... Pero no desesperes. En cualquier momento puedes retroceder y elegir otra opción, alterar el curso de tu historia y cambiar tu destino.\t Esta es tu misión: deberás combatir los planes del Señor del Poder Maligno e infiltrarte entre sus hormigas guerreras. Gracias a tu láser miniaturizador podrás hacerlo, pero te esperan incontables peligros...', 
        price: 2490, 
        thumbnail: ['img7.jpg'], 
        stock: 200, 
        code: 'g7',
        status: (true),
        category: "A"
    })

    await product.addProduct({
        title: 'EL SECRETO DE LOS NINJA', 
        description: '¡CUIDADO! Este libro es diferente a los demás. Tú eliges el desarrollo de la historia.\t Lo que ocurra en esta historia está SOLO en tus manos. Tendrás que sortear grandes peligros y una mala decisión podría acabar en desastre... Pero no desesperes. En cualquier momento puedes retroceder y elegir otra opción, alterar el curso de tu historia y cambiar tu destino.\t Esta es tu misión: viajarás al pasado para investigar una misteriosa espada samurái que ha aparecido en el dojo de tu amiga Nada. ¿Conseguirás aprender los secretos de las habilidades ninja antes de que los peligros del Japón feudal acaben contigo?.', 
        price: 2490, 
        thumbnail: ['img8.jpg'], 
        stock: 200, 
        code: 'h8',
        status: (true),
        category: "A"
    })

    await product.addProduct({
        title: 'TERROR EN EL TITANIC', 
        description: '¡El protagonista eres tú! Esta es tu misión: es el año 1912 y viajas en el Titanic, el famoso transatlántico que se hundió tras chocar con un iceberg. Si no quieres que este viaje acabe tambien en las heladas aguas del Atlántico norte, deberás tener mucho cuidado y hacer uso de todo tu ingenio.', 
        price: 2490, 
        thumbnail: ['img9.jpg'], 
        stock: 200, 
        code: 'i9',
        status: (true),
        category: "A"
    })

    await product.addProduct({
        title: 'LA LEYENDA DE LOS DRAGONES', 
        description: '¡El protagonista eres tú! Esta es tu misión: vives en la antigua China, tu aldea ha sido atacada por guerreros mongoles y te han capturado. Debes decidir entre huir para salvar a tu familia o permanecer con ellos en busca de una vida mejor. ¿Cuál será tu decisión?', 
        price: 2490, 
        thumbnail: ['img10.jpg'], 
        stock: 200, 
        code: 'j10',
        status: (true),
        category: "A"
    })
}

fileTest()


export default new ProductManagerMongo