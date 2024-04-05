import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("faq")
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, name: "question" })
  question: string;

  @Column({ type: "varchar", length: 255, name: "answer" })
  answer: string;
}
