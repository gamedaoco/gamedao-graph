import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v51 from './v51'

export class ControlCreateOrgCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'control.createOrg' || this.ctx.extrinsic.name === 'control.create_org')
  }

  /**
   * Create Org
   * create an on chain organisation
   * 
   * - `creator`: creator
   * - `controller`: current controller
   * - `treasury`: treasury
   * - `name`: Org name
   * - `cid`: IPFS
   * - `org_type`: individual | legal Org | dao
   * - `access`: anyDAO can join | only member can add | only
   * - `fee_model`: only TX by OS | fees are reserved | fees are moved to
   *   treasury
   * - `fee`: fee
   * - `gov_asset`: control assets to empower actors
   * - `pay_asset`:
   * - `member_limit`: max members, if 0 == no limit
   * 
   * Emits `OrgCreated` event when successful.
   * 
   * Weight:
   */
  get isV51(): boolean {
    return this.ctx._chain.getCallHash('control.create_org') === '1fd5c5a5b8c80b9661d8881c96d433dd07d9848a0c9a885faa5514527ea36263'
  }

  /**
   * Create Org
   * create an on chain organisation
   * 
   * - `creator`: creator
   * - `controller`: current controller
   * - `treasury`: treasury
   * - `name`: Org name
   * - `cid`: IPFS
   * - `org_type`: individual | legal Org | dao
   * - `access`: anyDAO can join | only member can add | only
   * - `fee_model`: only TX by OS | fees are reserved | fees are moved to
   *   treasury
   * - `fee`: fee
   * - `gov_asset`: control assets to empower actors
   * - `pay_asset`:
   * - `member_limit`: max members, if 0 == no limit
   * 
   * Emits `OrgCreated` event when successful.
   * 
   * Weight:
   */
  get asV51(): {controller: v51.AccountId32, treasury: v51.AccountId32, name: Uint8Array, cid: Uint8Array, orgType: v51.OrgType, access: v51.AccessModel, feeModel: v51.FeeModel, fee: bigint, govAsset: number, payAsset: number, memberLimit: bigint} {
    assert(this.isV51)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV51
  }

  get asLatest(): {controller: v51.AccountId32, treasury: v51.AccountId32, name: Uint8Array, cid: Uint8Array, orgType: v51.OrgType, access: v51.AccessModel, feeModel: v51.FeeModel, fee: bigint, govAsset: number, payAsset: number, memberLimit: bigint} {
    deprecateLatest()
    return this.asV51
  }
}
