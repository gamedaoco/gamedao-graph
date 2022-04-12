module.exports = class AddStateToProposalAndCampaign1649760319623 {
  name = 'AddStateToProposalAndCampaign1649760319623'

  async up(db) {
    await db.query(`ALTER TABLE "campaign" DROP COLUMN "is_finished"`)
    await db.query(`ALTER TABLE "campaign" DROP COLUMN "is_funded"`)
    await db.query(`ALTER TABLE "campaign" ADD "state" character varying(7) NOT NULL`)
    await db.query(`ALTER TABLE "proposal" ADD "state" character varying(8) NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "campaign" ADD "is_finished" boolean NOT NULL`)
    await db.query(`ALTER TABLE "campaign" ADD "is_funded" boolean NOT NULL`)
    await db.query(`ALTER TABLE "campaign" DROP COLUMN "state"`)
    await db.query(`ALTER TABLE "proposal" DROP COLUMN "state"`)
  }
}
