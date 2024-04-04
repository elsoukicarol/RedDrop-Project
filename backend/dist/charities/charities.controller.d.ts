import { CharitiesService } from './charities.service';
import { CreateCharityDto } from './dto/create-charity.dto';
import { UpdateCharityDto } from './dto/update-charity.dto';
import { Charity } from './entities/charity.entity';
export declare class CharitiesController {
    private readonly charitiesService;
    constructor(charitiesService: CharitiesService);
    create(createCharityDto: CreateCharityDto): Promise<Charity | {
        message: any;
    }>;
    deleteCharity(id: number): Promise<{
        message: string;
    }>;
    updateCharity(id: number, updateCharityDto: UpdateCharityDto): Promise<Charity>;
    findCharity(id: number): Promise<Charity[]>;
    findAllCharities(): Promise<Charity[]>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCharityDto: UpdateCharityDto): string;
    remove(id: string): string;
}
