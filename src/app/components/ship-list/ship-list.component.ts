import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Ship } from 'src/app/shared/models';
import '../../../styles.css';

@Component({
    selector: 'app-ship-list',
    templateUrl: './ship-list.component.html'
})
export class ShipListComponent implements OnInit {
    @Output() shipSelected = new EventEmitter<Ship>();
    
    ships: Ship[];

    constructor(private data: DataService) { }

    ngOnInit() {
        this.ships = this.data.getShips();
    }

    // When a ship is selected, emit the details so they can be displayed in ship-details
    getShipDetails(ship: Ship) {
        this.shipSelected.emit(ship);
    }
}