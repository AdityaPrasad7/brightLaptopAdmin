import { useState, useCallback } from 'react';
import { getWarehouses, createWarehouse } from '../api/services/warehouse.service';
import { toast } from '../components/common/SimpleToast';

/**
 * Custom hook to manage warehouses
 */
export const useWarehouses = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all warehouses
     */
    const fetchWarehouses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getWarehouses();
            if (result.success) {
                // Map backend data to UI format if needed
                // Backend: { name, location, address, manager, contact, capacity, isActive }
                // UI expects: id, name, location, capacity, manager (from previous mock)
                const mappedData = result.data.data.warehouses.map(wh => ({
                    id: wh._id, // Use _id as id
                    ...wh
                }));
                setWarehouses(mappedData);
            } else {
                setError(result.error);
                toast.error(result.error);
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
            toast.error('Failed to fetch warehouses');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create new warehouse
     */
    const addWarehouse = async (warehouseData) => {
        setLoading(true);
        try {
            const result = await createWarehouse(warehouseData);
            if (result.success) {
                toast.success('Warehouse created successfully');
                // Refresh list
                await fetchWarehouses();
                return true;
            } else {
                toast.error(result.error);
                return false;
            }
        } catch (err) {
            toast.error('Failed to create warehouse');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        warehouses,
        loading,
        error,
        fetchWarehouses,
        addWarehouse
    };
};
