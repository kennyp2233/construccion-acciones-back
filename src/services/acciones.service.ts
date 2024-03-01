import acciones from "../db/models/acciones.model";
import { AccionesCreationAttributesI, AccionesAtributesI } from "../../type";

import {getStockPrice} from '../api/api.acciones';

class Acciones {
    async getAcciones(): Promise<AccionesAtributesI[]> {
        try {
            const accionesList = await acciones.findAll();
            return accionesList.map((aerolinea) => aerolinea.toJSON()) as AccionesAtributesI[];
        } catch (error) {
            throw error;
        }
    }

    async getAccion(id: number): Promise<AccionesAtributesI | null> {
        try {
            const accion = await acciones.findByPk(id);
            return accion ? accion.toJSON() as AccionesAtributesI : null;
        } catch (error) {
            throw error;
        }
    }

    async createAccion(accion: AccionesCreationAttributesI): Promise<AccionesAtributesI> {
        try {
            const precioActual = await getStockPrice(accion.siglas_accion, new Date(), new Date());
            const costoTotal = accion.precio_compra * accion.cantidad_acciones;
            const cambio = accion.precio_compra - precioActual;
            const gananciaPerdida = cambio * costoTotal;

            const nuevaAccion = {
                ...accion,
                costo_total: costoTotal,
                cambio: cambio,
                ganancia_perdida: gananciaPerdida
            };

            return await acciones.create(nuevaAccion) as any as AccionesAtributesI;

        } catch (error) {
            throw error;
        }
    }

    async updateAccion(id: number, accion: AccionesCreationAttributesI): Promise<AccionesAtributesI | null> {
        try {
            const accionToUpdate = await acciones.findByPk(id);

            if (accionToUpdate) {
                const precioActual = await getStockPrice(accion.siglas_accion, new Date(), new Date());
                const costoTotal = accion.precio_compra * accion.cantidad_acciones;
                const cambio = accion.precio_compra - precioActual;
                const gananciaPerdida = cambio * costoTotal;

                const nuevaAccion = {
                    ...accion,
                    costo_total: costoTotal,
                    cambio: cambio,
                    ganancia_perdida: gananciaPerdida
                };

                await acciones.update(nuevaAccion, {
                    where: {
                        id_accion: id
                    }
                });

                const updatedAccion = await acciones.findByPk(id);
                return updatedAccion ? updatedAccion.toJSON() as AccionesAtributesI : null;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async deleteAccion(id: number): Promise<AccionesAtributesI | null> {
        try {
            const accionesToDelete = await acciones.findByPk(id);

            if (accionesToDelete) {
                await acciones.destroy({
                    where: {
                        id_accion: id
                    }
                });

                return accionesToDelete.toJSON() as AccionesAtributesI;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteAcciones(ids: number[]): Promise<number> {
        try {
            const deletedAcciones = await acciones.destroy({
                where: {
                    id_accion: ids
                }
            });

            return deletedAcciones;
        } catch (error) {
            throw error;
        }
    }
}

export default new Acciones();