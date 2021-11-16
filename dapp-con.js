import { ApiPromise, WsProvider } from '@polkadot/api';
// import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import keyring from '@polkadot/ui-keyring';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js'
import excel from 'exceljs'

let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet("Tutorials");


async function main(){
    let configCommon = {
        "APP_NAME": "dappCon",
        "DEVELOPMENT_KEYRING": true,
        "RPC": {}
      }
    const types = {
        "SmartContract": {
            "_enum": {
              "Evm": "H160",
              "Wasm": "AccountId"
            }
          },
          "EraRewardAndStake": {
            "rewards": "Balance",
            "staked": "Balance"
          },
          "EraIndex": "u32",
          "StakingLedger": {
            "total": "Balance",
            "active": "Balance"
          },
          "EraStakingPoints": {
            "total": "Balance",
            "stakers": "BTreeMap<AccountId, Balance>",
            "former_staked_era": "u32",
            "claimed_rewards": "Balance"
          }
    }
    const configEnv = {
        "PROVIDER_SOCKET": "wss://shiden.api.onfinality.io/public-ws"
      }
    
    const config = { ...configCommon, ...configEnv, types };
    console.log(types)
    const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    // console.log(provider)
    const api = new ApiPromise({ provider, types, rpc: jsonrpc });
    api.on('connected', () => {
        console.log("13123123123")
        // `ready` event is not emitted upon reconnection and is checked explicitly here.
        api.isReady.then(async(_api) => {
            console.log("6666666")
            // api.query.dappsStaking.registeredDapps.keys().then(
            //     result => {
            //       // console.log('registeredDapps result', result);
            //       const r = result.map(c => '0x' + c.toString().slice(-40));
            //       // console.log(r);
            //       const contractList = r.map(c => ({ key: c, value: c, text: c }));
            //       console.log('fetchContracts', contractList);
                  
            //     }
            //   )
            //     .catch(console.error);
            const eraStakeMap = new Map();
            const [eraMap] = await Promise.all([
                api.query.dappsStaking.contractEraStake.entries(
                    {'Evm': '0x4c7c135d913ba5f5663b20e4e6dfd715d2bf7c5b'}
                )
              ]);
              console.log("123123123123123123")
              console.log('contractEraStake.entries ', eraMap);
              eraMap.forEach(([key, points]) => {
                // console.log('[key, points] = ', key, points);
                const eraKey = parseInt(key.args.map((k) => k.toString())[1]);
                eraStakeMap.set(eraKey, points.toJSON());
              });
              if (eraStakeMap.size !== 0) {
                console.log(`eraStakeMap`, eraStakeMap)
                // contract last staked
                const lastStaked = Math.max(...eraStakeMap.keys());
                console.log(`lastStaked`, lastStaked)
                const entry = eraStakeMap.get(lastStaked);
          // console.log("entry",entry)
          const stakerNum = Object.keys(entry.stakers).length;
          const obj = []
          let objtemp = {
              address:'',
              value:''
          }
          let total = 0;
          let i =1;
          Object.entries(entry.stakers).map(item => {
            let  bignumber = new BigNumber(item[1], 16);
            let temp = bignumber.toString(10);
            let temp1 = new BigNumber(temp).dividedBy(10**18)
            
              objtemp={
                address:item[0],
                value:temp1.toString()
            }
            
            total+= temp1.toNumber()
            obj.push(objtemp)
            // console.log(objtemp)
          })
            console.log(obj.length)
            console.log(obj)
            console.log(total)
        //   Object.values(entry.stakers).map(item => 
        //     console.log(item))
        //   console.log('queryEraStakeMap stakerNum', stakerNum);
        //   console.log('12313queryEraStakeMap stakerNum', stakerNum);
        const test = {
          era:lastStaked,
          total: total,
          staker: obj.length
        }
        obj[0].total = total;
        obj[0].staker = obj.length;
        obj[0].era = lastStaked;

          // obj.unshift(test)
                // console.log(entry.stakers)
                worksheet.columns = [
                  { header: "ADDRESS", key: "address", width: 60},
                  { header: "AMOUNT", key: "value", width: 25 },
                  { header: "LAST ERA", key: "era", width: 15  },
                  { header: "TOTAL VALUE", key: "total", width: 15},
                  { header: "TOTAL STAKERS", key: "staker" , width: 15},
                ];

                worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };

                worksheet.getCell('A1').border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('B1').border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('C1').border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('D1').border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('E1').border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                await worksheet.addRows(obj,'i');
                await  workbook.xlsx.writeFile('staker1.xlsx')
            }
            
        });
      });
}


main()