import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

  submitForm = () => toastr.success(`${this.formGroup.value.name} cotado com sucesso!`);

  retrieveQuote = () => toastr.success('Cotação recuperada!');

  private buildForm(): void {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      documentType: [null, [Validators.required]],
      documentNumber: [null]
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
