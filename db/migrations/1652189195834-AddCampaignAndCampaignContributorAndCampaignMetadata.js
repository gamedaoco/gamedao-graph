module.exports = class AddCampaignAndCampaignContributorAndCampaignMetadata1652189195834 {
  name = 'AddCampaignAndCampaignContributorAndCampaignMetadata1652189195834'

  async up(db) {
    await db.query(`CREATE TABLE "campaign_metadata" ("id" character varying NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "markdown" text NOT NULL, "logo" text NOT NULL, "header" text NOT NULL, CONSTRAINT "PK_78e8f198409b4db925b1a44d092" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "campaign_contributor" ("id" character varying NOT NULL, "address" text NOT NULL, "contributed" numeric NOT NULL, "campaign_id" character varying NOT NULL, "identity_id" character varying NOT NULL, CONSTRAINT "PK_0a35c586180eb88ed47f33d0914" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_d0c2e621402f267f3358d42614" ON "campaign_contributor" ("campaign_id") `)
    await db.query(`CREATE INDEX "IDX_8bad89c14288e0fc1a47842a62" ON "campaign_contributor" ("identity_id") `)
    await db.query(`CREATE TABLE "campaign" ("id" character varying NOT NULL, "creator" text NOT NULL, "admin" text NOT NULL, "target" numeric NOT NULL, "deposit" numeric NOT NULL, "expiry" integer NOT NULL, "protocol" text NOT NULL, "governance" text NOT NULL, "cid" text NOT NULL, "token_symbol" text NOT NULL, "token_name" text NOT NULL, "state" text NOT NULL, "created_at_block" integer NOT NULL, "organization_id" character varying NOT NULL, "creator_identity_id" character varying NOT NULL, "admin_identity_id" character varying NOT NULL, "metadata_id" character varying NOT NULL, CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_8e2fbfe1fc6dc632c4631a1224" ON "campaign" ("organization_id") `)
    await db.query(`CREATE INDEX "IDX_eea7cf3a0035b94ec26796ec93" ON "campaign" ("creator_identity_id") `)
    await db.query(`CREATE INDEX "IDX_e55315144bff83e38b8b1c4308" ON "campaign" ("admin_identity_id") `)
    await db.query(`CREATE INDEX "IDX_78e8f198409b4db925b1a44d09" ON "campaign" ("metadata_id") `)
    await db.query(`ALTER TABLE "campaign_contributor" ADD CONSTRAINT "FK_d0c2e621402f267f3358d426149" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "campaign_contributor" ADD CONSTRAINT "FK_8bad89c14288e0fc1a47842a626" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_8e2fbfe1fc6dc632c4631a1224b" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_eea7cf3a0035b94ec26796ec933" FOREIGN KEY ("creator_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_e55315144bff83e38b8b1c43086" FOREIGN KEY ("admin_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_78e8f198409b4db925b1a44d092" FOREIGN KEY ("metadata_id") REFERENCES "campaign_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "campaign_metadata"`)
    await db.query(`DROP TABLE "campaign_contributor"`)
    await db.query(`DROP INDEX "public"."IDX_d0c2e621402f267f3358d42614"`)
    await db.query(`DROP INDEX "public"."IDX_8bad89c14288e0fc1a47842a62"`)
    await db.query(`DROP TABLE "campaign"`)
    await db.query(`DROP INDEX "public"."IDX_8e2fbfe1fc6dc632c4631a1224"`)
    await db.query(`DROP INDEX "public"."IDX_eea7cf3a0035b94ec26796ec93"`)
    await db.query(`DROP INDEX "public"."IDX_e55315144bff83e38b8b1c4308"`)
    await db.query(`DROP INDEX "public"."IDX_78e8f198409b4db925b1a44d09"`)
    await db.query(`ALTER TABLE "campaign_contributor" DROP CONSTRAINT "FK_d0c2e621402f267f3358d426149"`)
    await db.query(`ALTER TABLE "campaign_contributor" DROP CONSTRAINT "FK_8bad89c14288e0fc1a47842a626"`)
    await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_8e2fbfe1fc6dc632c4631a1224b"`)
    await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_eea7cf3a0035b94ec26796ec933"`)
    await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_e55315144bff83e38b8b1c43086"`)
    await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_78e8f198409b4db925b1a44d092"`)
  }
}
