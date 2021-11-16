//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
//base url https://mygateway.mypinata.cloud/ipfs

const api_key = '7ffda04892f976347729'

const api_secret = '672ba7274adbe0e5c69633d58a022262ae279402e9459f393238f6a5e0854128'

const object = {
    image: null,
    name: "Re-Genz #1970",
    description:
      "Re-Genz is a collection of 3,333 characters, forming part of the Degenz universe. Re-Genz can only be obtained by burning two Degenz",
    external_url: "https://www.degenz.co/",
    attributes: [
      {
        trait_type: "Skill",
        value: "Skill 1",
      },
      {
        trait_type: "Skill",
        value: "Skill 2",
      },
      {
        trait_type: "Skill",
        value: "Skill 3",
      },
      {
        trait_type: "Skill",
        value: "Skill 4",
      },
      {
        trait_type: "Stat",
        value: "Stat 1",
      },
      {
        trait_type: "Stat",
        value: "Stat 2",
      },
      {
        trait_type: "Stat",
        value: "Stat 3",
      },
      {
        trait_type: "Stat",
        value: "Stat 4",
      },
      {
        trait_type: "Stat",
        value: "Stat 5",
      },
      {
        trait_type: "Stat",
        value: "Stat 6",
      },
      {
        trait_type: "Ability",
        value: "Ability 1",
      },
      {
        trait_type: "Ability",
        value: "Ability 2",
      },
      {
        trait_type: "Ability",
        value: "Ability 3",
      },
      {
        trait_type: "Ability",
        value: "Ability 4",
      },
      {
        trait_type: "Sex",
        value: "Female",
      },
      {
        trait_type: "Blood Line",
        value: "O",
      },
      {
        trait_type: "Year",
        value: "2",
      },
      {
        trait_type: "Week",
        value: "2",
      },
      {
        trait_type: "Month",
        value: "2",
      },
      {
        trait_type: "Horses Weight",
        value: 100,
      },
      {
        trait_type: "Total Reward",
        value: 1000000,
      },
      {
        display_type: "date",
        trait_type: "birthday",
        value: 1546360800,
      },
    ],
    sire_token_id: "1",
    dam_token_id: "2",
  };
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MWJhZGQ3ZC00Nzc3LTRjYzctODk5Ny01NTI4MjFkZmRjOWUiLCJlbWFpbCI6InBodW9jaHVuZ2RuMTk5OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2ZmZGEwNDg5MmY5NzYzNDc3MjkiLCJzY29wZWRLZXlTZWNyZXQiOiI2NzJiYTcyNzRhZGJlMGU1YzY5NjMzZDU4YTAyMjI2MmFlMjc5NDAyZTk0NTlmMzkzMjM4ZjZhNWUwODU0MTI4IiwiaWF0IjoxNjM2MDc1NDkxfQ.UgJQE_tC-g92avP1gcaS7q6nuhJeyQEHKGbVeyMvnLg'
 const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    console.log(fs.createReadStream('./pupter.js'))
    data.append('file', fs.createReadStream('./pupter.js'));
    // console.log(data)
        // const obj = JSON.stringify(object)

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: 'testname123123',
        keyvalues: {
            exampleKey: 'exampleValue123123'
        }
    });
    data.append('pinataMetadata', metadata);
    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);
    console.log(data._boundary)
    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                // pinata_api_key: pinataApiKey,
                // pinata_secret_api_key: pinataSecretApiKey
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(function (response) {
            //handle response here
            console.log(response)
        })
        .catch(function (error) {
            //handle error here
            console.log(error)
        });
}
 const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
            //handle error here
        });
};


pinFileToIPFS(api_key,api_secret)
// pinJSONToIPFS(api_key,api_secret,object)