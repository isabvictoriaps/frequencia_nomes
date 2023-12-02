import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, throwError } from 'rxjs';

import { FrequenciaNome } from './frequencia-nome.model';

@Injectable({
  providedIn: 'root',
})
export class IBGEService {
  urlBase = 'https://servicodados.ibge.gov.br';

  constructor(private httpClient: HttpClient) {}

  get(nome: string): Observable<FrequenciaNome> {
    const url = this.urlBase + `/api/v2/censos/nomes/${nome}`;


    return this.httpClient.get<FrequenciaNome[]>(url).pipe(
      map((response) => {

        if (response.length === 0) {
          throw new HttpErrorResponse({
            status: HttpStatusCode.NotFound,
            statusText: `Não foram encontrados registros
                         para "${nome}"`,
          });
        }

        const saida = response[0];

        saida.res.forEach((item) => {
          const [de, ate] = item.periodo
            .replace(/[^\d,]+/g, '')
            .split(',');

          item.periodo = ate ? `${de} - ${ate}` : de;
        });

        return saida;
      }),
      catchError((error) => {
        let mensagem = '';

        if (error instanceof ErrorEvent) {
          mensagem = error.message;
        } else if (error instanceof HttpErrorResponse) {
          mensagem = error.statusText;
        } else {
          mensagem = 'Ocorreu um erro';
        }

        return throwError(() => mensagem);
      }),
    );
  }
}
