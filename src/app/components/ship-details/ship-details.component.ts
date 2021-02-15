import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Ship, Pilot } from 'src/app/shared/models';
import '../../../styles.css';

@Component({
    selector: 'app-ship-details',
    templateUrl: './ship-details.component.html'
})
export class ShipDetailsComponent implements OnInit {
    @Output() pilotSelected = new EventEmitter<any>();
    @Output() returnToShipList = new EventEmitter<any>();
    @Input() ship: Ship;

    pilots: Pilot[];

    constructor(private data: DataService) { }

    ngOnInit() {
        this.pilots = this.data.getPilots();
    }

    // Use the pilot url to find the correct pilot and return the name
    getPilotName(pilotUrl: string) {
        const pilotDetails = this.pilots.find(pilot => pilot.url === pilotUrl);

        return !!pilotDetails ? pilotDetails.name : '';
    }

    // When a pilot is selected, emit the details so they can be displayed in pilot-details
    getPilotDetails(pilotUrl: string) {
        const pilotDetails = this.pilots.find(pilot => pilot.url === pilotUrl);
        this.pilotSelected.emit(pilotDetails);
    }

    back() {
        this.returnToShipList.emit();
    }
}