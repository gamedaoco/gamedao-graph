module.exports = class AddOrganizationMember1652183844914 {
  name = 'AddOrganizationMember1652183844914'

  async up(db) {
    await db.query(`CREATE TABLE "organization_member" ("id" character varying NOT NULL, "address" text NOT NULL, "organization_id" character varying NOT NULL, "identity_id" character varying NOT NULL, CONSTRAINT "PK_81dbbb093cbe0539c170f3d1484" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_ce08825728e5afefdc6e682b8d" ON "organization_member" ("organization_id") `)
    await db.query(`CREATE INDEX "IDX_1474bfd9a3cd49bb05356c7401" ON "organization_member" ("identity_id") `)
    await db.query(`ALTER TABLE "organization_member" ADD CONSTRAINT "FK_ce08825728e5afefdc6e682b8d7" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "organization_member" ADD CONSTRAINT "FK_1474bfd9a3cd49bb05356c74014" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "organization_member"`)
    await db.query(`DROP INDEX "public"."IDX_ce08825728e5afefdc6e682b8d"`)
    await db.query(`DROP INDEX "public"."IDX_1474bfd9a3cd49bb05356c7401"`)
    await db.query(`ALTER TABLE "organization_member" DROP CONSTRAINT "FK_ce08825728e5afefdc6e682b8d7"`)
    await db.query(`ALTER TABLE "organization_member" DROP CONSTRAINT "FK_1474bfd9a3cd49bb05356c74014"`)
  }
}
