import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'

export class GameDaoControlCreateCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'gameDaoControl.create')
  }

  get isV21(): boolean {
    return this.ctx._chain.getCallHash('gameDaoControl.create') === '65e394a0f7a40d843142f3bed3b076dbc6628869fc9f8f72535daa2b9dcae8a0'
  }

  get asV21(): {creator: Uint8Array, controller: Uint8Array, treasury: Uint8Array, name: Uint8Array, cid: Uint8Array, body: number, access: number, feeModel: number, fee: bigint, govAsset: number, payAsset: number, memberLimit: bigint} {
    assert(this.isV21)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isV30(): boolean {
    return this.ctx._chain.getCallHash('gameDaoControl.create') === '8bb6fdfbd7450b9bb9e1ad7b8bf1b857b4629a679daf2c73eff8a728d641eb1f'
  }

  get asV30(): {controller: Uint8Array, treasury: Uint8Array, name: Uint8Array, cid: Uint8Array, body: number, access: number, feeModel: number, fee: bigint, govAsset: number, payAsset: number, memberLimit: bigint} {
    assert(this.isV30)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV30
  }

  get asLatest(): {controller: Uint8Array, treasury: Uint8Array, name: Uint8Array, cid: Uint8Array, body: number, access: number, feeModel: number, fee: bigint, govAsset: number, payAsset: number, memberLimit: bigint} {
    deprecateLatest()
    return this.asV30
  }
}

export class GameDaoCrowdfundingCreateCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'gameDaoCrowdfunding.create')
  }

  get isV21(): boolean {
    return this.ctx._chain.getCallHash('gameDaoCrowdfunding.create') === 'f02ec73ba9dff7a88d1ec022088cb5546440e457000c97276e03973202126184'
  }

  get asV21(): {org: Uint8Array, admin: Uint8Array, name: Uint8Array, target: bigint, deposit: bigint, expiry: number, protocol: number, governance: number, cid: Uint8Array, tokenSymbol: Uint8Array, tokenName: Uint8Array} {
    assert(this.isV21)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV21
  }

  get asLatest(): {org: Uint8Array, admin: Uint8Array, name: Uint8Array, target: bigint, deposit: bigint, expiry: number, protocol: number, governance: number, cid: Uint8Array, tokenSymbol: Uint8Array, tokenName: Uint8Array} {
    deprecateLatest()
    return this.asV21
  }
}
