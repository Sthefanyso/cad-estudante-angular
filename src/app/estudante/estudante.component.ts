import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estudante} from '../estudante';
import { CadastroService } from '../cadastro.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit{
  
      estudantes: Estudante[] = [];
      formGroupClient: FormGroup;
      
      constructor(private CadastroService: CadastroService,
                  private formBuilder: FormBuilder
        ){
 
      //cria o formGroup
      this.formGroupClient = formBuilder.group({
          id: [''],
          nome: [''],
          email: [''],
          telefone: [''],
          idade: [''],
          curso: [''],
      });
    }

      ngOnInit(): void{
        this.loadEstudantes();
      }

      loadEstudantes(){
        this.CadastroService.getEstudantes().subscribe(
          {
            next: data => this.estudantes = data,
            error:(msg) => console.log("Erro endpoint" + msg)
          }
        )
      }

      save(){
        this.CadastroService.save(this.formGroupClient.value).subscribe(
          {
            next: data =>{
              this.estudantes.push(data);
              this.formGroupClient.reset();
            }
          }
        )
      }
}
