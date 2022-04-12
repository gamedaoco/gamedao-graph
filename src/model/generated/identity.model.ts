import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Body} from "./body.model"
import {BodyMember} from "./bodyMember.model"
import {Campaign} from "./campaign.model"
import {CampaignContributor} from "./campaignContributor.model"
import {Proposal} from "./proposal.model"
import {ProposalVoter} from "./proposalVoter.model"

@Entity_()
export class Identity {
  constructor(props?: Partial<Identity>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  address!: string

  @Column_("text", {nullable: true})
  displayName!: string | undefined | null

  @Column_("text", {nullable: true})
  legalName!: string | undefined | null

  @Column_("text", {nullable: true})
  email!: string | undefined | null

  @Column_("text", {nullable: true})
  riot!: string | undefined | null

  @Column_("text", {nullable: true})
  image!: string | undefined | null

  @Column_("text", {nullable: true})
  twitter!: string | undefined | null

  @OneToMany_(() => Body, e => e.creatorIdentity)
  createdBodies!: Body[]

  @OneToMany_(() => Body, e => e.controllerIdentity)
  controllerBodies!: Body[]

  @OneToMany_(() => BodyMember, e => e.identity)
  bodyMembers!: BodyMember[]

  @OneToMany_(() => Campaign, e => e.creatorIdentity)
  createdCampaigns!: Campaign[]

  @OneToMany_(() => CampaignContributor, e => e.identity)
  campaignContributors!: CampaignContributor[]

  @OneToMany_(() => Proposal, e => e.creatorIdentity)
  createdProposals!: Proposal[]

  @OneToMany_(() => ProposalVoter, e => e.identity)
  proposalVoters!: ProposalVoter[]
}
