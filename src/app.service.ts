import { Injectable } from '@nestjs/common';
//import { json } from 'stream/consumers';
import { DbService } from './shared';
//import { HttpService } from '@nestjs/axios';


@Injectable()
export class AppService {
  constructor(private readonly db: DbService) {}
  async getHello(): Promise<string> {
    const result = await this.db.create('vitalikWatchlist', ['matic-network']);
    return `Hello Wold! ${JSON.stringify(result)}`;
  }

  async getAggToken(chainID: number, address: string){
    var baseurl = "https://api.covalenthq.com/v1";
    var apiKey = "ckey_5c5cb07085824a35836cbc0cfee";

    const chain_poly = 137;
    const chain_fantom = 250;

    var url1 = baseurl + "/" + chainID + "/" + "address" + "/" + address + "/balances_v2/?key=" + apiKey;
    var data_eth =  await fetch(url1, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    });
    var eth_result = await data_eth.json();
    
    var url2 = baseurl + "/" + chain_poly + "/" + "address" + "/" + address + "/balances_v2/?key=" + apiKey;
    var data_poly =  await fetch(url2, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    }); 
    var poly_result = await data_poly.json();

    var url3 = baseurl + "/" + chain_fantom + "/" + "address" + "/" + address + "/balances_v2/?key=" + apiKey;
    var data_fathom =  await fetch(url3, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    }); 
    var fantom_result = await data_fathom.json();
  

    var result: any = {
      "address" : address,
      "balances" : {
        "eth" : [],
        "polygon" : [],
        "fantom" : [],
      },
      "totalBalanceinUSD" : 0,
    };

    var totalbalance = 0;

    if (eth_result.data["items"]) {

      eth_result.data["items"].forEach((element: any) => {
          result.balances.eth.push( {
            "name" : element.contract_name,
            "symbol" : element.contract_ticker_symbol,
            "decimal" : element.contract_decimals,
            "balance" : element.balance,
          })
          totalbalance += Number(element.balance);
        
        
      });
    }

    if (poly_result.data["items"]) {

      poly_result.data["items"].forEach((element: any) => {
          result.balances.polygon.push( {
            "name" : element.contract_name,
            "symbol" : element.contract_ticker_symbol,
            "decimal" : element.contract_decimals,
            "balance" : element.balance,
          })
          totalbalance += Number(element.balance);
        
      });
    }

    if (fantom_result.data["items"]) {

      eth_result.data["items"].forEach((element: any) => {
          result.balances.fantom.push( {
            "name" : element.contract_name,
            "symbol" : element.contract_ticker_symbol,
            "decimal" : element.contract_decimals,
            "balance" : element.balance,
          })
          totalbalance += Number(element.balance);
        
      });
    }

    result.totalBalanceinUSD = totalbalance;
    
    return result;
  }

  async getAllMasterCoins() {

    var url = "https://api.coingecko.com/api/v3/coins/list";
    var data=  await fetch(url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    }); 
    var result = await data.json();

    var r = {
      "coins": result,
    }

    return r;


  }

  

}
