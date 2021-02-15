import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Ship, Pilot, Vehicle } from '../shared/models';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private url = 'http://swapi.dev/api/';
    private shipData: any = {};
    private pilotData: any = {};
    private vehicleData: any = {};
    ships: Ship[];
    pilots: Pilot[];
    vehicles: Vehicle[];

    isLoaded = new Subject<any>();
    isLoadedAsObservable = this.isLoaded.asObservable();

    constructor(private http: HttpClient) {
        this.initData();
    }

    initData() {
        // sessionStorage.clear();
        this.getShipData();
        this.getPilotData();
        this.getVehicleData();
    }

    // Fetch starship data from the swapi
    private getShipData() {
        const shipData = sessionStorage.getItem('ships');

        if (shipData === null) {
            this.http.get<any>(this.url + 'starships/')
                .subscribe(res => {
                    this.shipData = res;
                    sessionStorage.setItem('ships', JSON.stringify(this.shipData));
                    this.isLoaded.next();
                });
        } else {
            this.shipData = JSON.parse(shipData);
            setTimeout(() => this.isLoaded.next());
        }
    }

    // Fetch pilot data from the swapi
    private getPilotData() {
        const pilotData = sessionStorage.getItem('pilots');

        if (pilotData === null) {
            this.http.get<any>(this.url + 'people/')
                .subscribe(res => {
                    this.pilotData = res;
                    sessionStorage.setItem('pilots', JSON.stringify(this.pilotData));
                    this.isLoaded.next();
                });
        } else {
            this.pilotData = JSON.parse(pilotData);
            setTimeout(() => this.isLoaded.next());
        }
    }

    // Fetch vehicle data from the swapi
    private getVehicleData() {
        const vehicleData = sessionStorage.getItem('vehicles');

        if (vehicleData === null) {
            this.http.get<any>(this.url + 'vehicles/')
                .subscribe(res => {
                    this.vehicleData = res;
                    sessionStorage.setItem('vehicles', JSON.stringify(this.vehicleData));
                    this.isLoaded.next();
                });
        } else {
            this.vehicleData = JSON.parse(vehicleData);
            setTimeout(() => this.isLoaded.next());
        }
    }

    getShips(): Ship[] {
        return this.shipData.results;
    }

    getPilots(): Pilot[] {
        return this.pilotData.results;
    }

    getVehicles(): Vehicle[] {
        return this.vehicleData.results;
    }
}
