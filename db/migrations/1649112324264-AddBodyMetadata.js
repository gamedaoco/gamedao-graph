module.exports = class AddBodyMetadata1649112324264 {
  name = 'AddBodyMetadata1649112324264'

  async up(db) {
    await db.query(`CREATE TABLE "body_metadata" ("id" character varying NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "website" text, "email" text, "repo" text, "logo" text, "header" text, CONSTRAINT "PK_5105292531c32aab14a33a02c4b" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "body" ADD "metadata_id" character varying NOT NULL`)
    await db.query(`CREATE INDEX "IDX_5105292531c32aab14a33a02c4" ON "body" ("metadata_id") `)
    await db.query(`ALTER TABLE "body" ADD CONSTRAINT "FK_5105292531c32aab14a33a02c4b" FOREIGN KEY ("metadata_id") REFERENCES "body_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "body_metadata"`)
    await db.query(`ALTER TABLE "body" DROP COLUMN "metadata_id"`)
    await db.query(`DROP INDEX "public"."IDX_5105292531c32aab14a33a02c4"`)
    await db.query(`ALTER TABLE "body" DROP CONSTRAINT "FK_5105292531c32aab14a33a02c4b"`)
  }
}
