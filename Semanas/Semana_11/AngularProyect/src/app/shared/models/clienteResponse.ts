import Clientes from './cliente';
import Personas from './persona';
import tiposCliente from './tipoCliente';

export default interface clientesResponse {
  cliente: Clientes;
  persona: Personas[];
  tipoCliente: tiposCliente[];
}
