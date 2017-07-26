import { Carrera } from '../carrera/carrera';
import { Grupo } from '../grupo/grupo';

export class Alumno{
	constructor(
		public _id?:string,
		public Nombre?:string,
		public ApellidoP?:string,
		public ApellidoM?:string,
		public FechaNac?:string,
		public carrera?:Carrera,
		public _grupo?:Grupo,
		public createdAt?:Date,
		public noMatricula?: String,
		public usuario?:any,
		public _depositos?:any,
		public NumHijos?:string,
		public Sexo?:string,
		public EstadoCivil?:string,
		public PadreTutor?:string,
		public RFC?:string,
		public Curp?:string,
		public GrupoEtnico?:string,
		public TrabajoDeAlumno?:string,
		public NumDependientes?:string,
		public Municipio?:string,
		public Estado?:string,
		public Pais?:string,
		public Extranjero?:string,
		public PadresExtranjeros?:string,
		public Peso?:string,
		public Estatura?:string,
		public TipoSangre?:string,
		public AntecedMedicos?:string,
		public OtroAnteced?:string,
		public discapacidad?:string,
		public NumSeguroSocial?:string,
		public Calle?:string,
		public Colonia?:string,
		public Ciudad?:string,
		public NumExterior?:string,
		public CodPost?:string,
		public EstadoDomi?:string,
		public TelefonoCasa?:string,
		public TelefonoCel?:string,
		public Facebook?:string,
		public Preparatoria?:string,
		public Especialidad?:string,
		public PromedioFinal?:string,
		public Semestre?:string,
		public PreparatoriaEstado?:string,
		public TurnoParaEntrevist?:string,
		public Medios?:string,
		public NumInstitucionesConsidera?:string,
		public JustificacionDeEleccion?:string,
	){ }

	public get NombreCompleto(){
		return this.ApellidoP+' '+this.ApellidoM+' '+this.Nombre;
	}
} 