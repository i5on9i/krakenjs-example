
import Products from '../../models/product/products';
import { ValidationError } from 'objection';

export default function _(router: any) {



    /**
     * Display the login page. We also want to display any error messages that result from a failed login attempt.
     *
     * curl -X PATCH -H "Content-Type: application/json" -d "{\"show_order\":\"1a\"" }" http://localhost:8000/mainpage/update-show-order
     */
    router.patch('/update-show-order', async function (req: any, res: any) {

        // About Flash messages
        // - https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423


        //Include any error messages that come from the login process.
        let inputOrder = req.body.show_order;
        const productId = '1245';

        try {
            await Products.query().update({
                order: inputOrder,
            }).where('id', productId);
        } catch (error) {
            if (error instanceof ValidationError) {
                console.error(error.data);
                console.log(req.flash('error'));
            }
        }

        // res.render("index");
        // res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
        res.json({})
    });
}