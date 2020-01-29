
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../shared/form.service';
import toastr from 'toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {

  public documentTypes: any[] = [
    {key: 'cedula', value: 'Cédula'},
    {key: 'cedulaExtrangeira', value: 'Cédula Extrangeira'},
    {key: 'tarjetaIdentidade', value: 'Tarjeta de identidade'},
  ];

  public formGroup: FormGroup;
  public maxLength: number;
  public imagePath = 'assets/images/Logo.png';

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngAfterViewInit() {
    this.formGroup.controls.documentType.valueChanges
      .subscribe(value => {
        this.validateIdentityCardOrCell(value);
        this.validateForeignCell(value);
    });
  }

  submitForm() {
    const object = this.formGroup.value;
    this.formService.sendData(object)
      .subscribe(() => toastr.success(`${object.numbre} cotado com sucesso!`));
  }

  retrieveQuote = () => toastr.success('Cotação recuperada!');

  private buildForm(): void {
    this.formGroup = this.fb.group({
      nombre: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      tipodoc: [null, [Validators.required]],
      numdoc: [null]
    });
  }

  private validateIdentityCardOrCell(value: any) {
    if (value === 'cedula' || value === 'tarjetaIdentidade') {
      this.maxLength = 10;
      this.formGroup.controls['documentNumber']
        .setValidators([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(10)
        ]);
      this.formGroup.controls['documentNumber']
        .updateValueAndValidity();
    }
  }

  private validateForeignCell(value: any) {
    if (value === 'cedulaExtrangeira') {
      this.maxLength = 15;
      this.formGroup.controls['documentNumber']
        .setValidators([
          Validators.required,
          Validators.maxLength(15)
        ]);
      this.formGroup.controls['documentNumber']
        .updateValueAndValidity();
    }
  }
}
