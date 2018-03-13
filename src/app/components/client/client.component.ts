import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ClientService} from '../../services/client.service';
import {ClientModel} from '../../model/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers:[ClientService]
})
export class ClientComponent implements OnInit {

  private clients: Array<ClientModel>;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
    sessionStorage.clear();
  }

  private loadUsers():void {
  this.clientService.getClients().subscribe(res => {
      this.clients = res;
      console.log(res);
    });
  }

  public edit(client: ClientModel): void{
    sessionStorage.setItem('client', JSON.stringify(client));
    this.router.navigate(['/createClientComponent']);
  }

  public delete(client: ClientModel): void{
    this.clientService.delete(client);
    location.reload();
  }

  public goToOrder(client: ClientModel): void{
    sessionStorage.setItem('client', JSON.stringify(client));
    this.router.navigate(['/ordersComponent']);
  }

}