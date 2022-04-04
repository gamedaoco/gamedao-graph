import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Body} from "./body.model"
import {CampaignContributor} from "./campaignContributor.model"

@Entity_()
export class Campaign {
  constructor(props?: Partial<Campaign>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Body, {nullable: false})
  body!: Body

  @Column_("text", {nullable: false})
  creator!: string

  @Column_("text", {nullable: false})
  admin!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  target!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  deposit!: bigint

  @Column_("integer", {nullable: false})
  expiry!: number

  @Column_("integer", {nullable: false})
  protocol!: number

  @Column_("integer", {nullable: false})
  governance!: number

  @Column_("text", {nullable: false})
  cid!: string

  @Column_("text", {nullable: false})
  tokenSymbol!: string

  @Column_("text", {nullable: false})
  tokenName!: string

  @OneToMany_(() => CampaignContributor, e => e.campaign)
  contributors!: CampaignContributor[]
}
