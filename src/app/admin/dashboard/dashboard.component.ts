import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  offerForm!: FormGroup;

offers: Offer[] = [];
currentOfferPhotoFile : any;
currentOfferPhotoUrl! : string;
subscription! : Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private offerService : OfferService
  )
  {}

  ngOnInit(): void {
    this.initOfferForm();
this.subscription = this.offerService.offersSubject.subscribe({
   next : (offers: Offer[]) => {
     this.offers= offers;
     console.log("NEXT");
    },
   //complete : () => {console.log("Observable complete");
   //},
   error : (error) => {console.error(error)},


 });
 this.offerService.getOffer();
 console.log(this.offerService.offersSubject.value);
}

  initOfferForm():void{
    this.offerForm=this.formBuilder.group({
      id:[null],
      titre:'',
      photo:[],
      marque:'',
      model:['',Validators.required],
      description:'',
      prix:0
    });
  }

  onSubmitOfferForm():void{
    const offerId = this.offerForm.value.id;
    let offer =this.offerForm.value;
    const offerPhotoUrl = this.offers.find(el => el.id === offerId)?.photo;
    offer = {...offer , photo : offerPhotoUrl};
    if(!offerId || offerId && offerId == ''){//CREATION
      delete offer.id;
   this.offerService.createOffer(offer, this.currentOfferPhotoFile).catch(console.error);
    }else{ //MODIFICATION
      delete offer.index;
      this.offerService.editOffer(offer,offerId, this.currentOfferPhotoFile).catch(console.error);
    }


    this.offerForm.reset();
    this.currentOfferPhotoFile = null;
    this.currentOfferPhotoUrl = '';
    //console.log(this.offers);
    //console.log(offerId);
}
onEditOffer(offer : Offer): void{
  this.currentOfferPhotoUrl =offer.photo ? <string> offer.photo : '';
this.offerForm.setValue({
  id: offer.id ? offer.id : '',
  titre : offer.titre ? offer.titre : '',
  photo : '',
  marque : offer.marque ? offer.marque : '',
  model : offer.model ? offer.model : '',
  description : offer.description ? offer.description : '',
  prix: offer.prix ? offer.prix : 0
});
}
onChangeOfferPhoto($event : any):void{
  this.currentOfferPhotoFile  = $event.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(this.currentOfferPhotoFile);
  fileReader.onloadend = (e) =>{
    this.currentOfferPhotoUrl =<string> e.target?.result;

  }


}
onDelete(offerId? : string){
  if(offerId){
    this.offerService.deleteOffer(offerId).catch(console.error);
  }else {
    console.error("ID non Trouvable");
  }

}
 ngOnDestroy(): void {
this.subscription.unsubscribe();
 }
}
