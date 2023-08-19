const router = require('express').Router();

const {Joi, validate} = require('express-validation');
const Product = require('../../models/Product');

router.get('/', async function(req, res){

    try {
        const productDocs = await Product.find({});

        return res.status(200).json({
            data:{
                products: productDocs
            }
        })
    } catch (error) {
        console.log('Product is not created', error.toString());

        return res.status(500).json({
            data:{
                product: null,
                message: "Something went wrong!"
            }
        })
    }

})

const productValidation = {
    body: Joi.object({
        product: Joi.object({
            name: Joi.string()
            .not('')
            .required(),
            quantity: Joi.number()
            .min(0).
            integer().
            required()
        })
    })
}

router.post('/create', 
validate(productValidation, {}, {abortEarly: false, allowUnknown: false}),
async function(req, res){

    const product = req.body.product;
    console.log('received', product);

    try {
        const productDoc = await Product.create(product);
        console.log('Product created', productDoc);

        return res.status(201).json({
            data:{
                product: {
                    name: productDoc.name,
                    quantity: productDoc.quantity
                }
            }
        })
    } catch (error) {
        console.log('Product is not created', error.toString());

        return res.status(500).json({
            data:{
                product: null,
                message: "Something went wrong!"
            }
        })
    }
})

router.delete('/:id', async function(req, res){
    const productId = req.params['id']

    try {
        if(!productId){
            return res.status(400).json({
                data:{
                    message: "Product Id not provided"
                }
            })
        }

        await Product.findByIdAndRemove(productId).exec();

        res.status(200).json({
            data:{
                message: "Product deleted"
            }
        })
    } catch (error) {
        res.status(500).json({
            data:{
                message: "Something went wrong!"
            }
        })
    }
})

router.post('/:id/update_quantity/', async function(req, res){
    const productId = req.params['id'];


    let number = req.query.number;

    if(typeof number == 'string'){
        number = Number.parseInt(number);
    }
    console.log("Product ID", productId, "number to update: ", number);

    try {

        let productDoc = await Product.findById(productId);

        if(productDoc){

            let result = await productDoc.updateOne({
                quantity: number
            });

            if(result.acknowledged && result.modifiedCount > 0){
                console.log("again fetched");
                productDoc = await Product.findById(productId);
            }

            return res.status(200).json({
                data: {
                    product:productDoc,
                  
                    message: "updated successfully"
                  }
            })

        }else{

            return res.status(404).json({
                message: "Product not found."
            })
        }
        
    } catch (error) {
        console.log(error.toString());
        return res.status(500).json({
            message: "Something went wrong."
        })
    }
})


module.exports = router;