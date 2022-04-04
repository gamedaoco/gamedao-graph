module.exports = class AddCampaignMetadata1649113138358 {
  name = 'AddCampaignMetadata1649113138358'

  async up(db) {
    await db.query(`CREATE TABLE "campaign_metadata" ("id" character varying NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "markdown" text NOT NULL, "logo" text NOT NULL, "header" text NOT NULL, CONSTRAINT "PK_78e8f198409b4db925b1a44d092" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "campaign" ADD "metadata_id" character varying NOT NULL`)
    await db.query(`CREATE INDEX "IDX_78e8f198409b4db925b1a44d09" ON "campaign" ("metadata_id") `)
    await db.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_78e8f198409b4db925b1a44d092" FOREIGN KEY ("metadata_id") REFERENCES "campaign_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "campaign_metadata"`)
    await db.query(`ALTER TABLE "campaign" DROP COLUMN "metadata_id"`)
    await db.query(`DROP INDEX "public"."IDX_78e8f198409b4db925b1a44d09"`)
    await db.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_78e8f198409b4db925b1a44d092"`)
  }
}
