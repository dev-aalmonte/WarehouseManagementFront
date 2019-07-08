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
    selectSingleWarehouseFromDB,
} from './warehouse';

import {
    getUsers,
    addUser,
    selectSingleUser,
    deleteUser,
    selectSingleUserFromDB,
} from './user';

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
    selectSingleWarehouseFromDB,

    // User
    getUsers,
    addUser,
    selectSingleUser,
    deleteUser,
    selectSingleUserFromDB,
}