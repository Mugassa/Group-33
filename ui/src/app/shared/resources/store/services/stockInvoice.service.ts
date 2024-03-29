import { Injectable } from "@angular/core";
import { omit } from "lodash";
import { Observable, zip } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { OpenmrsHttpClientService } from "src/app/shared/modules/openmrs-http-client/services/openmrs-http-client.service";

@Injectable({
  providedIn: "root",
})
export class StockInvoicesService {
  constructor(private httpClient: OpenmrsHttpClientService) {}

  createStockInvoices(invoices: any[]): Observable<any> {
    return this.httpClient.post(`store/stockinvoices`, invoices).pipe(
      map((invoicesResponse: any) => {
        return invoicesResponse[0];
      }),
      catchError((error: any) => error)
    );
  }

  getStockInvoices(page?: number, pageSize?: number, status?: string, orderByDirection?: string): Observable<any> {
    const pageNumber = page ? `page=${page}` : ``;
    const pageSizeNumber =
      pageSize && page
        ? `&pageSize=${pageSize}`
        : pageSize
        ? `pageSize=${pageSize}`
        : ``;
    const filterStatus =
      status && (page || pageSize)
        ? `&status=${status}`
        : status
        ? `status=${status}`
        : ``;
    const orderByDirectionArg =
      orderByDirection && (page || pageSize || status)
        ? `&orderByDirection=${orderByDirection}`
        : orderByDirection
        ? `orderByDirection=${orderByDirection}`
        : ``;
    const pagingArgs =
      pageNumber ||
      pageSizeNumber ||
      filterStatus ||
      orderByDirectionArg ? `?${pageNumber}${pageSizeNumber}${filterStatus}${orderByDirectionArg}` : '';
    return this.httpClient.get(`store/stockinvoices${pagingArgs}`).pipe(
      map((stockInvoiceResponse: any) => {
        return stockInvoiceResponse;
      }),
      catchError((error: any) => error)
    );
  }

  updateStockInvoice(invoiceUuid: string, invoiceObject: any): Observable<any>{
    return this.httpClient
      .post(`store/stockinvoice/${invoiceUuid}`, invoiceObject)
      .pipe(
        map((stockInvoicesResponse: any) => {
          return stockInvoicesResponse;
        }),
        catchError((error: any) => error)
      );
  }

  getStockInvoice(uuid: string): Observable<any> {
    return this.httpClient.get(`store/stockinvoice/${uuid}`).pipe(
      map((stockInvoiceResponse: any) => {
        return stockInvoiceResponse
      }),
      catchError((error: any) => error)
    );
  }

  updateStockInvoiceItem(uuid: string, stockInvoiceItem: any): Observable<any> {
    return this.httpClient
      .post(`store/stockinvoiceitem/${uuid}`, stockInvoiceItem)
      .pipe(
        map((stockInvoiceItemResponse: any) => {
          return stockInvoiceItemResponse;
        }),
        catchError((error: any) => error)
      );
  }
}
