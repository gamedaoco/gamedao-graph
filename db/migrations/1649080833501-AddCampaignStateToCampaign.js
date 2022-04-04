module.exports = class AddCampaignStateToCampaign1649080833501 {
  name = 'AddCampaignStateToCampaign1649080833501'

  async up(db) {
    await db.query(`ALTER TABLE "campaign" ADD "is_finished" boolean NOT NULL`)
    await db.query(`ALTER TABLE "campaign" ADD "is_funded" boolean NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "campaign" DROP COLUMN "is_finished"`)
    await db.query(`ALTER TABLE "campaign" DROP COLUMN "is_funded"`)
  }
}
