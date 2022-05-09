import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Organization} from "./organization.model"

@Entity_()
export class Identity {
  constructor(props?: Partial<Identity>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  address!: string

  @Column_("text", {nullable: true})
  displayName!: string | undefined | null

  @Column_("text", {nullable: true})
  legalName!: string | undefined | null

  @Column_("text", {nullable: true})
  email!: string | undefined | null

  @Column_("text", {nullable: true})
  riot!: string | undefined | null

  @Column_("text", {nullable: true})
  image!: string | undefined | null

  @Column_("text", {nullable: true})
  twitter!: string | undefined | null

  @OneToMany_(() => Organization, e => e.creatorIdentity)
  createdBodies!: Organization[]

  @OneToMany_(() => Organization, e => e.controllerIdentity)
  controllerBodies!: Organization[]
}
