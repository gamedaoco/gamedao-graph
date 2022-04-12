import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Body} from "./body.model"
import {Campaign} from "./campaign.model"
import {Identity} from "./identity.model"
import {ProposalTypeData, fromJsonProposalTypeData} from "./_proposalTypeData"
import {ProposalState} from "./_proposalState"
import {ProposalVoter} from "./proposalVoter.model"

@Entity_()
export class Proposal {
  constructor(props?: Partial<Proposal>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Body, {nullable: false})
  body!: Body

  @Index_()
  @ManyToOne_(() => Campaign, {nullable: true})
  campaign!: Campaign | undefined | null

  @Column_("text", {nullable: false})
  creator!: string

  @Index_()
  @ManyToOne_(() => Identity, {nullable: false})
  creatorIdentity!: Identity

  @Column_("text", {nullable: false})
  cid!: string

  @Column_("integer", {nullable: false})
  type!: number

  @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => fromJsonProposalTypeData(obj)}, nullable: false})
  data!: ProposalTypeData

  @Column_("varchar", {length: 8, nullable: false})
  state!: ProposalState

  @Column_("integer", {nullable: false})
  votingType!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  approvers!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  deniers!: bigint

  @OneToMany_(() => ProposalVoter, e => e.proposal)
  voters!: ProposalVoter[]

  @Column_("integer", {nullable: false})
  expiryBlock!: number
}
