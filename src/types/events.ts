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
