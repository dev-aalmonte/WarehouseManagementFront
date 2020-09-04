import {
    login,
    logout,
    getUserByToken
} from './auth';

import {
    getProducts,
    addProduct,
    selectSingleProduct,
    selectSingleProductFromDB,
    deleteProduct,
    uploadProductImage,
    removeProductImage,
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
    getStockLocations,

    // Location
    getLocationPerWarehouse,
    selectSingleLocation,
    addLocation,
    deleteLocation
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

import {
    getClients,
    selectSingleClient,
    selectSingleClientFromDB,
    addClient,
    deleteClient,
} from './client';

import {
    getOrdersPerClient,
    getOrdersPerStatus,
    getSingleOrderPerClient,
    getSingleOrderFromDB,
    addOrder,
    addOrderDetail,
    assignUser,
    nextProductList,
    previousProductList,
    updateOrderProduct,
    updateOrderStatus,
} from './order';

import {
    getSectionByWarehouse,
    getAisleBySection,
    getColumnByAisle,
    getRowByColumn,
    getItemsByRow,
    addItemToLocation
} from './location';

export {
    // Auth
    login,
    logout,
    getUserByToken,

    // Products
    getProducts,
    addProduct,
    selectSingleProduct,
    selectSingleProductFromDB,
    deleteProduct,
    uploadProductImage,
    removeProductImage,

    // Warehouse
    getWarehouses,
    addWarehouse,
    selectSingleWarehouse,
    deleteWarehouse,
    selectSingleWarehouseFromDB,

    // Warehouse Stock
    getStockPerWarehouse,
    selectSingleStock,
    editStock,
    addStock,
    deleteStock,
    getStockLocations,

    // Warehouse Location
    getLocationPerWarehouse,
    selectSingleLocation,
    addLocation,
    deleteLocation,

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

    // Client
    getClients,
    selectSingleClient,
    selectSingleClientFromDB,
    addClient,
    deleteClient,

    // Order
    getOrdersPerClient,
    getOrdersPerStatus,
    getSingleOrderPerClient,
    getSingleOrderFromDB,
    addOrder,
    addOrderDetail,
    assignUser,
    nextProductList,
    previousProductList,
    updateOrderProduct,
    updateOrderStatus,

    // Location
    getSectionByWarehouse,
    getAisleBySection,
    getColumnByAisle,
    getRowByColumn,
    getItemsByRow,
    addItemToLocation
}