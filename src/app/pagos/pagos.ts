import { Alumno } from '../alumno/alumno';

export class Pago {
	constructor(
			public _id?: string,
			public monto?: number,
			public fecha?: Date,
			public concepto?: string,
			public _alumno?:any,

		){}
}