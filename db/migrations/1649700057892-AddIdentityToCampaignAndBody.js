module.exports = class AddIdentityToCampaignAndBody1649700057892 {
	name = 'AddIdentityToCampaignAndBody1649700057892';

	async up(db) {
		await db.query(`ALTER TABLE "campaign" ADD "creator_identity_id" character varying NOT NULL`);
		await db.query(`ALTER TABLE "body" ADD "creator_identity_id" character varying NOT NULL`);
		await db.query(`CREATE INDEX "IDX_eea7cf3a0035b94ec26796ec93" ON "campaign" ("creator_identity_id") `);
		await db.query(`CREATE INDEX "IDX_69917c1676ddcea22fd180bd7c" ON "body" ("creator_identity_id") `);
		await db.query(
			`ALTER TABLE "campaign" ADD CONSTRAINT "FK_eea7cf3a0035b94ec26796ec933" FOREIGN KEY ("creator_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await db.query(
			`ALTER TABLE "body" ADD CONSTRAINT "FK_69917c1676ddcea22fd180bd7c7" FOREIGN KEY ("creator_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);

		await db.query(`ALTER TABLE "campaign" ADD "admin_identity_id" character varying NOT NULL`);
		await db.query(`ALTER TABLE "body" ADD "controller_identity_id" character varying NOT NULL`);
		await db.query(`ALTER TABLE "body" ADD "treasury_identity_id" character varying NOT NULL`);
		await db.query(`CREATE INDEX "IDX_e55315144bff83e38b8b1c4308" ON "campaign" ("admin_identity_id") `);
		await db.query(`CREATE INDEX "IDX_97edfdb9f65c259814d891face" ON "body" ("controller_identity_id") `);
		await db.query(`CREATE INDEX "IDX_a60a6873064f6315667b8e3650" ON "body" ("treasury_identity_id") `);
		await db.query(
			`ALTER TABLE "campaign" ADD CONSTRAINT "FK_e55315144bff83e38b8b1c43086" FOREIGN KEY ("admin_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await db.query(
			`ALTER TABLE "body" ADD CONSTRAINT "FK_97edfdb9f65c259814d891face7" FOREIGN KEY ("controller_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await db.query(
			`ALTER TABLE "body" ADD CONSTRAINT "FK_a60a6873064f6315667b8e3650d" FOREIGN KEY ("treasury_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	async down(db) {
		await db.query(`ALTER TABLE "campaign" DROP COLUMN "admin_identity_id"`);
		await db.query(`ALTER TABLE "body" DROP COLUMN "controller_identity_id"`);
		await db.query(`ALTER TABLE "body" DROP COLUMN "treasury_identity_id"`);
		await db.query(`DROP INDEX "public"."IDX_e55315144bff83e38b8b1c4308"`);
		await db.query(`DROP INDEX "public"."IDX_97edfdb9f65c259814d891face"`);
		await db.query(`DROP INDEX "public"."IDX_a60a6873064f6315667b8e3650"`);
		await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_e55315144bff83e38b8b1c43086"`);
		await db.query(`ALTER TABLE "body" DROP CONSTRAINT "FK_97edfdb9f65c259814d891face7"`);
		await db.query(`ALTER TABLE "body" DROP CONSTRAINT "FK_a60a6873064f6315667b8e3650d"`);

		await db.query(`ALTER TABLE "campaign" DROP COLUMN "creator_identity_id"`);
		await db.query(`ALTER TABLE "body" DROP COLUMN "creator_identity_id"`);
		await db.query(`DROP INDEX "public"."IDX_eea7cf3a0035b94ec26796ec93"`);
		await db.query(`DROP INDEX "public"."IDX_69917c1676ddcea22fd180bd7c"`);
		await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_eea7cf3a0035b94ec26796ec933"`);
		await db.query(`ALTER TABLE "body" DROP CONSTRAINT "FK_69917c1676ddcea22fd180bd7c7"`);
	}
};
