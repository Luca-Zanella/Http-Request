import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css'],
})
export class FooComponent implements OnInit {
  //oggetto che conterrà la nostra chiamata http
  data: Object;
  //variabile che dice se siamo in attesa di una rispsta dal sever
  loading: boolean;
  //notifica quando arriva la risposta dall'http server
  o: Observable<Object>;

  //diciamo ad angular di passarci il modulo http quando crea l'istanza del componente foo
  constructor(public http: HttpClient) {}

  ngOnInit(): void {}

  makerequest(): void {
    //notifichiamo in caso stessimo ricevend de idati
    this.loading = true;
    //get e otteniamo l'oggetto observable che attende la rispsota
    this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    //a questo observable attachiamo un metodo observer che vien lanciato quando riceviamo una risposta
    this.o.subscribe(this.getData);
  }

  //simile alla funzione lambda per le funzioni
  getData = (d: Object) => {
    this.data = d; //notifico l'oggetto ricevuto dal server
    this.loading = false; //notifico che ho ricevuto i dati
  };

  makeCompactRequest(): void {
    this.loading = true;
    this.http
      .get('https://jsonplaceholder.typicode.com/posts.1')
      .subscribe((newData) => {
        this.data = newData;
        this.loading = false;
      });
  }

  //l'operazione di post necessità una varibile in più
  //viene creatata una stringa (JSON.stringfy)
  makeCompactPost() {
    this.loading = true;
    this.http
      .post(
        'https://jsonplaceholder.typicode.com/posts',
        JSON.stringify({ body: 'bar', title: 'foo', userId: 1 })
      )
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }
}
