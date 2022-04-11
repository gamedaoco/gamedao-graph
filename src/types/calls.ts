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

export class GameDaoGovernanceGeneralProposalCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'gameDaoGovernance.generalProposal' || this.ctx.extrinsic.name === 'gameDaoGovernance.general_proposal')
  }

  get isV22(): boolean {
    return this.ctx._chain.getCallHash('gameDaoGovernance.general_proposal') === 'eded48b96f79cc2c5bef530f52f8e504cda29bbd136633ac35119459902a0897'
  }

  get asV22(): {contextId: Uint8Array, title: Uint8Array, cid: Uint8Array, expiry: number} {
    assert(this.isV22)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isV24(): boolean {
    return this.ctx._chain.getCallHash('gameDaoGovernance.general_proposal') === '98ebb179efd1d98fd4bcf6a93db242a9c60f47e5e669151ba5c2003886bba402'
  }

  get asV24(): {contextId: Uint8Array, title: Uint8Array, cid: Uint8Array, start: number, expiry: number} {
    assert(this.isV24)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV24
  }

  get asLatest(): {contextId: Uint8Array, title: Uint8Array, cid: Uint8Array, start: number, expiry: number} {
    deprecateLatest()
    return this.asV24
  }
}

export class GameDaoGovernanceWithdrawProposalCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'gameDaoGovernance.withdrawProposal' || this.ctx.extrinsic.name === 'gameDaoGovernance.withdraw_proposal')
  }

  get isV22(): boolean {
    return this.ctx._chain.getCallHash('gameDaoGovernance.withdraw_proposal') === 'c7145edcccd796d7e192dad3eaba9b86bf64c90f15dcb4f80baff1861dc7cd8f'
  }

  get asV22(): {contextId: Uint8Array, title: Uint8Array, cid: Uint8Array, amount: bigint, expiry: number} {
    assert(this.isV22)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isV24(): boolean {
    return this.ctx._chain.getCallHash('gameDaoGovernance.withdraw_proposal') === 'd36cb285102043e7ca87602b401b8663024a376b0239332fe9c3777702a5f091'
  }

  get asV24(): {contextId: Uint8Array, title: Uint8Array, cid: Uint8Array, amount: bigint, start: number, expiry: number} {
    assert(this.isV24)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV24
  }

  get asLatest(): {contextId: Uint8Array, title: Uint8Array, cid: Uint8Array, amount: bigint, start: number, expiry: number} {
    deprecateLatest()
    return this.asV24
  }
}
