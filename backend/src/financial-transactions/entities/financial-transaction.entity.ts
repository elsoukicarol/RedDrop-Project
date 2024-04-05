import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Charity } from "../../charities/entities/charity.entity"; // Adjust the path as needed

@Entity("financial_donations")
export class FinancialTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "date" })
  date: Date;

  // Define the foreign key column for the Charity relationship
  @Column({ name: "charity_id" }) // This column definition was missing
  charity_id: number;

  @ManyToOne(() => Charity, { nullable: false })
  @JoinColumn({ name: "charity_id" }) // Corrected to use 'charity_id'
  charity: Charity;
}
