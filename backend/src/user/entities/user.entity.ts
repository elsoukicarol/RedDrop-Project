import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  first_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  last_name: string;

  @Column({ type: "varchar", length: 3, nullable: true })
  blood_type: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location: string;

  @Column({ type: "int", default: 0, nullable: true })
  points: number;

  @Column({ type: "varchar", default: '15', nullable: true })
  role: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ type: "varchar", nullable: true })
  weight: string;

  @Column({ type: "varchar", nullable: true })
  age: string;

  @Column({ type: "varchar", nullable: true })
  medical_condition: string;

  @Column({ type: "varchar", default: false, nullable: true })
  tattoos: string;

  @Column({ type: "varchar", default: false, nullable: true })
  tattoos_lately: string;

  @Column({ type: "varchar", nullable: true })
  medications: string;

  @Column({ type: "varchar", nullable: true })
  specify_conditions: string;
}
