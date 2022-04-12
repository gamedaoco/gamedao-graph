module.exports = class AddProposalVoter1649764502571 {
  name = 'AddProposalVoter1649764502571'

  async up(db) {
    await db.query(`CREATE TABLE "proposal_voter" ("id" character varying NOT NULL, "address" text NOT NULL, "voted" numeric NOT NULL, "proposal_id" character varying NOT NULL, "identity_id" character varying NOT NULL, CONSTRAINT "PK_c5f3dc257803abae426e96df398" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_60af3256f3c02399e31830c6e1" ON "proposal_voter" ("proposal_id") `)
    await db.query(`CREATE INDEX "IDX_996f3867ec20cf438eef4d2218" ON "proposal_voter" ("identity_id") `)
    await db.query(`ALTER TABLE "proposal_voter" ADD CONSTRAINT "FK_60af3256f3c02399e31830c6e16" FOREIGN KEY ("proposal_id") REFERENCES "proposal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "proposal_voter" ADD CONSTRAINT "FK_996f3867ec20cf438eef4d22180" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "proposal_voter"`)
    await db.query(`DROP INDEX "public"."IDX_60af3256f3c02399e31830c6e1"`)
    await db.query(`DROP INDEX "public"."IDX_996f3867ec20cf438eef4d2218"`)
    await db.query(`ALTER TABLE "proposal_voter" DROP CONSTRAINT "FK_60af3256f3c02399e31830c6e16"`)
    await db.query(`ALTER TABLE "proposal_voter" DROP CONSTRAINT "FK_996f3867ec20cf438eef4d22180"`)
  }
}
