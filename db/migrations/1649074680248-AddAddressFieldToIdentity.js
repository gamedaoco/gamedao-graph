module.exports = class AddAddressFieldToIdentity1649074680248 {
	name = 'AddAddressFieldToIdentity1649074680248';

	async up(db) {
		await db.query(`ALTER TABLE "identity" ADD "address" text NOT NULL`);
	}

	async down(db) {
		await db.query(`ALTER TABLE "identity" DROP COLUMN "address"`);
	}
};
