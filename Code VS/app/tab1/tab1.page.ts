import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceProvider } from '../input-dialog-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title: string = 'Grocery List';
  items = [];

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceService,
    public inputDialogService: InputDialogServiceProvider
  ) {}

  loadItemsObservable$ = this.dataService.getItems();
  

  loadItems() {
    return this.dataService.getItems();
  }

 
  async removeItem(item: any, index: any) {
    console.log('Removing Item - ', item, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + index + ' ...',
      duration: 3000
    });
    await toast.present();

    this.dataService.removeItem(index);
  }

  async editItem(item: any, index: any) {
    console.log('Edit Item - ', item, index);
    const toast = await this.toastCtrl.create({
      message: 'Edit Item - ' + index + ' ...',
      duration: 3000
    });
    await toast.present();

    this.inputDialogService.showPrompt(item, index);
  }

  shareItem(item: any, _index: any) {
    const message = `Check out this item: ${item.name}, Quantity: ${item.quantity}`;
    Share.share({
      title: 'Grocery List',
      text: message,
      dialogTitle: 'Share Item'
    })
      .then(() => {
      })
      .catch(() => {
      });
  }

  addItem() {
    console.log('Adding Item');
    this.inputDialogService.showPrompt();
  }


}
