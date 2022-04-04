module.exports = class AddCampaignContributor1649074649690 {
	name = 'AddCampaignContributor1649074649690';

	async up(db) {
		await db.query(
			`CREATE TABLE "campaign_contributor" ("id" character varying NOT NULL, "address" text NOT NULL, "campaign_id" character varying NOT NULL, "identity_id" character varying NOT NULL, "contributed" numeric NOT NULL, CONSTRAINT "PK_0a35c586180eb88ed47f33d0914" PRIMARY KEY ("id"))`,
		);
		await db.query(`CREATE INDEX "IDX_d0c2e621402f267f3358d42614" ON "campaign_contributor" ("campaign_id") `);
		await db.query(`CREATE INDEX "IDX_8bad89c14288e0fc1a47842a62" ON "campaign_contributor" ("identity_id") `);
		await db.query(
			`ALTER TABLE "campaign_contributor" ADD CONSTRAINT "FK_d0c2e621402f267f3358d426149" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await db.query(
			`ALTER TABLE "campaign_contributor" ADD CONSTRAINT "FK_8bad89c14288e0fc1a47842a626" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	async down(db) {
		await db.query(`DROP TABLE "campaign_contributor"`);
		await db.query(`DROP INDEX "public"."IDX_d0c2e621402f267f3358d42614"`);
		await db.query(`DROP INDEX "public"."IDX_8bad89c14288e0fc1a47842a62"`);
		await db.query(`ALTER TABLE "campaign_contributor" DROP CONSTRAINT "FK_d0c2e621402f267f3358d426149"`);
		await db.query(`ALTER TABLE "campaign_contributor" DROP CONSTRAINT "FK_8bad89c14288e0fc1a47842a626"`);
	}
};
