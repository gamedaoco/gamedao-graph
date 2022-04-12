module.exports = class AddProposalMetadata1649766766155 {
  name = 'AddProposalMetadata1649766766155'

  async up(db) {
    await db.query(`CREATE TABLE "proposal_metadata" ("id" character varying NOT NULL, "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_7d1bbb4c8b93797430bc3bcd454" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "proposal" ADD "metadata_id" character varying NOT NULL`)
    await db.query(`CREATE INDEX "IDX_7d1bbb4c8b93797430bc3bcd45" ON "proposal" ("metadata_id") `)
    await db.query(`ALTER TABLE "proposal" ADD CONSTRAINT "FK_7d1bbb4c8b93797430bc3bcd454" FOREIGN KEY ("metadata_id") REFERENCES "proposal_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "proposal_metadata"`)
    await db.query(`ALTER TABLE "proposal" DROP COLUMN "metadata_id"`)
    await db.query(`DROP INDEX "public"."IDX_7d1bbb4c8b93797430bc3bcd45"`)
    await db.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_7d1bbb4c8b93797430bc3bcd454"`)
  }
}
