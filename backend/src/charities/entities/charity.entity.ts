import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("charities")
export class Charity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, name: "charity_name" })
  charity_name: string;

  @Column({ type: "varchar", length: 255, name: "description" })
  description: string;

  @Column({ type: 'int', default: 0 , name: "donations" })
  donations: number;

  @Column({ type: "varchar", length: 255, name: "profile_picture" })
  picture: string;
}
