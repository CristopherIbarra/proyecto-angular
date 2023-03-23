import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit{
  public title: string;
  public project!: Project;
  public save_project: any;
  public status!: string; 
  public filesToUpload!: Array<File>;
  public url: string;

  constructor(
    private _projectServices: ProjectService,
    private _uploadServices: UploadService,
    private _route: ActivatedRoute,
    private _router :Router
  ){
    this.title = 'Editar proyecto';
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this.getProject(id);
    })
  }

  getProject(id:any){
    this._projectServices.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error =>{
        console.log(error)
      }
    )
  }

  onSubmit(form: any){
    
    //guardar los datos
    this._projectServices.updateProject(this.project).subscribe(
      response =>{
        if(response.project) {
          
          if(this.filesToUpload){
            this._uploadServices.makeFileRequest(Global.url+ "upload-image/" + response.project._id, [],this.filesToUpload, 'image')
            .then((result: any)=>{
            
            this.save_project = response.project;

            this.status = 'success';
          })
          }
          // cargar imagen

          


         
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
