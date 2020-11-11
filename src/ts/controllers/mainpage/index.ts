
import Products from '../../models/product/products';
import { ValidationError } from 'objection';
import permit from '../../lib/middleware/authorization';

export default function _(router: any) {

    router.use((req: any, res: any, next: any) => {
        if (req.isAuthenticated()) {
            res.status(401).send("Not authorized!");
        } else {
            next();
        }
    })

    /**
     * Display the login page. We also want to display any error messages that result from a failed login attempt.
     *
     * curl -X PATCH -H "Content-Type: application/json" -d "{\"show_order\":\"1a\"" }" http://localhost:8000/mainpage/update-show-order
     */
    router.patch('/update-show-order', permit('admin'), async function (req: any, res: any) {



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
            res.status(400)
            res.send(`validation error : ${JSON.stringify(error.data)}`);
            return;
        }

        // res.render("index");
        // res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
        res.json({})
    });
}