import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit{
  public title: string;
  public project: Project;
  public status!: string;
  public save_project: any;
  public filesToUpload!: Array<File>;
  public url: string;

  constructor(
    private _projectServices: ProjectService,
    private _uploadServices: UploadService
  ){
    this.title = 'Crear Proyecto';
    this.url = Global.url;
    this.project = new Project('','', '', '', 2023, '', '')
  }

  ngOnInit(){
    
  }

  onSubmit(form: any){
    
    //guardar los datos
    this._projectServices.saveProject(this.project).subscribe(
      response =>{
        if (response.project) {
          

          // cargar imagen

          this._uploadServices.makeFileRequest(Global.url+ "upload-image/" + response.project._id, [],this.filesToUpload, 'image')
          .then((result: any)=>{
            
            this.save_project = response.project;

            this.status = 'success';
            form.reset();
          })


         
        }else{
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  fileChangeEvent(fileInput: any){
     this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  
}
