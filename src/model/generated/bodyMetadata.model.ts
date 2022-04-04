import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class BodyMetadata {
  constructor(props?: Partial<BodyMetadata>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  name!: string

  @Column_("text", {nullable: false})
  description!: string

  @Column_("text", {nullable: true})
  website!: string | undefined | null

  @Column_("text", {nullable: true})
  email!: string | undefined | null

  @Column_("text", {nullable: true})
  repo!: string | undefined | null

  @Column_("text", {nullable: true})
  logo!: string | undefined | null

  @Column_("text", {nullable: true})
  header!: string | undefined | null
}
