const Product = require('../models/Product');

exports.getProduct = async function (req, res) {

    try {
        const productDocs = await Product.find({});

        return res.status(200).json({
            data: {
                products: productDocs
            }
        })
    } catch (error) {
        console.log('Product is not created', error.toString());

        return res.status(500).json({
            data: {
                product: null,
                message: "Something went wrong!"
            }
        })
    }

}

exports.createProduct = async function (req, res) {

    const product = req.body.product;
    console.log('received', product);

    try {
        const productDoc = await Product.create(product);
        console.log('Product created', productDoc);

        return res.status(201).json({
            data: {
                product: {
                    name: productDoc.name,
                    quantity: productDoc.quantity
                }
            }
        })
    } catch (error) {
        console.log('Product is not created', error.toString());

        return res.status(500).json({
            data: {
                product: null,
                message: "Something went wrong!"
            }
        })
    }
}

exports.deleteProduct = async function (req, res) {
    const productId = req.params['id']

    //find the product first

    try {

        //if not found then return bad request
        if (!productId) {
            return res.status(400).json({
                data: {
                    message: "Product Id not provided"
                }
            })
        }

        //if found then delete with success response.

        await Product.findByIdAndRemove(productId).exec();

        res.status(200).json({
            data: {
                message: "Product deleted"
            }
        })
    } catch (error) {
        res.status(500).json({
            data: {
                message: "Something went wrong!"
            }
        })
    }
}

exports.updateProductQuantity = async function (req, res) {
    const productId = req.params['id'];


    //convert the number into integer
    let number = req.query.number;

    if (typeof number == 'string') {
        number = Number.parseInt(number);
    }


    try {

        let productDoc = await Product.findById(productId);

        if (productDoc) {

            //Check if it is possible to update the product or not
            //quantity should not be negative
            if (productDoc.quantity + number < 0) {
                return res.status(400).json({
                    data: {
                        product: productDoc,

                        message: "not enough quantity available"
                    }
                })
            }

            //if enough quantity is present then update
            //case applies only when we are decreasing the quantity.

            let result = await productDoc.updateOne({
                quantity: productDoc.quantity + number
            });

            //check if the product is updated or not 
            //if updated then retrieve the updated product 

            if (result.acknowledged && result.modifiedCount > 0) {

                productDoc = await Product.findById(productId);
            }

            return res.status(200).json({
                data: {
                    product: productDoc,

                    message: "updated successfully"
                }
            })

        } else {

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
}