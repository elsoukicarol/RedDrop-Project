import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { ChatMessage } from '../../chat/entities/chat.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  blood_type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({ type: 'varchar', default: 15 })
  role: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ default: false })
  isActivated: boolean;

  //   @OneToMany(() => ChatMessage, (message) => message.sender)
  //   sentMessages: ChatMessage[];

  //   @OneToMany(() => ChatMessage, (message) => message.receiver)
  //   receivedMessages: ChatMessage[];
}
