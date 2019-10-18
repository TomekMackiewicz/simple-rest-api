export interface UserTrait {
    id: number;
    label: string;
}

export interface UserTraits {
    traits: UserTrait[];
    total_count: number;
}
