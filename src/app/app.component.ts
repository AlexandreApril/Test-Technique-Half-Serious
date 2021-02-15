import { Component, OnInit } from '@angular/core';
import { DataService } from '../app/services/data.service';
import { Ship, Pilot } from '../app/shared/models';
import '../styles.css';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    ships: Ship[];
    pilots: Pilot[];
    shipDetails: Ship;
    pilotDetails: Pilot;

    isLoaded = false;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.data.isLoadedAsObservable.subscribe(_ => {
            this.ships = this.data.getShips();
            this.pilots = this.data.getPilots();
            this.isLoaded = true;
        });
    }

    shipSelected(event: Ship) {
        this.shipDetails = event;
    }

    pilotSelected(event: Pilot) {
        this.pilotDetails = event;
    }

    // Reset the ship details, this will return the user to the ship list
    returnToShipList() {
        this.shipDetails = null;
    }

    // Reset the pilot details, this will return the user to the ship details
    returnToShipDetails() {
        this.pilotDetails = null;
    }
}