// api test to call a post  method
describe('Verify if Tenant can be created through POST call API', ()=>{

    it('post call',()=>{
        let jsonpayload=`
        {
            "Name":"TenantQA1",
              "Description":"Stack for Tenant2",
              "IsSelfManagedAWSAccount": false,
              "Region":"",
              "AccountName": "Test AccountName",
              "Email": "abc@xyz.com",
              "AccountID": "12345",
              "EnablePhoneChannel": true,
              "EnableChatChannel": true,
              "EnableEmailChannel": true,
              "ChannelData": {
                  "PhoneChannelData": {
                      "InstanceName": "",
                      "UseOldPhoneNumber": true,
                      "IsCreatePortingRequest": true,
                      "NewPhoneNumberType": "TFN",
                      "GreetingMessage": "",
                      "WaitMessage": "",
                      "HoursOfOperation": {
                          "Config": [{
                              "Day": "string",
                              "EndTime": {
                                  "Hours": 1,
                                  "Minutes": 2
                              },
                              "StartTime": {
                                  "Hours": 3,
                                  "Minutes": 4
                              }
                          }],
                          "Description": "string",
                          "Name": "string",
                          "Tags": {
                              "string": "string"
                          },
                          "TimeZone": "string"
                      }
                  },
                  "ChatChannelData": {
                      "Intents": [{
                          "Name": "",
                          "Utterances": [{
                              "Value": ""
                          }]
                      }]
                  },
                  "EmailChannelData": {
                      "EmailAddress": "",
                      "EmailBox": "",
                      "MSClientIdentifier": "",
                      "MSClientSecret": ""
                  }
              }
          }
          `;
        let jsondata=JSON.parse(jsonpayload)
        cy.request('POST','https://api-staging.presolved.ai/tenant',jsondata).then(
            (responsedata)=>{
                expect(responsedata.status).to.eq(200)
            }
        )
    })
})