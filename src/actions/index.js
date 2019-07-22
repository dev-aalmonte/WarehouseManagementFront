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

    // Stock
    getStockPerWarehouse,
    selectSingleStock,
    addStock,
    editStock,
    deleteStock,
} from './warehouse';

import {
    getUsers,
    addUser,
    selectSingleUser,
    deleteUser,
    selectSingleUserFromDB,
} from './user';

import {
    getRoles,
    addRole,
    selectSingleRole,
    deleteRole,
    selectSingleRoleFromDB,
} from './role';

import {
    getStatus,
    getStatusByProperty,
    addStatus,
    selectSingleStatus,
    deleteStatus,
    selectSingleStatusFromDB,
} from './status';

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

    // Stock
    getStockPerWarehouse,
    selectSingleStock,
    editStock,
    addStock,
    deleteStock,

    // User
    getUsers,
    addUser,
    selectSingleUser,
    deleteUser,
    selectSingleUserFromDB,

    // Role
    getRoles,
    addRole,
    selectSingleRole,
    deleteRole,
    selectSingleRoleFromDB,
    
    // Status
    getStatus,
    getStatusByProperty,
    addStatus,
    selectSingleStatus,
    deleteStatus,
    selectSingleStatusFromDB,
}