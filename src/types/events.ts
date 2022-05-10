import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v51 from './v51'

export class ControlAddMemberEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'control.AddMember')
  }

  get isV51(): boolean {
    return this.ctx._chain.getEventHash('control.AddMember') === '1612429c53391716db913b270a71e38a6ffb82fdcf636676c05f981b186dc93d'
  }

  get asV51(): {orgId: v51.H256, accountId: v51.AccountId32, addedAt: number} {
    assert(this.isV51)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV51
  }

  get asLatest(): {orgId: v51.H256, accountId: v51.AccountId32, addedAt: number} {
    deprecateLatest()
    return this.asV51
  }
}

export class ControlOrgCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'control.OrgCreated')
  }

  get isV51(): boolean {
    return this.ctx._chain.getEventHash('control.OrgCreated') === '4e393aea082c3c6ff3eaea7f1751b935a60ac5e3314fa506947bbc9db9aff5dd'
  }

  get asV51(): {senderId: v51.AccountId32, orgId: v51.H256, treasuryId: v51.AccountId32, createdAt: number, realmIndex: bigint} {
    assert(this.isV51)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV51
  }

  get asLatest(): {senderId: v51.AccountId32, orgId: v51.H256, treasuryId: v51.AccountId32, createdAt: number, realmIndex: bigint} {
    deprecateLatest()
    return this.asV51
  }
}

export class ControlRemoveMemberEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'control.RemoveMember')
  }

  get isV51(): boolean {
    return this.ctx._chain.getEventHash('control.RemoveMember') === '6dbf5f59b7d96281f8c1c006ec712b5a09a4ede5daea0cf19dd7e2547cb9f420'
  }

  get asV51(): {orgId: v51.H256, accountId: v51.AccountId32, removedAt: number} {
    assert(this.isV51)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV51
  }

  get asLatest(): {orgId: v51.H256, accountId: v51.AccountId32, removedAt: number} {
    deprecateLatest()
    return this.asV51
  }
}
