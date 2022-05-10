import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v51 from './v51'

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
