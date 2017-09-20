import { NgZone, Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class PouchDBService {
    private _databaseName:string;
    protected isInstantiated: boolean;
    protected database:PouchDB.Database<{}>;
    protected serverURL = 'http://52.187.174.120:5984/';
    public listener: EventEmitter<any> = new EventEmitter();

    //public constructor(private _zone: NgZone) {}
    public constructor() {}

    public set databaseName(value:string){
        this._databaseName = value;
    }

    public get databaseName():string{
        return this._databaseName;
    }

    public init(){
        this.database = new PouchDB(this.databaseName);
        this.sync(this.serverURL + this.databaseName);
            this.getChangeListener().subscribe(data => {
            for (let i = 0; i < data.change.docs.length; i++) {
                /* this._zone.run(() => {
                    //this.people.push(data.change.docs[i]);
                }); */
            }
        });
    }

    public fetch() {
        return this.database.allDocs({include_docs: true});
    }

    public get(id: string) {
        return new Promise((resolve, reject) => {
            let r = this.database.get(id).then(ret => {
                resolve(ret);
            }).catch(ret=>{
                reject(ret);
            });
        })
    }

    public put(id: string, document: any) {
        document._id = id;
        return new Promise((resolve, reject) => {
            this.get(id)
            .then((result:any) => {
                document._rev = result._rev;
                this.database.put(document)
                .then((result)=>{
                    resolve(result);
                })
                .catch((error)=>{
                    reject(error);
                });
            }).catch(error => {
                if (error.status == '404') {
                    this.database.put(document)
                    .then((result)=>{
                        resolve(result);
                    })
                    .catch((error)=>{
                        reject(error);
                    });
                } else {
                    reject(error);
                }
            });
        });
    }

    public sync(remote: string) {
        const remoteDatabase = new PouchDB(remote);
        this.database.sync(remoteDatabase, {
            live: true
        }).on('change', change => {
            this.listener.emit(change);
        });
    }

    public getChangeListener() {
        return this.listener;
    }

}
