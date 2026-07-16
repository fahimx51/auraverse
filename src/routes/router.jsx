import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Collection from "../pages/Collection";
import ProductDetails from "../pages/ProductDetails";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "product",
                Component: Collection,
            },
            {
                path : "product/:id",
                Component : ProductDetails
            }
        ]
    }
]);

export default router;