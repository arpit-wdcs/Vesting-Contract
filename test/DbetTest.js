const {assert} = require("chai");
const Dbet =  artifacts.require('DBet');
const TokenVesting = artifacts.require('TokenVesting');

describe("testing of  DbetToken",() => {

    let instance;

    before(async () => {
        instance = await Dbet.deployed();
    });


    it(" to check total supply ", async () => {
        const supply = await instance.totalSupply();
        assert.equal(supply,'10000000000000000000000000000',"problem is here");

    });

    it(" to check initial supply ", async () => {
        const supply = await instance._initialSupply();
        assert.equal(supply,'100000000000000000000000000',"Initial supply is not matched");

    });

    it("this function will increase the supply",async() =>{
        //const instance = await Dbet.deployed();
        let amount  = 500;
        await instance.increaseSupply(amount);
        let newamount = await instance._initialSupply();
        let newsupply =  amount + newamount ;
        assert.equal(newsupply,'500100000000000000000000000000',"Not increasing the supply");

    });

    it("vesting schedules successfully",async() => {
        
        const vesting = await TokenVesting.deployed(instance.address);
        let account = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
        let start = 1649851552;
        let cliff = 1200;
        let duration = 86400;
        let slicePeriod = 3600;
        let revocable = true;
        let amount = 500;

        await instance.transfer(vesting.address, 50000000);
        console.log("vesting", vesting.address );
        await vesting.createVestingSchedule(account,start,cliff,duration,slicePeriod,revocable,amount);
          
      
       let _vestingId =  await vesting.computeNextVestingScheduleIdForHolder(account);

       let _vestingScheduleId = await vesting.getVestingSchedule(_vestingId);

       console.log("VESTING SCH ID :: ", _vestingScheduleId );
       
        
    });

    it()
})