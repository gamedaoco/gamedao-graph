module.exports = class AddIdentity1648471116533 {
  name = 'AddIdentity1648471116533'

  async up(db) {
    await db.query(`ALTER TABLE "body_member" RENAME COLUMN "address" TO "identity_id"`)
    await db.query(`CREATE TABLE "identity" ("id" character varying NOT NULL, "display_name" text, "legal_name" text, "email" text, "riot" text, "image" text, "twitter" text, CONSTRAINT "PK_ff16a44186b286d5e626178f726" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_01be66fd9155e5db5102e38055" ON "body_member" ("identity_id") `)
    await db.query(`ALTER TABLE "body_member" ADD CONSTRAINT "FK_01be66fd9155e5db5102e38055b" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "body_member" RENAME COLUMN "identity_id" TO "address"`)
    await db.query(`DROP TABLE "identity"`)
    await db.query(`DROP INDEX "public"."IDX_01be66fd9155e5db5102e38055"`)
    await db.query(`ALTER TABLE "body_member" DROP CONSTRAINT "FK_01be66fd9155e5db5102e38055b"`)
  }
}
