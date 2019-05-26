import { expect } from 'chai';
import UserController from '../server/controllers/user';

const userCtrl = new UserController();

describe('checking notification for user', () => {
    it('checking the cron function', async () => {
        const s = await userCtrl.checkTemp();
        expect(s).to.equal(true);
    });

    it('checking the temp value 20 for delhi', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','delhi',20);
        expect(s).to.equal(true);
    });

    it('checking the temp value 30 for delhi', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','delhi',30);
        expect(s).to.equal(true);
    });

    it('checking the temp value 10 for delhi', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','delhi',10);
        expect(s).to.equal(true);
    });

    it('checking the temp value 55 for delhi', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','delhi',55);
        expect(s).to.equal(true);
    });

     it('checking the temp value -1 for delhi', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','delhi',-1);
        expect(s).to.equal(true);
    });

     it('checking the temp value 0 for delhi', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','delhi',0);
        expect(s).to.equal(true);
    });

     it('checking the temp value 25 for mumbai', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','mumbai',25);
        expect(s).to.equal(true);
    });

      it('checking the temp value 10 for lucknow', async () => {
        const s = await userCtrl.sendNotificationToUsers('India','lucknow',10);
        expect(s).to.equal(true);
    });
});