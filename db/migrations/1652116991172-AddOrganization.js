module.exports = class AddOrganization1652116991172 {
  name = 'AddOrganization1652116991172'

  async up(db) {
    await db.query(`CREATE TABLE "organization_metadata" ("id" character varying NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "website" text NOT NULL, "email" text NOT NULL, "repo" text NOT NULL, "logo" text NOT NULL, CONSTRAINT "PK_2fecc2ceb81f30a7f46be802cbd" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "organization" ("id" character varying NOT NULL, "creator" text NOT NULL, "controller" text NOT NULL, "treasury" text NOT NULL, "cid" text NOT NULL, "access" text NOT NULL, "fee_model" text NOT NULL, "type" text NOT NULL, "fee" numeric NOT NULL, "gov_asset" integer NOT NULL, "pay_asset" integer NOT NULL, "member_limit" numeric NOT NULL, "created_at_block" integer NOT NULL, "creator_identity_id" character varying NOT NULL, "controller_identity_id" character varying NOT NULL, "treasury_identity_id" character varying NOT NULL, "metadata_id" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_cbf839fae85cd42883a525ac24" ON "organization" ("creator_identity_id") `)
    await db.query(`CREATE INDEX "IDX_dc4123dd3f59ccff2d7ab7294e" ON "organization" ("controller_identity_id") `)
    await db.query(`CREATE INDEX "IDX_5f2442a79f529d80abe10ad509" ON "organization" ("treasury_identity_id") `)
    await db.query(`CREATE INDEX "IDX_2fecc2ceb81f30a7f46be802cb" ON "organization" ("metadata_id") `)
    await db.query(`CREATE TABLE "identity" ("id" character varying NOT NULL, "address" text NOT NULL, "display_name" text, "legal_name" text, "email" text, "riot" text, "image" text, "twitter" text, CONSTRAINT "PK_ff16a44186b286d5e626178f726" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_cbf839fae85cd42883a525ac24b" FOREIGN KEY ("creator_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_dc4123dd3f59ccff2d7ab7294e6" FOREIGN KEY ("controller_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_5f2442a79f529d80abe10ad509b" FOREIGN KEY ("treasury_identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_2fecc2ceb81f30a7f46be802cbd" FOREIGN KEY ("metadata_id") REFERENCES "organization_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "organization_metadata"`)
    await db.query(`DROP TABLE "organization"`)
    await db.query(`DROP INDEX "public"."IDX_cbf839fae85cd42883a525ac24"`)
    await db.query(`DROP INDEX "public"."IDX_dc4123dd3f59ccff2d7ab7294e"`)
    await db.query(`DROP INDEX "public"."IDX_5f2442a79f529d80abe10ad509"`)
    await db.query(`DROP INDEX "public"."IDX_2fecc2ceb81f30a7f46be802cb"`)
    await db.query(`DROP TABLE "identity"`)
    await db.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_cbf839fae85cd42883a525ac24b"`)
    await db.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_dc4123dd3f59ccff2d7ab7294e6"`)
    await db.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_5f2442a79f529d80abe10ad509b"`)
    await db.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_2fecc2ceb81f30a7f46be802cbd"`)
  }
}
