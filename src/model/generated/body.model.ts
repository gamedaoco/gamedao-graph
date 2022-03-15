import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Body {
  constructor(props?: Partial<Body>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  creator!: string

  @Column_("text", {nullable: false})
  controller!: string

  @Column_("text", {nullable: false})
  treasury!: string

  @Column_("text", {nullable: false})
  name!: string

  @Column_("text", {nullable: false})
  cid!: string

  @Column_("integer", {nullable: false})
  body!: number

  @Column_("integer", {nullable: false})
  access!: number

  @Column_("integer", {nullable: false})
  feeModel!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  fee!: bigint

  @Column_("integer", {nullable: false})
  govAsset!: number

  @Column_("integer", {nullable: false})
  payAsset!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  memberLimit!: bigint
}
