import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v51 from './v51'

export class ControlOrgCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'control.OrgCreated')
  }

  get isV51(): boolean {
    return this.ctx._chain.getEventHash('control.OrgCreated') === '4c9ef8c12028312a52e3d3a04df94379c9d151b5c341a29aa84d43e21b0c1c40'
  }

  get asV51(): {senderId: v51.AccountId32, orgId: v51.H256, createdAt: number, realmIndex: bigint} {
    assert(this.isV51)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV51
  }

  get asLatest(): {senderId: v51.AccountId32, orgId: v51.H256, createdAt: number, realmIndex: bigint} {
    deprecateLatest()
    return this.asV51
  }
}
