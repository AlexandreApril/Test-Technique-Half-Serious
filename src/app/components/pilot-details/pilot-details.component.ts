import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Ship, Pilot, Vehicle } from 'src/app/shared/models';
import '../../../styles.css';

@Component({
    selector: 'app-pilot-details',
    templateUrl: './pilot-details.component.html'
})
export class PilotDetailsComponent implements OnInit {
    @Output() returnToShipDetails = new EventEmitter<any>();
    @Input() pilot: Pilot;

    ships: Ship[];
    vehicles: Vehicle[];

    constructor(private data: DataService) { }

    ngOnInit() {
        this.ships = this.data.getShips();
        this.vehicles = this.data.getVehicles();
    }

    // Use the ship url to find the correct ship and return the name
    getStarshipNames(shipUrl: string) {
        const shipDetails = this.ships.find(ship => ship.url === shipUrl);

        return !!shipDetails ? shipDetails.name : '';
    }

    // Use the vehicle url to find the correct vehicle and return the name
    getVehicleNames(vehicleUrl: string) {
        const vehicleDetails = this.vehicles.find(vehicle => vehicle.url === vehicleUrl);

        return !!vehicleDetails ? vehicleDetails.name : '';
    }

    back() {
        this.returnToShipDetails.emit();
    }
}