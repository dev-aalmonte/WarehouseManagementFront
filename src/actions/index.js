import {
    login,
    logout,
    getUserByToken
} from './auth';

import {
    getProducts,
    addProduct,
    selectSingleProduct,
    deleteProduct
} from './product';

import {
    getWarehouses,
    addWarehouse,
    selectSingleWarehouse,
    deleteWarehouse,
} from './warehouse';

export {
    // Auth
    login,
    logout,
    getUserByToken,

    // Products
    getProducts,
    addProduct,
    selectSingleProduct,
    deleteProduct,

    // Warehouse
    getWarehouses,
    addWarehouse,
    selectSingleWarehouse,
    deleteWarehouse,

}