import { CreateCharityDto } from './dto/create-charity.dto';
import { UpdateCharityDto } from './dto/update-charity.dto';
import { Charity } from './entities/charity.entity';
import { Repository } from 'typeorm';
export declare class CharitiesService {
    private readonly charityRepository;
    constructor(charityRepository: Repository<Charity>);
    create(createCharityDto: CreateCharityDto): Promise<Charity>;
    deleteCharity(id: number): Promise<{
        message: string;
    }>;
    updateCharity(id: number, updateCharityDto: UpdateCharityDto): Promise<Charity>;
    getCharity(id: number): Promise<Charity[]>;
    getAllCharities(): Promise<Charity[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCharityDto: UpdateCharityDto): string;
    remove(id: number): string;
}
