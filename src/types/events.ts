import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'

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
