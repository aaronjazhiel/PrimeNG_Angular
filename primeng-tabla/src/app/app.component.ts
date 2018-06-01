import {Component, OnInit} from '@angular/core';
import { Car } from './domain/car';
import { CarService} from './services/carservice';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CarService]
})
export class AppComponent implements OnInit{
    
    displayDialog: boolean;
    
    car: Car = new PrimeCar();
    
    selectedCar: Car;
    
    newCar: boolean;
    
    cars: Car[];

    cols: any[];
            
           
    items: MenuItem[];
    
    constructor(private carService: CarService) { }
    
    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vinkkk' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'fa-plus',
                        items: [
                            {label: 'Alta de Pedimeto'},
                            {label: 'Entrada'},
                            {label: 'Salida'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            }
        ];
        
    }
    
    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }
    
    save() {
        const cars = [...this.cars];
        if (this.newCar) {
            cars.push(this.car);
        } else {
            cars[this.findSelectedCarIndex()] = this.car;
        }
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }
    
    delete() {
        const index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val, i) => i != index);
        this.car = null;
        this.displayDialog = false;
    }
    
    onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }
    
    cloneCar(c: Car): Car {
        const car = new PrimeCar();
        for (const prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }
    
    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
}

export class PrimeCar implements Car {
    
    constructor(public vin?, public year?, public brand?, public color?) {}
}
