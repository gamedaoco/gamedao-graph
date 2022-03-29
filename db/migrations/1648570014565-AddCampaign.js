module.exports = class AddCampaign1648570014565 {
	name = 'AddCampaign1648570014565';

	async up(db) {
		await db.query(
			`CREATE TABLE "campaign" ("id" character varying NOT NULL, "admin" text NOT NULL, "creator" text NOT NULL, "target" numeric NOT NULL, "deposit" numeric NOT NULL, "expiry" integer NOT NULL, "protocol" integer NOT NULL, "governance" integer NOT NULL, "cid" text NOT NULL, "token_symbol" text NOT NULL, "token_name" text NOT NULL, "body_id" character varying NOT NULL, CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id"))`,
		);
		await db.query(`CREATE INDEX "IDX_9042024b37dbc2a3069e856c7d" ON "campaign" ("body_id") `);
		await db.query(
			`ALTER TABLE "campaign" ADD CONSTRAINT "FK_9042024b37dbc2a3069e856c7dd" FOREIGN KEY ("body_id") REFERENCES "body"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	async down(db) {
		await db.query(`DROP TABLE "campaign"`);
		await db.query(`DROP INDEX "public"."IDX_9042024b37dbc2a3069e856c7d"`);
		await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_9042024b37dbc2a3069e856c7dd"`);
	}
};
