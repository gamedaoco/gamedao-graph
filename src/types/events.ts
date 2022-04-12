import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'

export class GameDaoControlAddMemberEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoControl.AddMember')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoControl.AddMember') === '169fee807ab538ee50819e26adf2cb30f830741581d4e335de646c4efecc2c1f'
  }

  get asV21(): [Uint8Array, Uint8Array, number] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, Uint8Array, number] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoControlBodyCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoControl.BodyCreated')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoControl.BodyCreated') === '746b695f5b4929306d724f48cca50c622c5ec7e920b86e4ecf43649c777cc930'
  }

  get asV21(): [Uint8Array, Uint8Array, number, bigint] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, Uint8Array, number, bigint] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoControlRemoveMemberEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoControl.RemoveMember')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoControl.RemoveMember') === '679ae98b9933570991807d247a37341d1d8dbee84a35a19e00931fc4d37d0f1d'
  }

  get asV21(): [Uint8Array, Uint8Array, number] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, Uint8Array, number] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoCrowdfundingCampaignContributedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoCrowdfunding.CampaignContributed')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoCrowdfunding.CampaignContributed') === '9b10be041d2cd8d94f44d5fa84145f0876b2250cfd95b4e519dc0820392f9624'
  }

  get asV21(): [Uint8Array, Uint8Array, bigint, number] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, Uint8Array, bigint, number] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoCrowdfundingCampaignCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoCrowdfunding.CampaignCreated')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoCrowdfunding.CampaignCreated') === '4538582dac687c57e0e73c4503493827c4beeb76b633f46d78f88a7096de0e79'
  }

  get asV21(): [Uint8Array, Uint8Array, Uint8Array, bigint, bigint, number, Uint8Array] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, Uint8Array, Uint8Array, bigint, bigint, number, Uint8Array] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoCrowdfundingCampaignFailedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoCrowdfunding.CampaignFailed')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoCrowdfunding.CampaignFailed') === '5771dc790d21a60eada1fed9fe01e3921899804c33051fa0b079b7dffee8f2d2'
  }

  get asV21(): [Uint8Array, bigint, number, boolean] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, bigint, number, boolean] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoCrowdfundingCampaignFinalizedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoCrowdfunding.CampaignFinalized')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoCrowdfunding.CampaignFinalized') === 'fc7b7ab985e3c18f5998cfa1ace7c5892eddee0284f6b9f63a5b5551bac3047e'
  }

  get asV21(): [Uint8Array, bigint, number, boolean] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, bigint, number, boolean] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoGovernanceProposalEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoGovernance.Proposal')
  }

  get isV22(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.Proposal') === '3c5af36af321b1be921a121b3a018ee7e42e82e1ed09d167b4d7f8eedeea0001'
  }

  get asV22(): [Uint8Array, Uint8Array] {
    assert(this.isV22)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV22
  }

  get asLatest(): [Uint8Array, Uint8Array] {
    deprecateLatest()
    return this.asV22
  }
}

export class GameDaoGovernanceProposalApprovedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoGovernance.ProposalApproved')
  }

  get isV27(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.ProposalApproved') === 'e9338f87ed51bf57220fcbf4d1e9e8f8f4fa3169661a81ac8c3777807b20aff4'
  }

  get asV27(): Uint8Array {
    assert(this.isV27)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV27
  }

  get asLatest(): Uint8Array {
    deprecateLatest()
    return this.asV27
  }
}

export class GameDaoGovernanceProposalCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoGovernance.ProposalCreated')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.ProposalCreated') === '9f0126fc76692639b46d743488b2bbb281d2c637911475818d1554824fa3fdf9'
  }

  get asV21(): [Uint8Array, Uint8Array, Uint8Array, bigint, number] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): [Uint8Array, Uint8Array, Uint8Array, bigint, number] {
    deprecateLatest()
    return this.asV21
  }
}

export class GameDaoGovernanceProposalExpiredEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoGovernance.ProposalExpired')
  }

  get isV33(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.ProposalExpired') === '92894a2f2f2ff7c12b13e204a2740a39e067ba8e710faf8a70a57c40706f85c3'
  }

  get asV33(): Uint8Array {
    assert(this.isV33)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV33
  }

  get asLatest(): Uint8Array {
    deprecateLatest()
    return this.asV33
  }
}

export class GameDaoGovernanceProposalRejectedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoGovernance.ProposalRejected')
  }

  get isV27(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.ProposalRejected') === '4bd8f920581a99859e61d406bc5ca8526fb47526023bd489066b10fd1d2306f1'
  }

  get asV27(): Uint8Array {
    assert(this.isV27)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV27
  }

  get asLatest(): Uint8Array {
    deprecateLatest()
    return this.asV27
  }
}

export class GameDaoGovernanceProposalVotedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'gameDaoGovernance.ProposalVoted')
  }

  get isV21(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.ProposalVoted') === '0c437d891eca48d271c84d41ffa9333bfe9a27feb59e587069ef1a2a310f4bd8'
  }

  get asV21(): [Uint8Array, Uint8Array] {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV24(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.ProposalVoted') === '51c478dbb5b4ed01d4cf3cc7baffda188c0e6dafe0a9491c8c57fc224b9b5140'
  }

  get asV24(): [Uint8Array, Uint8Array, number] {
    assert(this.isV24)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV40(): boolean {
    return this.ctx._chain.getEventHash('gameDaoGovernance.ProposalVoted') === '9a85d65e760f413a1b7e959402bf70f62563ba03a08d830ded6d26cacf295d68'
  }

  get asV40(): [Uint8Array, Uint8Array, boolean] {
    assert(this.isV40)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV40
  }

  get asLatest(): [Uint8Array, Uint8Array, boolean] {
    deprecateLatest()
    return this.asV40
  }
}

export class IdentityIdentitySetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'identity.IdentitySet')
  }

  /**
   *  A name was set or reset (which will remove all judgements). \[who\]
   */
  get isV21(): boolean {
    return this.ctx._chain.getEventHash('identity.IdentitySet') === 'd70547d4cddb239c63f8cdb2be0c0ec99092ba078e3e4ec0fc4eeb842d7e43f4'
  }

  /**
   *  A name was set or reset (which will remove all judgements). \[who\]
   */
  get asV21(): Uint8Array {
    assert(this.isV21)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): Uint8Array {
    deprecateLatest()
    return this.asV21
  }
}
