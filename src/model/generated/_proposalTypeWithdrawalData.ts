import assert from "assert"
import * as marshal from "./marshal"

export class ProposalTypeWithdrawalData {
  public readonly isTypeOf = 'ProposalTypeWithdrawalData'
  private _type!: number
  private _amount!: bigint

  constructor(props?: Partial<Omit<ProposalTypeWithdrawalData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._type = marshal.int.fromJSON(json.type)
      this._amount = marshal.bigint.fromJSON(json.amount)
    }
  }

  get type(): number {
    assert(this._type != null, 'uninitialized access')
    return this._type
  }

  set type(value: number) {
    this._type = value
  }

  get amount(): bigint {
    assert(this._amount != null, 'uninitialized access')
    return this._amount
  }

  set amount(value: bigint) {
    this._amount = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      type: this.type,
      amount: marshal.bigint.toJSON(this.amount),
    }
  }
}
