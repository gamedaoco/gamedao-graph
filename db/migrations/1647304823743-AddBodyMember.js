module.exports = class AddBodyMember1647304823743 {
  name = 'AddBodyMember1647304823743'

  async up(db) {
    await db.query(`CREATE TABLE "body_member" ("id" character varying NOT NULL, "address" text NOT NULL, "body_id" character varying NOT NULL, CONSTRAINT "PK_1becd1ee6b5081f926aa30d9116" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_b10aadb4a0739ba571b31b9faf" ON "body_member" ("body_id") `)
    await db.query(`ALTER TABLE "body_member" ADD CONSTRAINT "FK_b10aadb4a0739ba571b31b9fafa" FOREIGN KEY ("body_id") REFERENCES "body"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "body_member"`)
    await db.query(`DROP INDEX "public"."IDX_b10aadb4a0739ba571b31b9faf"`)
    await db.query(`ALTER TABLE "body_member" DROP CONSTRAINT "FK_b10aadb4a0739ba571b31b9fafa"`)
  }
}
