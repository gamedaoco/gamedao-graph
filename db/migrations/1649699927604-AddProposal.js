module.exports = class AddProposal1649699927604 {
	name = 'AddProposal1649699927604';

	async up(db) {
		await db.query(
			`CREATE TABLE "proposal" ("id" character varying NOT NULL, "creator" text NOT NULL, "cid" text NOT NULL, "type" integer NOT NULL, "data" jsonb NOT NULL, "voting_type" integer NOT NULL, "approvers" numeric NOT NULL, "deniers" numeric NOT NULL, "expiry_block" integer NOT NULL, "body_id" character varying NOT NULL, "campaign_id" character varying, "creator_identity_id" character varying NOT NULL, CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275" PRIMARY KEY ("id"))`,
		);
		await db.query(`CREATE INDEX "IDX_9e921fcabebd9c0144223cdb4a" ON "proposal" ("body_id") `);
		await db.query(`CREATE INDEX "IDX_41bb268e1b6467aa9f9b5d2f53" ON "proposal" ("campaign_id") `);
		await db.query(`CREATE INDEX "IDX_23444b29668223511c32978852" ON "proposal" ("creator_identity_id") `);
		await db.query(
			`ALTER TABLE "proposal" ADD CONSTRAINT "FK_9e921fcabebd9c0144223cdb4a7" FOREIGN KEY ("body_id") REFERENCES "body"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await db.query(
			`ALTER TABLE "proposal" ADD CONSTRAINT "FK_41bb268e1b6467aa9f9b5d2f535" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await db.query(
			`ALTER TABLE "proposal" ADD CONSTRAINT "FK_23444b29668223511c329788525" FOREIGN KEY ("creator_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	async down(db) {
		await db.query(`DROP TABLE "proposal"`);
		await db.query(`DROP INDEX "public"."IDX_9e921fcabebd9c0144223cdb4a"`);
		await db.query(`DROP INDEX "public"."IDX_41bb268e1b6467aa9f9b5d2f53"`);
		await db.query(`DROP INDEX "public"."IDX_23444b29668223511c32978852"`);
		await db.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_9e921fcabebd9c0144223cdb4a7"`);
		await db.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_41bb268e1b6467aa9f9b5d2f535"`);
		await db.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_23444b29668223511c329788525"`);
	}
};
