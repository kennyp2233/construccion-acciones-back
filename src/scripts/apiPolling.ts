import Acciones from '../services/acciones.service';
import { AccionesCreationAttributesI, AccionesAtributesI } from "../../type";
import cron from 'node-cron';

async function main() {
    const registros = await Acciones.getAcciones();
    registros.forEach((registro: AccionesAtributesI) => {
        console.log('Actualizando registro:', registro.id_accion);
        Acciones.updateAccion(registro.id_accion, registro as AccionesCreationAttributesI);
    });
}

// Exportar la función que inicia el cron job
export function iniciarCronJob() {
    // Ejecutar main cada 5 segundos
    cron.schedule('*/5 * * * * *', () => {
        main();
    });
}