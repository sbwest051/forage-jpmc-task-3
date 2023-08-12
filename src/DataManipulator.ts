import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  upper_bound: number,
  lower_bound: number,
  trigger: number | undefined,
  ratio: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const Upper_bound = 1 + 0.03;
    const Lower_bound = 1 - 0.03;
    return {
      upper_bound: Upper_bound,
      lower_bound: Lower_bound,
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
        serverResponds[0].timestamp :serverResponds[1].timestamp,
      trigger: (ratio> Upper_bound || ratio < Lower_bound) ? ratio : undefined

       
    };
    
  }
}
