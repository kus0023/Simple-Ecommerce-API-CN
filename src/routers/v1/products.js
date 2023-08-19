const router = require('express').Router();
const { Joi, validate } = require('express-validation');
const projectController = require('../../controllers/Project_controller');

router.get('/', projectController.getProduct);

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
    validate(productValidation, {}, { abortEarly: false, allowUnknown: false }),
    projectController.createProduct)

router.delete('/:id', projectController.deleteProduct)

router.post('/:id/update_quantity/', projectController.updateProductQuantity)


module.exports = router;