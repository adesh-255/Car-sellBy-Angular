import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { resolve } from 'dns';
//import { resolve } from 'dns';
//import { resolve } from 'dns';
import { BehaviorSubject, observable, Observable, of, Subject } from 'rxjs';
//import { setTimeout } from 'timers';
import { Offer } from '../interfaces/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
   private offers: Offer[] =[];

   offersSubject: BehaviorSubject<Offer[]> = new BehaviorSubject(<Offer[]>[]);
  constructor(
    private db : AngularFireDatabase,
    private storage : AngularFireStorage
  ) {

  }

  getOffer() : void{
    this.db.list('offers').query.limitToLast(10).once('value' , snapshot =>{
      const offerSnapshotValue  = snapshot.val();
      if(offerSnapshotValue){
        const offers = Object.keys(offerSnapshotValue).map(id =>({id, ...offerSnapshotValue[id]}));
        this.offers = offers;
      }

      this.dispatchOffers();
    });
  }


  dispatchOffers(){
    this.offersSubject.next(this.offers);
  }
 async createOffer(offer : Offer, offerPhoto? : any):Promise<Offer>{
   try {

      const photoUrl = offerPhoto ? await this.uploadPhoto(offerPhoto) : '';
      const reponse = this.db.list('offers').push({...offer, photo : photoUrl});
      const createdOffer = {...offer ,photo: photoUrl, id : <string> reponse.key};
      this.offers.push(createdOffer);
      this.dispatchOffers();
      return createdOffer;
   }catch (error){
     throw error;
   }

  }

 async editOffer(offer : Offer , offerId:string, newOfferPhoto?:any):Promise<Offer>{
  try {
    if(newOfferPhoto && offer.photo && offer.photo !==''){
      await this.removePhoto(offer.photo);
    }
    if(newOfferPhoto){
      const photoUrl = newOfferPhoto ? await this.uploadPhoto(newOfferPhoto) : '';
    }
    await this.db.list('offers').update(offerId,offer);
    const offerIndexToUpdate = this.offers.findIndex(el => el.id === offerId);
    this.offers[offerIndexToUpdate] = {...offer, id : offerId , photo : newOfferPhoto};
    this.dispatchOffers();
    return {...offer, id : offerId , photo : newOfferPhoto};
  } catch (error) {
    throw error;
  }

  }
   async deleteOffer(offerId:string): Promise<Offer>{

    try {
      const offerToDeleteIndex = this.offers.findIndex(el => el.id === offerId );
    const offerToDelete = this.offers[offerToDeleteIndex];
    if(offerToDelete.photo && offerToDelete.photo!=''){
      await this.removePhoto(offerToDelete.photo);
    }
  await this.db.list('offers').remove(offerId);
    this.offers.splice(offerToDeleteIndex,1);
    this.dispatchOffers();
    return offerToDelete;

    } catch (error) {
      throw error ;

    }


  }
  private uploadPhoto(photo:any): Promise<any>{
    return new Promise((resolve,reject) =>{
      const upload = this.storage.upload('offers/' + Date.now()+"-"+ photo.name,photo);
      upload.then((res) =>{
        resolve(res.ref.getDownloadURL());
      }).catch(reject);
    });
  }
  private removePhoto(photoUrl : string): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.storage.refFromURL(photoUrl).delete().subscribe({
        complete: () => resolve({}),
        error: reject
      });
    });
  }
}
