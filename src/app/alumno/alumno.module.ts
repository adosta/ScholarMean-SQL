import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { AlumnoCreateComponent } from './alumno-create/alumno-create.component';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { AlumnoService } from './alumno.service';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { CarreraService } from '../carrera/carrera-service.service';
import { AlumnoBuscadorComponent } from './alumno-buscador/alumno-buscador.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { AlumnoDetailsComponent } from './alumno-details/alumno-details.component';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    AlumnoRoutingModule,
    CommonModule,
    FormsModule,
    Ng2TableModule,
    SimpleNotificationsModule,
    FileUploadModule
  ],
  declarations: [AlumnoComponent, AlumnoCreateComponent, AlumnoBuscadorComponent, 
  AlumnoDetailsComponent],
  providers: [AlumnoService, CarreraService]
})
export class AlumnoModule { }
