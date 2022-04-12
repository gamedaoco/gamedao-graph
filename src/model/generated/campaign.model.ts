import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Body} from "./body.model"
import {Identity} from "./identity.model"
import {CampaignState} from "./_campaignState"
import {CampaignMetadata} from "./campaignMetadata.model"
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

  @Index_()
  @ManyToOne_(() => Identity, {nullable: false})
  creatorIdentity!: Identity

  @Column_("text", {nullable: false})
  admin!: string

  @Index_()
  @ManyToOne_(() => Identity, {nullable: false})
  adminIdentity!: Identity

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

  @Column_("varchar", {length: 7, nullable: false})
  state!: CampaignState

  @Index_()
  @ManyToOne_(() => CampaignMetadata, {nullable: false})
  metadata!: CampaignMetadata

  @OneToMany_(() => CampaignContributor, e => e.campaign)
  contributors!: CampaignContributor[]
}
