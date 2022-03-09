module.exports = class Init1646484081007 {
  name = 'Init1646484081007'

  async up(db) {
    await db.query(`CREATE TABLE "body" ("id" character varying NOT NULL, "creator" text NOT NULL, "controller" text NOT NULL, "treasury" text NOT NULL, "name" text NOT NULL, "cid" text NOT NULL, "body" integer NOT NULL, "access" integer NOT NULL, "fee_model" integer NOT NULL, "fee" numeric NOT NULL, "gov_asset" integer NOT NULL, "pay_asset" integer NOT NULL, "member_limit" numeric NOT NULL, CONSTRAINT "PK_fcdfba471eb9ce3c1add2c1e83d" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "body"`)
  }
}
