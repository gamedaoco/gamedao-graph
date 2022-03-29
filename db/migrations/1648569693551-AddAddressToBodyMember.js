module.exports = class AddAddressToBodyMember1648569693551 {
	name = 'AddAddressToBodyMember1648569693551';

	async up(db) {
		await db.query(`ALTER TABLE "body_member" ADD "address" text NOT NULL`);
		await db.query(`ALTER TABLE "body_member" DROP CONSTRAINT "FK_01be66fd9155e5db5102e38055b"`);
		await db.query(`DROP INDEX "public"."IDX_01be66fd9155e5db5102e38055"`);
		await db.query(`ALTER TABLE "body_member" DROP COLUMN "identity_id"`);
		await db.query(`ALTER TABLE "body_member" ADD "identity_id" character varying NOT NULL`);
		await db.query(`CREATE INDEX "IDX_01be66fd9155e5db5102e38055" ON "body_member" ("identity_id") `);
		await db.query(
			`ALTER TABLE "body_member" ADD CONSTRAINT "FK_01be66fd9155e5db5102e38055b" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	async down(db) {
		await db.query(`ALTER TABLE "body_member" DROP COLUMN "address"`);
		await db.query(
			`ALTER TABLE "body_member" ADD CONSTRAINT "FK_01be66fd9155e5db5102e38055b" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await db.query(`CREATE INDEX "IDX_01be66fd9155e5db5102e38055" ON "body_member" ("identity_id") `);
		await db.query(`ALTER TABLE "body_member" ADD "identity_id" text NOT NULL`);
		await db.query(`ALTER TABLE "body_member" DROP COLUMN "identity_id"`);
		await db.query(`DROP INDEX "public"."IDX_01be66fd9155e5db5102e38055"`);
		await db.query(`ALTER TABLE "body_member" DROP CONSTRAINT "FK_01be66fd9155e5db5102e38055b"`);
	}
};
