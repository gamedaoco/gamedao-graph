import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Body} from "./body.model"
import {Identity} from "./identity.model"

@Entity_()
export class BodyMember {
  constructor(props?: Partial<BodyMember>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Body, {nullable: false})
  body!: Body

  @Index_()
  @ManyToOne_(() => Identity, {nullable: false})
  identity!: Identity
}
