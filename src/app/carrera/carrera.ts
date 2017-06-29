import { Grupo } from '../grupo/grupo';
export class Carrera{
	constructor(
		public _id?:string,
		public nombre?:string,	
		public abreviacion?:string,
		public grupos?:Grupo[],
		public num?:number,
	){}
}